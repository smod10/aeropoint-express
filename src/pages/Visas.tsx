import React, { useMemo, useState } from 'react';
import {
  Search,
  FileText,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  Award,
  HelpCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { countryNames } from '../data/countries';
import {
  getVisaCountryByCode,
  popularVisaDestinations,
  visaCountryOptions,
} from '../data/visaData';
import { imageFallbacks } from '../utils/imageFallbacks';

const Visas: React.FC = () => {
  const navigate = useNavigate();
  const [nationality, setNationality] = useState('Nigeria');
  const [destinationCode, setDestinationCode] = useState('');
  const [visaType, setVisaType] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const popularVisas = popularVisaDestinations.slice(0, 6);
  const regions = useMemo(() => ['All', ...new Set(visaCountryOptions.map((item) => item.region))], []);

  const filteredCountries = useMemo(
    () =>
      visaCountryOptions.filter((item) => {
        const normalizedSearch = countrySearch.trim().toLowerCase();
        const searchMatches =
          normalizedSearch.length === 0 ||
          item.country.toLowerCase().includes(normalizedSearch) ||
          item.visaTypes.some((type) => type.toLowerCase().includes(normalizedSearch));
        const regionMatches = selectedRegion === 'All' || item.region === selectedRegion;
        return searchMatches && regionMatches;
      }),
    [countrySearch, selectedRegion],
  );

  const steps = [
    {
      icon: <Search className="w-8 h-8 text-blue-900" />,
      title: 'Select Destination',
      description:
        'Choose your destination country and review the specific visa requirements and processing times.',
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-900" />,
      title: 'Submit Documents',
      description:
        'Upload your documents securely to our portal. Our experts will vet them to ensure full compliance.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-900" />,
      title: 'We Process',
      description:
        'We handle the complex application forms, fee payments, and appointment scheduling on your behalf.',
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-blue-900" />,
      title: 'Visa Approval',
      description:
        'Receive your e-visa directly in your inbox or collect your stamped passport securely from our office.',
    },
  ];

  const faqs = [
    {
      q: 'Do you guarantee visa approval?',
      a: 'While we boast a strong success rate due to meticulous document vetting and expert application support, visa issuance is entirely at the discretion of the embassy or consulate. No agency can guarantee a visa.',
    },
    {
      q: "What does the 'Service Fee' cover?",
      a: 'Our service fee covers consultation, document vetting, form filling, interview preparation (if required), and appointment scheduling. It does not include the embassy visa fee, which varies by country.',
    },
    {
      q: 'How secure are my documents?',
      a: 'We treat your personal data with high security standards. Our portal uses secure encryption, and physical documents are handled with strict access controls until returned to you.',
    },
    {
      q: 'Can you assist with expedited or emergency visas?',
      a: 'Yes, for certain destinations we support expedited processing. For embassy-appointment visas, we can request earlier dates but cannot guarantee appointment availability.',
    },
  ];

  const handleStartApplication = (countryCode: string, visaType?: string) => {
    navigate('/visas/apply', {
      state: {
        nationality,
        destinationCode: countryCode,
        visaType,
      },
    });
  };

  const handleDestinationChange = (newCode: string) => {
    setDestinationCode(newCode);
    const destination = getVisaCountryByCode(newCode);
    setVisaType(destination?.visaTypes[0] ?? '');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (destinationCode) {
      const selectedDestination = getVisaCountryByCode(destinationCode);
      handleStartApplication(destinationCode, visaType || selectedDestination?.visaTypes[0]);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-blue-950">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/80 to-blue-950/90"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-4 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-sm font-bold mb-6 tracking-wider uppercase">
            Visa & Immigration Services
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Global Visas, <span className="text-amber-500">Simplified.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-medium">
            Expert guidance, rigorous document vetting, and seamless application processing for your next international journey.
          </p>

          {/* Visa Search Widget */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-6xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 mt-2">
              <div className="flex-1 relative h-[60px] border border-slate-200 bg-white rounded-xl focus-within:ring-2 focus-within:ring-blue-900/20">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full h-full pl-12 pr-10 pt-4 pb-1 bg-transparent text-slate-800 font-bold focus:outline-none rounded-xl appearance-none cursor-pointer relative z-20"
                >
                  {countryNames.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <span className="absolute top-1.5 left-12 text-[10px] text-slate-400 font-bold uppercase tracking-wider z-10">Nationality</span>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                </div>
              </div>

              <div className="flex-1 relative h-[60px] border border-slate-200 bg-white rounded-xl focus-within:ring-2 focus-within:ring-blue-900/20">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <ChevronDown className="h-5 w-5 text-slate-400 rotate-90" />
                </div>
                <select
                  value={destinationCode}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                  className="w-full h-full pl-12 pr-10 pt-4 pb-1 bg-transparent text-slate-800 font-bold focus:outline-none rounded-xl appearance-none cursor-pointer relative z-20"
                  required
                >
                  <option value="" disabled>Select Destination...</option>
                  {visaCountryOptions.map((destination) => (
                    <option key={destination.code} value={destination.code}>
                      {destination.country}
                    </option>
                  ))}
                </select>
                <span className="absolute top-1.5 left-12 text-[10px] text-slate-400 font-bold uppercase tracking-wider z-10">Destination</span>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                </div>
              </div>

              <div className="flex-1 relative h-[60px] border border-slate-200 bg-white rounded-xl focus-within:ring-2 focus-within:ring-blue-900/20">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <FileText className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  value={visaType}
                  onChange={(e) => setVisaType(e.target.value)}
                  className="w-full h-full pl-12 pr-10 pt-4 pb-1 bg-transparent text-slate-800 font-bold focus:outline-none rounded-xl appearance-none cursor-pointer relative z-20 disabled:text-slate-400"
                  disabled={!destinationCode}
                  required
                >
                  {!destinationCode && <option value="">Select visa type...</option>}
                  {destinationCode &&
                    getVisaCountryByCode(destinationCode)?.visaTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                </select>
                <span className="absolute top-1.5 left-12 text-[10px] text-slate-400 font-bold uppercase tracking-wider z-10">Visa Type</span>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                </div>
              </div>

              <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg h-[60px] px-8 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-amber-500/20 shrink-0 w-full lg:w-auto">
                <Search className="w-5 h-5 mr-2" /> Start
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center text-slate-700">
              <Award className="w-5 h-5 text-amber-500 mr-2" /> <span className="font-bold text-sm">98% Success Rate</span>
            </div>
            <div className="flex items-center text-slate-700">
              <ShieldCheck className="w-5 h-5 text-emerald-500 mr-2" /> <span className="font-bold text-sm">Secure Data Handling</span>
            </div>
            <div className="flex items-center text-slate-700">
              <Clock className="w-5 h-5 text-blue-600 mr-2" /> <span className="font-bold text-sm">Expedited Processing</span>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-blue-950 mb-4">How Aeropoint Visa Works</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">We have streamlined the visa process into four simple, transparent steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-200 z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-xl flex items-center justify-center mb-6 relative">
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-900 text-white font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {idx + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed px-2">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="destinations" className="bg-slate-100 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-blue-950 mb-2">Popular Visa Destinations</h2>
              <p className="text-slate-500">Expert assistance for the most requested global routes.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {popularVisas.map((visa, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={visa.image}
                    alt={visa.country}
                    onError={(event) => {
                      event.currentTarget.src = imageFallbacks.visa;
                    }}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 to-transparent"></div>

                  {visa.popular && (
                    <span className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider shadow-md">High Demand</span>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                    <div>
                      <h3 className="text-xl font-bold inline-block leading-tight">{visa.country}</h3>
                      <p className="text-xs text-blue-100 mt-1 font-semibold uppercase tracking-wider">{visa.region}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="inline-block bg-blue-50 text-blue-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {visa.visaTypes[0]}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Processing Time</span>
                      <span className="font-semibold text-slate-800 text-right">{visa.processingTime}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Validity</span>
                      <span className="font-semibold text-slate-800 text-right">{visa.validity}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-1">
                      <span className="text-slate-500">Service Fee</span>
                      <span className="font-black text-amber-600 text-right">{visa.serviceFee}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartApplication(visa.code, visa.visaTypes[0])}
                    className="w-full bg-white border-2 border-slate-200 text-slate-800 hover:border-blue-900 hover:bg-blue-50 hover:text-blue-900 font-bold py-3 rounded-xl transition-colors flex items-center justify-center group-hover:border-blue-900 group-hover:bg-blue-900 group-hover:text-white"
                  >
                    Start Application <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 font-medium mb-4">Do not see your destination listed?</p>
            <button
              onClick={() => document.getElementById('all-countries')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white border border-slate-200 shadow-sm text-blue-900 font-bold px-8 py-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              View All 50+ Countries
            </button>
          </div>
        </div>
      </section>

      {/* All Countries */}
      <section id="all-countries" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-blue-950 mb-2">All Supported Visa Countries</h2>
            <p className="text-slate-500">50 destinations with visa categories, timelines, and service guidance.</p>
          </div>
          <div className="text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-lg px-4 py-2 self-start md:self-auto">
            Showing {filteredCountries.length} of {visaCountryOptions.length}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm mb-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative border border-slate-200 rounded-xl overflow-hidden">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              value={countrySearch}
              onChange={(e) => setCountrySearch(e.target.value)}
              placeholder="Search by country or visa type"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 font-semibold text-slate-800"
            />
          </div>

          <div className="border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full py-3.5 px-4 bg-transparent font-semibold text-slate-800 focus:outline-none"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCountries.map((item) => (
            <article key={item.code} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-950 leading-tight">{item.country}</h3>
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">{item.region}</p>
                </div>
                {item.popular && (
                  <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {item.visaTypes.map((type) => (
                  <span key={`${item.code}-${type}`} className="text-xs font-bold bg-blue-50 text-blue-900 px-2.5 py-1 rounded-full">
                    {type}
                  </span>
                ))}
              </div>

              <div className="space-y-2 text-sm mb-5">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Timeline</span>
                  <span className="font-semibold text-slate-800 text-right">{item.processingTime}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Validity</span>
                  <span className="font-semibold text-slate-800 text-right">{item.validity}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Service Fee</span>
                  <span className="font-black text-amber-600 text-right">{item.serviceFee}</span>
                </div>
              </div>

              <button
                onClick={() => handleStartApplication(item.code, item.visaTypes[0])}
                className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center"
              >
                Start Application <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 text-blue-900 mx-auto mb-4 opacity-50" />
          <h2 className="text-3xl font-extrabold text-blue-950 mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="font-bold text-slate-800 pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transform transition-transform duration-300 ${faqOpen === idx ? 'rotate-180 text-blue-900' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${faqOpen === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-50 bg-slate-50/50">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-blue-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-800 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-amber-500 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to start your visa application?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Speak with one of our immigration consultants today for a free profile assessment and requirements checklist.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => navigate('/contact')} className="bg-amber-500 hover:bg-amber-400 text-blue-950 font-black py-4 px-8 rounded-xl transition-all shadow-lg shadow-amber-500/20">
                Talk to an Expert
              </button>
              <button
                onClick={() => {
                  const fallbackDestination = popularVisas[0];
                  if (destinationCode) {
                    const destination = getVisaCountryByCode(destinationCode);
                    handleStartApplication(destinationCode, destination?.visaTypes[0]);
                    return;
                  }
                  handleStartApplication(fallbackDestination.code, fallbackDestination.visaTypes[0]);
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl border border-white/20 transition-all backdrop-blur-sm"
              >
                Start Online Application
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Visas;
