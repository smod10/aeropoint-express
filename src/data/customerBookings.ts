export type BookingCategory = 'Flight' | 'Stay' | 'Tours & Packages' | 'Umrah' | 'Visa';

export interface CustomerBooking {
  reference: string;
  ownerEmail: string;
  customerName: string;
  category: BookingCategory;
  title: string;
  summary: string;
  dateLabel: string;
  startDate: string;
  status: 'Confirmed' | 'Action required' | 'Refund in progress' | 'Completed' | 'Processing';
  amount: number;
  amountPaid: number;
  paymentStatus: string;
  travellers: string;
  details: { label: string; value: string }[];
  documents: string[];
  notes?: string;
}

const ownerEmail = 'amara.okafor@example.com';
const customerName = 'Amara Okafor';

export const customerBookings: CustomerBooking[] = [
  {
    reference: 'APX-482916',
    ownerEmail,
    customerName,
    category: 'Flight',
    title: 'Lagos (LOS) to London (LHR)',
    summary: 'Virgin Atlantic · Return · Economy',
    dateLabel: '24 Nov – 02 Dec 2026',
    startDate: '2026-11-24',
    status: 'Confirmed',
    amount: 1250000,
    amountPaid: 1250000,
    paymentStatus: 'Paid in full',
    travellers: 'Amara Okafor · 1 adult',
    details: [
      { label: 'Airline', value: 'Virgin Atlantic · VS 412' },
      { label: 'Route', value: 'Lagos (LOS) to London (LHR)' },
      { label: 'Departure', value: '24 Nov 2026 · 10:30' },
      { label: 'Arrival', value: '24 Nov 2026 · 17:15' },
      { label: 'Return', value: '02 Dec 2026 · 20:10' },
      { label: 'Cabin', value: 'Economy' },
    ],
    documents: ['Invoice', 'E-ticket', 'Booking confirmation'],
    notes: 'Window seat requested.',
  },
  {
    reference: 'APX-319704',
    ownerEmail,
    customerName,
    category: 'Flight',
    title: 'Abuja (ABV) to Dubai (DXB)',
    summary: 'Emirates · Return · Economy',
    dateLabel: '10 – 17 Sep 2026',
    startDate: '2026-09-10',
    status: 'Refund in progress',
    amount: 980000,
    amountPaid: 980000,
    paymentStatus: 'Refund pending · ₦245,000',
    travellers: 'Amara Okafor · 1 adult',
    details: [
      { label: 'Airline', value: 'Emirates · EK 786' },
      { label: 'Route', value: 'Abuja (ABV) to Dubai (DXB)' },
      { label: 'Departure', value: '10 Sep 2026 · 19:45' },
      { label: 'Arrival', value: '11 Sep 2026 · 05:20' },
      { label: 'Return', value: '17 Sep 2026 · 09:10' },
      { label: 'Cabin', value: 'Economy' },
    ],
    documents: ['Invoice', 'E-ticket', 'Refund request receipt'],
  },
  {
    reference: 'APX-736201',
    ownerEmail,
    customerName,
    category: 'Stay',
    title: 'Eko Hotel & Suites, Lagos',
    summary: 'Deluxe Ocean View · 1 room · 2 guests',
    dateLabel: '08 – 12 Dec 2026',
    startDate: '2026-12-08',
    status: 'Confirmed',
    amount: 840000,
    amountPaid: 420000,
    paymentStatus: 'Deposit paid',
    travellers: 'Amara Okafor and guest · 2 guests',
    details: [
      { label: 'Hotel', value: 'Eko Hotel & Suites, Lagos' },
      { label: 'Room', value: 'Deluxe Ocean View · 1 room' },
      { label: 'Check-in', value: '08 Dec 2026 · from 15:00' },
      { label: 'Check-out', value: '12 Dec 2026 · by 11:00' },
      { label: 'Guests', value: '2 adults' },
    ],
    documents: ['Invoice', 'Hotel confirmation'],
    notes: 'Late arrival expected after 21:00.',
  },
  {
    reference: 'APX-550284',
    ownerEmail,
    customerName,
    category: 'Tours & Packages',
    title: 'Zanzibar Escape',
    summary: 'Zanzibar, Tanzania · 5 nights',
    dateLabel: '18 – 23 Jan 2027',
    startDate: '2027-01-18',
    status: 'Action required',
    amount: 1400000,
    amountPaid: 200000,
    paymentStatus: 'Balance due · ₦1,200,000',
    travellers: 'Amara Okafor and guest · 2 travellers',
    details: [
      { label: 'Package', value: 'Zanzibar Escape · 5 nights' },
      { label: 'Destination', value: 'Zanzibar, Tanzania' },
      { label: 'Dates', value: '18 – 23 Jan 2027' },
      { label: 'Travellers', value: '2 adults' },
    ],
    documents: ['Invoice', 'Package itinerary'],
    notes: 'Please confirm the preferred airport transfer time.',
  },
  {
    reference: 'APX-664120',
    ownerEmail,
    customerName,
    category: 'Umrah',
    title: 'Ramadan Umrah Package',
    summary: 'Makkah & Madinah · 10 nights',
    dateLabel: '12 – 22 Feb 2027',
    startDate: '2027-02-12',
    status: 'Confirmed',
    amount: 3250000,
    amountPaid: 3250000,
    paymentStatus: 'Paid in full',
    travellers: 'Amara Okafor · 1 traveller',
    details: [
      { label: 'Package', value: 'Ramadan Umrah Package · 10 nights' },
      { label: 'Destination', value: 'Makkah and Madinah, Saudi Arabia' },
      { label: 'Dates', value: '12 – 22 Feb 2027' },
      { label: 'Travellers', value: '1 adult' },
    ],
    documents: ['Invoice', 'Umrah confirmation', 'Travel itinerary'],
  },
  {
    reference: 'APX-118903',
    ownerEmail,
    customerName,
    category: 'Visa',
    title: 'United Kingdom Visitor Visa',
    summary: 'United Kingdom · Standard visitor',
    dateLabel: 'Application submitted 02 Oct 2026',
    startDate: '2026-10-02',
    status: 'Processing',
    amount: 285000,
    amountPaid: 285000,
    paymentStatus: 'Paid in full',
    travellers: 'Amara Okafor · 1 applicant',
    details: [
      { label: 'Visa type', value: 'Standard visitor visa' },
      { label: 'Destination', value: 'United Kingdom' },
      { label: 'Application status', value: 'Processing' },
      { label: 'Submitted', value: '02 Oct 2026' },
    ],
    documents: ['Invoice', 'Application receipt', 'Document checklist'],
  },
];

export const formatBookingAmount = (amount: number) => `₦${amount.toLocaleString('en-NG')}`;