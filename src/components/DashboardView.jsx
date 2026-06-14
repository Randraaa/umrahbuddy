import React, { useState } from 'react';
import { Calendar, CreditCard, MessageSquare, BadgeCheck, CheckCircle2, User, Wallet, ShieldAlert, Star } from 'lucide-react';

export default function DashboardView({ currentUser, bookings, onConfirmCompletion, onOpenChat }) {
  const [activeTab, setActiveTab] = useState('bookings');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const pilgrimBookings = bookings.filter(b => b.pilgrimName === currentUser.name);
  const guideBookings = bookings.filter(b => b.guideName === currentUser.name);

  const calculateWalletBalance = () => {
    let held = 0;
    let available = 0;
    guideBookings.forEach(b => {
      if (b.status === 'escrow') {
        held += b.totalCost * 0.9; // 90% goes to guide, 10% platform fee
      } else if (b.status === 'completed') {
        available += b.totalCost * 0.9;
      }
    });
    return { held: held.toFixed(2), available: available.toFixed(2) };
  };

  const handleOpenReviewModal = (booking) => {
    setSelectedBookingForReview(booking);
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    alert(`Terima kasih! Ulasan Anda untuk Muthawwif telah terkirim.\nRating: ${rating}/5\nKomentar: "${comment}"`);
    setReviewModalOpen(false);
    setComment('');
    
    // Simulate updating the booking with reviewed status
    selectedBookingForReview.reviewed = true;
  };

  // --- 1. PILGRIM (JAMAAH) VIEW ---
  if (currentUser.role === 'pilgrim') {
    return (
      <div className="container" style={{ padding: '60px 24px' }}>
        <div className="dash-layout">
          {/* Sidebar */}
          <aside className="dash-sidebar">
            <div className="dash-user-card">
              <div className="dash-user-avatar">
                {currentUser.name.substring(0, 2).toUpperCase()}
              </div>
              <h4 className="dash-user-name">{currentUser.name}</h4>
              <span className="dash-user-role">Jamaah</span>
            </div>

            <div className="dash-menu">
              <button 
                onClick={() => setActiveTab('bookings')} 
                className={`dash-menu-item ${activeTab === 'bookings' ? 'active' : ''}`}
              >
                <Calendar size={18} />
                <span>Booking Aktif</span>
              </button>
              <button 
                onClick={() => setActiveTab('profile')} 
                className={`dash-menu-item ${activeTab === 'profile' ? 'active' : ''}`}
              >
                <User size={18} />
                <span>Profil Ibadah</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="dash-main">
            {activeTab === 'bookings' && (
              <>
                <h3 className="dash-section-title">Booking Pemandu Aktif</h3>
                
                {pilgrimBookings.length === 0 ? (
                  <div style={{ backgroundColor: 'var(--clr-white)', padding: '48px', borderRadius: '16px', textCenter: 'center', border: '1px solid var(--clr-gray-med)', textAlign: 'center' }}>
                    <p style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--clr-emerald)', marginBottom: '8px' }}>Belum ada booking aktif</p>
                    <p style={{ color: 'var(--clr-text-dark-muted)' }}>Cari pemandu ibadah terbaik untuk mendampingi ritual umrah Anda.</p>
                  </div>
                ) : (
                  <div className="bookings-list">
                    {pilgrimBookings.map(b => (
                      <div key={b.id} className="booking-item-card">
                        <div className="booking-item-details">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <h4>Muthawwif: {b.guideName}</h4>
                            <span className={`booking-status-badge ${b.status === 'escrow' ? 'escrow' : 'completed'}`}>
                              {b.status === 'escrow' ? 'Dana di Escrow' : 'Ibadah Selesai'}
                            </span>
                          </div>
                          
                          <div className="booking-item-meta">
                            <div className="guide-meta-item">
                              <Calendar size={14} />
                              <span>{b.dates.join(', ')}</span>
                            </div>
                            <div className="guide-meta-item">
                              <CreditCard size={14} />
                              <span>Paket: {b.packageName}</span>
                            </div>
                            <div className="guide-meta-item" style={{ fontWeight: 600, color: 'var(--clr-emerald)' }}>
                              <span>Total: ${b.totalCost}</span>
                            </div>
                          </div>

                          {b.status === 'escrow' ? (
                            <p style={{ fontSize: '0.82rem', color: 'var(--clr-text-dark-muted)', borderLeft: '3px solid var(--clr-gold)', paddingLeft: '8px' }}>
                              <strong>Status Pembayaran:</strong> Dana Anda aman ditahan sementara di rekening escrow **Umrah Buddy** dan baru akan dicairkan ke Muthawwif setelah ibadah rampung dan Anda konfirmasi di bawah ini.
                            </p>
                          ) : (
                            <p style={{ fontSize: '0.82rem', color: 'var(--clr-success)', borderLeft: '3px solid var(--clr-success)', paddingLeft: '8px' }}>
                              <strong>Ibadah Selesai:</strong> Dana telah dirilis ke pemandu. Terima kasih telah mempercayakan bimbingan ibadah Anda pada Umrah Buddy. Semoga ibadah Umrah Anda Mabrur.
                            </p>
                          )}
                        </div>

                        <div className="booking-actions">
                          <button 
                            onClick={() => onOpenChat(b.guideId, b.guideName)}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                          >
                            <MessageSquare size={16} />
                            <span>Chat</span>
                          </button>
                          
                          {b.status === 'escrow' && (
                            <button 
                              onClick={() => onConfirmCompletion(b.id)}
                              className="btn btn-primary btn-sm"
                              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                            >
                              <CheckCircle2 size={16} />
                              <span>Konfirmasi Selesai</span>
                            </button>
                          )}

                          {b.status === 'completed' && !b.reviewed && (
                            <button 
                              onClick={() => handleOpenReviewModal(b)}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                            >
                              <Star size={16} />
                              <span>Beri Ulasan</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'profile' && (
              <>
                <h3 className="dash-section-title">Profil Ibadah Jamaah</h3>
                <div style={{ backgroundColor: 'var(--clr-white)', padding: '32px', borderRadius: '16px', border: '1px solid var(--clr-gray-med)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-dark-muted)', fontWeight: 700 }}>Nama Jamaah</span>
                      <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '16px' }}>{currentUser.name}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-dark-muted)', fontWeight: 700 }}>Kebutuhan Khusus</span>
                      <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '16px' }}>{currentUser.details?.specialNeeds || 'Tidak Ada'}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-dark-muted)', fontWeight: 700 }}>Bahasa Komunikasi</span>
                      <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '16px' }}>{currentUser.details?.language || 'Indonesian'}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-dark-muted)', fontWeight: 700 }}>Level Pemahaman Ritual</span>
                      <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '16px' }}>{currentUser.details?.knowledgeLevel || 'Pemula'}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>

        {/* Review Modal */}
        {reviewModalOpen && (
          <div className="modal active">
            <div className="modal-content glass-card" style={{ maxWidth: '500px' }}>
              <div style={{ padding: '32px', color: '#fff' }}>
                <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '16px' }}>Beri Ulasan Muthawwif</h3>
                <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="form-group">
                    <label style={{ color: '#fff' }}>Rating (1 - 5 Bintang)</label>
                    <select 
                      value={rating} 
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      style={{ backgroundColor: 'var(--clr-charcoal-light)', color: '#fff', border: '1px solid var(--clr-gold)' }}
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5 - Sangat Memuaskan</option>
                      <option value="4">⭐⭐⭐⭐ 4 - Sangat Baik</option>
                      <option value="3">⭐⭐⭐ 3 - Cukup Baik</option>
                      <option value="2">⭐⭐ 2 - Kurang Memuaskan</option>
                      <option value="1">⭐ 1 - Buruk</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ color: '#fff' }}>Komentar Ulasan</label>
                    <textarea 
                      rows="4" 
                      value={comment} 
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Bagikan pengalaman ibadah Anda dipandu Muthawwif ini..."
                      required
                      style={{ backgroundColor: 'var(--clr-charcoal-light)', color: '#fff', border: '1px solid var(--clr-gold)' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <button 
                      type="button" 
                      onClick={() => setReviewModalOpen(false)} 
                      className="btn btn-outline"
                      style={{ color: '#fff', borderColor: '#fff' }}
                    >
                      Batal
                    </button>
                    <button type="submit" className="btn btn-secondary">Kirim Ulasan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- 2. GUIDE (MUTHAWWIF) VIEW ---
  const { held, available } = calculateWalletBalance();

  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      <div className="dash-layout">
        {/* Sidebar */}
        <aside className="dash-sidebar">
          <div className="dash-user-card">
            <div className="dash-user-avatar">
              {currentUser.name.substring(0, 2).toUpperCase()}
            </div>
            <h4 className="dash-user-name">{currentUser.name}</h4>
            <span className="dash-user-role">Muthawwif</span>
          </div>

          <div className="dash-menu">
            <button 
              onClick={() => setActiveTab('bookings')} 
              className={`dash-menu-item ${activeTab === 'bookings' ? 'active' : ''}`}
            >
              <Calendar size={18} />
              <span>Daftar Order</span>
            </button>
            <button 
              onClick={() => setActiveTab('wallet')} 
              className={`dash-menu-item ${activeTab === 'wallet' ? 'active' : ''}`}
            >
              <Wallet size={18} />
              <span>Dompet & Escrow</span>
            </button>
            <button 
              onClick={() => setActiveTab('verification')} 
              className={`dash-menu-item ${activeTab === 'verification' ? 'active' : ''}`}
            >
              <BadgeCheck size={18} />
              <span>Status Verifikasi</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dash-main">
          {activeTab === 'bookings' && (
            <>
              <h3 className="dash-section-title">Pesanan Bimbingan Jamaah</h3>
              
              {guideBookings.length === 0 ? (
                <div style={{ backgroundColor: 'var(--clr-white)', padding: '48px', borderRadius: '16px', textCenter: 'center', border: '1px solid var(--clr-gray-med)', textAlign: 'center' }}>
                  <p style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--clr-emerald)', marginBottom: '8px' }}>Belum ada pesanan bimbingan</p>
                  <p style={{ color: 'var(--clr-text-dark-muted)' }}>Pesanan bimbingan dari Jamaah akan ditampilkan di panel ini.</p>
                </div>
              ) : (
                <div className="bookings-list">
                  {guideBookings.map(b => (
                    <div key={b.id} className="booking-item-card">
                      <div className="booking-item-details">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <h4>Jamaah: {b.pilgrimName}</h4>
                          <span className={`booking-status-badge ${b.status === 'escrow' ? 'escrow' : 'completed'}`}>
                            {b.status === 'escrow' ? 'Dana di Escrow' : 'Selesai & Dirilis'}
                          </span>
                        </div>
                        
                        <div className="booking-item-meta">
                          <div className="guide-meta-item">
                            <Calendar size={14} />
                            <span>Jadwal: {b.dates.join(', ')}</span>
                          </div>
                          <div className="guide-meta-item">
                            <CreditCard size={14} />
                            <span>Layanan: {b.packageName}</span>
                          </div>
                          <div className="guide-meta-item" style={{ fontWeight: 600, color: 'var(--clr-emerald)' }}>
                            <span>Total Tarif: ${b.totalCost}</span>
                          </div>
                        </div>

                        {b.status === 'escrow' ? (
                          <p style={{ fontSize: '0.82rem', color: 'var(--clr-text-dark-muted)', borderLeft: '3px solid var(--clr-gold)', paddingLeft: '8px' }}>
                            <strong>Escrow Lock:</strong> Dana dari Jamaah telah disetor dan sedang ditahan aman di sistem escrow platform. Dana akan otomatis cair ke Saldo Dompet Anda setelah ibadah selesai dan dikonfirmasi Jamaah.
                          </p>
                        ) : (
                          <p style={{ fontSize: '0.82rem', color: 'var(--clr-success)', borderLeft: '3px solid var(--clr-success)', paddingLeft: '8px' }}>
                            <strong>Lunas:</strong> Ibadah telah dikonfirmasi selesai. Saldo sebesar 90% (setelah biaya admin platform 10%) telah dirilis ke Dompet Anda dan siap ditarik.
                          </p>
                        )}
                      </div>

                      <div className="booking-actions">
                        <button 
                          onClick={() => onOpenChat(b.pilgrimId, b.pilgrimName)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                        >
                          <MessageSquare size={16} />
                          <span>Chat Jamaah</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'wallet' && (
            <>
              <h3 className="dash-section-title">Dompet Muthawwif</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div className="escrow-dashboard-box">
                  <div className="escrow-dash-title">
                    <Wallet size={18} />
                    <span>Saldo Escrow (Tertahan)</span>
                  </div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--clr-gold-dark)', marginBottom: '8px' }}>
                    ${held}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-dark-muted)' }}>Dana bimbingan dari pesanan yang sedang berjalan. Akan dilepaskan setelah konfirmasi jamaah.</p>
                </div>

                <div className="escrow-dashboard-box" style={{ borderColor: 'var(--clr-emerald)' }}>
                  <div className="escrow-dash-title" style={{ color: 'var(--clr-emerald)' }}>
                    <CheckCircle2 size={18} />
                    <span>Saldo Bisa Dicairkan</span>
                  </div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--clr-emerald)', marginBottom: '8px' }}>
                    ${available}
                  </div>
                  <button 
                    disabled={parseFloat(available) <= 0}
                    className="btn btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.8rem', width: '100%', borderRadius: '8px', opacity: parseFloat(available) <= 0 ? 0.5 : 1 }}
                    onClick={() => { alert(`Penarikan dana sebesar $${available} berhasil diproses ke rekening bank Anda.`); }}
                  >
                    Tarik Dana ke Rekening Bank
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'verification' && (
            <>
              <h3 className="dash-section-title">Kredensial & Verifikasi</h3>
              
              <div className="verification-card">
                <h4>Status Dokumen: Sedang Ditinjau Admin ⏳</h4>
                <p>
                  Sertifikat dan video perkenalan yang Anda upload saat registrasi sedang diperiksa oleh tim verifikasi Umrah Buddy untuk menjaga keamanan dan kesucian ekosistem bimbingan.
                </p>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '16px', borderRadius: '8px', fontSize: '0.85rem' }}>
                  <strong>Lisensi yang di-submit:</strong> {currentUser.details?.certificateName || 'Sertifikasi Muthawwif Umum'}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
