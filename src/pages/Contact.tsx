import React, { useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Clock3, Mail, MapPin, MessageCircle, Phone, Plane, ShieldCheck } from 'lucide-react';
import { contactInfo } from '../data/contactInfo';
import PhoneCountrySelect from '../components/PhoneCountrySelect';
import { getCountryCallingCode, type CountryCode } from 'libphonenumber-js';

const Contact: React.FC = () => {
  const [status, setStatus] = useState('');
  const location = useLocation();
  const bookingRequest = location.state as { bookingReference?: string; requestType?: 'change' | 'cancel'; customerName?: string; customerEmail?: string } | null;
  const requestTopic = bookingRequest?.requestType === 'cancel' ? 'Flight change or cancellation' : 'Existing booking';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const phoneCountry = String(formData.get('phoneCountry') || 'NG') as CountryCode;
    const subject = encodeURIComponent(`${formData.get('topic')} enquiry from ${formData.get('fullName')}`);
    const body = encodeURIComponent([
      `Name: ${formData.get('fullName')}`,
      `Email: ${formData.get('email')}`,
      `Phone: +${getCountryCallingCode(phoneCountry)} ${formData.get('phone')}`,
      `Request type: ${formData.get('topic')}`,
      `Booking reference: ${formData.get('bookingReference') || 'Not provided'}`,
      `Airline / flight number: ${formData.get('flightNumber') || 'Not provided'}`,
      `Travel date: ${formData.get('travelDate') || 'Not provided'}`,
      '',
      'Message:',
      String(formData.get('message')),
    ].join('\n'));
    setStatus(`Your default email app should open with your message. If it does not, email ${contactInfo.email}.`);
    window.location.href = `${contactInfo.emailHref}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-blue-950 px-4 pb-12 pt-32 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-300">Aeropoint customer care</p>
            <h1 className="text-4xl font-extrabold md:text-5xl">How can we help?</h1>
            <p className="mt-4 text-lg leading-relaxed text-blue-100">Contact us about a new trip, an existing booking, a disruption, or feedback about your experience.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#contact-form" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-600">Get support <ArrowRight className="h-4 w-4" /></a>
            <a href="#contact-form" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 font-bold text-white transition hover:bg-white/10">Share feedback</a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
        <aside className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-bold text-blue-950">Contact channels</h2>
            <div className="space-y-4 text-sm">
              <a href={contactInfo.emailHref} className="flex items-start gap-3 text-slate-700 hover:text-blue-900"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /><span><strong className="block text-slate-900">Email</strong>{contactInfo.email}</span></a>
              <div className="flex items-start gap-3 text-slate-700"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /><span><strong className="mb-1 block text-slate-900">Phone</strong>{contactInfo.phones.map((phone) => <a key={phone.number} href={phone.href} className="block hover:text-blue-900">{phone.number}</a>)}</span></div>
              <a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-slate-700 hover:text-blue-900"><MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /><span><strong className="block text-slate-900">WhatsApp</strong>{contactInfo.phone}</span></a>
              <div className="flex items-start gap-3 text-slate-700"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /><span><strong className="block text-slate-900">Office</strong>{contactInfo.address}</span></div>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="mb-3 flex items-center gap-2 font-bold text-blue-950"><Clock3 className="h-5 w-5 text-amber-600" />Travel disruption?</h2>
            <p className="text-sm leading-relaxed text-slate-600">For an imminent departure, missed connection, or airport disruption, contact the airline or airport desk first for immediate operational assistance. Send us your booking reference and flight details so we can help with your booking.</p>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-5 text-sm leading-relaxed text-blue-950"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" /><p>For your security, do not include card numbers, passwords, or full passport scans in this initial enquiry. We will request any necessary information through an appropriate channel.</p></div>
        </aside>

        <form id="contact-form" onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-7">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-amber-700">Support and feedback</p>
            <h2 className="text-2xl font-extrabold text-blue-950">Send us a message</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Include your booking and flight details when relevant so our team can understand your request.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">Full name<input name="fullName" autoComplete="name" required defaultValue={bookingRequest?.customerName} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" /></label>
            <label className="text-sm font-semibold text-slate-700">Email address<input name="email" type="email" autoComplete="email" required defaultValue={bookingRequest?.customerEmail} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" /></label>
            <div className="text-sm font-semibold text-slate-700"><label htmlFor="contact-phone" className="block">Phone number</label><div className="mt-2 flex gap-2"><PhoneCountrySelect name="phoneCountry" aria-label="Phone country code" className="w-[46%] min-w-0 rounded-md border border-slate-300 bg-white px-2 py-3 text-xs font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" /><input id="contact-phone" name="phone" type="tel" autoComplete="tel-national" inputMode="tel" pattern="[0-9+ .-]{6,20}" required className="w-full min-w-0 rounded-md border border-slate-300 px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" /></div></div>
            <label className="text-sm font-semibold text-slate-700">What can we help with?<select name="topic" required defaultValue={bookingRequest?.requestType ? requestTopic : ''} className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15"><option value="" disabled>Select a request type</option><option>New booking</option><option>Existing booking</option><option>Flight change or cancellation</option><option>Refund request</option><option>Flight disruption</option><option>Baggage or special assistance</option><option>Stay or tour</option><option>Study or visa enquiry</option><option>Feedback about a completed booking</option><option>Other</option></select></label>
            <label className="text-sm font-semibold text-slate-700">Booking reference <span className="font-normal text-slate-400">(optional)</span><input name="bookingReference" autoComplete="off" defaultValue={bookingRequest?.bookingReference} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" /></label>
            <label className="text-sm font-semibold text-slate-700">Airline and flight number <span className="font-normal text-slate-400">(optional)</span><input name="flightNumber" placeholder="e.g. Airline, flight number" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" /></label>
            <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Travel date <span className="font-normal text-slate-400">(optional)</span><input name="travelDate" type="date" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15 sm:max-w-xs" /></label>
            <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Message<textarea name="message" required rows={6} defaultValue={bookingRequest?.requestType && bookingRequest.bookingReference ? `I would like to request a ${bookingRequest.requestType} for booking ${bookingRequest.bookingReference}.` : undefined} placeholder="Describe what happened or how we can help. Please do not include sensitive payment or identity details." className="mt-2 w-full resize-y rounded-md border border-slate-300 px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" /></label>
          </div>
          <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-slate-600"><input type="checkbox" required className="mt-1 h-4 w-4 accent-blue-900" /><span>I agree that Aeropoint Express may use the details above to respond to this request. See our <Link to="/privacy" className="font-semibold text-blue-900 underline">Privacy Policy</Link>.</span></label>
          <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-900 px-6 py-3 font-bold text-white transition hover:bg-blue-800"><Plane className="h-4 w-4" /> Submit</button>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">Submitting opens your default email application with the enquiry details. This website does not transmit or store this form.</p>
          {status && <p role="status" className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800">{status}</p>}
        </form>
      </section>
    </div>
  );
};

export default Contact;
