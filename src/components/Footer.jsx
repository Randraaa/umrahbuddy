import React from 'react';

export default function Footer({ setView }) {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Umrah<span style={{ color: 'var(--clr-gold)' }}>Buddy</span></h3>
            <p>
              Menghubungkan jamaah umrah secara langsung dengan pemandu (muthawwif) terverifikasi. Kami menghadirkan kemudahan koordinasi, keamanan finansial lewat escrow, serta bimbingan ibadah yang personal dan bermakna.
            </p>
          </div>
          
          <div className="footer-links">
            <h4>Navigasi</h4>
            <ul>
              <li><button onClick={() => setView('home')}>Beranda</button></li>
              <li><button onClick={() => setView('search')}>Cari Guide</button></li>
              <li><button onClick={() => setView('onboarding')}>Daftar Akun</button></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Bantuan & Fiqih</h4>
            <ul>
              <li><a href="#rules">Syarat & Ketentuan</a></li>
              <li><a href="#rules">Kebijakan Escrow</a></li>
              <li><a href="#rules">Panduan Manasik</a></li>
            </ul>
          </div>
          
          <div className="footer-newsletter">
            <h4>Dapatkan Tips Umrah</h4>
            <p>Berlangganan info jadwal keberangkatan, tips manasik, dan update cuaca Makkah/Madinah.</p>
            <form className="footer-newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Terima kasih! Anda berhasil berlangganan newsletter Umrah Buddy.'); }}>
              <input type="email" placeholder="Email Anda" required />
              <button type="submit" className="btn btn-secondary">Kirim</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Umrah Buddy. Semua hak cipta dilindungi oleh Allah SWT.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#privacy">Kebijakan Privasi</a>
            <a href="#terms">Syarat Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
