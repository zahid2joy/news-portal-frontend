'use client';

import Link from 'next/link';
import { Calendar, Search } from 'lucide-react';
import { useState } from 'react';

export default function Header({ selectedCategory, onSelectCategory, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'সব খবর' },
    { id: 'saved', name: '📌 সেভ করা খবর' }, // <--- এই লাইনটি যোগ করুন
    { id: 'ভিডিও', name: '🎥 ভিডিও' },
    { id: 'জাতীয়', name: 'জাতীয়' },
    { id: 'রাজনীতি', name: 'রাজনীতি' },
    { id: 'খেলাধুলা', name: 'খেলাধুলা' },
    { id: 'বিনোদন', name: 'বিনোদন' },
    { id: 'অর্থনীতি', name: 'অর্থনীতি' },
    { id: 'প্রযুক্তি', name: 'প্রযুক্তি' },
    { id: 'আন্তর্জাতিক', name: 'আন্তর্জাতিক' },
  ];

  const today = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-xs text-gray-600 border-b border-gray-100">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{today}</span>
        </div>
        <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">লাইভ আপডেট</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <Link href="/">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 tracking-tight">
            দৈনিক খবর
          </h1>
        </Link>
        <p className="text-sm text-gray-500 mt-1">জাতীয় সংবাদের বিশ্বস্ত এগ্রিগেটর</p>
      </div>

      {/* Category Navigation Bar */}
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4 py-2">
          <div className="flex gap-1 md:gap-2 text-sm font-medium overflow-x-auto py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1 rounded transition whitespace-nowrap ${
                  selectedCategory === cat.id ? 'bg-red-600 text-white' : 'hover:text-red-400 text-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="খবর খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 text-white text-xs rounded-full pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500 w-36 md:w-48"
            />
            <button type="submit" className="absolute right-2 text-gray-400 hover:text-white">
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}