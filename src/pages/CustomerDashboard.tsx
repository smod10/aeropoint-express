import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, ChevronDown, CircleHelp, LogOut, Plane, UserRound, WalletCards } from 'lucide-react';
import { customerBookings, formatBookingAmount, type BookingCategory, type CustomerBooking } from '../data/customerBookings';

type DashboardView = 'overview' | 'bookings' | 'refunds' | 'profile';
type BookingFilter = 'all' | 'upcoming' | 'manage' | 'refunds';

const categories: { label: string; value: BookingCategory | 'all' }[] = [
  { label: 'All Bookings', value: 'all' },
  { label: 'Flights', value: 'Flight' },
  { label: 'Stays', value: 'Stay' },
  { label: 'Tours', value: 'Tours' },
  { label: 'Umrah', value: 'Umrah' },
  { label: 'Visa', value: 'Visa' },
];

const newBookingLinks = [
  { label: 'Flights', to: '/flights' },
  { label: 'Stays', to: '/hotels' },
  { label: 'Tours', to: '/packages' },
  { label: 'Umrah', to: '/umrah' },
  { label: 'Visa', to: '/visas' },
];

const CustomerDashboard: React.FC = () => {
  const initialView = useLocation().state?.view;
  const [view, setView] = useState<DashboardView>(() => (initialView === 'bookings' ? 'bookings' : 'overview'));
  const [bookingFilter, setBookingFilter] = useState<BookingFilter>('all');
  const [activeCategory, setActiveCategory] = useState<BookingCategory | 'all'>('all');
  const [visibleCount, setVisibleCount] = useState(5);
  const [openManageReference, setOpenManageReference] = useState('');
  const [bookingMenuOpen, setBookingMenuOpen] = useState(false);
  const navigate = useNavigate();
  const email = (sessionStorage.getItem('aeropointCustomerEmail') || '').trim().toLowerCase();
  const today = new Date().toISOString().slice(0, 10);
  const bookings = customerBookings.filter((booking) => booking.ownerEmail.toLowerCase() === email);
  const name = sessionStorage.getItem('aeropointCustomerName') || bookings[0]?.customerName || 'Traveller';
  const phone = sessionStorage.getItem('aeropointCustomerPhone') || '+234 803 555 0142';
  const city = sessionStorage.getItem('aeropointCustomerCity') || 'Ibadan';
  const country = sessionStorage.getItem('aeropointCustomerCountry') || 'Nigeria';
  const upcomingBookings = bookings.filter((booking) => booking.status === 'Confirmed' && booking.startDate >= today);
  const bookingsToManage = bookings.filter((booking) => booking.status === 'Action required');
  const refundsInProgress = bookings.filter((booking) => booking.status === 'Refund in progress');

  if (!email) return <Navigate to="/auth" replace />;

  const signOut = () => {
    sessionStorage.removeItem('aeropointCustomerEmail');
    sessionStorage.removeItem('aeropointCustomerName');
    sessionStorage.removeItem('aeropointCustomerPhone');
    sessionStorage.removeItem('aeropointCustomerCity');
    sessionStorage.removeItem('aeropointCustomerCountry');
    navigate('/auth');
  };

  const navigation: { id: DashboardView; label: string; icon: typeof Plane }[] = [
    { id: 'overview', label: 'Overview', icon: Plane },
    { id: 'bookings', label: 'Manage bookings', icon: CalendarDays },
    { id: 'refunds', label: 'Track a refund', icon: WalletCards },
    { id: 'profile', label: 'Personal details', icon: UserRound },
  ];

  const filteredBookings = bookings
    .filter((booking) => activeCategory === 'all' || booking.category === activeCategory)
    .filter((booking) => {
      if (bookingFilter === 'upcoming') return booking.status === 'Confirmed' && booking.startDate >= today;
      if (bookingFilter === 'manage') return booking.status === 'Action required';
      if (bookingFilter === 'refunds') return booking.status === 'Refund in progress';
      return true;
    });

  const openBookings = (filter: BookingFilter) => {
    setBookingFilter(filter);
    setActiveCategory('all');
    setVisibleCount(5);
    setView('bookings');
  };

  const canChange = (booking: CustomerBooking) => booking.status === 'Confirmed' && booking.startDate >= today && booking.category !== 'Visa';
  const canCancel = (booking: CustomerBooking) => booking.startDate >= today && ['Confirmed', 'Action required'].includes(booking.status);
  const canViewInvoice = (booking: CustomerBooking) => booking.amountPaid > 0;
  const canPayBalance = (booking: CustomerBooking) => booking.amount > booking.amountPaid && booking.amountPaid > 0 && ['Confirmed', 'Action required'].includes(booking.status);
  const balanceOf = (booking: CustomerBooking) => booking.amount - booking.amountPaid;
  const bookingsWithBalance = bookings.filter(canPayBalance);
  const balanceBadge = (booking: CustomerBooking) => canPayBalance(booking) && <span className="mt-2 inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">Balance due {formatBookingAmount(balanceOf(booking))}</span>;

  const manageBooking = (action: 'Change' | 'Cancel' | 'Invoice' | 'Pay balance', booking: CustomerBooking) => {
    setOpenManageReference('');
    if (action === 'Pay balance') {
      navigate(`/dashboard/bookings/${booking.reference}/pay`);
      return;
    }
    if (action === 'Invoice') {
      navigate(`/dashboard/bookings/${booking.reference}#documents`);
      return;
    }
    navigate('/contact', {
      state: {
        bookingReference: booking.reference,
        requestType: action.toLowerCase(),
        customerName: booking.customerName,
        customerEmail: email,
      },
    });
  };

  const renderManageMenu = (booking: CustomerBooking) => {
    const actions = [
      ...(canPayBalance(booking) ? ['Pay balance' as const] : []),
      ...(canChange(booking) ? ['Change' as const] : []),
      ...(canCancel(booking) ? ['Cancel' as const] : []),
      ...(canViewInvoice(booking) ? ['Invoice' as const] : []),
    ];
    return (
      <div className="relative inline-block text-left">
        <button type="button" aria-expanded={openManageReference === booking.reference} onClick={() => setOpenManageReference(openManageReference === booking.reference ? '' : booking.reference)} className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-blue-950 hover:border-blue-900">
          Manage <ChevronDown className="h-4 w-4" />
        </button>
        {openManageReference === booking.reference && <div className="absolute left-0 lg:left-auto lg:right-0 z-20 mt-2 w-40 rounded-md border border-slate-200 bg-white py-1 shadow-lg">
          {actions.map((action) => <button key={action} type="button" onClick={() => manageBooking(action, booking)} className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-900">{action}</button>)}
        </div>}
      </div>
    );
  };

  const statusClass = (status: CustomerBooking['status']) => {
    if (status === 'Confirmed') return 'bg-emerald-50 text-emerald-800';
    if (status === 'Action required') return 'bg-amber-50 text-amber-800';
    if (status === 'Refund in progress') return 'bg-sky-50 text-sky-800';
    return 'bg-slate-100 text-slate-700';
  };

  const emptyBookingMessage = activeCategory === 'all'
    ? 'No bookings match this filter.'
    : `You have no ${categories.find((category) => category.value === activeCategory)?.label.toLowerCase()} bookings yet.`;

  return (
    <div className="min-h-screen bg-slate-50 pb-10 pt-20 sm:pb-16 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:gap-5 sm:pb-7">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-amber-700">Aeropoint customer account</p>
            <h1 className="mt-2 text-3xl font-extrabold text-blue-950">Welcome, {name}</h1>
            <p className="mt-2 text-slate-600">Manage your trips, account details, and refund requests.</p>
          </div>
        </header>

        <div className="mt-4 grid gap-4 lg:mt-8 lg:grid-cols-[240px_1fr] lg:gap-8">
          <nav aria-label="Account sections" className="min-w-0">
            <label className="block lg:hidden">
              <span className="sr-only">Account section</span>
              <select value={view} onChange={(event) => event.target.value === 'support' ? navigate('/contact') : setView(event.target.value as DashboardView)} className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-blue-950 focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15">
                {navigation.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
                <option value="support">Contact Support</option>
              </select>
            </label>
            <div className="hidden space-y-1 lg:block">
              {navigation.map(({ id, label, icon: Icon }) => <button key={id} type="button" aria-current={view === id ? 'page' : undefined} onClick={() => setView(id)} className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold transition ${view === id ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-white hover:text-blue-900'}`}><Icon className="h-4 w-4" /> {label}</button>)}
              <Link to="/contact" className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-white hover:text-blue-900"><CircleHelp className="h-4 w-4" /> Contact support</Link>
            </div>
          </nav>

          <main className="min-w-0">
            {(view === 'overview' || view === 'bookings') && bookingsWithBalance.length > 0 && <div role="alert" className="mb-5 border-l-4 border-amber-500 bg-amber-50 p-4">
              <p className="font-extrabold text-amber-900">Balance to pay on {bookingsWithBalance.length} booking{bookingsWithBalance.length === 1 ? '' : 's'}</p>
              <ul className="mt-3 space-y-3">{bookingsWithBalance.map((booking) => <li key={booking.reference} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-amber-950"><strong>{booking.title}</strong> ({booking.reference}) · {formatBookingAmount(balanceOf(booking))} remaining{booking.balanceDueDate ? ` · due ${new Date(booking.balanceDueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}` : ''}</span>
                <Link to={`/dashboard/bookings/${booking.reference}/pay`} className="inline-flex shrink-0 items-center justify-center rounded-md bg-amber-500 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-amber-600">Pay balance</Link>
              </li>)}</ul>
            </div>}
            {view === 'overview' && <section>
              <h2 className="text-xl font-extrabold text-blue-950">Account overview</h2>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
                {[
                  { label: 'Upcoming Trips', count: upcomingBookings.length, filter: 'upcoming' as const },
                  { label: 'Bookings to Manage', count: bookingsToManage.length, filter: 'manage' as const },
                  { label: 'Refunds in Progress', count: refundsInProgress.length, filter: 'refunds' as const },
                ].map((card) => <button key={card.filter} type="button" onClick={() => openBookings(card.filter)} className="min-w-0 border border-slate-200 bg-white p-2 text-left transition hover:border-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 sm:p-5">
                  <span className="block text-[11px] font-semibold leading-tight text-slate-600 sm:text-sm">{card.label}</span><span className="mt-1 block text-xl font-extrabold text-blue-950 sm:mt-2 sm:text-3xl">{card.count}</span><span className="mt-2 inline-flex items-center gap-0.5 text-[10px] font-bold leading-tight text-blue-900 sm:mt-3 sm:gap-1 sm:text-sm">View bookings <ArrowRight className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" /></span>
                </button>)}
              </div>
              <div className="mt-5 border-y border-slate-200 py-4 sm:mt-8 sm:py-6">
                <h3 className="font-bold text-slate-900">Your next trip</h3>
                {upcomingBookings.length ? <div className="mt-3 flex flex-col gap-3 border border-slate-200 bg-white p-4 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5">
                  <div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Confirmed</p><h3 className="mt-2 text-lg font-bold text-blue-950">{upcomingBookings[0].title}</h3><p className="mt-1 text-sm text-slate-600">{upcomingBookings[0].summary}</p><p className="mt-2 text-sm font-semibold text-slate-800">{upcomingBookings[0].dateLabel} · {upcomingBookings[0].reference}</p></div>
                  <Link to={`/dashboard/bookings/${upcomingBookings[0].reference}`} className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-blue-900 underline underline-offset-2">Booking details <ArrowRight className="h-4 w-4" /></Link>
                </div> : <p className="mt-4 text-sm text-slate-600">No upcoming trips yet.</p>}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 sm:mt-4"><button type="button" onClick={() => openBookings('all')} className="text-sm font-bold text-blue-900 underline underline-offset-2">Manage bookings</button><button type="button" onClick={() => setView('refunds')} className="text-sm font-bold text-blue-900 underline underline-offset-2">Track a refund</button></div>
              </div>
            </section>}

            {view === 'bookings' && <section>
              <div className="flex flex-col gap-2 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pb-5">
                <div><h2 className="text-xl font-extrabold text-blue-950">My bookings</h2><p className="mt-1 text-sm text-slate-600">{filteredBookings.length} booking{filteredBookings.length === 1 ? '' : 's'}</p></div>
                <div className="relative self-start">
                  <button type="button" aria-expanded={bookingMenuOpen} onClick={() => setBookingMenuOpen(!bookingMenuOpen)} className="inline-flex items-center gap-2 rounded-md bg-blue-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-950">Make a New Booking <ChevronDown className="h-4 w-4" /></button>
                  {bookingMenuOpen && <div className="absolute left-0 sm:left-auto sm:right-0 z-20 mt-2 w-52 rounded-md border border-slate-200 bg-white py-1 shadow-lg">{newBookingLinks.map((item) => <Link key={item.to} to={item.to} onClick={() => setBookingMenuOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-900">{item.label}</Link>)}</div>}
                </div>
              </div>

              <label className="mt-3 block lg:hidden">
                <span className="sr-only">Booking category</span>
                <select value={activeCategory} onChange={(event) => { setActiveCategory(event.target.value as BookingCategory | 'all'); setVisibleCount(5); }} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-blue-950 focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15">
                  {categories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}
                </select>
              </label>
              <div className="mt-5 hidden gap-1 overflow-x-auto border-b border-slate-200 lg:flex" role="tablist" aria-label="Booking categories">
                {categories.map((category) => <button key={category.value} type="button" role="tab" aria-selected={activeCategory === category.value} onClick={() => { setActiveCategory(category.value); setVisibleCount(5); }} className={`shrink-0 border-b-2 px-3 py-3 text-sm font-semibold ${activeCategory === category.value ? 'border-amber-500 text-blue-950' : 'border-transparent text-slate-500 hover:text-blue-900'}`}>{category.label}</button>)}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs sm:mt-3 sm:gap-2 sm:text-sm"><span className="text-slate-500">Status:</span>
                {[
                  { label: 'All', value: 'all' as const }, { label: 'Upcoming Trips', value: 'upcoming' as const }, { label: 'To Manage', value: 'manage' as const }, { label: 'Refunds', value: 'refunds' as const },
                ].map((filter) => <button key={filter.value} type="button" onClick={() => { setBookingFilter(filter.value); setVisibleCount(5); }} className={`rounded-full px-2.5 py-1 font-semibold sm:px-3 sm:py-1.5 ${bookingFilter === filter.value ? 'bg-blue-900 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-blue-900'}`}>{filter.label}</button>)}
              </div>

              {filteredBookings.length ? <>
                <div className="mt-5 hidden overflow-x-auto border-y border-slate-200 lg:block lg:overflow-visible">
                  <table className="w-full min-w-[850px] border-collapse text-left text-sm">
                    <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600"><tr>{['Booking Reference', 'Type', 'Booking Details', 'Date', 'Status', 'Amount', 'Manage'].map((heading) => <th key={heading} className="px-3 py-3 font-bold">{heading}</th>)}</tr></thead>
                    <tbody className="divide-y divide-slate-200 bg-white">{filteredBookings.slice(0, visibleCount).map((booking) => <tr key={booking.reference} className={`align-top ${canPayBalance(booking) ? 'bg-amber-50/60' : ''}`}>
                      <td className="px-3 py-4"><Link to={`/dashboard/bookings/${booking.reference}`} className="font-bold text-blue-900 underline underline-offset-2">{booking.reference}</Link></td><td className="px-3 py-4 text-slate-700">{booking.category}</td>
                      <td className="max-w-[260px] px-3 py-4"><span className="block font-semibold text-slate-900">{booking.title}</span><span className="mt-1 block text-xs text-slate-500">{booking.summary}</span>{balanceBadge(booking)}</td><td className="whitespace-nowrap px-3 py-4 text-slate-700">{booking.dateLabel}</td>
                      <td className="px-3 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusClass(booking.status)}`}>{booking.status}</span></td><td className="whitespace-nowrap px-3 py-4 font-semibold text-slate-900">{formatBookingAmount(booking.amount)}</td><td className="px-3 py-4">{renderManageMenu(booking)}</td>
                    </tr>)}</tbody>
                  </table>
                </div>
                <div className="mt-3 space-y-2 lg:hidden sm:mt-4 sm:space-y-3">{filteredBookings.slice(0, visibleCount).map((booking) => <article key={booking.reference} className={`border-y border-slate-200 p-3 sm:p-4 ${canPayBalance(booking) ? 'border-l-4 border-l-amber-500 bg-amber-50/60' : 'bg-white'}`}>
                  <div className="flex items-start justify-between gap-3"><div><Link to={`/dashboard/bookings/${booking.reference}`} className="font-bold text-blue-900 underline underline-offset-2">{booking.reference}</Link><p className="mt-1 text-xs text-slate-500">{booking.category}</p></div><span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${statusClass(booking.status)}`}>{booking.status}</span></div>
                  <h3 className="mt-2 font-bold text-slate-900">{booking.title}</h3><p className="mt-1 text-sm text-slate-600">{booking.summary}</p>{balanceBadge(booking)}                  <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm"><div><dt className="text-xs text-slate-500">Date</dt><dd className="mt-1 font-medium text-slate-800">{booking.dateLabel}</dd></div><div><dt className="text-xs text-slate-500">Amount</dt><dd className="mt-1 font-semibold text-slate-900">{formatBookingAmount(booking.amount)}</dd></div></dl>
                  <div className="mt-3 border-t border-slate-100 pt-2.5">{renderManageMenu(booking)}</div>
                </article>)}</div>
                {filteredBookings.length > visibleCount && <button type="button" onClick={() => setVisibleCount((count) => count + 5)} className="mt-3 w-full border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-blue-900 hover:border-blue-900 sm:mt-5 sm:w-auto">Load More</button>}
              </> : <div className="mt-5 border-y border-slate-200 py-8 text-center sm:mt-8 sm:py-12">
                <CalendarDays className="mx-auto h-8 w-8 text-slate-400" /><h3 className="mt-3 font-bold text-blue-950">No bookings found</h3><p className="mt-1 text-sm text-slate-600">{emptyBookingMessage}</p>
                <Link to={newBookingLinks.find((item) => item.label === categories.find((category) => category.value === activeCategory)?.label)?.to || '/flights'} className="mt-5 inline-flex items-center rounded-md bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-600">Book Now</Link>
              </div>}
            </section>}

            {view === 'refunds' && <section>
              <h2 className="text-xl font-extrabold text-blue-950">Refund status</h2>
              {refundsInProgress.length ? refundsInProgress.map((booking) => <div key={booking.reference} className="mt-3 border-y border-slate-200 py-4 sm:mt-5 sm:py-6">
                <p className="text-xs font-bold uppercase tracking-wider text-sky-700">Processing</p><h3 className="mt-1.5 font-bold text-blue-950 sm:mt-2">Refund for <Link className="underline" to={`/dashboard/bookings/${booking.reference}`}>{booking.reference}</Link></h3>
                <p className="mt-1 text-sm text-slate-600">{booking.title} · {booking.dateLabel}</p><p className="mt-3 font-extrabold text-blue-950">{booking.paymentStatus}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:mt-4">The supplier is reviewing this request. Refund eligibility and timing depend on the fare conditions and supplier confirmation.</p><Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-blue-900 underline underline-offset-2 sm:mt-4">Contact support <ArrowRight className="h-4 w-4" /></Link>
              </div>) : <p className="mt-3 border-y border-slate-200 py-6 text-sm text-slate-600 sm:mt-5 sm:py-10">You have no refunds in progress.</p>}
            </section>}

            {view === 'profile' && <section>
              <h2 className="text-xl font-extrabold text-blue-950">Personal details</h2><div className="mt-3 border-y border-slate-200 py-4 sm:mt-5 sm:py-6">
                <p className="text-sm text-slate-500">Email address</p><p className="mt-1 font-semibold text-slate-900">{email}</p>
                <div className="mt-4 grid gap-4 border-t border-slate-200 pt-4 sm:mt-5 sm:grid-cols-2 sm:gap-5 sm:pt-5"><div><p className="text-sm text-slate-500">Full name</p><p className="mt-1 font-semibold text-slate-900">{name}</p></div><div><p className="text-sm text-slate-500">Phone number</p><p className="mt-1 font-semibold text-slate-900">{phone}</p></div><div><p className="text-sm text-slate-500">Home city</p><p className="mt-1 font-semibold text-slate-900">{city}, {country}</p></div><div><p className="text-sm text-slate-500">Member since</p><p className="mt-1 font-semibold text-slate-900">January 2024</p></div></div>
                <Link to="/dashboard/profile" className="mt-4 inline-flex rounded-md border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-blue-900 hover:text-blue-900 sm:mt-6">Edit profile</Link>
              </div>
            </section>}
          </main>
        </div>
        <div className="mt-3 flex justify-start pt-0 sm:mt-6 lg:pl-[272px]">
          <button type="button" onClick={signOut} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-900"><LogOut className="h-4 w-4" /> Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;