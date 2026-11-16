'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import BreakingTicker from '@/components/BreakingTicker';
import NewsModal from '@/components/NewsModal';
import { Eye, Clock, Tag, Image as ImageIcon } from 'lucide-react';

export default function Home() {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalPost, setActiveModalPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    setLoading(true);

    if (selectedCategory === 'saved') {
      const saved = JSON.parse(localStorage.getItem('saved_news') || '[]');
      setNews(saved);
      setLoading(false);
      return;
    }

    try {
      let url = `http://localhost:5000/api/news?category=${selectedCategory}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

      const res = await fetch(url);
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error("News fetch failed:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const leadNews = news[0];
  const remainingNews = news.slice(1);

  return (
    <main className="min-h-screen pb-12 bg-gray-50">
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => { setSelectedCategory(category); setSearchQuery(''); }}
        onSearch={(query) => setSearchQuery(query)}
      />
      <BreakingTicker posts={news} />

      <div className="max-w-7xl mx-auto px-4 mt-6">
        {searchQuery && (
          <div className="mb-4 text-sm text-gray-600">
            খোঁজা হয়েছে: <span className="font-bold text-red-600">"{searchQuery}"</span> (ফলাফল: {news.length} টি)
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 text-gray-500">সংবাদ লোড হচ্ছে...</div>
        ) : news.length === 0 ? (
          <div className="text-center py-16 text-gray-500">কোনো খবর পাওয়া যায়নি।</div>
        ) : (
          <>
            {/* Hero / Lead News - পুরো কার্ডে ক্লিকযোগ্য */}
            {leadNews && (
              <div 
                onClick={() => setActiveModalPost(leadNews)}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-8 hover:shadow-md hover:border-red-300 transition grid grid-cols-1 lg:grid-cols-12 cursor-pointer"
              >
                <div className="lg:col-span-7 relative bg-gray-900 min-h-[250px] lg:min-h-[350px] flex items-center justify-center">
                  {leadNews.isVideo && leadNews.videoUrl ? (
                    <iframe
                      src={leadNews.videoUrl}
                      title={leadNews.title}
                      className="w-full h-full min-h-[250px] lg:min-h-[350px] border-0 pointer-events-none"
                    ></iframe>
                  ) : leadNews.imageUrl ? (
                    <img 
                      src={leadNews.imageUrl} 
                      alt={leadNews.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-2">
                      <ImageIcon className="w-12 h-12 opacity-40" />
                      <span className="text-xs">ছবি উপলব্ধ নেই</span>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded">
                        {leadNews.source?.name}
                      </span>
                      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {leadNews.category}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold hover:text-red-600 leading-snug mb-3 transition">
                      {leadNews.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4">
                      {leadNews.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(leadNews.publishedAt).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="inline-flex items-center text-sm font-semibold text-red-600 gap-1">
                      পপ-আপে পড়ুন <Eye className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* News Grid - গ্রিডের প্রতিটি কার্ডের যেকোনো জায়গায় ক্লিকযোগ্য */}
            <h3 className="text-xl font-bold border-b-2 border-red-600 pb-2 mb-6 text-gray-800 flex justify-between items-center">
              <span>{selectedCategory === 'all' ? 'সর্বশেষ সংবাদ' : `${selectedCategory} সংবাদ`}</span>
              <span className="text-xs font-normal text-gray-500">মোট: {news.length} টি</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingNews.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setActiveModalPost(item)}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-red-300 hover:shadow-md transition cursor-pointer"
                >
                  <div>
                    <div className="relative h-48 bg-gray-900 overflow-hidden flex items-center justify-center">
                      {item.isVideo && item.videoUrl ? (
                        <iframe
                          src={item.videoUrl}
                          title={item.title}
                          className="w-full h-full border-0 pointer-events-none"
                        ></iframe>
                      ) : item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ImageIcon className="w-8 h-8 opacity-40" />
                        </div>
                      )}

                      <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow pointer-events-none">
                        {item.source?.name}
                      </span>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{item.category}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(item.publishedAt).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <h4 className="font-bold text-base hover:text-red-600 line-clamp-2 mb-2 leading-snug transition">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-2">
                    <span className="text-xs font-semibold text-red-600 flex items-center gap-1 w-full justify-end border-t pt-2">
                      পপ-আপে পড়ুন <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <NewsModal
        post={activeModalPost}
        onClose={() => setActiveModalPost(null)}
      />
    </main>
  );
}