'use client';
import { Zap } from 'lucide-react';

export default function BreakingTicker({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  const breakingNews = posts.slice(0, 10);

  return (
    <div className="bg-red-600 text-white flex items-center shadow-md overflow-hidden h-10">
      <div className="bg-red-800 font-bold text-xs md:text-sm px-4 py-2 flex items-center gap-1.5 z-10 whitespace-nowrap shadow-right">
        <Zap className="w-4 h-4 fill-amber-300 text-amber-300 animate-pulse" />
        <span>ব্রেকিং নিউজ:</span>
      </div>

      <div className="relative flex overflow-x-hidden w-full items-center">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs md:text-sm font-medium pl-4">
          {breakingNews.map((item, index) => (
            <span key={index} className="inline-flex items-center gap-2 cursor-pointer hover:underline">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300"></span>
              {item.title}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}