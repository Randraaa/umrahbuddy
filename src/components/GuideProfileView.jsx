import React, { useState } from 'react';
import { Star, ShieldAlert, Award, Calendar, CheckCircle, ArrowLeft, ArrowUpRight, Play, Volume2 } from 'lucide-react';

export default function GuideProfileView({ guide, currentUser, onBookGuide, onBack }) {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(guide.packages[0]);

  const toggleDate = (date) => {
    if (guide.schedule.includes(date)) {
      setSelectedDates(prev => 
        prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
      );
    }
  };

  const calculateSummary = () => {
    const totalDays = selectedDates.length;
    const dailyCost = selectedPackage.price * totalDays;
    const adminFee = totalDays > 0 ? 5 : 0; // Admin platform fee
    const total = dailyCost + adminFee;
    return { totalDays, dailyCost, adminFee, total };
  };

  const { totalDays, dailyCost, adminFee, total } = calculateSummary();

  const handleBookingSubmit = () => {
    if (selectedDates.length === 0) {
      alert("Silakan pilih tanggal bimbingan terlebih dahulu di kalender.");
      return;
    }

    if (currentUser.role === 'visitor') {
      alert("Silakan daftarkan akun Jamaah Anda terlebih dahulu untuk memesan Muthawwif.");
      onBookGuide({ redirectOnboard: true });
      return;
    }

    if (currentUser.role === 'guide') {
      alert("Maaf, akun Anda saat ini terdaftar sebagai Guide (Muthawwif). Anda tidak bisa melakukan booking guide.");
      return;
    }

    // Call book logic
    onBookGuide({
      guideId: guide.id,
      guideName: guide.name,
      dates: selectedDates,
      packageName: selectedPackage.name,
      totalCost: total
    });

    alert(`Alhamdulillah! Pesanan bimbingan dengan ${guide.name} berhasil dibuat. Dana Anda aman ditahan sementara di Escrow. Silakan koordinasikan keberangkatan.`);
  };

  return (
    <section className="section">
      <div className="container">
        <button onClick={onBack} className="btn btn-outline" style={{ marginBottom: '32px', borderRadius: '8px', padding: '8px 16px' }}>
          <ArrowLeft size={16} />
          <span>Kembali ke Hasil Pencarian</span>
        </button>

        <div className="profile-view">
          {/* Main Details */}
          <main className="profile-main-card">
            <div className="profile-top-header">
              <div className="profile-large-avatar">
                {guide.avatar}
              </div>
              <div className="profile-name-area">
                <h2>{guide.name}</h2>
                <div className="profile-cert">
                  <Award size={16} style={{ color: 'var(--clr-gold)', display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                  <span>{guide.certificate}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                  {guide.specialties.map(spec => (
                    <span key={spec} className="tag-badge" style={{ backgroundColor: 'var(--clr-emerald-glow)', color: 'var(--clr-emerald)', fontWeight: 600 }}>{spec}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Video Introduction */}
            <h3 className="profile-section-title">Video Perkenalan</h3>
            <div className="video-intro-container">
              <video controls src={guide.videoUrl}>
                Browser Anda tidak mendukung tag video.
              </video>
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Volume2 size={14} />
                <span>Tekan putar untuk perkenalan singkat</span>
              </div>
            </div>

            <h3 className="profile-section-title">Tentang Saya</h3>
            <p className="bio-text">{guide.bio}</p>

            <h3 className="profile-section-title">Ulasan Jamaah</h3>
            <div className="reviews-list-container">
              {guide.reviews.map((rev, idx) => (
                <div key={idx} className="review-card">
                  <div className="review-card-header">
                    <span className="reviewer-name">{rev.user}</span>
                    <span className="review-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < Math.floor(rev.rating) ? 'var(--clr-gold)' : 'none'} 
                          color="var(--clr-gold)" 
                        />
                      ))}
                    </span>
                  </div>
                  <p className="review-text">"{rev.comment}"</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-dark-muted)', marginTop: '8px', display: 'block' }}>Ibadah pada: {rev.date}</span>
                </div>
              ))}
            </div>
          </main>

          {/* Sidebar Booking Form */}
          <aside className="booking-widget">
            <h3 className="booking-widget-title">Pilih Jadwal & Paket</h3>
            
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--clr-text-dark-muted)', marginBottom: '8px' }}>
                <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
                Pilih Tanggal (Ketersediaan Guide)
              </label>
              
              <div className="booking-date-grid">
                {["2026-06-15", "2026-06-16", "2026-06-17", "2026-06-18", "2026-06-19", "2026-06-20", "2026-06-21", "2026-06-22"].map(date => {
                  const isAvail = guide.schedule.includes(date);
                  const isSel = selectedDates.includes(date);
                  const formattedDate = date.split('-')[2]; // just day
                  
                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={() => toggleDate(date)}
                      className={`date-btn ${isAvail ? (isSel ? 'selected' : 'available') : 'unavailable'}`}
                      disabled={!isAvail}
                      title={isAvail ? `${date} (Tersedia)` : `${date} (Penuh)`}
                    >
                      {formattedDate}
                    </button>
                  );
                })}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-dark-muted)' }}>* Angka menunjukkan tanggal aktif di bulan Juni 2026.</span>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--clr-text-dark-muted)', marginBottom: '8px' }}>
                Pilih Jenis Layanan
              </label>
              <div className="pack-select-group">
                {guide.packages.map(pack => (
                  <div 
                    key={pack.name}
                    onClick={() => setSelectedPackage(pack)}
                    className={`pack-option ${selectedPackage.name === pack.name ? 'selected' : ''}`}
                  >
                    <div className="pack-option-header">
                      <span>{pack.name}</span>
                      <span>${pack.price}/hari</span>
                    </div>
                    <p className="pack-option-desc">{pack.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Escrow Banner Guarantee */}
            <div className="escrow-box">
              <div className="escrow-header">
                <ShieldAlert size={16} />
                <span>Jaminan Aman Escrow</span>
              </div>
              <p style={{ lineHeight: '1.4', fontSize: '0.78rem', color: 'var(--clr-text-dark-muted)' }}>
                Dana bimbingan Anda ditahan aman oleh sistem escrow **Umrah Buddy**. Pembayaran baru diteruskan ke Muthawwif setelah ibadah selesai dan dikonfirmasi oleh Anda.
              </p>
            </div>

            {/* Price Summary */}
            <div className="pricing-summary">
              <div className="summary-row">
                <span>Tarif Bimbingan ({totalDays} hari)</span>
                <span>${dailyCost}</span>
              </div>
              <div className="summary-row">
                <span>Biaya Platform (Jaminan Escrow)</span>
                <span>${adminFee}</span>
              </div>
              <div className="summary-row total">
                <span>Total Estimasi</span>
                <span>${total}</span>
              </div>
            </div>

            <button 
              onClick={handleBookingSubmit}
              className="btn btn-secondary" 
              style={{ width: '100%', borderRadius: '12px' }}
            >
              <span>Booking Muthawwif</span>
              <ArrowUpRight size={16} />
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
