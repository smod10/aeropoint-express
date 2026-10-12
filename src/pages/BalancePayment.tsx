import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PaystackPayment from '../components/PaystackPayment';
import { customerBookings, formatBookingAmount } from '../data/customerBookings';

const BalancePayment: React.FC = () => {
  const { reference = '' } = useParams();
  const email = (sessionStorage.getItem('aeropointCustomerEmail') || '').trim().toLowerCase();

  if (!email) return <Navigate to="/auth" replace />;

  const booking = customerBookings.find((item) => item.reference === reference && item.ownerEmail.toLowerCase() === email);
  const balance = booking ? booking.amount - booking.amountPaid : 0;

  if (!booking || balance <= 0) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-slate-50 pb-16 pt-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link to={`/dashboard/bookings/${booking.reference}`} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 hover:underline"><ArrowLeft className="h-4 w-4" /> Back to booking</Link>
        <h1 className="mt-5 text-2xl font-extrabold text-blue-950">Pay remaining balance</h1>
        <p className="mt-2 text-sm text-slate-600">{booking.reference} · {booking.title}</p>
        <dl className="mt-5 grid grid-cols-3 gap-3 rounded-lg border border-slate-200 bg-white p-5 text-sm">
          <div><dt className="text-slate-500">Total</dt><dd className="font-bold text-slate-900">{formatBookingAmount(booking.amount)}</dd></div>
          <div><dt className="text-slate-500">Paid</dt><dd className="font-bold text-slate-900">{formatBookingAmount(booking.amountPaid)}</dd></div>
          <div><dt className="text-slate-500">Balance</dt><dd className="font-bold text-blue-900">{formatBookingAmount(balance)}</dd></div>
        </dl>
        <div className="mt-5">
          <PaystackPayment amount={balance} description={`Balance for ${booking.reference}`} totalLabel="Outstanding balance" autoOpen />
        </div>
      </div>
    </div>
  );
};

export default BalancePayment;
