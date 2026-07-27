import React, { useState } from 'react';

export function GaneshaHeader({ rsvpRef, rsvpVisible = true }) {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {/* Keyframe Animations & Responsive Rules */}
      <style>{`
        @keyframes ganeshaGlowPulse {
          0% { filter: drop-shadow(0 0 8px rgba(232, 199, 102, 0.3)); }
          50% { filter: drop-shadow(0 0 22px rgba(232, 199, 102, 0.8)); }
          100% { filter: drop-shadow(0 0 8px rgba(232, 199, 102, 0.3)); }
        }

        @keyframes auraRotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @media (max-width: 600px) {
          .ganesha-card {
            padding: 30px 18px !important;
          }
          .mantra-primary {
            font-size: 1.15rem !important;
          }
          .mantra-secondary {
            font-size: 0.95rem !important;
          }
          .ganesha-image-wrapper {
            max-width: 170px !important;
          }
        }
      `}</style>

      <section
        id="rsvp"
        ref={rsvpRef}
        style={{
          ...styles.section,
          opacity: rsvpVisible ? 1 : 0,
          transform: rsvpVisible ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <div className="ganesha-card" style={styles.card}>
          {/* Decorative Corner Borders */}
          <div style={{ ...styles.corner, top: '10px', left: '10px', borderTop: '2px solid #e8c766', borderLeft: '2px solid #e8c766' }} />
          <div style={{ ...styles.corner, top: '10px', right: '10px', borderTop: '2px solid #e8c766', borderRight: '2px solid #e8c766' }} />
          <div style={{ ...styles.corner, bottom: '10px', left: '10px', borderBottom: '2px solid #e8c766', borderLeft: '2px solid #e8c766' }} />
          <div style={{ ...styles.corner, bottom: '10px', right: '10px', borderBottom: '2px solid #e8c766', borderRight: '2px solid #e8c766' }} />

          {/* Section Eyebrow Header */}
          <div style={styles.headerBadge}>✦ SHREE GANESHAYA NAMAH ✦</div>

          {/* Ganesha Icon / Image with Rotating Aura */}
          <div className="ganesha-image-wrapper" style={styles.imageContainer}>
            <div style={styles.auraRing} />

            {!imageError ? (
              <img
                src="/shree-ganesh.png"
                alt="Lord Ganesha"
                onError={() => setImageError(true)}
                style={styles.ganeshaImage}
              />
            ) : (
              /* Fallback SVG Icon if local image is missing */
              <div style={styles.fallbackIconWrapper}>
                <span style={{ fontSize: '4.5rem' }}>🕉️</span>
              </div>
            )}
          </div>

          {/* Sacred Sanskrit Mantras */}
          <div style={styles.mantraContainer}>
            <p className="mantra-primary" style={styles.mantraPrimary}>
              ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥
            </p>
            <p className="mantra-secondary" style={styles.mantraSecondary}>
              ॥ निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
            </p>
            <div style={styles.translationText}>
              "O Lord Ganesha, with a curved trunk and massive body, whose splendor equals millions of suns, please remove all obstacles from our endeavors always."
            </div>
          </div>

          {/* Bottom Decorative Motif */}
          <div style={styles.bottomMotif}>
            <span>🪔</span>
            <span style={{ margin: '0 12px', color: '#e8c766', fontSize: '0.8rem' }}>✦ ✦ ✦</span>
            <span>🪔</span>
          </div>
        </div>
      </section>
    </>
  );
}

/* ==========================================================================
   Inline Style Objects (CamelCase JavaScript Keys)
   ========================================================================== */
const styles = {
  section: {
    padding: '60px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%',
    transition: 'opacity 1s ease, transform 1s ease',
  },
  card: {
    position: 'relative',
    maxWidth: '650px',
    width: '100%',
    background: 'linear-gradient(145deg, rgba(43, 5, 8, 0.85) 0%, rgba(20, 2, 4, 0.95) 100%)',
    border: '1px solid rgba(232, 199, 102, 0.4)',
    borderRadius: '20px',
    padding: '45px 30px',
    textAlign: 'center',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(232, 199, 102, 0.05)',
    boxSizing: 'border-box',
    backdropFilter: 'blur(8px)',
  },
  corner: {
    position: 'absolute',
    width: '18px',
    height: '18px',
    pointerEvents: 'none',
  },
  headerBadge: {
    color: '#e8c766',
    fontSize: '0.85rem',
    letterSpacing: '3px',
    fontWeight: 'bold',
    marginBottom: '25px',
    textTransform: 'uppercase',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '220px',
    margin: '0 auto 25px auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  auraRing: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    border: '1px dashed rgba(232, 199, 102, 0.3)',
    animation: 'auraRotate 25s linear infinite',
    pointerEvents: 'none',
  },
  ganeshaImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
    objectFit: 'contain',
    animation: 'ganeshaGlowPulse 3.5s infinite ease-in-out',
    zIndex: 2,
  },
  fallbackIconWrapper: {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(232, 199, 102, 0.2) 0%, transparent 70%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  mantraContainer: {
    marginTop: '10px',
  },
  mantraPrimary: {
    color: '#ffe082',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    fontFamily: '"Georgia", "Times New Roman", serif',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
  },
  mantraSecondary: {
    color: '#e8c766',
    fontSize: '1.1rem',
    fontStyle: 'italic',
    margin: '0 0 18px 0',
    fontFamily: '"Georgia", "Times New Roman", serif',
    opacity: 0.9,
  },
  translationText: {
    color: '#cccccc',
    fontSize: '0.88rem',
    lineHeight: 1.6,
    fontStyle: 'italic',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '0 10px',
  },
  bottomMotif: {
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
  },
};