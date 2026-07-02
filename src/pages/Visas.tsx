import React, { useState } from 'react';
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

const Visas: React.FC = () => {
  const [nationality, setNationality] = useState('Nigeria');
  const [destination, setDestination] = useState('');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const popularVisas = [
    {
      country: 'United Arab Emirates',
      type: 'Tourist / e-Visa',
      time: '3 - 5 Working Days',
      validity: '30 Days or 60 Days',
      price: 'From ₦250,000',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
      flag: '🇦🇪',
      popular: true,
    },
    {
      country: 'United Kingdom',
      type: 'Standard Visitor Visa',
      time: '15 - 21 Working Days',
      validity: '6 Months (Multiple Entry)',
      price: 'Service Fee: ₦150,000',
      image: 'https://images.unsplash.com/photo-1513635269975-5969336cd1f7?w=800&q=80',
      flag: '🇬🇧',
    },
    {
      country: 'Schengen Area',
      type: 'Short Stay (C-Type)',
      time: '15 - 30 Working Days',
      validity: 'Varies by Embassy',
      price: 'Service Fee: ₦180,000',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
      flag: '🇪🇺',
    },
    {
      country: 'United States',
      type: 'B1/B2 Tourist Visa',
      time: 'Depends on Interview',
      validity: 'Up to 5 Years',
      price: 'Service Fee: ₦200,000',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
      flag: '🇺🇸',
    },
    {
      country: 'Canada',
      type: 'Temporary Resident Visa',
      time: '30 - 60 Working Days',
      validity: 'Up to Passport Expiry',
      price: 'Service Fee: ₦180,000',
      image: 'https://images.unsplash.com/photo-1503932824905-2eab21711718?w=800&q=80',
      flag: '🇨🇦',
    },
    {
      country: 'South Africa',
      type: 'Tourist / e-Visa',
      time: '10 - 15 Working Days',
      validity: 'Up to 90 Days',
      price: 'Service Fee: ₦120,000',
      image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
      flag: '🇿🇦',
    },
  ];

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination) {
      document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
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
          <div className="bg-white p-3 rounded-2xl shadow-2xl max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-left focus-within:ring-2 focus-within:ring-blue-900/20 transition-all">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">I am a citizen of</label>
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full bg-transparent font-bold text-slate-800 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                </select>
                <ChevronDown className="absolute right-4 bottom-3 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
              <div className="flex-1 relative border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-left focus-within:ring-2 focus-within:ring-blue-900/20 transition-all">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Traveling to</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent font-bold text-slate-800 focus:outline-none appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select Destination...</option>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Schengen">Schengen Area</option>
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                </select>
                <ChevronDown className="absolute right-4 bottom-3 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
              <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-black px-8 py-4 rounded-xl transition-colors flex items-center justify-center h-full">
                Check Visas
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
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${visa.image}')` }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 to-transparent"></div>

                  {visa.popular && (
                    <span className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider shadow-md">High Demand</span>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                    <div>
                      <span className="text-3xl mr-2 leading-none">{visa.flag}</span>
                      <h3 className="text-xl font-bold inline-block leading-tight">{visa.country}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="inline-block bg-blue-50 text-blue-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {visa.type}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Processing Time</span>
                      <span className="font-semibold text-slate-800 text-right">{visa.time}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Validity</span>
                      <span className="font-semibold text-slate-800 text-right">{visa.validity}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-1">
                      <span className="text-slate-500">Pricing</span>
                      <span className="font-black text-amber-600 text-right">{visa.price}</span>
                    </div>
                  </div>

                  <button className="w-full bg-white border-2 border-slate-200 text-slate-800 hover:border-blue-900 hover:bg-blue-50 hover:text-blue-900 font-bold py-3 rounded-xl transition-colors flex items-center justify-center group-hover:border-blue-900 group-hover:bg-blue-900 group-hover:text-white">
                    Start Application <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 font-medium mb-4">Do not see your destination listed?</p>
            <button className="bg-white border border-slate-200 shadow-sm text-blue-900 font-bold px-8 py-3 rounded-xl hover:bg-slate-50 transition-colors">
              View All 50+ Countries
            </button>
          </div>
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
              <button className="bg-amber-500 hover:bg-amber-400 text-blue-950 font-black py-4 px-8 rounded-xl transition-all shadow-lg shadow-amber-500/20">
                Talk to an Expert
              </button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl border border-white/20 transition-all backdrop-blur-sm">
                Check Requirements
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Visas;
