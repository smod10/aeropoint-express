import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, CircleHelp, LogOut, Plane, UserRound, WalletCards } from 'lucide-react';

type DashboardView = 'overview' | 'bookings' | 'refunds' | 'profile';

const CustomerDashboard: React.FC = () => {
  const [view, setView] = useState<DashboardView>('overview');
  const navigate = useNavigate();
  const email = sessionStorage.getItem('aeropointCustomerEmail') || 'amara.okafor@example.com';
  const name = sessionStorage.getItem('aeropointCustomerName') || 'Amara Okafor';

  const signOut = () => {
    sessionStorage.removeItem('aeropointCustomerEmail');
    sessionStorage.removeItem('aeropointCustomerName');
    navigate('/auth');
  };

  const navigation: { id: DashboardView; label: string; icon: typeof Plane }[] = [
    { id: 'overview', label: 'Overview', icon: Plane },
    { id: 'bookings', label: 'Manage bookings', icon: CalendarDays },
    { id: 'refunds', label: 'Track a refund', icon: WalletCards },
    { id: 'profile', label: 'Personal details', icon: UserRound },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-16 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-amber-700">Aeropoint customer account</p>
            <h1 className="mt-2 text-3xl font-extrabold text-blue-950">Welcome, {name}</h1>
            <p className="mt-2 text-slate-600">Manage your trips, account details, and refund requests.</p>
          </div>
          <button type="button" onClick={signOut} className="inline-flex items-center gap-2 self-start text-sm font-semibold text-slate-600 hover:text-blue-900 sm:self-auto">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
          <nav aria-label="Account sections" className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-3 lg:block lg:space-y-1 lg:overflow-visible lg:border-0 lg:pb-0">
            {navigation.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                aria-current={view === id ? 'page' : undefined}
                onClick={() => setView(id)}
                className={`flex shrink-0 items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold transition lg:w-full ${view === id ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-white hover:text-blue-900'}`}
              >
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
            <Link to="/contact" className="flex shrink-0 items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-white hover:text-blue-900 lg:w-full">
              <CircleHelp className="h-4 w-4" /> Contact support
            </Link>
          </nav>

          <main className="min-w-0">
            {view === 'overview' && (
              <div>
                <h2 className="text-xl font-extrabold text-blue-950">Account overview</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {[['Upcoming trips', '1'], ['Bookings to manage', '2'], ['Refunds in progress', '1']].map(([label, value]) => (
                    <div key={label} className="border border-slate-200 bg-white p-5">
                      <p className="text-sm text-slate-500">{label}</p>
                      <p className="mt-2 text-3xl font-extrabold text-blue-950">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 border-y border-slate-200 py-6">
                  <h3 className="font-bold text-slate-900">Your trips</h3>
                  <div className="mt-4 border border-slate-200 bg-white p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Confirmed</p>
                      <h3 className="mt-2 text-lg font-bold text-blue-950">Lagos to London</h3>
                      <p className="mt-1 text-sm text-slate-600">Virgin Atlantic · Return · Economy</p>
                      <p className="mt-2 text-sm font-semibold text-slate-800">24 Nov 2026 – 02 Dec 2026 <span className="font-normal text-slate-500">· APX-482916</span></p>
                    </div>
                    <button type="button" onClick={() => setView('bookings')} className="mt-4 inline-flex shrink-0 items-center gap-2 text-sm font-bold text-blue-900 underline underline-offset-2 sm:mt-0">View booking <ArrowRight className="h-4 w-4" /></button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <button type="button" onClick={() => setView('bookings')} className="text-sm font-bold text-blue-900 underline underline-offset-2">Manage bookings</button>
                    <button type="button" onClick={() => setView('refunds')} className="text-sm font-bold text-blue-900 underline underline-offset-2">Track a refund</button>
                    <Link to="/flights" className="text-sm font-bold text-blue-900 underline underline-offset-2">Find a flight</Link>
                  </div>
                </div>
              </div>
            )}

            {view === 'bookings' && (
              <section>
                <h2 className="text-xl font-extrabold text-blue-950">Manage bookings</h2>
                <div className="mt-5 border-y border-slate-200 py-8">
                  <div className="divide-y divide-slate-200 border-y border-slate-200">
                    <article className="py-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Confirmed · Upcoming</p>
                        <h3 className="mt-2 font-bold text-blue-950">Lagos (LOS) to London (LHR)</h3>
                        <p className="mt-1 text-sm text-slate-600">Virgin Atlantic · Return · Economy · 24 Nov – 02 Dec 2026</p>
                        <p className="mt-2 text-xs font-semibold text-slate-500">Booking reference: APX-482916</p>
                      </div>
                      <Link to="/contact" className="mt-4 inline-flex shrink-0 items-center gap-2 text-sm font-bold text-blue-900 underline underline-offset-2 sm:mt-0">Change or cancel <ArrowRight className="h-4 w-4" /></Link>
                    </article>
                    <article className="py-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Completed</p>
                        <h3 className="mt-2 font-bold text-blue-950">Abuja (ABV) to Dubai (DXB)</h3>
                        <p className="mt-1 text-sm text-slate-600">Emirates · Return · Economy · 10 Sep – 17 Sep 2026</p>
                        <p className="mt-2 text-xs font-semibold text-slate-500">Booking reference: APX-319704</p>
                      </div>
                      <button type="button" onClick={() => setView('refunds')} className="mt-4 inline-flex shrink-0 items-center gap-2 text-sm font-bold text-blue-900 underline underline-offset-2 sm:mt-0">Check refund <ArrowRight className="h-4 w-4" /></button>
                    </article>
                  </div>
                </div>
              </section>
            )}

            {view === 'refunds' && (
              <section>
                <h2 className="text-xl font-extrabold text-blue-950">Refund status</h2>
                <div className="mt-5 border-y border-slate-200 py-8">
                  <div className="flex flex-col justify-between gap-4 border-y border-slate-200 py-5 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Processing</p>
                      <h3 className="mt-2 font-bold text-blue-950">Refund for APX-319704</h3>
                      <p className="mt-1 text-sm text-slate-600">Abuja to Dubai · Submitted 18 Sep 2026</p>
                    </div>
                    <span className="text-lg font-extrabold text-blue-950">₦245,000</span>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">The supplier is reviewing this request. Refund eligibility and timing depend on the fare conditions and supplier confirmation.</p>
                  <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-900 underline underline-offset-2">Contact support <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </section>
            )}

            {view === 'profile' && (
              <section>
                <h2 className="text-xl font-extrabold text-blue-950">Personal details</h2>
                <div className="mt-5 border-y border-slate-200 py-6">
                  <p className="text-sm text-slate-500">Email address</p>
                  <p className="mt-1 font-semibold text-slate-900">{email}</p>
                  <div className="mt-5 grid gap-5 border-t border-slate-200 pt-5 sm:grid-cols-2">
                    <div><p className="text-sm text-slate-500">Full name</p><p className="mt-1 font-semibold text-slate-900">{name}</p></div>
                    <div><p className="text-sm text-slate-500">Phone number</p><p className="mt-1 font-semibold text-slate-900">+234 803 555 0142</p></div>
                    <div><p className="text-sm text-slate-500">Home city</p><p className="mt-1 font-semibold text-slate-900">Ibadan, Nigeria</p></div>
                    <div><p className="text-sm text-slate-500">Member since</p><p className="mt-1 font-semibold text-slate-900">January 2024</p></div>
                  </div>
                  <button type="button" className="mt-6 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-blue-900 hover:text-blue-900">Edit profile</button>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;