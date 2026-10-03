export interface BlogArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  content: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    slug: 'hidden-gems-zanzibar',
    title: 'Top 10 Hidden Gems to Visit in Zanzibar',
    excerpt: 'Look beyond the familiar beach itinerary and discover the quieter corners, heritage, and everyday culture that make Zanzibar memorable.',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85',
    date: 'Jun 12, 2026',
    author: 'Sarah Ahmed',
    category: 'Travel Guides',
    readTime: '6 min read',
    content: [
      'Zanzibar is often pictured as a stretch of white sand and turquoise water, but the islands reward travelers who leave room for slow mornings and unplanned turns. Stone Town’s carved doors, shaded courtyards, and layered history are a thoughtful place to begin before heading toward the coast.',
      'On the northern shore, smaller fishing villages offer a quieter rhythm than the busiest resort areas. Ask locally before photographing people, dress respectfully away from resort beaches, and choose community-led experiences where possible. Tides shape swimming and boat trips, so check the conditions with a trusted local operator each day.',
      'Inland, spice farms and forest walks introduce a different side of the islands. A guide can explain how cloves, cinnamon, and other crops are grown, while protected forest visits help visitors understand the habitat and the work involved in conservation.',
      'Leave flexibility in your schedule for changing sea conditions and travel times. Confirm transfers and excursions in advance, carry drinking water, and check current entry, health, and transport information before departure. The best discoveries are usually easier to enjoy when the practical details are settled first.',
    ],
  },
  {
    id: 2,
    slug: 'first-umrah-travel-guide',
    title: 'Everything to Plan Before Your First Umrah',
    excerpt: 'A practical preparation guide for documents, travel arrangements, packing, and the questions to confirm before a pilgrimage.',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85',
    date: 'Jun 05, 2026',
    author: 'Mohammed Tariq',
    category: 'Pilgrimage',
    readTime: '7 min read',
    content: [
      'Preparing for Umrah is both a personal and practical process. Begin by checking current entry and permit requirements through official Saudi government sources and your airline. Requirements can change, and your passport validity, travel dates, and personal circumstances may affect what applies to you.',
      'Before confirming a package, review the itinerary, accommodation names and locations, room arrangements, transport inclusions, meal details, and what is not included. Keep copies of booking confirmations and the provider’s contact information in a place you can access while travelling.',
      'Pack comfortable walking footwear, weather-appropriate clothing, any regular medication in its original packaging, and a small day bag for essentials. If you have a health or mobility need, discuss it with your travel provider and airline early so you can understand what assistance is available.',
      'Build some flexibility into your plans, stay hydrated, and follow local guidance at each holy site. A trusted group leader can help with logistics, but always confirm religious guidance with a knowledgeable scholar or guide you trust. Travel providers can support arrangements but cannot guarantee immigration decisions or entry.',
    ],
  },
  {
    id: 3,
    slug: 'book-flights-peak-season',
    title: 'How to Plan Flights During Peak Season',
    excerpt: 'Practical ways to compare schedules, fare conditions, baggage, connections, and flexibility when travel demand is high.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85',
    date: 'May 28, 2026',
    author: 'David Osei',
    category: 'Tips & Tricks',
    readTime: '5 min read',
    content: [
      'Peak-season planning starts with knowing which details matter most to you. Decide whether you can shift your dates, which airports are practical, how many connections you are willing to make, and what baggage you need before comparing fares.',
      'The lowest displayed fare may not be the lowest-cost trip once baggage, seats, payment charges, and change conditions are considered. Read the fare rules and compare the full itinerary, including connection times and whether separate tickets are involved.',
      'When your dates are fixed, begin researching early and set a realistic budget. Prices move with demand and inventory, so no booking window guarantees the lowest price. Compare the final price at checkout and make sure passenger names match travel documents before paying.',
      'For journeys with connections, check transit visa requirements for every stop and consider what happens if the first flight is delayed. Save your booking reference, airline contact details, and payment receipt. If plans change, act promptly because supplier rules and options depend on the ticket purchased.',
    ],
  },
  {
    id: 4,
    slug: 'tropical-trip-packing-list',
    title: 'A Thoughtful Packing List for a Tropical Getaway',
    excerpt: 'Build a lighter, more useful packing list around the weather, planned activities, airline baggage allowance, and essentials.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85',
    date: 'May 15, 2026',
    author: 'Amanda Lee',
    category: 'Travel Guides',
    readTime: '4 min read',
    content: [
      'A useful packing list begins with your itinerary, not a generic checklist. Check the forecast close to departure and consider the activities you have planned, from beach time to city visits and evenings out. Lightweight layers are easier to adapt than several bulky outfits.',
      'Keep travel documents, prescribed medication, valuables, and a change of clothes in your cabin bag, subject to the airline’s current cabin-baggage and restricted-item rules. Store digital copies of confirmations separately from the originals and make sure your phone can access them offline.',
      'Sun protection, insect repellent, comfortable walking shoes, and a reusable water bottle are often useful. Bring only the toiletries you need, and pack liquids according to the airport security rules for your route.',
      'Check the exact baggage allowance printed on your ticket: allowances differ by airline, route, cabin, and fare. Weigh your bag before leaving, leave a little space for items acquired on the trip, and verify any local customs restrictions before packing food, plants, or other regulated goods.',
    ],
  },
];