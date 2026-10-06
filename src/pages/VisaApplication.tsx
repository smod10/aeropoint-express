import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, FileText, Globe2, Mail, Phone, User } from 'lucide-react';
import { countryNames } from '../data/countries';
import { getVisaCountryByCode, visaCountryOptions } from '../data/visaData';
import { imageFallbacks } from '../utils/imageFallbacks';
import PhoneCountrySelect from '../components/PhoneCountrySelect';

interface VisaApplicationState {
  nationality?: string;
  destinationCode?: string;
  visaType?: string;
}

interface VisaApplicationForm {
  nationality: string;
  destinationCode: string;
  visaType: string;
  travelDate: string;
  fullName: string;
  email: string;
  phoneCountry: string;
  phone: string;
  notes: string;
}

const VisaApplication: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as VisaApplicationState | null) ?? {};

  const initialDestinationCode = state.destinationCode ?? visaCountryOptions[0].code;
  const initialDestination = getVisaCountryByCode(initialDestinationCode) ?? visaCountryOptions[0];

  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [form, setForm] = useState<VisaApplicationForm>({
    nationality: state.nationality ?? 'Nigeria',
    destinationCode: initialDestination.code,
    visaType: state.visaType ?? initialDestination.visaTypes[0],
    travelDate: '',
    fullName: '',
    email: '',
    phoneCountry: 'NG',
    phone: '',
    notes: '',
  });

  const destinationDetails = useMemo(
    () => getVisaCountryByCode(form.destinationCode) ?? visaCountryOptions[0],
    [form.destinationCode],
  );

  useEffect(() => {
    if (!destinationDetails.visaTypes.includes(form.visaType)) {
      setForm((prev) => ({ ...prev, visaType: destinationDetails.visaTypes[0] }));
    }
  }, [destinationDetails, form.visaType]);

  const updateField = <K extends keyof VisaApplicationForm>(field: K, value: VisaApplicationForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const now = Date.now().toString();
    const generatedApplicationId = `VISA-${now.slice(-8)}`;
    setApplicationId(generatedApplicationId);
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/visas')}
          className="inline-flex items-center text-blue-900 font-bold hover:text-blue-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Visa Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8">
          <main>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-blue-950 px-6 md:px-8 py-6 text-white">
                <h1 className="text-2xl md:text-3xl font-black">Visa Application Form</h1>
                <p className="text-blue-100 mt-2 font-medium">
                  Complete this form and our visa desk will contact you with a document checklist and payment breakdown.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="block">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 inline-flex items-center">
                        <Globe2 className="w-4 h-4 mr-1.5" /> Nationality
                      </span>
                      <select
                        value={form.nationality}
                        onChange={(event) => updateField('nationality', event.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-semibold text-slate-800"
                        required
                      >
                        {countryNames.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 inline-flex items-center">
                        <FileText className="w-4 h-4 mr-1.5" /> Destination Country
                      </span>
                      <select
                        value={form.destinationCode}
                        onChange={(event) => updateField('destinationCode', event.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-semibold text-slate-800"
                        required
                      >
                        {visaCountryOptions.map((destination) => (
                          <option key={destination.code} value={destination.code}>
                            {destination.country}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="block">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 inline-flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-1.5" /> Visa Type
                      </span>
                      <select
                        value={form.visaType}
                        onChange={(event) => updateField('visaType', event.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-semibold text-slate-800"
                        required
                      >
                        {destinationDetails.visaTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 inline-flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5" /> Intended Travel Date
                      </span>
                      <input
                        type="date"
                        value={form.travelDate}
                        onChange={(event) => updateField('travelDate', event.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-semibold text-slate-800"
                        required
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="block">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 inline-flex items-center">
                        <User className="w-4 h-4 mr-1.5" /> Full Name
                      </span>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(event) => updateField('fullName', event.target.value)}
                        placeholder="Enter full name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-semibold text-slate-800"
                        required
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 inline-flex items-center">
                        <Mail className="w-4 h-4 mr-1.5" /> Email Address
                      </span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(event) => updateField('email', event.target.value)}
                        placeholder="name@email.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-semibold text-slate-800"
                        required
                      />
                    </label>
                  </div>

                  <div className="block">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 inline-flex items-center">
                      <Phone className="w-4 h-4 mr-1.5" /> Phone Number
                    </span>
                    <div className="flex gap-2">
                      <PhoneCountrySelect value={form.phoneCountry} onChange={(event) => updateField('phoneCountry', event.target.value)} aria-label="Phone country code" className="w-[44%] min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-2 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-semibold text-slate-800 text-sm" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(event) => updateField('phone', event.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-3 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-semibold text-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <label className="block">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 inline-flex items-center">
                      <FileText className="w-4 h-4 mr-1.5" /> Additional Notes (Optional)
                    </span>
                    <textarea
                      rows={4}
                      value={form.notes}
                      onChange={(event) => updateField('notes', event.target.value)}
                      placeholder="Add travel history, urgency, or specific requirements"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-semibold text-slate-800 resize-none"
                    />
                  </label>

                  <button
                    type="submit"
                    className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-blue-950 font-black py-3.5 px-8 rounded-xl transition-colors inline-flex items-center justify-center"
                  >
                    Submit Application <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </form>
              ) : (
                <div className="p-6 md:p-8">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6">
                    <div className="flex items-center text-emerald-700 font-black text-lg mb-2">
                      <CheckCircle2 className="w-6 h-6 mr-2" /> Application Submitted
                    </div>
                    <p className="text-emerald-800 font-medium mb-2">
                      Your visa request has been received. A consultant will contact you with next steps.
                    </p>
                    <p className="text-emerald-900 font-black">Reference: {applicationId}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => navigate('/visas')}
                      className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                    >
                      Back to Visa Page
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setApplicationId('');
                      }}
                      className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold py-3 px-6 rounded-xl transition-colors"
                    >
                      Submit Another Application
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>

          <aside>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-24 overflow-hidden">
              <img
                src={destinationDetails.image}
                alt={destinationDetails.country}
                onError={(event) => {
                  event.currentTarget.src = imageFallbacks.visa;
                }}
                className="h-40 w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-extrabold text-blue-950 mb-1">{destinationDetails.country}</h2>
                <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">{destinationDetails.region}</p>

                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Processing Time</span>
                    <span className="font-semibold text-slate-800 text-right">{destinationDetails.processingTime}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Validity</span>
                    <span className="font-semibold text-slate-800 text-right">{destinationDetails.validity}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Service Fee</span>
                    <span className="font-black text-amber-600 text-right">{destinationDetails.serviceFee}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{destinationDetails.embassyFeeNote}</p>
                </div>

                <h3 className="text-sm font-black uppercase tracking-wider text-slate-700 mb-3">Available Visa Types</h3>
                <div className="flex flex-wrap gap-2">
                  {destinationDetails.visaTypes.map((type) => (
                    <span key={type} className="text-xs font-bold bg-blue-50 text-blue-900 px-2.5 py-1 rounded-full">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default VisaApplication;
