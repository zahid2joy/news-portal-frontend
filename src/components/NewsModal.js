'use client';
import { X, ExternalLink, Clock, Bookmark, Share2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function NewsModal({ post, onClose }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!post) return;
    const savedNews = JSON.parse(localStorage.getItem('saved_news') || '[]');
    const exists = savedNews.some((item) => item.id === post.id);
    setIsBookmarked(exists);
  }, [post]);

  if (!post) return null;

  // বুকমার্ক টগল ফাংশন
  const toggleBookmark = () => {
    let savedNews = JSON.parse(localStorage.getItem('saved_news') || '[]');
    if (isBookmarked) {
      savedNews = savedNews.filter((item) => item.id !== post.id);
      setIsBookmarked(false);
    } else {
      savedNews.push(post);
      setIsBookmarked(true);
    }
    localStorage.setItem('saved_news', JSON.stringify(savedNews));
  };

  // লিংক কপি / শেয়ার ফাংশন
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(post.sourceUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded">
              {post.source?.name || 'সংবাদ'}
            </span>
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded">
              {post.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleBookmark}
              title={isBookmarked ? 'বুকমার্ক সরান' : 'সেভ করুন'}
              className={`p-1.5 rounded-full border transition ${
                isBookmarked ? 'bg-red-50 border-red-500 text-red-600' : 'hover:bg-gray-200 text-gray-600 border-gray-300'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={handleShare}
              title="লিংক কপি করুন"
              className="p-1.5 hover:bg-gray-200 text-gray-600 rounded-full border border-gray-300 transition"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-gray-200 rounded-full text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 leading-snug">
            {post.title}
          </h2>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {new Date(post.publishedAt).toLocaleString('bn-BD', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}
            </span>
          </div>
          <p className="text-gray-700 text-base leading-relaxed border-t pt-4">
            {post.excerpt || "সংবাদটির বিস্তারিত অংশ দেখতে মূল সোর্সে ভিজিট করুন।"}
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
          {copied && <span className="text-xs text-green-600 font-medium">লিংক কপি হয়েছে!</span>}
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition ml-auto"
          >
            মূল ওয়েবসাইটে পুরো খবর পড়ুন <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}