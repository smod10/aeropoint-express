import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import { customerBookings, formatBookingAmount } from '../data/customerBookings';

const BookingDetails: React.FC = () => {
  const { reference = '' } = useParams();
  const email = (sessionStorage.getItem('aeropointCustomerEmail') || '').trim().toLowerCase();

  if (!email) return <Navigate to="/auth" replace />;

  const booking = customerBookings.find((item) => item.reference === reference && item.ownerEmail.toLowerCase() === email);

  if (!booking) {
    return (
      <div className="min-h-[55vh] bg-slate-50 px-4 pb-16 pt-32 text-center">
        <h1 className="text-2xl font-extrabold text-blue-950">Booking not found</h1>
        <p className="mt-2 text-sm text-slate-600">This booking is unavailable for the signed-in account.</p>
        <Link to="/dashboard" className="mt-5 inline-flex items-center gap-2 font-bold text-blue-900 underline underline-offset-2"><ArrowLeft className="h-4 w-4" /> Back to My Bookings</Link>
      </div>
    );
  }

  const balance = Math.max(booking.amount - booking.amountPaid, 0);
  const bookingType = booking.category === 'Tours & Packages' ? 'Package' : booking.category;

  return (
    <div className="min-h-screen bg-slate-50 pb-16 pt-28">
      <div id="booking-detail-print" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="print:hidden inline-flex items-center gap-2 text-sm font-semibold text-blue-900 hover:underline"><ArrowLeft className="h-4 w-4" /> Back to My Bookings</Link>
        <header className="mt-5 flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-amber-700">Booking details</p>
            <h1 className="mt-2 text-3xl font-extrabold text-blue-950">{booking.reference}</h1>
            <p className="mt-2 text-slate-600">{booking.title}</p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-800">{booking.status}</span>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <section className="border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold text-blue-950">Booking type</h2>
            <p className="mt-3 text-sm font-semibold text-slate-900">{bookingType}</p>
            <p className="mt-1 text-sm text-slate-600">{booking.summary}</p>
          </section>
          <section className="border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold text-blue-950">Customer / traveller details</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex flex-wrap justify-between gap-x-4"><dt className="text-slate-500">Customer</dt><dd className="font-semibold text-slate-900">{booking.customerName}</dd></div>
              <div className="flex flex-wrap justify-between gap-x-4"><dt className="text-slate-500">Travellers</dt><dd className="text-right font-semibold text-slate-900">{booking.travellers}</dd></div>
            </dl>
          </section>
        </div>

        <section className="mt-4 border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-blue-950">{booking.category === 'Visa' ? 'Application details' : 'Travel / booking details'}</h2>
          <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {booking.details.map((item) => <div key={item.label} className="border-b border-slate-100 pb-3"><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</dt><dd className="mt-1 text-sm font-semibold text-slate-900">{item.value}</dd></div>)}
          </dl>
        </section>

        <section className="mt-4 border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-blue-950">Payment summary</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total amount', value: formatBookingAmount(booking.amount) },
              { label: 'Amount paid', value: formatBookingAmount(booking.amountPaid) },
              { label: 'Balance', value: formatBookingAmount(balance) },
              { label: 'Payment status', value: booking.paymentStatus },
            ].map((item) => <div key={item.label}><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</dt><dd className="mt-1 font-bold text-slate-900">{item.value}</dd></div>)}
          </dl>
        </section>

        <section id="documents" className="mt-4 scroll-mt-28 border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-blue-950">Documents</h2>
          <ul className="mt-3 divide-y divide-slate-100">
            {booking.documents.map((document) => <li key={document} className="flex items-center justify-between gap-3 py-3">
              <span className="text-sm font-medium text-slate-800">{document}</span>
              {document === 'Invoice'
                ? <button type="button" onClick={() => window.print()} className="print:hidden inline-flex shrink-0 items-center gap-2 text-sm font-bold text-blue-900 hover:underline" aria-label="Print invoice"><Printer className="h-4 w-4" /> Print</button>
                : <span className="text-xs text-slate-500">Supplier-issued</span>}
            </li>)}
          </ul>
          <p className="mt-2 text-xs text-slate-500">The invoice prints this booking summary. Issued travel documents are provided by the relevant supplier.</p>
        </section>

        {booking.notes && <section className="mt-4 border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-blue-950">Special requests / notes</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{booking.notes}</p>
        </section>}
      </div>
    </div>
  );
};

export default BookingDetails;