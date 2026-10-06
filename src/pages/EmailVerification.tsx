import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Check, Mail } from 'lucide-react';

const EmailVerification: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routeEmail = (location.state as { email?: string } | null)?.email;
  const email = routeEmail || sessionStorage.getItem('aeropointPendingEmail') || '';
  const [resendMessage, setResendMessage] = useState('');

  if (!email) return <Navigate to="/auth" replace />;

  const resendEmail = () => {
    setResendMessage(`A new verification email was requested for ${email}.`);
  };

  const returnToSignIn = () => navigate('/auth', { state: { email } });

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg border border-slate-200 bg-white px-6 py-8 text-center shadow-sm sm:px-10 sm:py-10">
        <div className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <Mail className="h-7 w-7" />
        </div>
        <p className="mt-5 text-sm font-bold uppercase tracking-wider text-amber-700">Email verification</p>
        <h1 className="mt-2 text-2xl font-extrabold text-blue-950 sm:text-3xl">Check your inbox</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">A verification email has been sent to</p>
        <p className="mt-1 break-all font-bold text-slate-900">{email}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">Open the link in that email to verify your address and continue to sign in.</p>

        {resendMessage && <p role="status" className="mt-4 flex items-start justify-center gap-2 rounded-md bg-emerald-50 px-3 py-2.5 text-left text-sm text-emerald-800"><Check className="mt-0.5 h-4 w-4 shrink-0" />{resendMessage}</p>}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={resendEmail} className="rounded-md border border-blue-900 px-5 py-3 text-sm font-bold text-blue-900 hover:bg-blue-50">Resend Email</button>
          <button type="button" onClick={returnToSignIn} className="rounded-md bg-blue-900 px-5 py-3 text-sm font-bold text-white hover:bg-blue-950">Return to Sign In</button>
        </div>

        <p className="mt-6 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">Email delivery is simulated in this prototype. Connect an email provider to send verification messages.</p>
      </section>
    </div>
  );
};

export default EmailVerification;