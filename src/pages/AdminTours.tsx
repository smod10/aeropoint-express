import React, { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react';
import { getTourPackages, saveTourPackages, type Package } from '../data/packages';

const emptyTour = (): Package => ({
  slug: '',
  title: '',
  location: '',
  image: '',
  images: [],
  days: '',
  price: '',
  rating: 4.5,
  badge: 'Featured',
  description: '',
  accommodation: '',
  highlights: [],
  flightIncluded: false,
  itinerary: [],
  conditions: '',
  category: 'Vacations',
});

const slugFromTitle = (title: string) => title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const AdminTours: React.FC = () => {
  const [tours, setTours] = useState<Package[]>(getTourPackages);
  const [editingSlug, setEditingSlug] = useState('');
  const [form, setForm] = useState<Package | null>(null);
  const [imagesText, setImagesText] = useState('');
  const [highlightsText, setHighlightsText] = useState('');
  const [itineraryText, setItineraryText] = useState('');
  const [message, setMessage] = useState('');

  const openEditor = (tour?: Package) => {
    const nextTour = tour ? { ...tour } : emptyTour();
    setEditingSlug(tour?.slug || '');
    setForm(nextTour);
    setImagesText((tour?.images || []).join('\n'));
    setHighlightsText((tour?.highlights || []).join('\n'));
    setItineraryText((tour?.itinerary || []).map((item) => `${item.title} | ${item.detail}`).join('\n'));
    setMessage('');
  };

  const updateForm = <K extends keyof Package>(field: K, value: Package[K]) => {
    setForm((current) => current ? { ...current, [field]: value } : current);
    setMessage('');
  };

  const saveTour = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form) return;

    const itinerary = itineraryText.split('\n').map((line) => {
      const [title = '', ...detailParts] = line.split('|');
      return { title: title.trim(), detail: detailParts.join('|').trim() };
    }).filter((item) => item.title && item.detail);
    const nextTour: Package = {
      ...form,
      slug: form.slug.trim() || slugFromTitle(form.title),
      images: imagesText.split('\n').map((image) => image.trim()).filter(Boolean),
      highlights: highlightsText.split('\n').map((highlight) => highlight.trim()).filter(Boolean),
      itinerary,
    };

    if (!nextTour.slug || (!editingSlug && tours.some((tour) => tour.slug === nextTour.slug))) {
      setMessage('Enter a unique tour URL slug.');
      return;
    }

    const updatedTours = editingSlug
      ? tours.map((tour) => tour.slug === editingSlug ? nextTour : tour)
      : [...tours, nextTour];
    saveTourPackages(updatedTours);
    setTours(updatedTours);
    setEditingSlug(nextTour.slug);
    setForm(nextTour);
    setImagesText(nextTour.images?.join('\n') ?? '');
    setHighlightsText(nextTour.highlights.join('\n'));
    setItineraryText((nextTour.itinerary ?? []).map((item) => `${item.title} | ${item.detail}`).join('\n'));
    setMessage('Tour saved in this browser.');
  };

  const removeTour = (slug: string) => {
    const updatedTours = tours.filter((tour) => tour.slug !== slug);
    saveTourPackages(updatedTours);
    setTours(updatedTours);
    if (editingSlug === slug) {
      setForm(null);
      setEditingSlug('');
    }
    setMessage('Tour removed from this browser.');
  };

  const inputClass = 'mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15';

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/packages" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 hover:underline"><ArrowLeft className="h-4 w-4" /> Back to Tours</Link>
        <header className="mt-5 flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
          <div><p className="text-sm font-bold uppercase tracking-wider text-amber-700">Catalog administration</p><h1 className="mt-2 text-3xl font-extrabold text-blue-950">Manage Tours</h1><p className="mt-2 text-sm text-slate-600">Changes are stored in this browser and appear in the public Tours catalog.</p></div>
          <button type="button" onClick={() => openEditor()} className="inline-flex items-center gap-2 self-start rounded-md bg-blue-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-950"><Plus className="h-4 w-4" /> New Tour</button>
        </header>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.5fr)]">
          <section className="divide-y divide-slate-200 border-y border-slate-200">
            {tours.map((tour) => <article key={tour.slug} className="flex items-start justify-between gap-3 py-4">
              <div className="min-w-0"><h2 className="font-bold text-blue-950">{tour.title}</h2><p className="mt-1 truncate text-xs text-slate-500">{tour.location} · {tour.flightIncluded ? 'Flights included' : 'Flights not included'}</p></div>
              <div className="flex shrink-0 gap-2"><button type="button" onClick={() => openEditor(tour)} className="text-sm font-semibold text-blue-900 underline underline-offset-2">Edit</button><button type="button" onClick={() => removeTour(tour.slug)} aria-label={`Delete ${tour.title}`} className="rounded p-1 text-slate-500 hover:bg-red-50 hover:text-red-700"><Trash2 className="h-4 w-4" /></button></div>
            </article>)}
          </section>

          {form && <section className="border border-slate-200 bg-white p-5 sm:p-7">
            <h2 className="text-lg font-bold text-blue-950">{editingSlug ? 'Edit Tour' : 'Create Tour'}</h2>
            <form className="mt-5 space-y-4" onSubmit={saveTour}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700">Tour name<input required value={form.title} onChange={(event) => updateForm('title', event.target.value)} className={inputClass} /></label>
                <label className="block text-sm font-semibold text-slate-700">URL slug<input required value={form.slug} onChange={(event) => updateForm('slug', slugFromTitle(event.target.value))} placeholder={slugFromTitle(form.title)} className={inputClass} /></label>
                <label className="block text-sm font-semibold text-slate-700">Destination<input required value={form.location} onChange={(event) => updateForm('location', event.target.value)} className={inputClass} /></label>
                <label className="block text-sm font-semibold text-slate-700">Category<input required value={form.category || ''} onChange={(event) => updateForm('category', event.target.value)} placeholder="Vacations, Hajj & Umrah" className={inputClass} /></label>
                <label className="block text-sm font-semibold text-slate-700">Duration<input required value={form.days} onChange={(event) => updateForm('days', event.target.value)} placeholder="7 Days" className={inputClass} /></label>
                <label className="block text-sm font-semibold text-slate-700">Price<input required value={form.price} onChange={(event) => updateForm('price', event.target.value)} placeholder="₦1,850,000" className={inputClass} /></label>
                <label className="block text-sm font-semibold text-slate-700">Badge<input value={form.badge} onChange={(event) => updateForm('badge', event.target.value)} className={inputClass} /></label>
                <label className="block text-sm font-semibold text-slate-700">Rating<input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(event) => updateForm('rating', Number(event.target.value))} className={inputClass} /></label>
              </div>
              <label className="block text-sm font-semibold text-slate-700">Flights included<select value={form.flightIncluded ? 'yes' : 'no'} onChange={(event) => updateForm('flightIncluded', event.target.value === 'yes')} className={inputClass}><option value="yes">Yes — Flights included</option><option value="no">No — Flights not included</option></select></label>
              <label className="block text-sm font-semibold text-slate-700">Cover image URL<input required type="url" value={form.image} onChange={(event) => updateForm('image', event.target.value)} className={inputClass} /></label>
              <label className="block text-sm font-semibold text-slate-700">Gallery image URLs<textarea rows={3} value={imagesText} onChange={(event) => setImagesText(event.target.value)} placeholder="One image URL per line" className={inputClass} /></label>
              <label className="block text-sm font-semibold text-slate-700">Description<textarea required rows={4} value={form.description} onChange={(event) => updateForm('description', event.target.value)} className={inputClass} /></label>
              <label className="block text-sm font-semibold text-slate-700">Accommodation details<textarea rows={3} value={form.accommodation} onChange={(event) => updateForm('accommodation', event.target.value)} className={inputClass} /></label>
              <label className="block text-sm font-semibold text-slate-700">Inclusions / highlights<textarea rows={4} value={highlightsText} onChange={(event) => setHighlightsText(event.target.value)} placeholder="One inclusion per line" className={inputClass} /></label>
              <label className="block text-sm font-semibold text-slate-700">Itinerary<textarea rows={5} value={itineraryText} onChange={(event) => setItineraryText(event.target.value)} placeholder={'One day per line: Day title | Details'} className={inputClass} /></label>
              <label className="block text-sm font-semibold text-slate-700">Conditions<textarea rows={3} value={form.conditions} onChange={(event) => updateForm('conditions', event.target.value)} className={inputClass} /></label>
              <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-blue-900 px-5 py-2.5 font-bold text-white hover:bg-blue-950"><Save className="h-4 w-4" /> Save Tour</button>
              {message && <p role="status" className="text-sm font-medium text-emerald-800">{message}</p>}
            </form>
          </section>}
        </div>
      </div>
    </div>
  );
};

export default AdminTours;