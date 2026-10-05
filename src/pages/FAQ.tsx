import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { contactInfo } from '../data/contactInfo';

const questions = [
  ['How do I book a flight, hotel, or package?', 'Use the relevant search form to review available options, then follow the booking steps. A booking is confirmed only when we or the supplier issue confirmation and any required payment is accepted.'],
  ['Are the prices shown final?', 'Prices and availability can change until a supplier confirms the booking. Any taxes, fees, baggage, and supplier conditions shown during checkout apply. Contact us if a quote is unclear before paying.'],
  ['Can I change or cancel a booking?', 'Change and cancellation rules depend on the airline, hotel, or package supplier and the fare or rate selected. Review those rules before purchase. Some bookings are non-refundable, and supplier fees may apply.'],
  ['What documents do I need to travel?', 'Entry and transit requirements depend on your passport, route, and destination. Check current requirements with the destination government, transit authorities, and your airline before travel.'],
  ['Do you guarantee that a visa will be approved?', 'No. Visa decisions are made solely by the relevant government authority. We can help organize travel-related information, but we do not control processing times or decisions.'],
  ['Can Aeropoint help me apply to study abroad?', 'Yes. Our Study page explains how we can support destination and program research, application organization, and travel planning. Admission and immigration decisions remain with the relevant institutions and authorities.'],
  ['How do I receive my booking documents?', 'Once the supplier confirms a booking, we will provide the confirmation and available travel documents through the contact channel associated with your booking. Check your email, including spam folders.'],
  ['What should I do if my flight is disrupted?', 'Contact the airline promptly for operational assistance and contact our support team for help reviewing your booking options. Airline and passenger rights vary by route and applicable law.'],
  ['How is my personal information handled?', 'We use personal information to respond to requests, arrange services, and meet legal obligations. Read our Privacy Policy for details about use, retention, and your privacy rights.'],
  ['How can I contact support?', `Email ${contactInfo.email}, call ${contactInfo.phone} or ${contactInfo.phone2}, or message us on WhatsApp.`],
];

const FAQ: React.FC = () => (
  <div className="min-h-screen bg-slate-50 px-4 pb-20 pt-32 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-4xl">
      <p className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-700">Help center</p>
      <h1 className="text-4xl font-extrabold text-blue-950 md:text-5xl">Frequently asked questions</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">Clear answers about bookings, travel documents, study support, and getting help.</p>
      <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
        {questions.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-bold text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-900">{question}<span className="float-right text-xl text-amber-700 transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary><p className="mt-3 max-w-3xl leading-relaxed text-slate-600">{answer}</p></details>)}
      </div>
      <p className="mt-8 text-slate-600">Still need help? <Link to="/contact" className="inline-flex items-center gap-1 font-bold text-blue-900 hover:text-amber-700">Contact us <ArrowRight className="h-4 w-4" /></Link></p>
    </div>
  </div>
);

export default FAQ;