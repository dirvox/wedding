import React from "react";
// Note: Ensure HeartScratchCard is imported in your actual project
// import HeartScratchCard from "./HeartScratchCard"; 

export default function WeddingEvents({
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
      className={`events-section ${eventsVisible ? "is-visible" : ""}`}
    >
      <style>{`
        /* =========================================
           VARIABLES & BASE 
           ========================================= */
        .events-section {
          --color-gold: #C9A227;
          --color-gold-light: #E8C766;
          --color-maroon: #6B1E3C;
          --color-maroon-dark: #4A1428;
          --color-bg-light: #FFFDF9;
          
          background: linear-gradient(180deg, rgba(107,30,60,0.03) 0%, rgba(201,162,39,0.08) 50%, rgba(107,30,60,0.03) 100%);
          padding: 100px 20px;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        /* Decorative Background Glows */
        .bg-glow {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.4;
          pointer-events: none;
        }
        .bg-glow-top {
          top: -100px;
          left: -100px;
          background: radial-gradient(circle, rgba(201,162,39,0.3) 0%, transparent 70%);
        }
        .bg-glow-bottom {
          bottom: -100px;
          right: -100px;
          background: radial-gradient(circle, rgba(107,30,60,0.2) 0%, transparent 70%);
        }

        .events-container {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* =========================================
           TYPOGRAPHY & HEADER
           ========================================= */
        .events-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-eyebrow {
          color: var(--color-gold);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 12px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.6s ease;
        }

        .section-title {
          color: var(--color-maroon-dark);
          font-size: 2.8rem;
          font-family: 'Cormorant Garamond', serif;
          margin-bottom: 16px;
          font-weight: 700;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.6s ease 0.2s;
        }

        .section-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.6s ease 0.4s;
        }

        .section-divider .line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
        }

        .section-divider .spin-icon {
          font-size: 1.2rem;
          animation: slowSpin 6s linear infinite;
        }

        /* Reveal Animations Triggered by parent .is-visible */
        .events-section.is-visible .section-eyebrow,
        .events-section.is-visible .section-title {
          opacity: 1;
          transform: translateY(0);
        }
        .events-section.is-visible .section-divider {
          opacity: 1;
          transform: scale(1);
        }

        /* =========================================
           HEART SCRATCH CARD (Existing styles + tweaks)
           ========================================= */
        .scratch-card-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 2rem auto 4rem;
          max-width: 500px;
          opacity: 0;
          animation: fadeInUp 0.8s ease forwards 0.6s;
        }

        /* Keep your existing scratch card interior CSS here so it doesn't break */
        .scratch-badge { background: rgba(201,162,39,0.12); color: #8A6A12; font-size: 0.75rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 5px 16px; border-radius: 20px; border: 1px solid rgba(201,162,39,0.3); display: inline-block; margin-bottom: 8px; }
        .scratch-title { color: var(--color-maroon-dark); font-size: 2.2rem; margin-bottom: 6px; }
        .scratch-subtitle { color: #666; font-size: 0.95rem; margin-bottom: 24px; }
        .heart-card-container { position: relative; width: 320px; height: 300px; margin: 0 auto; }
        .heart-glow { position: absolute; inset: 20px; background: radial-gradient(circle, rgba(232,199,102,0.4) 0%, rgba(107,30,60,0) 70%); filter: blur(15px); animation: glowPulse 3s ease-in-out infinite alternate; }
        .heart-reveal-content { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1; }
        .heart-reveal-bg { width: 300px; height: 270px; background: linear-gradient(135deg, #FFFDF9 0%, #FFF2DF 100%); clip-path: path('M 150, 260 C 150, 260 15, 160 15, 85 C 15, 20 80, 10 150, 65 C 220, 10 285, 20 285, 85 C 285, 160 150, 260 150, 260 Z'); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 25px; text-align: center; box-shadow: inset 0 0 20px rgba(201,162,39,0.2); position: relative; }
        .heart-inner-border { position: absolute; inset: 8px; clip-path: path('M 142, 245 C 142, 245 22, 152 22, 82 C 22, 25 78, 18 142, 65 C 206, 18 262, 25 262, 82 C 262, 152 142, 245 142, 245 Z'); border: 1px dashed rgba(201,162,39,0.5); pointer-events: none; }
        .reveal-ring-emoji { font-size: 2.4rem; margin-bottom: 2px; }
        .reveal-date { font-size: 1.45rem; color: #6B1E3C; margin: 4px 0; font-weight: 600; }
        .reveal-divider { width: 40px; height: 1px; background: #C9A227; margin: 6px 0; opacity: 0.6; }
        .reveal-time { font-size: 0.85rem; color: #4A1428; font-weight: 600; }
        .reveal-location { font-size: 0.8rem; color: #666; }
        .scratch-canvas { position: absolute; inset: 0; cursor: pointer; touch-action: none; z-index: 2; transition: opacity 0.5s ease; }
        .scratch-canvas.revealed-hidden { opacity: 0; pointer-events: none; }
        .scratch-progress-bar-wrap { margin-top: 18px; width: 220px; height: 22px; background: rgba(0,0,0,0.05); border-radius: 12px; position: relative; overflow: hidden; border: 1px solid rgba(201,162,39,0.3); }
        .scratch-progress-fill { height: 100%; background: linear-gradient(90deg, #C9A227, #E8C766); transition: width 0.2s ease; }
        .scratch-progress-text { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 600; color: #4A1428; }
        .revealed-success-badge { margin-top: 16px; color: #6B1E3C; font-weight: 600; font-size: 0.95rem; animation: fadeInUp 0.8s ease; }

        /* =========================================
           EVENTS GRID & LUXURY CARDS
           ========================================= */
        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
          padding: 10px;
        }

        .event-card-large {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 20px;
          border: 1px solid rgba(201, 162, 39, 0.25);
          box-shadow: 0 10px 30px rgba(74, 20, 40, 0.04);
          padding: 2.5rem 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          transform: translateY(30px);
          animation: cardReveal 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }

        /* Animated Top Gradient Border */
        .event-card-large::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, var(--color-gold), var(--color-maroon), var(--color-gold-light));
          background-size: 200% 100%;
          animation: gradientShift 4s ease infinite;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .event-card-large:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(74, 20, 40, 0.12);
          border-color: rgba(201, 162, 39, 0.6);
          background: rgba(255, 255, 255, 0.9);
        }
        .event-card-large:hover::before {
          opacity: 1;
        }

        .card-top-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .card-emoji-badge {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFF9F2, #F3D9DA);
          border: 1px solid rgba(201, 162, 39, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          box-shadow: 0 8px 16px rgba(107, 30, 60, 0.08);
          transition: transform 0.3s ease;
        }

        .event-card-large:hover .card-emoji-badge {
          transform: rotate(-10deg) scale(1.1);
        }

        .floating-emoji {
          animation: floating 3s ease-in-out infinite;
        }

        .card-hindi-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          color: var(--color-gold);
          font-weight: 600;
          background: linear-gradient(90deg, var(--color-gold), #A67B1E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .card-event-name {
          font-size: 2rem;
          color: var(--color-maroon-dark);
          margin-bottom: 1.5rem;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          line-height: 1.1;
        }

        .card-info-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .card-info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.05rem;
          color: #444;
          font-weight: 500;
        }

        .card-info-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(201, 162, 39, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
          color: var(--color-maroon);
        }

        .card-footer-note {
          background: rgba(107, 30, 60, 0.04);
          border-radius: 12px;
          padding: 1.2rem;
          border-left: 4px solid var(--color-gold);
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.2rem;
          color: var(--color-maroon);
          position: relative;
          line-height: 1.4;
        }

        .quote-mark {
          color: var(--color-gold);
          font-size: 1.4rem;
          font-weight: bold;
          opacity: 0.5;
        }

        /* =========================================
           KEYFRAMES
           ========================================= */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes glowPulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          100% { transform: scale(1.1); opacity: 0.9; }
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* =========================================
           RESPONSIVE DESIGN (Tablets & Mobile)
           ========================================= */
        @media (max-width: 992px) {
          .events-section { padding: 80px 15px; }
          .section-title { font-size: 2.4rem; }
          .events-grid { gap: 1.5rem; }
        }

        @media (max-width: 768px) {
          .events-section { padding: 60px 15px; }
          .section-title { font-size: 2.2rem; }
          .events-grid { grid-template-columns: 1fr; max-width: 500px; margin: 0 auto; }
          .event-card-large { padding: 2rem 1.5rem; }
          .card-event-name { font-size: 1.8rem; }
        }

        @media (max-width: 480px) {
          .events-section { padding: 50px 10px; }
          .section-title { font-size: 1.8rem; }
          .scratch-title { font-size: 1.8rem; }
          .heart-card-container { transform: scale(0.9); }
          .card-emoji-badge { width: 55px; height: 55px; font-size: 1.6rem; }
          .card-hindi-title { font-size: 1.3rem; }
          .card-info-item { font-size: 0.95rem; }
          .card-footer-note { font-size: 1.1rem; padding: 1rem; }
        }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="bg-glow bg-glow-top"></div>
      <div className="bg-glow bg-glow-bottom"></div>

      <div className="events-container">
        <div className="events-header">
          <p className="section-eyebrow">Itinerary</p>
          <h2 className="section-title">Wedding Events</h2>
          <div className="section-divider">
            <span className="line" />
            <span className="spin-icon">🪔</span>
            <span className="line" />
          </div>
        </div>

        {/* Heart Scratch Card Component */}
        {/* Assuming HeartScratchCard is imported and working */}
        <div className="scratch-card-wrapper">
          {typeof HeartScratchCard !== 'undefined' && (
            <HeartScratchCard
              dateRevealed={dateRevealed}
              scratchedPercent={scratchedPercent}
              {...scratchProps}
            />
          )}
        </div>

        {/* Events Displayed as Large Luxury Cards */}
        {dateRevealed && (
          <div className="events-grid">
            {events.map((ev, i) => (
              <div
                key={i}
                className="event-card-large"
                style={{ animationDelay: `${0.1 + i * 0.15}s` }}
              >
                <div>
                  <div className="card-top-header">
                    <div className="card-emoji-badge">
                      <span className="floating-emoji">{ev.emoji}</span>
                    </div>
                    <span className="card-hindi-title">{ev.hindi}</span>
                  </div>

                  <h3 className="card-event-name">{ev.name}</h3>

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

                {ev.note && (
                  <div className="card-footer-note">
                    <span className="quote-mark">"</span>
                    {ev.note}
                    <span className="quote-mark">"</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}