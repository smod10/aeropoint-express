import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock3, User } from 'lucide-react';
import { blogArticles } from '../data/blogArticles';
import { imageFallbacks } from '../utils/imageFallbacks';

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All articles');
  const categories = ['All articles', ...new Set(blogArticles.map((article) => article.category))];
  const visibleArticles = activeCategory === 'All articles'
    ? blogArticles
    : blogArticles.filter((article) => article.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-blue-950 px-4 pb-14 pt-32 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-300">Aeropoint journal</p>
          <h1 className="max-w-3xl text-4xl font-extrabold md:text-5xl">Travel stories and practical guides</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-blue-100">Ideas and useful details for planning journeys, pilgrimages, and time away.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2" aria-label="Filter articles by category">
          {categories.map((category) => (
            <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? 'border-blue-900 bg-blue-900 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-blue-900 hover:text-blue-900'}`}>
              {category}
            </button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleArticles.map((article) => (
            <article key={article.id} className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
              <Link to={`/blog/${article.slug}`} className="relative block aspect-[16/10] overflow-hidden" aria-label={`Read ${article.title}`}>
                <img src={article.image} alt="" onError={(event) => { event.currentTarget.src = imageFallbacks.blog; }} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded bg-white px-3 py-1 text-xs font-bold uppercase text-blue-900">{article.category}</span>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{article.date}</span>
                  <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{article.readTime}</span>
                </div>
                <h2 className="text-xl font-bold leading-snug text-blue-950 group-hover:text-blue-800"><Link to={`/blog/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">{article.title}</Link></h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{article.excerpt}</p>
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500"><User className="h-3.5 w-3.5" />{article.author}</span>
                  <Link to={`/blog/${article.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-blue-900 hover:text-amber-700">Read article <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;