import React, { useEffect, useState } from 'react';
import { Landmark, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
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
}

const PaystackPayment: React.FC<PaystackPaymentProps> = ({ amount, description }) => {
  const [email, setEmail] = useState('');
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

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-slate-200 p-5">
        <div className="flex items-center gap-2 text-blue-950">
          <LockKeyhole className="h-5 w-5" />
          <h3 className="font-bold">Pay securely with Paystack</h3>
        </div>
        <p className="mt-2 text-sm text-slate-600">{description}: ₦{amount.toLocaleString()}</p>
        <label className="mt-4 block text-sm font-semibold text-slate-700">
          Payment email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15"
          />
        </label>
        <button
          type="button"
          onClick={startPayment}
          disabled={!publicKey || !sdkReady || !email.trim()}
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
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
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
      </section>
    </div>
  );
};

export default PaystackPayment;