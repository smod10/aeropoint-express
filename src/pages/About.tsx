import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, HeartHandshake, ShieldCheck } from 'lucide-react';
import { contactInfo } from '../data/contactInfo';

const About: React.FC = () => (
  <div className="bg-white">
    <section className="bg-blue-950 px-4 pb-16 pt-32 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="mb-4 text-sm font-bold uppercase tracking-wider text-amber-300">About Aeropoint Express</p><h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Thoughtful support for journeys that matter.</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-100">We help travelers organize flights, stays, curated tours, visa-related travel preparation, and study-abroad journeys from Nigeria.</p></div></section>
    <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
      <div><h2 className="text-3xl font-extrabold text-blue-950">Travel planning, made more manageable</h2><p className="mt-5 leading-relaxed text-slate-600">Planning a trip involves many details: comparing options, understanding supplier rules, preparing documents, and keeping track of timing. Aeropoint Express brings those practical steps together so customers can make informed choices and plan with greater clarity.</p><p className="mt-4 leading-relaxed text-slate-600">We work with third-party travel suppliers where applicable. Airlines, accommodation providers, schools, and government authorities retain control over their own services, admissions, and decisions.</p><Link to="/contact" className="mt-7 inline-flex items-center gap-2 font-bold text-blue-900 hover:text-amber-700">Speak with our team <ArrowRight className="h-4 w-4" /></Link></div>
      <div className="space-y-6 border-l-0 border-slate-200 lg:border-l lg:pl-10">
        <div className="flex gap-4"><Globe2 className="h-6 w-6 shrink-0 text-amber-600" /><div><h3 className="font-bold text-slate-900">A global outlook</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">Support for international journeys and destinations across the world.</p></div></div>
        <div className="flex gap-4"><HeartHandshake className="h-6 w-6 shrink-0 text-amber-600" /><div><h3 className="font-bold text-slate-900">People-first service</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">Helpful guidance before, during, and after the planning process.</p></div></div>
        <div className="flex gap-4"><ShieldCheck className="h-6 w-6 shrink-0 text-amber-600" /><div><h3 className="font-bold text-slate-900">Clear expectations</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">We aim to explain supplier conditions and distinguish our support from decisions made by third parties.</p></div></div>
      </div>
    </section>
    <section className="border-y border-slate-200 bg-slate-50 px-4 py-12 sm:px-6 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center"><div><h2 className="text-2xl font-extrabold text-blue-950">Based in Ibadan, Nigeria</h2><p className="mt-2 text-slate-600">{contactInfo.address}</p><p className="mt-2 text-slate-600"><a href={contactInfo.emailHref} className="hover:text-blue-900">{contactInfo.email}</a> · <a href={contactInfo.phoneHref} className="hover:text-blue-900">{contactInfo.phone}</a></p></div><Link to="/faq" className="inline-flex items-center gap-2 font-bold text-blue-900 hover:text-amber-700">Visit the Help Center <ArrowRight className="h-4 w-4" /></Link></div></section>
  </div>
);

export default About;