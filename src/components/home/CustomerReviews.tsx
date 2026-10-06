import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';

const reviews = [
  { name: 'Ada O.', city: 'Lagos', service: 'Family holiday', rating: 5, text: 'The team helped us compare flight options and kept the booking details easy to follow. We had a smooth start to our family trip.' },
  { name: 'Tunde A.', city: 'Abuja', service: 'Flight booking', rating: 5, text: 'I appreciated the clear explanation of baggage and fare conditions before I paid. The itinerary arrived promptly after confirmation.' },
  { name: 'Chinwe N.', city: 'Enugu', service: 'Stays and flights', rating: 5, text: 'Having the flight and stay details in one place made planning much easier. Support was polite and quick to respond.' },
  { name: 'Femi O.', city: 'Ibadan', service: 'Umrah tour', rating: 5, text: 'The tour options and travel steps were explained clearly. It helped our family feel more prepared before departure.' },
  { name: 'Zainab M.', city: 'Kano', service: 'Visa and travel planning', rating: 4, text: 'I received a useful checklist for the documents I needed to organize. The team was careful to explain that the visa decision was not theirs.' },
  { name: 'Emeka I.', city: 'Port Harcourt', service: 'Flight booking', rating: 5, text: 'The booking process was straightforward and my questions about the connection were answered before travel.' },
  { name: 'Aisha B.', city: 'Kaduna', service: 'Study travel planning', rating: 5, text: 'The initial study-abroad conversation helped me organize my questions about destination, course research, and travel planning.' },
  { name: 'Osas E.', city: 'Benin City', service: 'Holiday tour', rating: 4, text: 'The itinerary details were clear and the team followed up when I needed help understanding the stay terms.' },
  { name: 'Ngozi U.', city: 'Owerri', service: 'Stay reservation', rating: 5, text: 'The support team helped me understand the room details and check-in information before confirming.' },
  { name: 'Babatunde S.', city: 'Akure', service: 'Family flights', rating: 5, text: 'The options were easy to compare and I got help checking passenger details before the tickets were issued.' },
];

const CustomerReviews: React.FC = () => {
  const reviewsRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!reviewsRef.current) return;
    reviewsRef.current.scrollBy({ left: direction === 'left' ? -reviewsRef.current.clientWidth * 0.8 : reviewsRef.current.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
  <section className="border-y border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-700">Customer reviews</p>
          <h2 className="mb-3 text-3xl font-extrabold text-blue-950 md:text-4xl">Travelers share their experiences.</h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">Demo reviews from Nigerian traveler profiles, provided as illustrative sample content and not verified customer endorsements.</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" aria-label="Scroll customer reviews left" onClick={() => scroll('left')} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:bg-blue-900 hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" aria-label="Scroll customer reviews right" onClick={() => scroll('right')} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:bg-blue-900 hover:text-white"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
      <div ref={reviewsRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {reviews.map((review) => (
          <article key={review.name} className="flex min-h-[210px] w-[86vw] max-w-[360px] shrink-0 snap-start flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:w-[360px]">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex gap-0.5 text-amber-500" aria-label={`${review.rating} out of 5 demo stars`}>
                {Array.from({ length: review.rating }, (_, index) => <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />)}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">“{review.text}”</p>
            <div className="mt-3 border-t border-slate-100 pt-3">
              <p className="font-bold text-slate-900">{review.name}</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{review.city}, Nigeria</span><span aria-hidden="true">·</span><span>{review.service}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
  );
};

export default CustomerReviews;