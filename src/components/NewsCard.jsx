import React from 'react';

export default function NewsCard({ news }) {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      {/* সংবাদের উৎস ও তারিখ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
        <span style={{ fontWeight: 'bold', color: '#2563eb' }}>{news.source?.name}</span>
        <span>{new Date(news.publishedAt).toLocaleDateString('bn-BD')}</span>
      </div>

      {/* সংবাদের শিরোনাম */}
      <h3 style={{ fontSize: '18px', margin: '0 0 12px 0', color: '#0f172a', lineHeight: '1.4' }}>
        {news.title}
      </h3>

      {/* 🎥 ভিডিও সংবাদ হলে সরাসরি প্লেয়ার চলবে, সাধারণ সংবাদ হলে ছবি দেখানো হবে */}
      {news.isVideo && news.videoUrl ? (
        <div style={{
          position: 'relative',
          paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
          height: 0,
          overflow: 'hidden',
          borderRadius: '8px',
          backgroundColor: '#000',
          marginBottom: '12px'
        }}>
          <iframe
            src={news.videoUrl}
            title={news.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        news.imageUrl && (
          <img
            src={news.imageUrl}
            alt={news.title}
            style={{
              width: '100%',
              height: '220px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '12px'
            }}
          />
        )
      )}

      {/* সংবাদের সংক্ষিপ্ত অংশ */}
      {news.excerpt && (
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
          {news.excerpt}
        </p>
      )}

      {/* মূল লিংকে যাওয়ার বাটন */}
      <a
        href={news.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}
      >
        বিস্তারিত পড়ুন →
      </a>
    </div>
  );
}