import React, { useState, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, LockKeyhole, Save } from 'lucide-react';
import { customerBookings } from '../data/customerBookings';

interface ProfileDetails {
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
}

const EditProfile: React.FC = () => {
  const signedInEmail = sessionStorage.getItem('aeropointCustomerEmail') || '';
  const sampleName = customerBookings.find((booking) => booking.ownerEmail.toLowerCase() === signedInEmail.toLowerCase())?.customerName || '';
  const [profile, setProfile] = useState<ProfileDetails>(() => ({
    name: sessionStorage.getItem('aeropointCustomerName') || sampleName,
    email: signedInEmail,
    phone: sessionStorage.getItem('aeropointCustomerPhone') || '+234 803 555 0142',
    city: sessionStorage.getItem('aeropointCustomerCity') || 'Ibadan',
    country: sessionStorage.getItem('aeropointCustomerCountry') || 'Nigeria',
  }));
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const isSignedIn = Boolean(signedInEmail);

  if (!isSignedIn) return <Navigate to="/auth" replace />;

  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextProfile = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim().toLowerCase(),
      phone: String(formData.get('phone') || '').trim(),
      city: String(formData.get('city') || '').trim(),
      country: String(formData.get('country') || '').trim(),
    };

    if (!nextProfile.name) {
      setProfileMessage('Enter your full name to save profile changes.');
      return;
    }
    if (!nextProfile.email) return;

    sessionStorage.setItem('aeropointCustomerName', nextProfile.name);
    sessionStorage.setItem('aeropointCustomerEmail', nextProfile.email);
    sessionStorage.setItem('aeropointCustomerPhone', nextProfile.phone);
    sessionStorage.setItem('aeropointCustomerCity', nextProfile.city);
    sessionStorage.setItem('aeropointCustomerCountry', nextProfile.country);
    setProfile(nextProfile);
    setProfileMessage('Profile changes saved for this session.');
  };

  const validatePasswordChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const currentPassword = String(formData.get('currentPassword') || '');
    const newPassword = String(formData.get('newPassword') || '');
    const confirmPassword = String(formData.get('confirmPassword') || '');

    setPasswordMessage('');
    setPasswordError('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }
    if (newPassword === currentPassword) {
      setPasswordError('Choose a new password different from your current password.');
      return;
    }

    setPasswordMessage('Password change details validated. Connect an account service to apply this securely.');
    form.reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 hover:underline"><ArrowLeft className="h-4 w-4" /> Back to My Account</Link>
        <header className="mt-5 border-b border-slate-200 pb-6">
          <p className="text-sm font-bold uppercase tracking-wider text-amber-700">Account settings</p>
          <h1 className="mt-2 text-3xl font-extrabold text-blue-950">Edit Profile</h1>
          <p className="mt-2 text-sm text-slate-600">Update your contact information and account details.</p>
        </header>

        <section className="mt-6 border border-slate-200 bg-white p-5 sm:p-7">
          <h2 className="text-lg font-bold text-blue-950">Personal details</h2>
          <form className="mt-5 space-y-4" onSubmit={saveProfile}>
            <label className="block text-sm font-semibold text-slate-700">Full name
              <input name="name" autoComplete="name" required minLength={2} value={profile.name} onChange={(event) => { setProfile({ ...profile, name: event.target.value }); setProfileMessage(''); }} className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" />
            </label>
            <label className="block text-sm font-semibold text-slate-700">Email address
              <input name="email" type="email" autoComplete="email" required value={profile.email} onChange={(event) => { setProfile({ ...profile, email: event.target.value }); setProfileMessage(''); }} className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" />
            </label>
            <label className="block text-sm font-semibold text-slate-700">Phone number
              <input name="phone" type="tel" autoComplete="tel" pattern="[+0-9() .-]{7,20}" title="Enter a valid phone number." value={profile.phone} onChange={(event) => { setProfile({ ...profile, phone: event.target.value }); setProfileMessage(''); }} className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-slate-700">Home city
                <input name="city" autoComplete="address-level2" value={profile.city} onChange={(event) => { setProfile({ ...profile, city: event.target.value }); setProfileMessage(''); }} className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" />
              </label>
              <label className="block text-sm font-semibold text-slate-700">Country
                <input name="country" autoComplete="country-name" value={profile.country} onChange={(event) => { setProfile({ ...profile, country: event.target.value }); setProfileMessage(''); }} className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" />
              </label>
            </div>
            <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-blue-900 px-5 py-2.5 font-bold text-white hover:bg-blue-950"><Save className="h-4 w-4" /> Save Changes</button>
            {profileMessage && <p role="status" className="rounded-md bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800">{profileMessage}</p>}
          </form>
        </section>

        <section className="mt-5 border border-slate-200 bg-white p-5 sm:p-7">
          <h2 className="flex items-center gap-2 text-lg font-bold text-blue-950"><LockKeyhole className="h-5 w-5 text-amber-600" /> Change Password</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Use at least 8 characters. Password changes must be applied by the secure account service.</p>
          <form className="mt-5 space-y-4" onSubmit={validatePasswordChange}>
            <label className="block text-sm font-semibold text-slate-700">Current password
              <input name="currentPassword" type="password" autoComplete="current-password" required className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" />
            </label>
            <label className="block text-sm font-semibold text-slate-700">New password
              <input name="newPassword" type="password" autoComplete="new-password" required minLength={8} className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" />
            </label>
            <label className="block text-sm font-semibold text-slate-700">Confirm new password
              <input name="confirmPassword" type="password" autoComplete="new-password" required minLength={8} className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/15" />
            </label>
            <button type="submit" className="rounded-md border border-blue-900 px-5 py-2.5 font-bold text-blue-900 hover:bg-blue-50">Validate Password Change</button>
            {passwordError && <p role="alert" className="rounded-md bg-red-50 px-3 py-2.5 text-sm font-medium text-red-800">{passwordError}</p>}
            {passwordMessage && <p role="status" className="rounded-md bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800">{passwordMessage}</p>}
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditProfile;