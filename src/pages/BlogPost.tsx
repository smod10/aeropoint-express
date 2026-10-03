import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock3, User } from 'lucide-react';
import { blogArticles } from '../data/blogArticles';
import { imageFallbacks } from '../utils/imageFallbacks';

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const article = blogArticles.find((item) => item.slug === slug);

  if (!article) return <Navigate to="/blog" replace />;

  return (
    <article className="min-h-screen bg-white pb-20">
      <header className="bg-blue-950 px-4 pb-12 pt-32 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-100 transition hover:text-white"><ArrowLeft className="h-4 w-4" />All articles</Link>
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-300">{article.category}</p>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{article.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-blue-100">{article.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-blue-100">
            <span className="inline-flex items-center gap-2"><User className="h-4 w-4" />{article.author}</span>
            <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" />{article.date}</span>
            <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{article.readTime}</span>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <img src={article.image} alt="" onError={(event) => { event.currentTarget.src = imageFallbacks.blog; }} className="-mt-2 aspect-[16/8] w-full rounded-lg object-cover shadow-sm" />
        <div className="mx-auto max-w-3xl py-10">
          <div className="space-y-6 text-base leading-8 text-slate-700">
            {article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="mt-10 border-t border-slate-200 pt-6">
            <Link to="/blog" className="inline-flex items-center gap-2 font-bold text-blue-900 hover:text-amber-700"><ArrowLeft className="h-4 w-4" />Back to all articles</Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;