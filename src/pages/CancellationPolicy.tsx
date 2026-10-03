import React, { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, ExternalLink, Mail, Plane, ShieldCheck } from 'lucide-react';
import { contactInfo } from '../data/contactInfo';

const CancellationPolicy: React.FC = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Cancellation request - ${formData.get('bookingReference')}`);
    const body = encodeURIComponent([
      `Lead passenger: ${formData.get('passengerName')}`,
      `Booking email: ${formData.get('email')}`,
      `Phone: ${formData.get('phone')}`,
      `Booking reference: ${formData.get('bookingReference')}`,
      `Supplier: ${formData.get('supplier')}`,
      `Request: ${formData.get('requestType')}`,
      `Travel date: ${formData.get('travelDate') || 'Not provided'}`,
      `Cancel all travelers/segments: ${formData.get('allSegments') ? 'Yes' : 'No'}`,
      '',
      `Reason / details: ${formData.get('details')}`,
    ].join('\n'));
    setStatus('Your default email app should open with the request. The booking remains active until Aeropoint and the supplier confirm the cancellation in writing.');
    window.location.href = `${contactInfo.emailHref}?subject=${subject}&body=${body}`;
  };

  const authorityLinks = [
    { label: 'Nigeria Civil Aviation Authority (NCAA)', detail: 'Nigerian aviation rules, passenger questions, and the Consumer Protection Directorate complaint portal.', href: 'https://cpd.ncaa.gov.ng/' },
    { label: 'Federal Competition and Consumer Protection Commission (FCCPC)', detail: 'General Nigerian consumer rights under the Federal Competition and Consumer Protection Act.', href: 'https://fccpc.gov.ng/consumers/consumer-rights-responsibilities/' },
    { label: 'Federal Airports Authority of Nigeria (FAAN)', detail: 'Airport operations and airport services. FAAN does not set an airline ticket’s fare or refund terms.', href: 'https://faan.gov.ng/' },
    { label: 'International Air Transport Association (IATA)', detail: 'Industry passenger-rights information. IATA is not a government regulator and does not adjudicate individual refund claims.', href: 'https://www.iata.org/en/youandiata/travelers/passenger-rights/' },
    { label: 'European Union air passenger rights', detail: 'EU protections apply only to qualifying itineraries and circumstances under the applicable rules.', href: 'https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_en.htm' },
    { label: 'U.S. Department of Transportation refunds', detail: 'U.S. refund rules and eligibility for flights within the scope of U.S. law.', href: 'https://www.transportation.gov/individuals/aviation-consumer-protection/refunds' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-blue-950 px-4 pb-14 pt-32 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-300">Customer support</p>
          <h1 className="max-w-4xl text-4xl font-extrabold md:text-5xl">Cancellations and refunds</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-blue-100">Understand your options, request a cancellation, and find the official passenger-rights resources relevant to your journey.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-extrabold text-blue-950">Cancellation rules depend on the booking</h2>
            <p className="mt-3 leading-relaxed text-slate-600">There is no single worldwide cancellation or refund rule for every ticket. Eligibility and charges depend on the airline or other supplier, fare or rate conditions, when and where the booking was purchased, who issued it, and the passenger-protection laws that apply to the itinerary.</p>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3"><Plane className="mt-1 h-5 w-5 shrink-0 text-amber-600" /><p className="text-sm leading-relaxed text-slate-600"><strong className="text-slate-900">You choose to cancel or change:</strong> the ticket or supplier’s fare/rate rules determine whether a refund, credit, or change is available and what fees or fare differences apply. A “non-refundable” label does not remove rights that mandatory law gives you.</p></li>
              <li className="flex gap-3"><AlertCircle className="mt-1 h-5 w-5 shrink-0 text-amber-600" /><p className="text-sm leading-relaxed text-slate-600"><strong className="text-slate-900">The airline cancels or significantly changes a flight:</strong> contact the airline or issuing agent promptly and review the options offered. Depending on applicable law and the circumstances, options may include re-routing or a refund. Do not accept a voucher or alternative before checking its conditions and any right to choose a refund.</p></li>
              <li className="flex gap-3"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-amber-600" /><p className="text-sm leading-relaxed text-slate-600"><strong className="text-slate-900">Hotel, package, visa, or other services:</strong> each supplier’s cancellation terms apply separately. A flight refund does not automatically cancel accommodation, transfers, insurance, or other services.</p></li>
            </ul>
          </section>

          <section className="border-y border-slate-200 py-8">
            <h2 className="text-2xl font-extrabold text-blue-950">How refunds are handled</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
              <p>Airline ticket value, carrier-imposed charges, optional extras, third-party supplier charges, and any Aeropoint service fee may be treated separately. We will explain any known fees and the supplier’s decision before processing a voluntary cancellation where practicable.</p>
              <p>Where a refund is approved, the airline or supplier may need to authorize it before it can be returned. The method and timing depend on the supplier, original payment method, payment provider, and applicable law. We will not promise a fixed timeframe before the relevant supplier confirms it.</p>
              <p>For a booking made through Aeropoint, contact us with the booking reference. For a booking made directly with an airline or another agent, contact the seller shown on your confirmation or payment statement. Avoid submitting duplicate requests while one is being reviewed.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-blue-950">Who handles what?</h2>
            <p className="mt-3 leading-relaxed text-slate-600">Start with the airline or seller that issued your booking. If the matter remains unresolved, the authority depends on where the flight operates and what part of the service is disputed.</p>
            <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
              {authorityLinks.map((authority) => <a key={authority.label} href={authority.href} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-4 py-4"><span><strong className="block text-sm text-blue-900">{authority.label}</strong><span className="mt-1 block text-sm leading-relaxed text-slate-600">{authority.detail}</span></span><ExternalLink className="mt-1 h-4 w-4 shrink-0 text-slate-400" /></a>)}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">These links are provided for general guidance only. They do not imply Aeropoint Express is accredited, endorsed, or acting on behalf of any authority. Regulations may change; confirm the current rules with the relevant regulator.</p>
          </section>

          <section className="border-l-2 border-amber-400 pl-4 text-sm leading-relaxed text-slate-600">
            This page summarizes general process information and is not legal advice or a guarantee of a refund. Your mandatory rights under applicable law remain unaffected. See our <Link to="/terms" className="font-semibold text-blue-900 underline">Terms of Service</Link> and <Link to="/privacy" className="font-semibold text-blue-900 underline">Privacy Policy</Link>.
          </section>
        </div>

        <aside id="request-cancellation" className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-amber-700">Aeropoint bookings</p>
          <h2 className="text-2xl font-extrabold text-blue-950">Request a cancellation</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">Have your booking confirmation ready. A request is not a confirmed cancellation; keep your itinerary until you receive written confirmation from us or the supplier.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block text-sm font-semibold text-slate-700">Booking reference<input name="bookingReference" required autoComplete="off" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" /></label>
            <label className="block text-sm font-semibold text-slate-700">Lead passenger name<input name="passengerName" required autoComplete="name" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" /></label>
            <label className="block text-sm font-semibold text-slate-700">Booking email<input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" /></label>
            <label className="block text-sm font-semibold text-slate-700">Phone number<input name="phone" type="tel" required autoComplete="tel" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" /></label>
            <label className="block text-sm font-semibold text-slate-700">Booking provider<select name="supplier" required defaultValue="" className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15"><option value="" disabled>Select provider</option><option>Airline</option><option>Hotel</option><option>Holiday package</option><option>Other</option></select></label>
            <label className="block text-sm font-semibold text-slate-700">Request type<select name="requestType" required defaultValue="" className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15"><option value="" disabled>Select request</option><option>Voluntary cancellation</option><option>Airline cancelled or changed my flight</option><option>Refund status follow-up</option><option>Other booking cancellation</option></select></label>
            <label className="block text-sm font-semibold text-slate-700">Travel date <span className="font-normal text-slate-400">(if applicable)</span><input name="travelDate" type="date" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" /></label>
            <label className="block text-sm font-semibold text-slate-700">Details<textarea name="details" rows={4} required placeholder="Tell us which passengers or services are affected and why you are requesting cancellation." className="mt-2 w-full resize-y rounded-md border border-slate-300 px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" /></label>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"><input name="allSegments" type="checkbox" className="mt-1 h-4 w-4 accent-blue-900" /><span>I am requesting cancellation for all passengers and itinerary segments in this booking.</span></label>
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 px-5 py-3 font-bold text-white transition hover:bg-blue-800"><Mail className="h-4 w-4" /> Continue to email <ArrowRight className="h-4 w-4" /></button>
            <p className="text-xs leading-relaxed text-slate-500">This form opens your default email application; it does not submit or store data on this website. Do not include card details or passwords.</p>
            {status && <p role="status" className="rounded-md bg-green-50 p-3 text-sm leading-relaxed text-green-800">{status}</p>}
          </form>
          <a href={contactInfo.emailHref} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-amber-700">Email {contactInfo.email} <ArrowRight className="h-4 w-4" /></a>
        </aside>
      </section>
    </div>
  );
};

export default CancellationPolicy;