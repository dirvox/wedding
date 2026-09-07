import React, { useState, useEffect, useRef, useMemo } from 'react';
import { GateHero } from './GateHero';
import { GaneshaHeader } from './GaneshaHeader';

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

function OurStory({ storyRef, storyVisible }) {
  return (
    <section 
      id="story" 
      ref={storyRef} 
      className={`relative py-[120px] px-5 bg-[radial-gradient(circle_at_center,#3A0C16_0%,#1A0408_100%)] overflow-hidden flex justify-center font-sans ${storyVisible ? 'is-visible' : ''}`}
    >
      {/* Ambient Glowing Orbs */}
      <div className="absolute rounded-full blur-[90px] z-0 -top-[10%] -left-[5%] w-[400px] h-[400px] bg-[rgba(212,175,55,0.12)]"></div>
      <div className="absolute rounded-full blur-[90px] z-0 -bottom-[10%] -right-[5%] w-[500px] h-[500px] bg-[rgba(184,29,61,0.15)]"></div>

      <div className="max-w-[1100px] w-full relative z-1 flex flex-col lg:flex-row items-center gap-[60px] lg:gap-[80px]">
        
        {/* Left Side: Typography */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
          <span className={`text-[0.85rem] uppercase tracking-[4px] text-[#d4af37] font-bold mb-[15px] block transition-all duration-1000 cubic-bezier(0.2,0.8,0.2,1) delay-100 ${storyVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-[30px] blur-[5px]'}`}>
            The Beginning
          </span>
          <h2 className={`text-4xl lg:text-[3.5rem] text-[#fdfdfd] mb-[30px] font-serif leading-[1.1] transition-all duration-1000 cubic-bezier(0.2,0.8,0.2,1) delay-200 ${storyVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-[30px] blur-[5px]'}`}>
            Our Story
          </h2>
          
          <div className={`relative pl-0 lg:pl-[25px] pt-[20px] lg:pt-0 mb-[30px] transition-all duration-1000 cubic-bezier(0.2,0.8,0.2,1) delay-400 before:content-[''] before:absolute before:left-1/2 lg:before:left-0 before:top-0 before:bottom-auto lg:before:bottom-0 before:-translate-x-1/2 lg:before:translate-x-0 before:w-[50px] lg:before:w-[3px] before:h-[3px] lg:before:h-auto before:bg-[linear-gradient(to_right,transparent,#d4af37,transparent)] lg:before:bg-[linear-gradient(to_bottom,#d4af37,transparent)] before:rounded-[3px] ${storyVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-[30px] blur-[5px]'}`}>
            <p className="italic text-[1.4rem] lg:text-[1.6rem] text-[#f4ece4] font-serif leading-[1.4]">
              "Every love story is beautiful, but ours is our favourite."
            </p>
          </div>
          
          <p className={`text-[1.05rem] leading-[1.8] text-[#d9c9ba] max-w-[100%] lg:max-w-[450px] transition-all duration-1000 cubic-bezier(0.2,0.8,0.2,1) delay-600 ${storyVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-[30px] blur-[5px]'}`}>
            Hum mile, dost bane, pyaar hua, aur ab shuru ho rahi hai hamari sabse khoobsurat kahani — humesha ke liye. 
            <br/><br/>
            Join us as we step into this new chapter, surrounded by the people we love most.
          </p>
        </div>

        {/* Right Side: Unique Arched Image Layout */}
        <div className="flex-1 relative flex justify-center">
          <div className={`relative w-full max-w-[400px] transition-all duration-[1200ms] cubic-bezier(0.2,0.8,0.2,1) delay-300 ${storyVisible ? 'opacity-100 scale-100 translate-y-0 animate-[float-gentle_6s_ease-in-out_infinite_alternate_1.5s]' : 'opacity-0 scale-90 translate-y-[40px]'}`}>
            <div className="absolute top-[15px] lg:top-[20px] left-[15px] lg:-left-[20px] w-full h-full border-2 border-[rgba(212,175,55,0.5)] rounded-[200px_200px_15px_15px] z-[-1] transition-all duration-1000 ease hover:top-[20px] lg:hover:top-[30px] hover:left-[20px] lg:hover:-left-[30px] hover:border-[rgba(212,175,55,1)]"></div>
            <img
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-[200px_200px_15px_15px] shadow-[0_30px_60px_rgba(10,2,4,0.7)] transition-transform duration-500 hover:-translate-y-[10px] filter brightness-[0.9] contrast-[1.05] hover:brightness-[1.05]"
              src="/wedding-image.png"
              alt="Couple"
              onError={(e) => { 
                e.target.src = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600"; 
              }}
            />
            <div className={`absolute -right-[20px] bottom-[40px] text-[3rem] drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)] transition-all duration-1000 cubic-bezier(0.34,1.56,0.64,1) delay-1000 ${storyVisible ? 'opacity-100 scale-100 rotate-[15deg] animate-[sway_4s_ease-in-out_infinite_alternate_2s]' : 'opacity-0 scale-0 -rotate-[45deg]'}`}>
              🌸
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export function HeartScratchCard({
  canvasRef,
  dateRevealed,
  scratchedPercent = 0,
  startDrawing,
  scratch,
  stopDrawing,
  weddingDateLabel = "15th December 2026"
}) {
  return (
    <div className="relative flex flex-col items-center justify-center mx-auto my-[1.5rem] md:my-[1.5rem] md:mb-[3.5rem] max-w-[550px] w-full p-8 md:p-12 rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[rgba(212,175,55,0.4)] z-10">
      {/* Background Image Applied Here */}
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-0 filter brightness-90"
        style={{ backgroundImage: `url('/scratch-bg.png')` }}
      />
      {/* Dark luxury overlay to ensure readability */}
      <div className="absolute inset-0 bg-[rgba(26,5,14,0.65)] z-[1]" />

      <div className="relative z-[2] text-center w-full">
        
        <h3 className="font-serif text-[#F8E58C] mt-10 text-[1.8rem] md:text-[2.2rem] mb-[6px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Scratch to Save The Date
        </h3>
        <p className="text-[#D4AF37] text-[0.9rem] md:text-[1rem] mb-[30px] opacity-90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          Use your finger or mouse to scratch inside the heart ❤️
        </p>
      </div>

      {/* Perfectly Centered Heart Scratch Area */}
      <div className="relative w-[320px] h-[300px] my-2 mx-auto flex items-center mr-10 justify-center self-center z-[2]">
        {/* Glow halo behind heart */}
        <div className="absolute inset-[10px] mr-10 bg-[radial-gradient(circle,rgba(212,175,55,0.6)_0%,transparent_70%)] blur-[20px] animate-[glowPulse_3s_ease-in-out_infinite_alternate]" />

        {/* Revealed Content Underneath Canvas */}
        <div className={`absolute inset-0 flex  items-center justify-center z-[1] ${dateRevealed ? 'animate-[heartPulse_0.8s_ease]' : ''}`}>
          <div className="w-[300px] h-[270px] bg-[linear-gradient(135deg,#2A0813_0%,#1A050E_100%)] [clip-path:path('M_150,_260_C_150,_260_15,_160_15,_85_C_15,_20_80,_10_150,_65_C_220,_10_285,_20_285,_85_C_285,_160_150,_260_150,_260_Z')] flex flex-col items-center justify-center p-[25px] text-center shadow-[inset_0_0_30px_rgba(212,175,55,0.4)] relative">
            <div className="absolute inset-[8px] [clip-path:path('M_142,_245_C_142,_245_22,_152_22,_82_C_22,_25_78,_18_142,_65_C_206,_18_262,_25_262,_82_C_262,_152_142,_245_142,_245_Z')] border border-dashed border-[rgba(212,175,55,0.8)] pointer-events-none" />
            {/* <span className="text-[2.6rem] mb-[2px] filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">💍</span> */}
            <h4 className="font-serif text-[1.5rem] text-[#F8E58C] my-[4px] font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {weddingDateLabel}
            </h4>
            {/* <div className="w-[50px] h-[1px] bg-[#D4AF37] my-[8px] shadow-[0_0_5px_#D4AF37]" />
            <p className="text-[0.9rem] text-[#D4AF37] font-semibold tracking-[1px]">8:00 PM Onwards</p>
            <p className="text-[0.85rem] text-[#E0E0E0] mt-[4px]">Devrana, Khatauli</p> */}
          </div>
        </div>

        {/* Scratch Canvas Overlay */}
        <div className=''>
          <canvas
          ref={canvasRef}
          width={300}
          height={300}
          onMouseDown={startDrawing}
          onMouseMove={scratch}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={scratch}
          onTouchEnd={stopDrawing}
          className={`absolute inset-0 cursor-pointer touch-none z-[3] mr-10 transition-opacity duration-500 ${dateRevealed ? 'opacity-0 mr-10 pointer-events-none' : ''}`}
        />
        </div>
      </div>

      <div className="relative z-[2] mt-5 flex flex-col items-center justify-center w-full">
        {!dateRevealed ? (
          <div className="w-[240px] h-[18px] bg-[rgba(0,0,0,0.6)] rounded-[20px] relative overflow-hidden border border-[rgba(212,175,55,0.4)] shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]">
            <div 
              className="h-full bg-[linear-gradient(90deg,#B8860B,#FFD700,#F8E58C)] bg-[length:200%_100%] animate-[gradientShift_2s_linear_infinite] transition-all duration-300 cubic-bezier(0.4,0,0.2,1)" 
              style={{ width: `${Math.min(scratchedPercent * 2, 100)}%` }} 
            />
            <span className="absolute inset-0 flex items-center justify-center text-[0.75rem] font-bold text-[#1A050E] drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]">
              {Math.round(scratchedPercent)}% Cleared
            </span>
          </div>
        ) : (
          <p className="text-[#F8E58C] font-semibold text-[1.1rem] tracking-[1px] animate-[fadeInDown_0.8s_ease_forwards] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
            {/* ✨ Date Unlocked! Explore the events below ✨ */}
          </p>
        )}
      </div>
    </div>
  );
}

export function WeddingEvents({
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
      className={`relative py-[60px] md:py-[100px] px-5 bg-[radial-gradient(circle_at_top_center,#4A1428_0%,#1A050E_100%)] overflow-hidden text-[#Fdfbf7] transition-opacity duration-800 ${eventsVisible ? "opacity-150 translate-y-0" : "opacity-0 translate-y-[35px]"}`}
    >
      {/* Subtle glowing background orbs */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] blur-[40px] animate-[floatOrb_8s_infinite_alternate_ease-in-out]" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(107,30,60,0.2)_0%,transparent_70%)] blur-[60px] animate-[floatOrb_10s_infinite_alternate-reverse_ease-in-out]" />

      {/* <p className="text-[#D4AF37] text-[1.1rem] uppercase tracking-[4px] text-center mb-[10px] font-semibold">Itinerary</p> */}
      <h2 className="text-[#F8E58C] text-[2.4rem] md:text-[3rem] text-center mb-[15px] font-serif drop-shadow-[0_4px_15px_rgba(212,175,55,0.3)]">Wedding Events</h2>
      <div className="flex items-center justify-center gap-[15px] mb-[50px]">
        <span className="h-[1px] w-[80px] bg-[linear-gradient(90deg,transparent,#D4AF37,transparent)]" /> 
        <span className="text-[1.5rem] animate-[gentleSpin_4s_linear_infinite]">🪔</span> 
        <span className="h-[1px] w-[80px] bg-[linear-gradient(90deg,transparent,#D4AF37,transparent)]" />
      </div>

      {/* Heart Scratch Card Component with Background Image & Centered Heart */}
      <HeartScratchCard 
        dateRevealed={dateRevealed} 
        scratchedPercent={scratchedPercent} 
        {...scratchProps} 
      />

      {/* Events Displayed as Large Luxury Cards */}
      {dateRevealed && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2.5rem] max-w-[1100px] mx-auto mt-[4rem] px-[15px] relative z-10">
          {events.map((ev, i) => (
            <div
              key={i}
              className="bg-[rgba(35,10,18,0.6)] backdrop-blur-[16px] rounded-[16px] md:rounded-[20px] border border-[rgba(212,175,55,0.3)] shadow-[0_15px_35px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(212,175,55,0.05)] p-[1.8rem] md:p-[2.5rem_2rem] text-left relative overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] flex flex-col justify-between opacity-0 hover:-translate-y-[12px] hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(212,175,55,0.25)] hover:border-[rgba(212,175,55,0.8)] hover:bg-[rgba(45,13,23,0.75)] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[5px] before:bg-[linear-gradient(90deg,#D4AF37,#FFF8D6,#D4AF37)] before:shadow-[0_0_15px_rgba(212,175,55,0.8)]"
              style={{ animation: `cardFadeIn 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards ${i * 0.2}s` }}
            >
              <div>
                <div className="flex justify-between items-center mb-[1.5rem]">
                  <div className="w-[60px] h-[60px] rounded-full bg-[linear-gradient(135deg,rgba(212,175,55,0.2),transparent)] border border-[rgba(212,175,55,0.6)] flex items-center justify-center text-[2rem] shadow-[inset_0_0_15px_rgba(212,175,55,0.2),0_4px_15px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:rotate-[10deg] hover:scale-110">{ev.emoji}</div>
                  <span className="font-serif text-[1.3rem] md:text-[1.5rem] text-[#D4AF37] font-semibold tracking-[1px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{ev.hindi}</span>
                </div>

                <h3 className="font-serif text-[1.8rem] md:text-[2.2rem] text-[#F8E58C] mb-[1.2rem] leading-[1.2]">{ev.name}</h3>

                <div className="flex flex-col gap-[1rem] mb-[2rem] text-[1rem] text-[#EAEAEA]">
                  <div className="flex items-center gap-[1rem]">
                    <span className="w-[32px] h-[32px] rounded-full bg-[rgba(212,175,55,0.15)] flex items-center justify-center text-[1rem] flex-shrink-0 border border-[rgba(212,175,55,0.3)] text-[#F8E58C]">📅</span>
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-[1rem]">
                    <span className="w-[32px] h-[32px] rounded-full bg-[rgba(212,175,55,0.15)] flex items-center justify-center text-[1rem] flex-shrink-0 border border-[rgba(212,175,55,0.3)] text-[#F8E58C]">🕒</span>
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-[1rem]">
                    <span className="w-[32px] h-[32px] rounded-full bg-[rgba(212,175,55,0.15)] flex items-center justify-center text-[1rem] flex-shrink-0 border border-[rgba(212,175,55,0.3)] text-[#F8E58C]">📍</span>
                    <span>{ev.venue}</span>
                  </div>
                </div>
              </div>

              {ev.note && (
                <div className="bg-[rgba(212,175,55,0.08)] rounded-[10px] p-[1rem_1.2rem] border-l-4 border-[#D4AF37] font-serif italic text-[1.05rem] md:text-[1.15rem] text-[#F8E58C] leading-[1.5] relative">
                  "{ev.note}"
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
// Helper to draw heart paths on 2D Canvas context






function VenueSection() {
  return (
    <section id="venue" className="relative py-[80px] md:py-[100px] px-5 bg-[radial-gradient(circle_at_center,#3A0F1E_0%,#110309_100%)] overflow-hidden text-[#Fdfbf7] flex flex-col items-center">
      <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_60%)] blur-[50px] pointer-events-none" />

      <p className="text-[#D4AF37] text-[1.1rem] uppercase tracking-[4px] text-center mb-[10px] font-semibold">Location</p>
      <h2 className="text-[#F8E58C] text-[2.4rem] md:text-[3rem] text-center mb-[15px] font-serif drop-shadow-[0_4px_15px_rgba(212,175,55,0.3)]">Wedding Venue</h2>
      <div className="flex items-center justify-center gap-[15px] mb-[50px]">
        <span className="h-[1px] w-[80px] bg-[linear-gradient(90deg,transparent,#D4AF37,transparent)]" /> 
        <span className="text-[1.2rem]">✨</span> 
        <span className="h-[1px] w-[80px] bg-[linear-gradient(90deg,transparent,#D4AF37,transparent)]" />
      </div>

      <div className="bg-[rgba(35,10,18,0.6)] backdrop-blur-[16px] rounded-[20px] border border-[rgba(212,175,55,0.3)] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(212,175,55,0.05)] p-[2rem_1.5rem] md:p-[3rem_2.5rem] max-w-[800px] w-full text-center relative overflow-hidden animate-[fadeUp_1s_cubic-bezier(0.25,1,0.5,1)_forwards] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[5px] before:bg-[linear-gradient(90deg,#D4AF37,#FFF8D6,#D4AF37)]">
        <span className="text-[2rem] mb-[10px] inline-block filter drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">📍</span>
        <h3 className="text-[#F8E58C] text-[2rem] md:text-[2.5rem] font-serif mb-[12px] tracking-[1px]">Devrana</h3>
        <p className="text-[#EAEAEA] text-[1rem] md:text-[1.15rem] leading-[1.6] mb-[2rem]">
          Devrana, Khatauli, Muzaffarnagar,<br />
          Uttar Pradesh - 251201
        </p>

        <div className="w-full h-[250px] md:h-[350px] rounded-[12px] overflow-hidden border-2 border-[rgba(212,175,55,0.4)] shadow-[0_10px_25px_rgba(0,0,0,0.4)] mb-[2rem] relative bg-[#110309] group">
          <iframe
            src="https://www.google.com/maps?q=Devrana,Khatauli,Muzaffarnagar,Uttar+Pradesh&output=embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Venue Map"
            className="w-full h-full border-0 filter grayscale-[20%] contrast-[1.1] transition-filter duration-300 group-hover:grayscale-0 group-hover:contrast-100"
          />
        </div>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Devrana,Khatauli,Muzaffarnagar,Uttar+Pradesh"
          target="_blank"
          rel="noreferrer"
          className="bg-[linear-gradient(135deg,#D4AF37,#B8860B)] text-[#110309] font-bold text-[1rem] md:text-[1.1rem] py-[12px_28px] md:py-[14px_36px] px-8 rounded-[30px] inline-flex items-center gap-[10px] transition-all duration-300 shadow-[0_8px_20px_rgba(212,175,55,0.3)] border border-[#FFF8D6] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(212,175,55,0.5)] hover:bg-[linear-gradient(135deg,#E6C762,#D4AF37)] uppercase tracking-[1.5px]"
        >
          <span>Get Directions</span> <span>🗺️</span>
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
    <section 
      id="gallery" 
      ref={galleryRef} 
      className={`relative py-[80px] md:py-[100px] px-5 bg-[radial-gradient(circle_at_bottom_right,#4A1428_0%,#110309_100%)] overflow-hidden transition-opacity duration-800 ${galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[35px]'}`}
    >
      <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] blur-[60px] pointer-events-none" />

      <p className="text-[#D4AF37] text-[1.1rem] uppercase tracking-[4px] text-center mb-[10px] font-semibold">Memories</p>
      <h2 className="text-[#F8E58C] text-[2.4rem] md:text-[3rem] text-center mb-[15px] font-serif drop-shadow-[0_4px_15px_rgba(212,175,55,0.3)]">Moments Captured</h2>
      
      <div className="flex items-center justify-center gap-[15px] mb-[60px]">
        <span className="h-[1px] w-[80px] bg-[linear-gradient(90deg,transparent,#D4AF37,transparent)]" /> 
        <span className="text-[1.5srem] text-[#D4AF37] animate-[gentleFloat_3s_ease-in-out_infinite_alternate]">📷</span> 
        <span className="h-[1px] w-[80px] bg-[linear-gradient(90deg,transparent,#D4AF37,transparent)]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.5rem] md:gap-[2.5rem] max-w-[1200px] mx-auto relative z-2">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className={`bg-[rgba(35,10,18,0.4)] backdrop-blur-[12px] p-4 rounded-[12px] border border-[rgba(212,175,55,0.2)] shadow-[0_15px_35px_rgba(0,0,0,0.4)] relative transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-[10px] hover:scale-[1.03] hover:border-[rgba(212,175,55,0.6)] hover:shadow-[0_25px_45px_rgba(0,0,0,0.6),0_0_30px_rgba(212,175,55,0.15)] hover:bg-[rgba(45,13,23,0.6)] ${galleryVisible ? 'animate-[cardFadeUp_0.8s_forwards]' : 'opacity-0'}`}
            style={{ animationDelay: `${idx * 0.2}s` }}
          >
            <div className="relative rounded-[8px] overflow-hidden aspect-[4/5] border-2 border-[rgba(212,175,55,0.4)] group">
              <div className="absolute w-[15px] h-[15px] border-2 border-[#D4AF37] z-2 pointer-events-none top-[10px] left-[10px] border-r-0 border-b-0"></div>
              <div className="absolute w-[15px] h-[15px] border-2 border-[#D4AF37] z-2 pointer-events-none top-[10px] right-[10px] border-l-0 border-b-0"></div>
              <div className="absolute w-[15px] h-[15px] border-2 border-[#D4AF37] z-2 pointer-events-none bottom-[10px] left-[10px] border-r-0 border-t-0"></div>
              <div className="absolute w-[15px] h-[15px] border-2 border-[#D4AF37] z-2 pointer-events-none bottom-[10px] right-[10px] border-l-0 border-t-0"></div>
              
              <img src={img} alt={`Beautiful wedding moment ${idx + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-800 contrast-[1.1] brightness-[0.9] group-hover:scale-110 group-hover:brightness-110" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WishesSection({ wishesRef, wishesVisible, wishes, newWish, setNewWish, handleWishSubmit }) {
  return (
    <section 
      id="wishes" 
      ref={wishesRef} 
      className={`relative py-[80px] md:py-[100px] px-5 bg-[radial-gradient(circle_at_top_left,#3A0F1E_0%,#110309_100%)] overflow-hidden text-[#Fdfbf7] transition-opacity duration-800 ${wishesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[35px]'}`}
    >
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_60%)] blur-[60px] pointer-events-none" />

      <p className="text-[#D4AF37] text-[1.1rem] uppercase tracking-[4px] text-center mb-[10px] font-semibold">Blessings</p>
      <h2 className="text-[#F8E58C] text-[2.4rem] md:text-[3rem] text-center mb-[15px] font-serif drop-shadow-[0_4px_15px_rgba(212,175,55,0.3)]">Leave Your Wishes ❤️</h2>
      <div className="flex items-center justify-center gap-[15px] mb-[50px]">
        <span className="h-[1px] w-[80px] bg-[linear-gradient(90deg,transparent,#D4AF37,transparent)]" /> 
        <span className="text-[1.5rem] animate-[gentleFloat_3s_ease-in-out_infinite_alternate]">🙏</span> 
        <span className="h-[1px] w-[80px] bg-[linear-gradient(90deg,transparent,#D4AF37,transparent)]" />
      </div>

      <div className="bg-[rgba(35,10,18,0.5)] backdrop-blur-[16px] rounded-[20px] border border-[rgba(212,175,55,0.3)] shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(212,175,55,0.05)] p-[2rem_1.5rem] md:p-[3rem] max-w-[600px] mx-auto mb-[4rem] relative z-2">
        <form onSubmit={handleWishSubmit}>
          <div className="mb-[1.5rem] text-left">
            <label className="block text-[#D4AF37] font-serif text-[1.2rem] mb-[0.5rem] tracking-[1px]">Your Name</label>
            <input
              type="text"
              className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(212,175,55,0.4)] text-[#F8E58C] p-[14px_18px] rounded-[10px] text-[1rem] transition-all duration-300 outline-none focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.3)] focus:bg-[rgba(0,0,0,0.5)] placeholder:text-[rgba(248,229,140,0.4)]"
              value={newWish.name}
              onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
              required
              placeholder="Enter your beautiful name"
            />
          </div>
          <div className="mb-[1.5rem] text-left">
            <label className="block text-[#D4AF37] font-serif text-[1.2rem] mb-[0.5rem] tracking-[1px]">Your Message</label>
            <textarea
              className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(212,175,55,0.4)] text-[#F8E58C] p-[14px_18px] rounded-[10px] text-[1rem] transition-all duration-300 outline-none focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.3)] focus:bg-[rgba(0,0,0,0.5)] placeholder:text-[rgba(248,229,140,0.4)] resize-none"
              rows="4"
              value={newWish.message}
              onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
              required
              placeholder="Write your heartfelt wishes here..."
            />
          </div>
          <button type="submit" className="bg-[linear-gradient(135deg,#D4AF37,#B8860B)] text-[#110309] font-bold text-[1.1rem] py-[14px] rounded-[10px] border border-[#FFF8D6] w-full flex items-center justify-center gap-[10px] cursor-pointer uppercase tracking-[1.5px] transition-all duration-300 shadow-[0_8px_20px_rgba(212,175,55,0.3)] hover:-translate-y-[3px] hover:shadow-[0_12px_25px_rgba(212,175,55,0.5)] hover:bg-[linear-gradient(135deg,#E6C762,#D4AF37)] group">
            Send Blessing
            <svg viewBox="0 0 24 24" className="fill-[#110309] w-[20px] h-[20px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>

      <div className="max-w-[700px] mx-auto flex flex-col gap-[1.5rem] relative z-2">
        {wishes.map((w, index) => (
          <div 
            key={index} 
            className={`bg-[rgba(35,10,18,0.4)] backdrop-blur-[10px] rounded-[16px] border-l-4 border-[#D4AF37] border-t border-r border-b border-[rgba(212,175,55,0.15)] p-[1.5rem] md:p-[1.8rem] shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all duration-300 hover:translate-x-[5px] hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(212,175,55,0.05)] hover:border-l-[#F8E58C] ${wishesVisible ? 'animate-[slideUpFade_0.6s_cubic-bezier(0.25,1,0.5,1)_forwards]' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <h4 className="text-[#D4AF37] font-serif text-[1.4rem] mb-[0.5rem] flex items-center gap-[8px]">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#D4AF37]">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.5 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {w.name}
            </h4>
            <p className="italic text-[#EAEAEA] leading-[1.6] text-[1.05rem]">"{w.message}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[linear-gradient(180deg,#1A050E_0%,#0A0205_100%)] py-[80px] md:py-[100px] px-5 relative overflow-hidden text-center text-[#Fdfbf7] border-t border-[rgba(212,175,55,0.2)]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_60%)] blur-[50px] pointer-events-none" />

      <div className="relative z-2 flex flex-col items-center">
        <h3 className="text-[#D4AF37] text-[clamp(1.2rem,3vw,1.8rem)] uppercase tracking-[6px] mb-[20px] font-semibold animate-[fadeIn_1.5s_ease-in-out]">Thank You</h3>
        
        <div className="flex items-center justify-center gap-[15px] mb-[40px] w-full max-w-[300px]">
          <span className="h-[1px] flex-grow bg-[linear-gradient(90deg,transparent,#D4AF37,transparent)]" />
          <span className="text-[#F8E58C] text-[1.2rem] drop-shadow-[0_0_5px_rgba(212,175,55,0.8)] animate-[pulseGlow_3s_infinite_alternate]">✨</span>
          <span className="h-[1px] flex-grow bg-[linear-gradient(90deg,transparent,#D4AF37,transparent)]" />
        </div>

        <h1 className="font-serif text-[clamp(3.5rem,10vw,8rem)] leading-[1.1] mb-[30px] bg-[linear-gradient(to_bottom,#FFF8D6_20%,#D4AF37_50%,#B8860B_80%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center justify-center flex-wrap gap-[10px] md:gap-[20px]">
          <span>Rohan</span>
          <span className="font-['Brush_Script_MT','Great_Vyes',cursive] italic text-[#E6C762] text-[clamp(3rem,8vw,6rem)] font-normal [-webkit-text-fill-color:#E6C762] bg-none drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] my-[-10px] sm:my-0">&</span>
          <span>Priya</span>
        </h1>

        <p className="text-[#EAEAEA] opacity-90 max-w-[500px] mx-auto mb-[3rem] leading-[1.8] font-serif italic text-[clamp(1.1rem,2.5vw,1.3rem)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          Aapka aana humare liye khushi ki baat hogi.<br /> 
          We look forward to celebrating our special day with you.
        </p>

        <div className="mt-[40px] pt-[30px] border-t border-[rgba(212,175,55,0.15)] w-full max-w-[800px]">
          <p className="text-[0.8rem] text-[#D4AF37] opacity-60 tracking-[2px] uppercase">
            © 2026 ROHAN & PRIYA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function WeddingInvitation() {
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
    <div className="overflow-x-hidden max-w-full bg-[#FFF9F2] text-[#2D1B24] font-sans selection:bg-[#C9A227] selection:text-[#fff]">
      {/* Google Fonts Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Poppins:wght@300;400;500;600&display=swap');
        
        /* Custom Keyframe Animations required for dynamic logic */
        @keyframes float-gentle { 0% { transform: translateY(0); } 100% { transform: translateY(-15px); } }
        @keyframes sway { 0% { transform: scale(1) rotate(15deg); } 100% { transform: scale(1) rotate(-5deg); } }
        @keyframes glowPulse { 0% { transform: scale(0.9); opacity: 0.5; } 100% { transform: scale(1.15); opacity: 0.9; } }
        @keyframes gradientShift { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cardFadeIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatOrb { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(30px, 30px) scale(1.1); } }
        @keyframes gentleSpin { 0% { transform: rotate(-10deg) scale(1); } 50% { transform: rotate(10deg) scale(1.1); } 100% { transform: rotate(-10deg) scale(1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gentleFloat { 0% { transform: translateY(-3px); } 100% { transform: translateY(3px); } }
        @keyframes cardFadeUp { 0% { opacity: 0; transform: translateY(50px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes slideUpFade { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes pulseGlow { 0% { transform: scale(0.9); opacity: 0.7; } 100% { transform: scale(1.1); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heartPulse { 0% { transform: scale(1); } 50% { transform: scale(1.08); } 100% { transform: scale(1); } }
        @keyframes confettiFall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0.9; } }
      `}</style>

      {/* Confetti Explosion */}
      {showConfetti && confettiPieces.map((c) => (
        <span
          key={c.id}
          className="fixed top-0 z-[4000] pointer-events-none animate-[confettiFall_3s_ease-in_forwards]"
          style={{
            left: `${c.left}%`,
            width: `${c.size}px`,
            height: `${c.size * 1.4}px`,
            backgroundColor: c.color,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            transform: `rotate(${c.rotate}deg)`
          }}
        />
      ))}

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
      {/* <GallerySection galleryRef={galleryRef} galleryVisible={galleryVisible} /> */}

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