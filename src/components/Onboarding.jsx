import React, { useState } from 'react';
import { User, ShieldAlert, Award, FileText, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

export default function Onboarding({ onRegisterSuccess }) {
  const [role, setRole] = useState('pilgrim'); // pilgrim or guide
  const [step, setStep] = useState(1);

  // Pilgrim form states
  const [pilgrimData, setPilgrimData] = useState({
    name: '',
    email: '',
    phone: '',
    departureDate: '',
    language: 'Indonesian',
    specialNeeds: 'Tidak Ada',
    knowledgeLevel: 'Pemula (Belum pernah Umrah)'
  });

  // Guide form states
  const [guideData, setGuideData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '1-3 tahun',
    certificateName: '',
    priceRate: '50',
    videoFile: ''
  });

  const handlePilgrimChange = (e) => {
    const { name, value } = e.target;
    setPilgrimData(prev => ({ ...prev, [name]: value }));
  };

  const handleGuideChange = (e) => {
    const { name, value } = e.target;
    setGuideData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === 'pilgrim') {
      if (!pilgrimData.name || !pilgrimData.email) {
        alert("Silakan isi nama dan email Anda.");
        return;
      }
      onRegisterSuccess({
        role: 'pilgrim',
        name: pilgrimData.name,
        email: pilgrimData.email,
        details: pilgrimData
      });
    } else {
      if (!guideData.name || !guideData.email || !guideData.certificateName) {
        alert("Silakan isi nama, email, dan nama sertifikasi Anda.");
        return;
      }
      onRegisterSuccess({
        role: 'guide',
        name: guideData.name,
        email: guideData.email,
        details: guideData
      });
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="onboard-card">
          <h2 className="onboard-title">Daftar Akun Baru</h2>
          <p className="onboard-subtitle">Bergabunglah dengan ekosistem Umrah Buddy sekarang.</p>

          {/* Role selector tab (only visible on step 1) */}
          {step === 1 && (
            <div className="role-tabs-switch">
              <button 
                type="button"
                className={`role-tab-btn ${role === 'pilgrim' ? 'active' : ''}`}
                onClick={() => setRole('pilgrim')}
              >
                Sebagai Jamaah
              </button>
              <button 
                type="button"
                className={`role-tab-btn ${role === 'guide' ? 'active' : ''}`}
                onClick={() => setRole('guide')}
              >
                Sebagai Muthawwif (Guide)
              </button>
            </div>
          )}

          {/* Onboarding steps visual bar */}
          <div className="step-indicator">
            <div className={`step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1</div>
            <div className={`step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2</div>
            <div className={`step-node ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* --- ALUR JAMAAH (PILGRIM) --- */}
            {role === 'pilgrim' && (
              <>
                {step === 1 && (
                  <div className="form-step">
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Informasi Personal</h3>
                    <div className="form-group">
                      <label>Nama Lengkap</label>
                      <input 
                        type="text" 
                        name="name"
                        value={pilgrimData.name}
                        onChange={handlePilgrimChange}
                        placeholder="Nama sesuai paspor..." 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Alamat Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={pilgrimData.email}
                        onChange={handlePilgrimChange}
                        placeholder="nama@email.com" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Nomor WhatsApp</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={pilgrimData.phone}
                        onChange={handlePilgrimChange}
                        placeholder="+62 812-xxxx-xxxx" 
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="form-step">
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Rencana Perjalanan</h3>
                    <div className="form-group">
                      <label>Estimasi Tanggal Keberangkatan</label>
                      <input 
                        type="date" 
                        name="departureDate"
                        value={pilgrimData.departureDate}
                        onChange={handlePilgrimChange}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Bahasa Utama yang Diinginkan</label>
                      <select name="language" value={pilgrimData.language} onChange={handlePilgrimChange}>
                        <option value="Indonesian">Bahasa Indonesia</option>
                        <option value="English">Bahasa Inggris</option>
                        <option value="Arabic">Bahasa Arab</option>
                        <option value="Turkish">Bahasa Turki</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Pemahaman Ritual Umrah</label>
                      <select name="knowledgeLevel" value={pilgrimData.knowledgeLevel} onChange={handlePilgrimChange}>
                        <option value="Pemula (Belum pernah Umrah)">Pemula (Belum pernah Umrah)</option>
                        <option value="Menengah (Pernah ikut Manasik)">Menengah (Pernah ikut Manasik)</option>
                        <option value="Mahir (Pernah Umrah sebelumnya)">Mahir (Pernah Umrah sebelumnya)</option>
                      </select>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="form-step">
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Kebutuhan Khusus</h3>
                    <div className="form-group">
                      <label>Kebutuhan Khusus / Medis</label>
                      <select name="specialNeeds" value={pilgrimData.specialNeeds} onChange={handlePilgrimChange}>
                        <option value="Tidak Ada">Tidak Ada Kebutuhan Khusus</option>
                        <option value="Kursi Roda">Membutuhkan Kursi Roda (Mataf/Sa'i)</option>
                        <option value="Pendamping Lansia">Pendampingan Ramah Lansia</option>
                        <option value="Medis Khusus">Butuh Bantuan Medis Ringan</option>
                      </select>
                    </div>
                    <div style={{ backgroundColor: 'var(--clr-emerald-glow)', padding: '20px', borderRadius: '12px', border: '1px dashed var(--clr-emerald)', marginTop: '12px' }}>
                      <p style={{ fontSize: '0.9rem', color: 'var(--clr-emerald-light)', fontWeight: 500, display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <CheckCircle2 size={16} />
                        <span>Data profil Anda aman dan hanya dibagikan ke Muthawwif yang Anda sewa.</span>
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* --- ALUR GUIDE / MUTHAWWIF --- */}
            {role === 'guide' && (
              <>
                {step === 1 && (
                  <div className="form-step">
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Profil Pemandu</h3>
                    <div className="form-group">
                      <label>Nama Lengkap (Gelar Keagamaan Jika Ada)</label>
                      <input 
                        type="text" 
                        name="name"
                        value={guideData.name}
                        onChange={handleGuideChange}
                        placeholder="Contoh: Ustadz Muhammad, Lc." 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Alamat Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={guideData.email}
                        onChange={handleGuideChange}
                        placeholder="nama.guide@email.com" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Pengalaman Memandu</label>
                      <select name="experience" value={guideData.experience} onChange={handleGuideChange}>
                        <option value="1-3 tahun">1 - 3 Tahun</option>
                        <option value="3-5 tahun">3 - 5 Tahun</option>
                        <option value="5+ tahun">Lebih dari 5 Tahun</option>
                      </select>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="form-step">
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Verifikasi Kredensial</h3>
                    <div className="form-group">
                      <label>Sertifikasi Muthawwif / Lisensi Resmi</label>
                      <input 
                        type="text" 
                        name="certificateName"
                        value={guideData.certificateName}
                        onChange={handleGuideChange}
                        placeholder="Contoh: Sertifikasi Asosiasi Muthawwif Indonesia" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Upload Bukti Sertifikat (Mock PDF/JPEG)</label>
                      <div style={{ border: '2px dashed var(--clr-gray-med)', padding: '24px', borderRadius: '8px', textCenter: 'center', backgroundColor: 'var(--clr-gray-light)', cursor: 'pointer', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--clr-text-dark-muted)', fontWeight: 600 }}>Pilih File Sertifikat Keagamaan</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Tarif Jasa Per Hari (USD)</label>
                      <input 
                        type="number" 
                        name="priceRate"
                        value={guideData.priceRate}
                        onChange={handleGuideChange}
                        min="20"
                        max="200"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="form-step">
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Video Intro & Finalisasi</h3>
                    <div className="form-group">
                      <label>Video Perkenalan Diri (Maksimal 60 Detik)</label>
                      <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-dark-muted)', marginBottom: '8px' }}>Buat video singkat memperkenalkan diri, asal universitas, bahasa yang dikuasai, dan gaya bimbingan Anda.</p>
                      <div style={{ border: '2px dashed var(--clr-gold)', padding: '28px', borderRadius: '8px', textCenter: 'center', backgroundColor: 'var(--clr-gray-light)', cursor: 'pointer', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--clr-gold-dark)', fontWeight: 700 }}>Record / Upload Video Perkenalan</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', backgroundColor: 'rgba(212, 175, 55, 0.08)', padding: '16px', borderRadius: '12px', border: '1px solid var(--clr-gold)' }}>
                      <ShieldAlert size={20} style={{ color: 'var(--clr-gold-dark)', flexShrink: 0, marginTop: '2px' }} />
                      <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-dark-muted)', lineHeight: '1.4' }}>
                        Proses verifikasi dokumen membutuhkan waktu maksimal 1x24 jam oleh tim admin **Umrah Buddy**. Setelah disetujui, profile Anda akan tayang di laman pencarian.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Navigation buttons inside onboarding */}
            <div className="form-navigation">
              {step > 1 ? (
                <button 
                  type="button" 
                  onClick={handlePrev}
                  className="btn btn-outline"
                >
                  <ChevronLeft size={16} />
                  <span>Sebelumnya</span>
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button 
                  type="button" 
                  onClick={handleNext}
                  className="btn btn-primary"
                >
                  <span>Berikutnya</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="btn btn-secondary"
                >
                  <span>Selesaikan & Masuk</span>
                  <CheckCircle2 size={16} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
