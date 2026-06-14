import React from 'react';
import { Compass, Users, BadgeCheck, ArrowRight } from 'lucide-react';

export default function Hero({ setView }) {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-tagline">
            <Compass size={14} />
            <span>Koneksi Spiritual Personal</span>
          </div>
          
          <h1 className="hero-title">
            Temukan Pemandu Terbaik Untuk <span>Ibadah Umrah</span> Anda
          </h1>
          
          <p className="hero-desc">
            Hubungkan diri Anda secara langsung dengan Muthawwif (guide) berpengalaman dan terverifikasi secara aman. Dapatkan bimbingan ritual manasik personal dan jadikan perjalanan spiritual Anda aman terlindungi di setiap langkah.
          </p>
          
          <div className="hero-btns">
            <button onClick={() => setView('search')} className="btn btn-secondary">
              <span>Cari Pemandu Ibadah</span>
              <ArrowRight size={16} />
            </button>
            <button onClick={() => setView('onboarding')} className="btn btn-white">
              <span>Daftar Sebagai Guide</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
