import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, FileText, GraduationCap, MapPin, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const destinations = [
  { country: 'United Kingdom', detail: 'Undergraduate and postgraduate routes, including foundation pathways.' },
  { country: 'United States', detail: 'University research, application planning, and student-visa preparation.' },
  { country: 'Canada', detail: 'College and university options with study permit planning.' },
  { country: 'Australia', detail: 'Course and institution research with student visa preparation.' },
  { country: 'Germany', detail: 'English- and German-taught programs, including public university options.' },
  { country: 'Sweden', detail: 'International degree programs and application-cycle guidance.' },
  { country: 'France', detail: 'Study options across French- and English-taught programs.' },
  { country: 'Ireland', detail: 'Degree and postgraduate programs with student immigration guidance.' },
  { country: 'Other destinations', detail: 'Ask us about the Netherlands, New Zealand, and other study hubs.' },
];

const steps = [
  ['1', 'Tell us your goals', 'Share your preferred subject, budget, qualifications, timeline, and destination preferences.'],
  ['2', 'Shortlist programs', 'Compare suitable institutions and entry requirements. You make the final choice of course and institution.'],
  ['3', 'Prepare applications', 'Organize academic records, references, statements, translations, and application deadlines.'],
  ['4', 'Plan funding and visa steps', 'Review tuition and living-cost evidence, then follow the current instructions from the relevant government authority.'],
  ['5', 'Get ready to travel', 'After admission and any required visa are confirmed, plan flights, accommodation, insurance, and arrival logistics.'],
];

const Study: React.FC = () => (
  <div className="bg-slate-50 pb-20">
    <section className="bg-blue-950 px-4 pb-16 pt-32 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-300"><GraduationCap className="h-4 w-4" /> Study abroad support</p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Make your next chapter a global one.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-100">Explore study destinations, plan your applications, and prepare for the practical steps from offer to departure.</p>
        <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-600">Request a study consultation <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="mb-2 text-sm font-bold uppercase tracking-wider text-amber-700">Choose a destination</p>
        <h2 className="text-3xl font-extrabold text-blue-950">Study in leading destinations</h2>
        <p className="mt-3 leading-relaxed text-slate-600">Admissions, costs, language requirements, and visa rules differ by country and institution. We help you research and organize the process; the institution and immigration authority make all admission and visa decisions.</p>
      </div>
      <div className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map(({ country, detail }) => <article key={country} className="bg-white p-6"><MapPin className="mb-4 h-5 w-5 text-amber-600" /><h3 className="mb-2 text-lg font-bold text-slate-900">{country}</h3><p className="text-sm leading-relaxed text-slate-600">{detail}</p></article>)}
      </div>
    </section>
    <section className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-amber-700">Your application roadmap</p>
          <h2 className="text-3xl font-extrabold text-blue-950">A clear path from research to take-off</h2>
          <p className="mt-4 leading-relaxed text-slate-600">We can help you coordinate each stage and understand what to prepare. Requirements change, so always confirm details with your chosen institution and official government sources.</p>
          <div className="mt-8 flex items-start gap-3 border-l-2 border-amber-400 pl-4 text-sm leading-relaxed text-slate-600"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-900" /><p>We are an education and travel support service, not a university, immigration authority, or law firm. We do not guarantee admission, scholarships, or visa outcomes.</p></div>
        </div>
        <ol className="space-y-6">
          {steps.map(([number, title, detail]) => <li key={number} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-900">{number}</span><div><h3 className="font-bold text-slate-900">{title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">{detail}</p></div></li>)}
        </ol>
      </div>
    </section>
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div className="flex gap-4"><BookOpen className="h-6 w-6 shrink-0 text-blue-900" /><div><h3 className="font-bold text-slate-900">Program research</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">Compare course fit, entry criteria, intakes, and published costs.</p></div></div>
      <div className="flex gap-4"><FileText className="h-6 w-6 shrink-0 text-blue-900" /><div><h3 className="font-bold text-slate-900">Application organization</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">Keep documents, deadlines, and application milestones organized.</p></div></div>
      <div className="flex gap-4"><CheckCircle2 className="h-6 w-6 shrink-0 text-blue-900" /><div><h3 className="font-bold text-slate-900">Travel readiness</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">Coordinate travel planning after your institution and visa requirements are confirmed.</p></div></div>
    </section>
    <section className="mx-4 rounded-xl bg-blue-950 px-6 py-10 text-center text-white sm:mx-6 lg:mx-auto lg:max-w-7xl"><h2 className="text-2xl font-extrabold">Start with a conversation</h2><p className="mx-auto mt-3 max-w-2xl text-blue-100">Tell us where you hope to study and what you want to learn. We will help you identify practical next steps.</p><Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-600">Contact our team <ArrowRight className="h-4 w-4" /></Link></section>
  </div>
);

export default Study;