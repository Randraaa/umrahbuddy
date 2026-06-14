import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import SearchListing from './components/SearchListing';
import GuideProfileView from './components/GuideProfileView';
import Onboarding from './components/Onboarding';
import DashboardView from './components/DashboardView';
import InAppChat from './components/InAppChat';
import { Shield, Sparkles, MessageSquare, Compass, CreditCard, Users } from 'lucide-react';

const initialGuides = [
  {
    id: "guide-1",
    name: "Ustadz Ahmad Fauzi, Lc.",
    avatar: "AF",
    city: "Makkah",
    languages: ["Indonesian", "Arabic", "English"],
    rating: 4.9,
    reviewsCount: 124,
    price: 45,
    specialties: ["Family Guide", "Elderly Care", "Group Tour"],
    verified: true,
    certificate: "Lulusan Umm al-Qura University - Lisensi Kemenag RI",
    bio: "Lulusan S1 Fiqih di Universitas Umm al-Qura Makkah. Berpengalaman selama 8 tahun mendampingi jamaah umrah mandiri maupun agen travel dari Indonesia. Menguasai rute-rute ziarah bersejarah dan sangat terbiasa mendampingi jamaah lansia menggunakan kursi roda secara aman.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    packages: [
      { name: "Spiritual Companion Standard", price: 45, desc: "Pendampingan manasik (Tawaf, Sa'i, Tahallul) plus ziarah Makkah." },
      { name: "Full VIP Care", price: 95, desc: "Bimbingan manasik eksklusif privat, penyediaan kursi roda, dan bantuan pengaturan taksi bandara." }
    ],
    schedule: ["2026-06-18", "2026-06-19", "2026-06-20", "2026-06-21", "2026-06-25", "2026-06-26"],
    reviews: [
      { user: "Haji Sulaiman", rating: 5, comment: "Ustadz Ahmad sangat sabar mendampingi ibu kami yang memakai kursi roda di area Mataf yang ramai.", date: "Mei 2026" },
      { user: "Riza & Keluarga", rating: 4.8, comment: "Responsif sejak sebelum kami berangkat dari Bandara Soetta. Sangat membimbing.", date: "April 2026" }
    ]
  },
  {
    id: "guide-2",
    name: "Dr. Faisal Harun, M.A.",
    avatar: "FH",
    city: "Madinah",
    languages: ["English", "Arabic", "Turkish"],
    rating: 5.0,
    reviewsCount: 89,
    price: 65,
    specialties: ["Solo Traveler", "Academic / History Focus", "Youth Groups"],
    verified: true,
    certificate: "Ph.D. Sejarah Islam - Lisensi Guide Resmi Arab Saudi",
    bio: "Doktor Sejarah Peradaban Islam. Pemandu spesialis sejarah keislaman di Madinah. Sangat direkomendasikan bagi jamaah muda atau akademisi yang ingin memahami detail teologis dan historis di balik perang Uhud, Masjid Quba, dan perkembangan arsitektur Nabawi.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    packages: [
      { name: "Historical Deep Dive", price: 65, desc: "Bimbingan umrah Madinah dengan seminar sejarah mendalam di lokasi-lokasi Ziyarah." }
    ],
    schedule: ["2026-06-15", "2026-06-16", "2026-06-17", "2026-06-22", "2026-06-23"],
    reviews: [
      { user: "Dr. Tariq", rating: 5, comment: "Incredible historical insights. It felt like walking through early Islamic history books.", date: "Maret 2026" }
    ]
  },
  {
    id: "guide-3",
    name: "Siti Rahma, Lc.",
    avatar: "SR",
    city: "Makkah & Madinah",
    languages: ["Indonesian", "Arabic", "Malay"],
    rating: 4.8,
    reviewsCount: 76,
    price: 50,
    specialties: ["Female Only Groups", "Family Guide"],
    verified: true,
    certificate: "Lulusan Ushuluddin Al-Azhar Kairo - Sertifikasi Fiqih Nisa",
    bio: "Ustadzah lulusan Universitas Al-Azhar Mesir. Mengkhususkan diri untuk membimbing rombongan jamaah wanita mandiri dan rombongan keluarga. Menjawab dan membimbing urusan fiqih wanita/fiqih nisa secara tertutup dan nyaman.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    packages: [
      { name: "Pendamping Fiqih Nisa", price: 50, desc: "Manasik & Tanya-jawab fiqih nisa privat selama di Makkah." },
      { name: "Family Package", price: 80, desc: "Pendampingan manasik komprehensif bagi keluarga besar dengan anak kecil." }
    ],
    schedule: ["2026-06-20", "2026-06-21", "2026-06-22", "2026-06-23", "2026-06-24"],
    reviews: [
      { user: "Hajjah Aisyah", rating: 5, comment: "Ustadzah Siti sangat memahami permasalahan fiqih wanita. Ibadah menjadi tenang.", date: "Januari 2026" }
    ]
  }
];

export default function App() {
  const [currentView, setView] = useState('home'); // home, search, profile, onboarding, dashboard, chat
  const [selectedGuideId, setSelectedGuideId] = useState(null);
  const [activeChat, setActiveChat] = useState(null); // { partnerId, partnerName }
  
  // Simulated Logged In User State
  const [currentUser, setCurrentUser] = useState({
    role: 'visitor', // visitor, pilgrim, guide
    name: '',
    email: '',
    details: null
  });

  // Simulated Global Bookings State
  const [bookings, setBookings] = useState([
    {
      id: "book-1",
      guideId: "guide-1",
      guideName: "Ustadz Ahmad Fauzi, Lc.",
      pilgrimId: "pilgrim-mock",
      pilgrimName: "Haji Hasan",
      dates: ["2026-06-18", "2026-06-19"],
      packageName: "Spiritual Companion Standard",
      totalCost: 95,
      status: "escrow", // escrow, completed
      reviewed: false
    }
  ]);

  // Handle Switch to Guide Profile View
  const handleSelectGuide = (id) => {
    setSelectedGuideId(id);
    setView('profile');
  };

  // Handle successful registration/onboarding
  const handleRegisterSuccess = (userData) => {
    setCurrentUser(userData);
    setView('dashboard');
  };

  // Handle booking creation from guide profile
  const handleBookGuide = (bookingData) => {
    if (bookingData.redirectOnboard) {
      setView('onboarding');
      return;
    }

    const newBooking = {
      id: `book-${Date.now()}`,
      guideId: bookingData.guideId,
      guideName: bookingData.guideName,
      pilgrimId: "pilgrim-mock",
      pilgrimName: currentUser.name,
      dates: bookingData.dates,
      packageName: bookingData.packageName,
      totalCost: bookingData.totalCost,
      status: "escrow",
      reviewed: false
    };

    setBookings(prev => [newBooking, ...prev]);
    setView('dashboard');
  };

  // Simulate Escrow Fund Release
  const handleConfirmCompletion = (bookingId) => {
    setBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, status: 'completed' } : b)
    );
    alert("Terima kasih! Ibadah terkonfirmasi selesai. Dana escrow telah dicairkan ke Muthawwif Anda.");
  };

  // Switch to In-App Chat View
  const handleOpenChat = (partnerId, partnerName) => {
    setActiveChat({ partnerId, partnerName });
    setView('chat');
  };

  // Simulated Quick Role Switcher for Testing (Simulator Widget)
  const setSimulatedRole = (roleType) => {
    if (roleType === 'visitor') {
      setCurrentUser({ role: 'visitor', name: '', email: '', details: null });
      setView('home');
    } else if (roleType === 'pilgrim') {
      setCurrentUser({
        role: 'pilgrim',
        name: 'Haji Hasan',
        email: 'hasan@email.com',
        details: {
          departureDate: '2026-06-18',
          language: 'Indonesian',
          specialNeeds: 'Tidak Ada',
          knowledgeLevel: 'Pemula (Belum pernah Umrah)'
        }
      });
      setView('dashboard');
    } else if (roleType === 'guide') {
      setCurrentUser({
        role: 'guide',
        name: 'Ustadz Ahmad Fauzi, Lc.',
        email: 'ahmad.fauzi@email.com',
        details: {
          experience: '5+ tahun',
          certificateName: 'Lulusan Umm al-Qura University',
          priceRate: '45'
        }
      });
      setView('dashboard');
    }
  };

  const activeGuide = initialGuides.find(g => g.id === selectedGuideId);

  return (
    <div>
      {/* Header */}
      <Header 
        currentView={currentView} 
        setView={setView} 
        currentUser={currentUser} 
      />

      {/* Main Views */}
      <main>
        {/* A. VISITOR HOME PAGE */}
        {currentView === 'home' && (
          <>
            <Hero setView={setView} />
            
            {/* Quick Stats Banner */}
            <div className="container" style={{ marginTop: '-40px' }}>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-num">500+</div>
                  <div className="stat-label">Guide Terverifikasi</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">12K+</div>
                  <div className="stat-label">Jamaah Terbimbing</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">4.9★</div>
                  <div className="stat-label">Ulasan Kepuasan</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">100%</div>
                  <div className="stat-label">Aman Garansi Escrow</div>
                </div>
              </div>
            </div>

            {/* Core Features / Platform Advantages */}
            <section className="section">
              <div className="container text-center">
                <span className="section-subtitle">Keunggulan Platform</span>
                <h2 className="section-title">Kenapa Memilih Umrah Buddy?</h2>
                <p className="section-desc" style={{ margin: '0 auto 60px' }}>
                  Kami bukan travel agent konvensional. Kami adalah platform personal untuk memastikan ibadah Anda terbimbing secara personal, aman, dan mendalam.
                </p>

                <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '20px' }}>
                  <div className="stat-item" style={{ borderBottom: '4px solid var(--clr-gold)', textAlign: 'left', padding: '36px' }}>
                    <div style={{ color: 'var(--clr-gold-dark)', marginBottom: '16px' }}><Shield size={36} /></div>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Rekening Escrow Aman</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-dark-muted)' }}>Pembayaran Anda ditahan aman di escrow sistem. Dana baru akan dicairkan ke Muthawwif setelah ibadah selesai dan dikonfirmasi.</p>
                  </div>
                  <div className="stat-item" style={{ borderBottom: '4px solid var(--clr-gold)', textAlign: 'left', padding: '36px' }}>
                    <div style={{ color: 'var(--clr-gold-dark)', marginBottom: '16px' }}><MessageSquare size={36} /></div>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Chat & Koordinasi Langsung</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-dark-muted)' }}>Lakukan koordinasi persiapan dokumen, jenis kain ihram, dan manasik secara langsung pra-keberangkatan via chat terintegrasi.</p>
                  </div>
                  <div className="stat-item" style={{ borderBottom: '4px solid var(--clr-gold)', textAlign: 'left', padding: '36px' }}>
                    <div style={{ color: 'var(--clr-gold-dark)', marginBottom: '16px' }}><Sparkles size={36} /></div>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Verifikasi Kredensial Ketat</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-dark-muted)' }}>Setiap Muthawwif di platform wajib mengunggah lisensi, biodata keagamaan, serta rekaman video perkenalan diri.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* How It Works (Timeline) */}
            <section className="section section-dark">
              <div className="container">
                <span className="section-subtitle" style={{ color: 'var(--clr-gold)' }}>Langkah Penggunaan</span>
                <h2 className="section-title">4 Langkah Mudah Menuju Umrah Mabrur</h2>
                <p className="section-desc">
                  Sistem dual-role yang mudah dijalankan oleh jamaah maupun pemandu.
                </p>

                <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginTop: '20px' }}>
                  <div style={{ padding: '20px', borderLeft: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div style={{ fontSize: '1.8rem', color: 'var(--clr-gold)', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>01</div>
                    <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '8px' }}>Cari & Bandingkan</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-light-muted)' }}>Cari Muthawwif di Makkah/Madinah berdasarkan rating, tarif, dan bahasa yang dikuasai.</p>
                  </div>
                  <div style={{ padding: '20px', borderLeft: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div style={{ fontSize: '1.8rem', color: 'var(--clr-gold)', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>02</div>
                    <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '8px' }}>Booking & Amankan Dana</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-light-muted)' }}>Pilih tanggal bimbingan, lakukan booking, dan setor dana jaminan ke rekening escrow.</p>
                  </div>
                  <div style={{ padding: '20px', borderLeft: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div style={{ fontSize: '1.8rem', color: 'var(--clr-gold)', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>03</div>
                    <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '8px' }}>Koordinasi Via Chat</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-light-muted)' }}>Diskusikan persiapan keberangkatan, fiqih manasik, dan lokasi pertemuan di tanah suci.</p>
                  </div>
                  <div style={{ padding: '20px', borderLeft: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div style={{ fontSize: '1.8rem', color: 'var(--clr-gold)', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>04</div>
                    <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '8px' }}>Ibadah Nyaman & Konfirmasi</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-light-muted)' }}>Laksanakan ibadah didekap bimbingan personal. Konfirmasi selesai di dashboard untuk cairkan dana.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* B. SEARCH & FILTER GUIDE VIEW */}
        {currentView === 'search' && (
          <SearchListing 
            guides={initialGuides} 
            onSelectGuide={handleSelectGuide} 
          />
        )}

        {/* C. GUIDE DETAILED PROFILE VIEW */}
        {currentView === 'profile' && activeGuide && (
          <GuideProfileView 
            guide={activeGuide} 
            currentUser={currentUser}
            onBookGuide={handleBookGuide}
            onBack={() => setView('search')}
          />
        )}

        {/* D. ONBOARDING / REGISTRATION FLOWS */}
        {currentView === 'onboarding' && (
          <Onboarding onRegisterSuccess={handleRegisterSuccess} />
        )}

        {/* E. USER DASHBOARDS (PILGRIM & GUIDE SUBVIEWS) */}
        {currentView === 'dashboard' && (
          <DashboardView 
            currentUser={currentUser} 
            bookings={bookings}
            onConfirmCompletion={handleConfirmCompletion}
            onOpenChat={handleOpenChat}
          />
        )}

        {/* F. IN-APP REAL-TIME MESSAGING SIMULATION */}
        {currentView === 'chat' && activeChat && (
          <InAppChat 
            activeChat={activeChat}
            currentUser={currentUser}
            onBack={() => setView('dashboard')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setView={setView} />
    </div>
  );
}
