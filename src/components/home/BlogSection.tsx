import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const BlogSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const posts = [
    { id: 1, title: "Top 10 Hidden Gems to Visit in Zanzibar This Summer", excerpt: "Escape the crowds and discover the pristine, untouched beaches and rich cultural heritage that Zanzibar has to offer off the beaten path.", image: "[https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", date: "Jun 12, 2026", author: "Sarah Ahmed", category: "Travel Guides" },
    { id: 2, title: "Everything You Need to Know Before Your First Umrah", excerpt: "A comprehensive guide covering visa requirements, packing essentials, and spiritual preparation for a smooth and fulfilling Umrah journey.", image: "[https://images.unsplash.com/photo-1564769625905-50e93615e769?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1564769625905-50e93615e769?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", date: "Jun 05, 2026", author: "Mohammed Tariq", category: "Pilgrimage" },
    { id: 3, title: "How to Score the Best Flight Deals During Peak Season", excerpt: "Our travel experts share their top secrets on navigating airline pricing, using flexible dates, and booking at the exact right moment.", image: "[https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", date: "May 28, 2026", author: "David Osei", category: "Tips & Tricks" },
    { id: 4, title: "The Ultimate Packing List for a Tropical Getaway", excerpt: "Don't leave anything behind! Follow our essential packing list to ensure you have everything needed for a stress-free tropical vacation.", image: "[https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)", date: "May 15, 2026", author: "Amanda Lee", category: "Travel Guides" }
  ];

  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-100 overflow-hidden">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-4">Travel Inspiration & Guides</h2>
            <p className="text-slate-500 max-w-2xl text-lg">Stay updated with our latest tips, destination guides, and travel news to help you plan your next perfect trip.</p>
          </div>
          
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <div className="hidden md:flex gap-2 mr-4">
              <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-blue-900 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-blue-900 hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Link to="/" className="text-blue-900 font-semibold flex items-center hover:text-amber-500 transition-colors">
              Read all articles <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

        <div ref={scrollRef} className="flex overflow-x-auto gap-6 pb-8 pt-4 snap-x snap-mandatory hide-scrollbar scroll-smooth">
          {posts.map((post) => (
            <div key={post.id} className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-lg transition-all duration-300 snap-start shrink-0 w-[85vw] sm:w-[45vw] lg:w-[calc(33.333%-1rem)]">
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${post.image}')` }} />
                <div className="absolute top-4 left-4 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col h-[calc(100%-14rem)]">
                <div className="flex items-center space-x-4 text-xs font-medium text-slate-400 mb-4">
                  <div className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5" /> {post.date}</div>
                  <div className="flex items-center"><User className="w-3.5 h-3.5 mr-1.5" /> {post.author}</div>
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3 leading-snug group-hover:text-amber-500 transition-colors line-clamp-2">
                  <Link to="/">{post.title}</Link>
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <Link to="/" className="inline-flex items-center text-sm font-bold text-blue-900 hover:text-amber-500 transition-colors mt-auto">
                  Read More <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
