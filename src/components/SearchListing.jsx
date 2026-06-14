import React, { useState } from 'react';
import { Search, Sliders, Star, BadgeCheck, MapPin, Languages } from 'lucide-react';

export default function SearchListing({ guides, onSelectGuide }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [priceMax, setPriceMax] = useState(120);
  const [sortBy, setSortBy] = useState('rating');

  const toggleLanguage = (lang) => {
    setSelectedLanguages(prev => 
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const toggleSpecialty = (spec) => {
    setSelectedSpecialties(prev => 
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
  };

  // Filter logic
  const filteredGuides = guides.filter(guide => {
    const matchSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        guide.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchCity = selectedCity === 'All' || guide.city.includes(selectedCity);
    
    const matchLang = selectedLanguages.length === 0 || 
                      selectedLanguages.some(l => guide.languages.includes(l));
                      
    const matchSpec = selectedSpecialties.length === 0 || 
                      selectedSpecialties.some(s => guide.specialties.includes(s));
                      
    const matchPrice = guide.price <= priceMax;

    return matchSearch && matchCity && matchLang && matchSpec && matchPrice;
  });

  // Sort logic
  const sortedGuides = [...filteredGuides].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    return 0;
  });

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Pencarian Pemandu</span>
          <h2 class="section-title">Temukan Muthawwif Terbaik Anda</h2>
          <p className="section-description">
            Filter muthawwif berpengalaman berdasar ketersediaan jadwal, penguasaan bahasa, spesialisasi layanan, dan ulasan jamaah lainnya.
          </p>
        </div>

        <div className="search-layout">
          {/* Filters Sidebar */}
          <aside className="filter-card">
            <h3 className="filter-title">
              <Sliders size={18} />
              <span>Filter Pemandu</span>
            </h3>

            <div className="filter-group">
              <label>Nama / Kata Kunci</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Cari nama atau keahlian..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                />
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--clr-text-dark-muted)' }} />
              </div>
            </div>

            <div className="filter-group">
              <label>Kota Tugas</label>
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="All">Semua Kota</option>
                <option value="Makkah">Makkah</option>
                <option value="Madinah">Madinah</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Bahasa</label>
              <div className="checkbox-group">
                {['Indonesian', 'English', 'Arabic', 'Turkish'].map(lang => (
                  <label key={lang} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedLanguages.includes(lang)}
                      onChange={() => toggleLanguage(lang)}
                    />
                    {lang === 'Indonesian' ? 'Bahasa Indonesia' : lang === 'English' ? 'Bahasa Inggris' : lang === 'Arabic' ? 'Bahasa Arab' : 'Bahasa Turki'}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Tarif Harian Maks (USD)</label>
              <input 
                type="range" 
                min="30" 
                max="150" 
                value={priceMax}
                onChange={(e) => setPriceMax(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--clr-emerald)' }}
              />
              <div style={{ display: 'flex', justifyBetween: 'space-between', fontSize: '0.85rem', marginTop: '6px', fontWeight: 600 }}>
                <span>$30</span>
                <span style={{ marginLeft: 'auto', color: 'var(--clr-emerald)' }}>Maks: ${priceMax}/hari</span>
              </div>
            </div>

            <div className="filter-group">
              <label>Spesialisasi</label>
              <div className="checkbox-group">
                {['Family Guide', 'Elderly Care', 'Solo Traveler', 'Youth Groups'].map(spec => (
                  <label key={spec} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedSpecialties.includes(spec)}
                      onChange={() => toggleSpecialty(spec)}
                    />
                    {spec === 'Family Guide' ? 'Pendamping Keluarga' : spec === 'Elderly Care' ? 'Layanan Lansia' : spec === 'Solo Traveler' ? 'Solo Traveler' : 'Rombongan Pemuda'}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <main>
            <div className="results-header">
              <div className="results-count">
                Menampilkan <strong>{sortedGuides.length}</strong> Muthawwif terverifikasi
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--clr-text-dark-muted)' }}>Urutkan:</span>
                <select 
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rating">Rating Tertinggi</option>
                  <option value="priceAsc">Harga Termurah</option>
                  <option value="priceDesc">Harga Termahal</option>
                </select>
              </div>
            </div>

            <div className="guides-grid">
              {sortedGuides.length === 0 ? (
                <div style={{ backgroundColor: 'var(--clr-white)', padding: '48px', borderRadius: '16px', textCenter: 'center', border: '1px solid var(--clr-gray-med)', textAlign: 'center' }}>
                  <p style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--clr-emerald)', marginBottom: '8px' }}>Pemandu tidak ditemukan</p>
                  <p style={{ color: 'var(--clr-text-dark-muted)' }}>Silakan ubah filter pencarian atau masukkan kata kunci yang berbeda.</p>
                </div>
              ) : (
                sortedGuides.map(guide => (
                  <div key={guide.id} className="guide-card">
                    <div className="guide-avatar">
                      {guide.avatar}
                    </div>

                    <div className="guide-details">
                      <h3>
                        {guide.name}
                        {guide.verified && (
                          <span className="verified-badge" title="Muthawwif Terverifikasi">
                            <BadgeCheck size={20} fill="var(--clr-gold)" color="#fff" />
                          </span>
                        )}
                      </h3>
                      
                      <div className="guide-meta">
                        <div className="guide-meta-item">
                          <MapPin size={14} />
                          <span>{guide.city}</span>
                        </div>
                        <div className="guide-meta-item">
                          <Languages size={14} />
                          <span>{guide.languages.join(', ')}</span>
                        </div>
                        <div className="guide-meta-item" style={{ color: 'var(--clr-gold-dark)', fontWeight: 600 }}>
                          <Star size={14} fill="var(--clr-gold)" color="var(--clr-gold)" />
                          <span>{guide.rating} ({guide.reviewsCount} Ulasan)</span>
                        </div>
                      </div>

                      <p className="guide-bio-excerpt">
                        {guide.bio.substring(0, 160)}...
                      </p>

                      <div className="tag-list">
                        {guide.specialties.map(tag => (
                          <span key={tag} className="tag-badge">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="guide-pricing">
                      <span className="price-text">${guide.price}</span>
                      <span className="price-unit">/ hari</span>
                      <button 
                        onClick={() => onSelectGuide(guide.id)}
                        className="btn btn-primary"
                        style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                      >
                        Detail Profil
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
