import React, { useEffect, useRef, useState } from 'react';
import { Landmark, LockKeyhole } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { contactInfo } from '../data/contactInfo';

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency: 'NGN';
        ref: string;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

interface PaystackPaymentProps {
  amount: number;
  description: string;
  depositRate?: number;
  travelDate?: string;
  autoOpen?: boolean;
  totalLabel?: string;
}

const depositEligible = (travelDate?: string) => {
  if (!travelDate) return false;
  const travel = new Date(travelDate);
  if (Number.isNaN(travel.getTime())) return false;
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  minDate.setMonth(minDate.getMonth() + 1);
  return travel >= minDate;
};

const PaystackPayment: React.FC<PaystackPaymentProps> = ({ amount: totalAmount, description, depositRate, travelDate, autoOpen, totalLabel = 'Booking total' }) => {
  const [email] = useState(() => sessionStorage.getItem('aeropointCustomerEmail') || contactInfo.email);
  const navigate = useNavigate();
  const [payOption, setPayOption] = useState<'full' | 'deposit'>('full');
  const canDeposit = Boolean(depositRate) && depositEligible(travelDate);
  const useDeposit = canDeposit && payOption === 'deposit';
  const amount = useDeposit ? Math.round(totalAmount * (depositRate as number)) : totalAmount;
  const [sdkReady, setSdkReady] = useState(Boolean(window.PaystackPop));
  const [status, setStatus] = useState('');
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const bankName = import.meta.env.VITE_BANK_NAME;
  const accountName = import.meta.env.VITE_BANK_ACCOUNT_NAME;
  const accountNumber = import.meta.env.VITE_BANK_ACCOUNT_NUMBER;

  useEffect(() => {
    if (window.PaystackPop) {
      setSdkReady(true);
      return;
    }

    let script = document.getElementById('paystack-inline-script') as HTMLScriptElement | null;
    const onLoad = () => setSdkReady(true);
    if (!script) {
      script = document.createElement('script');
      script.id = 'paystack-inline-script';
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener('load', onLoad);
    return () => script?.removeEventListener('load', onLoad);
  }, []);

  const startPayment = () => {
    if (!publicKey || !window.PaystackPop || !email.trim()) return;
    const checkout = window.PaystackPop.setup({
      key: publicKey,
      email: email.trim(),
      amount: Math.round(amount * 100),
      currency: 'NGN',
      ref: `AERO-${Date.now()}`,
      callback: ({ reference }) => setStatus(`Payment submitted. Keep reference ${reference}; your booking is pending payment verification.`),
      onClose: () => setStatus('Paystack checkout was closed.'),
    });
    checkout.openIframe();
  };

  const hasBankDetails = Boolean(bankName && accountName && accountNumber);

  const autoOpened = useRef(false);
  useEffect(() => {
    if (autoOpen && sdkReady && publicKey && !autoOpened.current) {
      autoOpened.current = true;
      startPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpen, sdkReady, publicKey]);

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h3 className="font-bold text-blue-950">Payment breakdown</h3>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-slate-600">{totalLabel}</dt><dd className="font-semibold text-slate-900">₦{totalAmount.toLocaleString()}</dd></div>
          {useDeposit && <div className="flex justify-between"><dt className="text-slate-600">Balance due before travel</dt><dd className="font-semibold text-slate-900">₦{(totalAmount - amount).toLocaleString()}</dd></div>}
          <div className="flex justify-between border-t border-slate-200 pt-2"><dt className="font-bold text-slate-800">{description} – payable now</dt><dd className="font-black text-blue-900">₦{amount.toLocaleString()}</dd></div>
        </dl>
        {depositRate ? (
          canDeposit ? (
            <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm">
              <label className="flex items-center gap-2 font-semibold text-slate-700">
                <input type="radio" name="pay-option" checked={payOption === 'full'} onChange={() => setPayOption('full')} /> Pay in full (₦{totalAmount.toLocaleString()})
              </label>
              <label className="flex items-center gap-2 font-semibold text-slate-700">
                <input type="radio" name="pay-option" checked={payOption === 'deposit'} onChange={() => setPayOption('deposit')} /> Pay {Math.round((depositRate as number) * 100)}% deposit now (₦{Math.round(totalAmount * (depositRate as number)).toLocaleString()})
              </label>
            </div>
          ) : (
            <p className="mt-3 text-xs text-slate-500">A {Math.round((depositRate as number) * 100)}% deposit is available when travel is at least one month away.</p>
          )
        ) : null}
      </section>

      <div className="grid grid-cols-2 items-start gap-3 sm:gap-5">
      <section className="rounded-lg border border-slate-200 p-5">
        <div className="flex items-center gap-2 text-blue-950">
          <LockKeyhole className="h-5 w-5" />
          <h3 className="font-bold">Pay securely with Paystack</h3>
        </div>
        <button
          type="button"
          onClick={startPayment}
          disabled={!publicKey || !sdkReady}
          className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-blue-900 px-5 py-3 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Pay ₦{amount.toLocaleString()} with Paystack
        </button>
        {!publicKey && <p className="mt-3 text-sm text-amber-800">Online checkout is not configured yet. Contact Aeropoint to arrange payment.</p>}
        {status && <p role="status" className="mt-3 text-sm text-blue-900">{status}</p>}
        <p className="mt-3 text-xs leading-relaxed text-slate-500">Payment confirmation and ticketing require verification by Aeropoint. Do not treat a browser message as a confirmed booking.</p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center gap-2 text-blue-950">
          <Landmark className="h-5 w-5" />
          <h3 className="font-bold">Bank transfer</h3>
        </div>
        {hasBankDetails ? (
          <dl className="mt-4 grid gap-3 text-sm">
            <div><dt className="text-slate-500">Bank</dt><dd className="font-semibold text-slate-900">{bankName}</dd></div>
            <div><dt className="text-slate-500">Account name</dt><dd className="font-semibold text-slate-900">{accountName}</dd></div>
            <div><dt className="text-slate-500">Account number</dt><dd className="font-semibold text-slate-900">{accountNumber}</dd></div>
          </dl>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-slate-600">For verified account details, contact Aeropoint before transferring. Bank details are not configured on this site yet.</p>
        )}
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
          <li>Confirm the current account details and payable amount with our team.</li>
          <li>Use your booking reference as the transfer narration and send proof of payment to support.</li>
          <li>Your booking is confirmed only after Aeropoint verifies the funds.</li>
        </ol>
        <Link to="/contact" className="mt-4 inline-flex text-sm font-semibold text-blue-900 underline underline-offset-2">Contact Us: {contactInfo.email}</Link>
        <button
          type="button"
          onClick={() => navigate('/dashboard', { state: { view: 'bookings' } })}
          className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-amber-500 px-5 py-3 font-bold text-slate-900 transition hover:bg-amber-600"
        >
          I have made the transfer
        </button>
      </section>
      </div>
    </div>
  );
};

export default PaystackPayment;