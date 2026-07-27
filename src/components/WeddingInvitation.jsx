import React, { useState, useEffect, useRef, useMemo } from 'react';

// ==========================================
// UTILS & HOOKS
// ==========================================
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const PETAL_EMOJIS = ['🌸', '🌺', '🌼', '💮', '🌷', '✨'];
const CONFETTI_COLORS = ['#C9A227', '#E8C766', '#6B1E3C', '#F3D9DA', '#FF6F91', '#8ECAE6', '#FFD166', '#B5838D'];
const WEDDING_DATE_LABEL = "15th December 2026";

// Helper to draw heart paths on 2D Canvas context
function drawHeartPath(ctx, x, y, width, height) {
  const topCurveHeight = height * 0.3;
  ctx.beginPath();
  ctx.moveTo(x, y + topCurveHeight);
  ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x - width / 2, y + (height + topCurveHeight) / 2, x, y + height, x, y + height);
  ctx.bezierCurveTo(x, y + height, x + width / 2, y + (height + topCurveHeight) / 2, x + width / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + topCurveHeight);
  ctx.closePath();
}

// ==========================================
// SUB-COMPONENTS
// ==========================================

function Navbar({ isMenuOpen, setIsMenuOpen }) {
  return (
    <nav className="navbar">
      <h2 className="display-font" style={{ color: 'var(--maroon)', fontSize: '1.4rem' }}>R & P</h2>
      <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
        {isMenuOpen ? (
          <svg className="svg-icon" viewBox="0 0 24 24" style={{ width: 26, height: 26 }}>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg className="svg-icon" viewBox="0 0 24 24" style={{ width: 26, height: 26 }}>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        )}
      </button>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
        <li><a href="#story" onClick={() => setIsMenuOpen(false)}>Our Story</a></li>
        <li><a href="#events" onClick={() => setIsMenuOpen(false)}>Events</a></li>
        <li><a href="#gallery" onClick={() => setIsMenuOpen(false)}>Gallery</a></li>
        <li><a href="#venue" onClick={() => setIsMenuOpen(false)}>Venue</a></li>
        <li><a href="#wishes" onClick={() => setIsMenuOpen(false)}>Blessings</a></li>
      </ul>
    </nav>
  );
}

function GateHero({ gateOpen, setGateOpen, timeLeft }) {
  return (
    <section id="home" className="hero">
      <div className="hero-backdrop" />

      {/* Decorative Top Toran/Garland */}
      <div className="hero-toran">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="toran-flower">🌼</span>
        ))}
      </div>

      {/* Left Gate Panel */}
      <div className={`gate-panel gate-left ${gateOpen ? 'open' : ''}`}>
        <div className="gate-jali" />
        <div className="gate-border-detail" />
        <div className="gate-emblem-wrapper">
          <div className="gate-emblem">🕉️</div>
          <div className="diya-glow">🪔</div>
        </div>
      </div>

      {/* Right Gate Panel */}
      <div className={`gate-panel gate-right ${gateOpen ? 'open' : ''}`}>
        <div className="gate-jali" />
        <div className="gate-border-detail" />
        <div className="gate-emblem-wrapper">
          <div className="gate-emblem">🪔</div>
          <div className="diya-glow">✨</div>
        </div>
      </div>

      {/* Call To Action Button (Central Seal) */}
      <div className={`gate-cta ${gateOpen ? 'hidden' : ''}`}>
        <div className="gate-cta-badge">Shubh Vivah</div>
        <div className="gate-cta-names">Rohan & Priya</div>
        <div
          className="gate-cta-ring"
          onClick={() => setGateOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') setGateOpen(true); }}
          aria-label="Open the invitation"
        >
          <div className="ring-pulse" />
          <svg className="svg-icon" viewBox="0 0 24 24" style={{ width: 32, height: 32, fill: '#E8C766' }}>
            <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm1 13.5l-4-4 1.41-1.41L13 13.67l3.59-3.59L18 11.5l-5 5z" />
          </svg>
        </div>
        <div className="gate-cta-text">Tap the Royal Seal to Open</div>
      </div>

      {/* Revealed Hero Content */}
      <div className={`hero-content ${gateOpen ? 'revealed' : ''}`}>
        <h3 className="hero-eyebrow">✦ Shubh Vivah · Save the Date ✦</h3>
        <h1 className="hero-title display-font">
          Rohan <span className="hero-amp accent-font">&</span> Priya
        </h1>
        <p className="hero-sub">Together with their families, request the pleasure of your company</p>

        <div className="countdown-container">
          <div className="countdown-box"><div className="countdown-num">{timeLeft.days}</div><small>Days</small></div>
          <div className="countdown-box"><div className="countdown-num">{timeLeft.hours}</div><small>Hrs</small></div>
          <div className="countdown-box"><div className="countdown-num">{timeLeft.minutes}</div><small>Mins</small></div>
          <div className="countdown-box"><div className="countdown-num">{timeLeft.seconds}</div><small>Secs</small></div>
        </div>

        <a href="#events" className="btn btn-gold">View Itinerary & Scratch Date</a>
      </div>
    </section>
  );
}

function GaneshaHeader({ rsvpRef, rsvpVisible }) {
  return (
    <section id="rsvp" ref={rsvpRef} className={`section reveal ${rsvpVisible ? 'visible' : ''}`}>
      <p className="ganesha-mantra">॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥</p>
      <p className="ganesha-mantra" style={{ fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
        ॥ निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
      </p>
      <img
        src="/shree-ganesh.png"
        alt="Lord Ganesha"
        onError={(e) => { e.target.style.display = 'none'; }}
        style={{
          width: "100%",
          maxWidth: "220px",
          height: "auto",
          display: "block",
          margin: "0 auto",
          objectFit: "contain",
          filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.1))"
        }}
      />
    </section>
  );
}

function OurStory({ storyRef, storyVisible }) {
  return (
    <section id="story" ref={storyRef} className={`section reveal ${storyVisible ? 'visible' : ''}`}>
      <p className="section-eyebrow">The Beginning</p>
      <h2 className="section-title">Our Story</h2>
      <div className="section-divider"><span className="line" /> <span className="spin-icon">🌸</span> <span className="line" /></div>
      <div className="story-card">
        <p className="story-quote">"Every love story is beautiful, but ours is our favourite."</p>
        <p className="story-text">
          Hum mile, dost bane, pyaar hua, aur ab shuru ho rahi hai hamari sabse khoobsurat kahani — humesha ke liye.
          Join us as we step into this new chapter, surrounded by the people we love most.
        </p>
        <img
          className="story-img"
          src="/wedding-image.png"
          alt="Couple"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600"; }}
        />
      </div>
    </section>
  );
}





function HeartScratchCard({
  canvasRef,
  dateRevealed,
  scratchedPercent = 0,
  startDrawing,
  scratch,
  stopDrawing,
  weddingDateLabel = "15th December 2026"
}) {
  return (
    <div className="scratch-card-wrapper">
      <div className="scratch-header">
        <span className="scratch-badge">✦ Interactive Reveal ✦</span>
        <h3 className="display-font scratch-title">Scratch to Save The Date</h3>
        <p className="scratch-subtitle">
          Use your finger or mouse to scratch inside the heart ❤️
        </p>
      </div>

      <div className="heart-card-container">
        {/* Glow halo behind heart */}
        <div className="heart-glow" />

        {/* Revealed Content Underneath Canvas */}
        <div className={`heart-reveal-content ${dateRevealed ? 'celebrating' : ''}`}>
          <div className="heart-reveal-bg">
            <div className="heart-inner-border" />
            <span className="reveal-ring-emoji">💍</span>
            <h4 className="reveal-date display-font">{weddingDateLabel}</h4>
            <div className="reveal-divider" />
            <p className="reveal-time">8:00 PM Onwards</p>
            <p className="reveal-location">Devrana, Khatauli</p>
          </div>
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          width={320}
          height={300}
          onMouseDown={startDrawing}
          onMouseMove={scratch}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={scratch}
          onTouchEnd={stopDrawing}
          className={`scratch-canvas ${dateRevealed ? 'revealed-hidden' : ''}`}
        />
      </div>

      {!dateRevealed ? (
        <div className="scratch-progress-bar-wrap">
          <div 
            className="scratch-progress-fill" 
            style={{ width: `${Math.min(scratchedPercent * 2, 100)}%` }} 
          />
          <span className="scratch-progress-text">
            {Math.round(scratchedPercent)}% Cleared
          </span>
        </div>
      ) : (
        <p className="revealed-success-badge">✨ Date Unlocked! Explore the events below ✨</p>
      )}
    </div>
  );
}

// Main WeddingEvents Component (Fixed Props Destructuring)
 function WeddingEvents({
  eventsRef,
  eventsVisible,
  dateRevealed,
  scratchedPercent = 0,
  events = [],
  ...scratchProps
}) {
  return (
    <section
      id="events"
      ref={eventsRef}
      className={`section events-section reveal ${eventsVisible ? "visible" : ""}`}
    >
      <style>{`
        .events-section {
          background: linear-gradient(180deg, rgba(107,30,60,0.02) 0%, rgba(201,162,39,0.05) 50%, rgba(107,30,60,0.02) 100%);
          padding: 80px 20px;
          position: relative;
          overflow: hidden;
        }

        .scratch-card-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 1.5rem auto 3.5rem;
          max-width: 500px;
        }

        .scratch-badge {
          background: rgba(201,162,39,0.12);
          color: #8A6A12;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 20px;
          border: 1px solid rgba(201,162,39,0.3);
          display: inline-block;
          margin-bottom: 8px;
        }

        .scratch-title {
          color: var(--maroon-dark, #4A1428);
          font-size: 2.2rem;
          margin-bottom: 6px;
        }

        .scratch-subtitle {
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 24px;
        }

        .heart-card-container {
          position: relative;
          width: 320px;
          height: 300px;
          margin: 0 auto;
        }

        .heart-glow {
          position: absolute;
          inset: 20px;
          background: radial-gradient(circle, rgba(232,199,102,0.4) 0%, rgba(107,30,60,0) 70%);
          filter: blur(15px);
          animation: glowPulse 3s ease-in-out infinite alternate;
        }

        @keyframes glowPulse {
          0% { transform: scale(0.95); opacity: 0.6; }
          100% { transform: scale(1.1); opacity: 0.9; }
        }

        .heart-reveal-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .heart-reveal-bg {
          width: 300px;
          height: 270px;
          background: linear-gradient(135deg, #FFFDF9 0%, #FFF2DF 100%);
          clip-path: path('M 150, 260 C 150, 260 15, 160 15, 85 C 15, 20 80, 10 150, 65 C 220, 10 285, 20 285, 85 C 285, 160 150, 260 150, 260 Z');
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 25px;
          text-align: center;
          box-shadow: inset 0 0 20px rgba(201,162,39,0.2);
          position: relative;
        }

        .heart-inner-border {
          position: absolute;
          inset: 8px;
          clip-path: path('M 142, 245 C 142, 245 22, 152 22, 82 C 22, 25 78, 18 142, 65 C 206, 18 262, 25 262, 82 C 262, 152 142, 245 142, 245 Z');
          border: 1px dashed rgba(201,162,39,0.5);
          pointer-events: none;
        }

        .reveal-ring-emoji { font-size: 2.4rem; margin-bottom: 2px; }
        .reveal-date { font-size: 1.45rem; color: #6B1E3C; margin: 4px 0; font-weight: 600; }
        .reveal-divider { width: 40px; height: 1px; background: #C9A227; margin: 6px 0; opacity: 0.6; }
        .reveal-time { font-size: 0.85rem; color: #4A1428; font-weight: 600; }
        .reveal-location { font-size: 0.8rem; color: #666; }

        .scratch-canvas {
          position: absolute;
          inset: 0;
          cursor: pointer;
          touch-action: none;
          z-index: 2;
          transition: opacity 0.5s ease;
        }

        .scratch-canvas.revealed-hidden {
          opacity: 0;
          pointer-events: none;
        }

        .scratch-progress-bar-wrap {
          margin-top: 18px;
          width: 220px;
          height: 22px;
          background: rgba(0,0,0,0.05);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(201,162,39,0.3);
        }

        .scratch-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #C9A227, #E8C766);
          transition: width 0.2s ease;
        }

        .scratch-progress-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-weight: 600;
          color: #4A1428;
        }

        .revealed-success-badge {
          margin-top: 16px;
          color: #6B1E3C;
          font-weight: 600;
          font-size: 0.95rem;
          animation: fadeIn 0.8s ease;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1000px;
          margin: 3rem auto 0;
          padding: 0 10px;
        }

        .event-card-large {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(201, 162, 39, 0.25);
          box-shadow: 0 12px 30px rgba(74, 20, 40, 0.06);
          padding: 2rem 1.8rem;
          text-align: left;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .event-card-large::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #C9A227, #E8C766, #6B1E3C);
        }

        .event-card-large:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(74, 20, 40, 0.12);
          border-color: rgba(201, 162, 39, 0.6);
        }

        .card-top-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.2rem;
        }

        .card-emoji-badge {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFF9F2, #F3D9DA);
          border: 1px solid rgba(201, 162, 39, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .card-hindi-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          color: #C9A227;
          font-weight: 600;
        }

        .card-event-name {
          font-size: 1.8rem;
          color: #4A1428;
          margin-bottom: 1rem;
        }

        .card-info-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          color: #555;
        }

        .card-info-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .card-info-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(201, 162, 39, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          flex-shrink: 0;
        }

        .card-footer-note {
          background: rgba(107, 30, 60, 0.03);
          border-radius: 8px;
          padding: 0.8rem 1rem;
          border-left: 3px solid #C9A227;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: #6B1E3C;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .scratch-title { font-size: 1.8rem; }
          .events-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .event-card-large { padding: 1.5rem; }
        }
      `}</style>

      <p className="section-eyebrow">Itinerary</p>
      <h2 className="section-title">Wedding Events</h2>
      <div className="section-divider">
        <span className="line" /> <span className="spin-icon">🪔</span> <span className="line" />
      </div>

      {/* Heart Scratch Card Component */}
      <HeartScratchCard 
        dateRevealed={dateRevealed} 
        scratchedPercent={scratchedPercent} 
        {...scratchProps} 
      />

      {/* Events Displayed as Large Luxury Cards */}
      {dateRevealed && (
        <div className="events-grid">
          {events.map((ev, i) => (
            <div
              key={i}
              className="event-card-large"
              style={{ animation: `fadeIn 0.6s ease forwards ${i * 0.15}s` }}
            >
              <div>
                <div className="card-top-header">
                  <div className="card-emoji-badge">{ev.emoji}</div>
                  <span className="card-hindi-title">{ev.hindi}</span>
                </div>

                <h3 className="card-event-name display-font">{ev.name}</h3>

                <div className="card-info-list">
                  <div className="card-info-item">
                    <span className="card-info-icon">📅</span>
                    <span>{ev.date}</span>
                  </div>
                  <div className="card-info-item">
                    <span className="card-info-icon">🕒</span>
                    <span>{ev.time}</span>
                  </div>
                  <div className="card-info-item">
                    <span className="card-info-icon">📍</span>
                    <span>{ev.venue}</span>
                  </div>
                </div>
              </div>

              <div className="card-footer-note">
                "{ev.note}"
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function VenueSection() {
  return (
    <section id="venue" className="section">
      <p className="section-eyebrow">Location</p>
      <h2 className="section-title">Wedding Venue</h2>
      <div className="section-divider"><span className="line" /> 📍 <span className="line" /></div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem" }}>
        <div style={{ textAlign: "center" }}>
          <h3 className="display-font" style={{ fontSize: "1.4rem", color: "var(--maroon)" }}>Devrana</h3>
          <p style={{ color: "#666", marginTop: '4px' }}>
            Devrana, Khatauli, Muzaffarnagar,<br />
            Uttar Pradesh - 251201
          </p>
        </div>

        <div className="venue-map">
          <iframe
            src="https://www.google.com/maps?q=Devrana,Khatauli,Muzaffarnagar,Uttar+Pradesh&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Venue Map"
          />
        </div>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Devrana,Khatauli,Muzaffarnagar,Uttar+Pradesh"
          target="_blank"
          rel="noreferrer"
          className="btn"
        >
          Get Directions
        </a>
      </div>
    </section>
  );
}

function GallerySection({ galleryRef, galleryVisible }) {
  const images = [
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=400"
  ];

  return (
    <section id="gallery" ref={galleryRef} className={`section reveal ${galleryVisible ? 'visible' : ''}`} style={{ background: 'rgba(107,30,60,0.03)' }}>
      <p className="section-eyebrow">Memories</p>
      <h2 className="section-title">Moments Captured</h2>
      <div className="section-divider"><span className="line" /> <span className="spin-icon">📷</span> <span className="line" /></div>
      <div className="gallery-grid">
        {images.map((img, idx) => (
          <div key={idx} className="gallery-item">
            <img src={img} alt={`Gallery ${idx + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

function WishesSection({ wishesRef, wishesVisible, wishes, newWish, setNewWish, handleWishSubmit }) {
  return (
    <section id="wishes" ref={wishesRef} className={`section reveal ${wishesVisible ? 'visible' : ''}`}>
      <p className="section-eyebrow">Blessings</p>
      <h2 className="section-title">Leave Your Wishes ❤️</h2>
      <div className="section-divider"><span className="line" /> <span className="spin-icon">🙏</span> <span className="line" /></div>

      <div className="form-container" style={{ marginBottom: '3rem' }}>
        <form onSubmit={handleWishSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              className="form-input"
              value={newWish.name}
              onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label>Your Message</label>
            <textarea
              className="form-input"
              rows="3"
              value={newWish.message}
              onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
              required
              placeholder="Write your wishes here..."
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
            <svg className="svg-icon" viewBox="0 0 24 24" style={{ marginRight: '0.3rem', fill: '#fff' }}>
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            Send Blessing
          </button>
        </form>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {wishes.map((w, index) => (
          <div key={index} className="wish-card">
            <h4 style={{ color: 'var(--maroon)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <svg className="svg-icon" viewBox="0 0 24 24" style={{ fill: 'var(--gold)' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.5 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {w.name}
            </h4>
            <p style={{ fontStyle: 'italic', color: '#555' }}>"{w.message}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <h2 className="display-font" style={{ color: 'var(--gold-light)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>Thank You</h2>
      <p style={{ opacity: 0.85, maxWidth: '420px', margin: '0 auto 2rem auto', lineHeight: '1.7', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem' }}>
        Aapka aana humare liye khushi ki baat hogi. We look forward to celebrating our special day with you.
      </p>
      <p style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '1px' }}>© 2026 ROHAN & PRIYA. ALL RIGHTS RESERVED.</p>
    </footer>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function WeddingInvitation() {
  // Navigation State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Gate State
  const [gateOpen, setGateOpen] = useState(false);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Wishes State
  const [wishes, setWishes] = useState([
    { name: "Aman & Neha", message: "Congratulations to the beautiful couple! Milte hain shaadi mein, pakka!" },
    { name: "Rahul Sharma", message: "Wishing you both a lifetime of love, laughter, and endless happiness." }
  ]);
  const [newWish, setNewWish] = useState({ name: '', message: '' });

  // Heart Scratch Card State
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const [dateRevealed, setDateRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  // Scroll Reveal Refs
  const [rsvpRef, rsvpVisible] = useReveal();
  const [storyRef, storyVisible] = useReveal();
  const [eventsRef, eventsVisible] = useReveal();
  const [galleryRef, galleryVisible] = useReveal();
  const [wishesRef, wishesVisible] = useReveal();

  const events = [
    { emoji: '🌼', name: 'Haldi', hindi: 'हल्दी', date: '13 Dec 2026', time: '10:00 AM', venue: 'Family Courtyard', note: 'Aaiye, thoda peela rang lagayein!' },
    { emoji: '🌿', name: 'Mehendi', hindi: 'मेहंदी', date: '13 Dec 2026', time: '5:00 PM', venue: 'Garden Lawns', note: 'Henna, dhol aur thoda dance!' },
    { emoji: '🎶', name: 'Sangeet', hindi: 'संगीत', date: '14 Dec 2026', time: '7:00 PM', venue: 'Grand Palace Hall', note: 'Apne best moves ready rakhiye.' },
    { emoji: '💍', name: 'Wedding', hindi: 'विवाह', date: '15 Dec 2026', time: '8:00 PM', venue: 'Grand Palace, Delhi', note: 'Pheron ke saakshi baniye.' },
    { emoji: '🥂', name: 'Reception', hindi: 'स्वागत समारोह', date: '16 Dec 2026', time: '7:00 PM', venue: 'Grand Palace Lawns', note: 'Dinner, dance aur duaayein.' }
  ];

  // Floating Petals
  const petals = useMemo(() => (
    [...Array(14)].map((_, i) => ({
      id: i,
      emoji: PETAL_EMOJIS[i % PETAL_EMOJIS.length],
      left: Math.random() * 92,
      delay: Math.random() * 10,
      duration: 11 + Math.random() * 8,
      size: 1.1 + Math.random() * 0.9,
      hue: Math.floor(Math.random() * 360)
    }))
  ), []);

  // Timer Calculation
  useEffect(() => {
    const weddingDate = new Date("December 15, 2026 20:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;
      if (difference < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Heart-shaped Scratch Canvas Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Save state & clip canvas in Heart shape
    ctx.save();
    drawHeartPath(ctx, w / 2, 20, w - 40, h - 50);
    ctx.clip();

    // Fill Gold Gradient
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#E8C766');
    gradient.addColorStop(0.5, '#C9A227');
    gradient.addColorStop(1, '#8A6A12');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Add Text overlay inside heart
    ctx.fillStyle = '#4A1428';
    ctx.font = '600 15px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ Scratch Heart ✦', w / 2, h / 2 - 10);
    ctx.fillText('to Reveal Date', w / 2, h / 2 + 12);

    ctx.restore();
  }, []);

  // Celebration trigger on reveal
  useEffect(() => {
    if (dateRevealed) {
      const pieces = [...Array(50)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        delay: Math.random() * 0.6,
        duration: 2.2 + Math.random() * 1.6,
        rotate: Math.random() * 360,
        size: 6 + Math.random() * 8
      }));
      setConfettiPieces(pieces);
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(t);
    }
  }, [dateRevealed]);

  // Scratch Position calculation
  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (e) => {
    isDrawing.current = true;
    scratch(e);
  };

  const scratch = (e) => {
    if (!isDrawing.current) return;
    if (e.cancelable) e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const pos = getMousePos(e);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
    ctx.fill();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    checkScratchedPercent();
  };

  const checkScratchedPercent = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparentPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) transparentPixels++;
    }

    const percent = (transparentPixels / (pixels.length / 4)) * 100;
    setScratchedPercent(percent);

    if (percent > 45 && !dateRevealed) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setDateRevealed(true);
    }
  };

  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (newWish.name && newWish.message) {
      setWishes([newWish, ...wishes]);
      setNewWish({ name: '', message: '' });
    }
  };

  return (
    <div className="wedding-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Poppins:wght@300;400;500;600&display=swap');

        :root {
          --bg: #FFF9F2;
          --maroon: #6B1E3C;
          --maroon-dark: #4A1428;
          --gold: #C9A227;
          --gold-light: #E8C766;
          --blush: #F3D9DA;
          --text: #2D1B24;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }
        html, body { overflow-x: hidden; max-width: 100%; background-color: var(--bg); color: var(--text); font-family: 'Poppins', sans-serif; }

        /* Hide scrollbars */
        html, body, .wedding-container, * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        *::-webkit-scrollbar { display: none; width: 0; height: 0; }

        .display-font { font-family: 'Marcellus', serif; }
        .accent-font { font-family: 'Cormorant Garamond', serif; font-style: italic; }

        /* Navbar */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; background: rgba(255, 249, 242, 0.95);
          backdrop-filter: blur(8px);
          display: flex; justify-content: space-between; align-items: center;
          padding: 1rem 2rem; z-index: 1000; box-shadow: 0 2px 12px rgba(74,20,40,0.06);
        }
        .nav-links { display: flex; gap: 1.8rem; list-style: none; }
        .nav-links a { text-decoration: none; color: var(--text); font-weight: 500; font-size: 0.95rem; transition: color 0.3s; position: relative; }
        .nav-links a::after { content: ''; position: absolute; left: 0; bottom: -4px; width: 0; height: 1px; background: var(--gold); transition: width 0.3s; }
        .nav-links a:hover { color: var(--maroon); }
        .nav-links a:hover::after { width: 100%; }
        .menu-btn { display: none; background: none; border: none; cursor: pointer; color: var(--maroon); }

        /* Floating Petals */
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-110vh) rotate(360deg) scale(1.1); opacity: 0; }
        }
        .petal {
          position: fixed; bottom: -60px; z-index: 5; pointer-events: none;
          animation: floatUp linear infinite;
        }

        /* Hero & Gate Section */
        .hero {
          height: 100vh; min-height: 620px; position: relative; overflow: hidden;
          display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
        }
        .hero-backdrop {
          position: absolute; inset: 0;
          background: linear-gradient(rgba(74,20,40,0.65), rgba(74,20,40,0.45)),
                      url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920') center/cover;
        }
        .hero-toran {
          position: absolute; top: 70px; left: 0; right: 0; z-index: 15;
          display: flex; justify-content: space-around; pointer-events: none; font-size: 1.2rem;
          opacity: 0.85; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }

        /* Gate Panels with 3D feel */
        .gate-panel {
          position: absolute; top: 0; height: 100%; width: 50%; z-index: 10;
          background: linear-gradient(145deg, #3d1021, var(--maroon-dark), #5c1833);
          display: flex; align-items: center; transition: transform 1.6s cubic-bezier(0.77,0,0.18,1);
          box-shadow: 0 0 50px rgba(0,0,0,0.7) inset;
        }
        .gate-left { left: 0; justify-content: flex-end; border-right: 4px solid var(--gold); }
        .gate-right { right: 0; justify-content: flex-start; border-left: 4px solid var(--gold); }
        .gate-left.open { transform: translateX(-102%); }
        .gate-right.open { transform: translateX(102%); }

        .gate-border-detail {
          position: absolute; inset: 12px; border: 1px dashed rgba(232,199,102,0.3); pointer-events: none;
        }
        .gate-jali {
          width: 100%; height: 100%; opacity: 0.15;
          background-image:
            repeating-linear-gradient(45deg, var(--gold-light) 0 2px, transparent 2px 20px),
            repeating-linear-gradient(-45deg, var(--gold-light) 0 2px, transparent 2px 20px);
        }

        .gate-emblem-wrapper {
          position: absolute; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .gate-left .gate-emblem-wrapper { right: -40px; }
        .gate-right .gate-emblem-wrapper { left: -40px; }

        .gate-emblem {
          width: 80px; height: 80px; border: 2px solid var(--gold-light); border-radius: 50%;
          display: flex; align-items: center; justify-content: center; font-size: 2rem;
          background: var(--maroon-dark); box-shadow: 0 0 20px rgba(201,162,39,0.4);
        }
        .diya-glow { font-size: 1.2rem; animation: floatSoft 3s ease-in-out infinite; }

        /* Gate CTA Seal */
        .gate-cta {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 20;
          display: flex; flex-direction: column; align-items: center; gap: 0.7rem; color: var(--gold-light); text-align: center;
          transition: opacity 0.6s ease, visibility 0.6s;
        }
        .gate-cta.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        .gate-cta-badge {
          background: var(--gold); color: var(--maroon-dark); font-size: 0.75rem; font-weight: 600;
          padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 2px;
        }
        .gate-cta-names { font-family: 'Marcellus', serif; font-size: 1.8rem; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
        .gate-cta-ring {
          width: 84px; height: 84px; border: 2px solid var(--gold-light); border-radius: 50%;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          background: rgba(74,20,40,0.85); position: relative; transition: transform 0.3s;
        }
        .gate-cta-ring:hover { transform: scale(1.08); }
        .ring-pulse {
          position: absolute; inset: -8px; border: 2px solid var(--gold); border-radius: 50%;
          animation: pulseRing 2.2s infinite;
        }
        @keyframes pulseRing {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .gate-cta-text { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.15rem; color: #fff; }

        /* Revealed Hero Content */
        .hero-content {
          position: relative; z-index: 2; padding: 2rem 1rem; color: #fff;
          opacity: 0; transform: translateY(25px); transition: opacity 1s ease 0.4s, transform 1s ease 0.4s;
        }
        .hero-content.revealed { opacity: 1; transform: translateY(0); }
        .hero-eyebrow { letter-spacing: 4px; text-transform: uppercase; font-size: 0.85rem; color: var(--gold-light); margin-bottom: 0.8rem; }
        .hero-title { font-size: clamp(2.5rem, 6vw, 4.8rem); line-height: 1.1; }
        .hero-amp { color: var(--gold-light); font-size: 0.6em; }
        .hero-sub { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.15rem; margin: 0.8rem auto 1.6rem; max-width: 500px; opacity: 0.9; }

        /* Countdown */
        .countdown-container { display: flex; gap: 0.8rem; justify-content: center; margin: 0.5rem 0 1.8rem; flex-wrap: wrap; }
        .countdown-box {
          background: rgba(255,255,255,0.12); border: 1px solid rgba(232,199,102,0.4);
          backdrop-filter: blur(6px); padding: 0.7rem 0.9rem; border-radius: 8px; min-width: 68px;
          animation: floatSoft 3.5s ease-in-out infinite;
        }
        @keyframes floatSoft { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .countdown-num { font-size: 1.7rem; font-weight: 600; color: #fff; font-family: 'Marcellus', serif; }
        .countdown-box small { opacity: 0.85; letter-spacing: 1px; text-transform: uppercase; font-size: 0.65rem; display: block; }

        /* Sections Common */
        .section { padding: 4.5rem 1.5rem; max-width: 1100px; margin: 0 auto; text-align: center; }
        .reveal { opacity: 0; transform: translateY(35px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .section-eyebrow { letter-spacing: 3px; text-transform: uppercase; font-size: 0.8rem; color: var(--gold); font-weight: 600; margin-bottom: 0.5rem; }
        .section-title { font-family: 'Marcellus', serif; font-size: clamp(1.8rem, 4vw, 2.6rem); margin-bottom: 0.8rem; color: var(--maroon-dark); }
        .section-divider { display: flex; align-items: center; justify-content: center; gap: 0.8rem; margin: 0 auto 2.5rem; color: var(--gold); }
        .section-divider .line { width: 40px; height: 1px; background: var(--gold); opacity: 0.6; }
        .ganesha-mantra { font-family: 'Marcellus', serif; color: var(--maroon); font-size: 1.25rem; margin-bottom: 0.4rem; }

        /* Our Story */
        .story-card { max-width: 680px; margin: 0 auto; background: #fff; padding: 2.2rem; border-radius: 8px; box-shadow: 0 10px 35px rgba(74,20,40,0.08); border-top: 3px solid var(--gold); }
        .story-quote { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.45rem; color: var(--maroon); margin-bottom: 0.8rem; }
        .story-text { line-height: 1.8; color: #555; font-size: 0.95rem; }
        .story-img { width: 100%; max-height: 320px; object-fit: cover; border-radius: 6px; margin-top: 1.5rem; }

        /* HEART SCRATCH CARD STYLES */
        .scratch-card-wrapper {
          display: flex; flex-direction: column; align-items: center; margin: 1rem auto 2.5rem;
        }
        .heart-card-container {
          position: relative; width: 300px; height: 280px; margin: 0 auto;
          filter: drop-shadow(0 12px 25px rgba(74,20,40,0.2));
        }
        .heart-reveal-content {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
        }
        .heart-reveal-bg {
          width: 280px; height: 250px;
          background: linear-gradient(135deg, #FFF8EF, #FFE6C7);
          clip-path: path('M 140, 240 C 140, 240 10, 150 10, 80 C 10, 20 70, 10 140, 60 C 210, 10 270, 20 270, 80 C 270, 150 140, 240 140, 240 Z');
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 20px; text-align: center; border: 2px solid var(--gold-light);
        }
        .heart-reveal-content.celebrating { animation: heartPulse 0.8s ease; }
        @keyframes heartPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .scratch-canvas {
          position: absolute; inset: 0; cursor: pointer; touch-action: none; z-index: 3;
        }

        /* Boarding Pass Events */
        .events-wrap { display: flex; flex-direction: column; gap: 1.4rem; max-width: 740px; margin: 2rem auto 0; }
        .ticket {
          display: flex; background: #fff; border-radius: 10px; overflow: hidden;
          box-shadow: 0 8px 20px rgba(74,20,40,0.06); text-align: left; position: relative;
          transition: transform 0.3s ease;
        }
        .ticket:hover { transform: translateY(-4px); }
        .ticket-stub {
          width: 88px; flex-shrink: 0; background: linear-gradient(160deg, var(--maroon), var(--maroon-dark));
          color: var(--gold-light); display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 0.3rem; padding: 1rem 0.5rem;
        }
        .ticket-stub .emoji { font-size: 1.8rem; }
        .ticket-stub .hindi { font-family: 'Cormorant Garamond', serif; font-size: 0.85rem; opacity: 0.9; }
        .ticket-perforation {
          width: 0; border-left: 2px dashed rgba(74,20,40,0.2); position: relative;
        }
        .ticket-perforation::before, .ticket-perforation::after {
          content: ''; position: absolute; left: -7px; width: 14px; height: 14px; border-radius: 50%; background: #FFF9F2;
        }
        .ticket-perforation::before { top: -7px; }
        .ticket-perforation::after { bottom: -7px; }
        .ticket-body { flex: 1; padding: 1.1rem 1.4rem; display: flex; flex-direction: column; gap: 0.3rem; }
        .ticket-name { font-family: 'Marcellus', serif; font-size: 1.25rem; color: var(--maroon-dark); }
        .ticket-meta { display: flex; flex-wrap: wrap; gap: 0.4rem 1rem; font-size: 0.85rem; color: #666; }
        .ticket-note { font-family: 'Cormorant Garamond', serif; font-style: italic; color: var(--maroon); font-size: 0.95rem; margin-top: 0.2rem; }

        /* Venue & Map */
        .venue-map { width: 100%; max-width: 680px; height: 320px; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.08); border: 3px solid #fff; }

        /* Buttons & Forms */
        .btn {
          background: var(--maroon); color: #fff; border: none; padding: 0.8rem 2rem;
          font-size: 0.95rem; border-radius: 30px; cursor: pointer; font-weight: 500;
          transition: all 0.3s; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;
        }
        .btn:hover { background: var(--maroon-dark); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(74,20,40,0.2); }
        .btn-gold { background: var(--gold); color: var(--maroon-dark); }
        .btn-gold:hover { background: var(--gold-light); }

        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
        .gallery-item { overflow: hidden; border-radius: 8px; height: 220px; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .gallery-item:hover img { transform: scale(1.08); }

        .form-container { max-width: 580px; margin: 0 auto; background: #fff; padding: 2rem; border-radius: 10px; box-shadow: 0 8px 25px rgba(74,20,40,0.06); }
        .form-group { margin-bottom: 1.2rem; text-align: left; }
        .form-group label { display: block; margin-bottom: 0.4rem; font-weight: 500; font-size: 0.88rem; color: var(--maroon-dark); }
        .form-input { width: 100%; padding: 0.75rem; border: 1px solid #e3d9d0; border-radius: 6px; font-family: inherit; background: #FFFCF8; }
        .form-input:focus { outline: none; border-color: var(--gold); }

        .svg-icon { width: 18px; height: 18px; fill: currentColor; vertical-align: middle; }
        .wish-card { background: #fff; padding: 1.2rem 1.4rem; border-radius: 8px; text-align: left; box-shadow: 0 3px 10px rgba(0,0,0,0.04); border-left: 3px solid var(--gold); }

        /* Confetti */
        @keyframes confettiFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0.9; }
        }
        .confetti-piece { position: fixed; top: 0; z-index: 4000; pointer-events: none; animation: confettiFall 3s ease-in forwards; }

        footer { background: var(--maroon-dark); color: #fff; padding: 3.5rem 1.5rem; text-align: center; }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .nav-links {
            display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0;
            background: var(--bg); padding: 1.8rem; text-align: center; box-shadow: 0 10px 20px rgba(0,0,0,0.1); gap: 1rem;
          }
          .nav-links.open { display: flex; }
          .menu-btn { display: block; }
          .section { padding: 3.5rem 1rem; }
          .ticket-stub { width: 72px; }
          .ticket-name { font-size: 1.1rem; }
        }
        @media (max-width: 480px) {
          .gate-emblem { width: 64px; height: 64px; font-size: 1.5rem; }
          .gate-cta-ring { width: 70px; height: 70px; }
          .gate-cta-names { font-size: 1.4rem; }
          .countdown-box { min-width: 58px; padding: 0.5rem; }
          .countdown-num { font-size: 1.3rem; }
        }
      `}</style>

      {/* Floating Petals */}
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}rem`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            filter: `hue-rotate(${p.hue}deg)`
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Confetti Explosion */}
      {showConfetti && confettiPieces.map((c) => (
        <span
          key={c.id}
          className="confetti-piece"
          style={{
            left: `${c.left}%`,
            width: `${c.size}px`,
            height: `${c.size * 1.4}px`,
            background: c.color,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            transform: `rotate(${c.rotate}deg)`
          }}
        />
      ))}

      {/* Navigation */}
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Gate Opening Hero */}
      <GateHero gateOpen={gateOpen} setGateOpen={setGateOpen} timeLeft={timeLeft} />

      {/* Ganesha Blessing */}
      <GaneshaHeader rsvpRef={rsvpRef} rsvpVisible={rsvpVisible} />

      {/* Story Section */}
      <OurStory storyRef={storyRef} storyVisible={storyVisible} />

      {/* Events & Heart Scratch Card */}
      <WeddingEvents
        eventsRef={eventsRef}
        eventsVisible={eventsVisible}
        events={events}
        canvasRef={canvasRef}
        dateRevealed={dateRevealed}
        scratchedPercent={scratchedPercent}
        startDrawing={startDrawing}
        scratch={scratch}
        stopDrawing={stopDrawing}
      />

      {/* Venue Section */}
      <VenueSection />

      {/* Gallery Section */}
      <GallerySection galleryRef={galleryRef} galleryVisible={galleryVisible} />

      {/* Wishes Section */}
      <WishesSection
        wishesRef={wishesRef}
        wishesVisible={wishesVisible}
        wishes={wishes}
        newWish={newWish}
        setNewWish={setNewWish}
        handleWishSubmit={handleWishSubmit}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}