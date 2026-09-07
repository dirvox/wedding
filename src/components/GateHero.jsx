import React, { useState, useEffect, useRef } from 'react';


export function GateHero({ gateOpen: externalGateOpen, setGateOpen: externalSetGateOpen, targetDate }) {
  const [internalGateOpen, setInternalGateOpen] = useState(false);
  const gateOpen = externalGateOpen !== undefined ? externalGateOpen : internalGateOpen;
  const setGateOpen = externalSetGateOpen || setInternalGateOpen;

  const canvasRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown timer logic
  useEffect(() => {
    const weddingDate = targetDate
      ? new Date(targetDate).getTime()
      : new Date().getTime() + 30 * 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Canvas Petal Shower System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const petals = Array.from({ length: 35 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1.5 + 0.8,
      speedX: Math.random() * 1 - 0.5,
      angle: Math.random() * 360,
      spin: Math.random() * 2 - 1,
      color: Math.random() > 0.4 ? '#FFB300' : '#E53935',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y / 30) + p.speedX;
        p.angle += p.spin;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 1.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleOpenGate = () => {
    if (!gateOpen) {
      setGateOpen(true);
    }
  };

  return (
    <>
      <style>{`
        @keyframes bowGlowPulse {
          0% { transform: scale(0.92); opacity: 0.6; box-shadow: 0 0 15px rgba(232, 199, 102, 0.4); }
          50% { transform: scale(1.12); opacity: 0.2; box-shadow: 0 0 35px rgba(232, 199, 102, 0.9); }
          100% { transform: scale(0.92); opacity: 0.6; box-shadow: 0 0 15px rgba(232, 199, 102, 0.4); }
        }

        @keyframes goldShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .gold-shimmer-text {
          background: linear-gradient(90deg, #6B1E3C 0%, #C9A227 50%, #6B1E3C 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: goldShimmer 4s linear infinite;
        }
      `}</style>

      <section id="home" className="relative w-screen h-screen min-h-[650px] overflow-hidden flex items-center justify-center bg-[#3A0C16]">
        {/* Background Wedding Invitation Image / Theme */}
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-[1]"
          style={{ backgroundImage: `url('/hero-bg.png')` }}
        />

        {/* Dynamic Petal Shower Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[5]" />

        {/* 3D Gate Wrapper */}
        <div
          className="absolute inset-0 flex z-[10]"
          style={{
            perspective: '1200px',
            pointerEvents: gateOpen ? 'none' : 'auto',
          }}
        >
          {/* Left Royal Gate Door */}
          <div
            className="absolute top-0 left-0 w-1/2 h-full bg-[linear-gradient(135deg,#4A1428_0%,#2A0813_100%)] border-r-[3px] border-[#C9A227] shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] transition-transform duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
            style={{
              transformOrigin: 'left center',
              backfaceVisibility: 'hidden',
              transform: gateOpen ? 'rotateY(-115deg)' : 'rotateY(0deg)',
            }}
          >
            <div className="absolute inset-[15px] border border-[rgba(201,162,39,0.35)] pointer-events-none" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A227_1px,transparent_1px)] bg-[size:20px_20px]" />
          </div>

          {/* Right Royal Gate Door */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(135deg,#4A1428_0%,#2A0813_100%)] border-l-[3px] border-[#C9A227] shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] transition-transform duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
            style={{
              transformOrigin: 'right center',
              backfaceVisibility: 'hidden',
              transform: gateOpen ? 'rotateY(115deg)' : 'rotateY(0deg)',
            }}
          >
            <div className="absolute inset-[15px] border border-[rgba(201,162,39,0.35)] pointer-events-none" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A227_1px,transparent_1px)] bg-[size:20px_20px]" />
          </div>

          {/* Ceremonial Silk Ribbon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-[15] pointer-events-none">
            {/* Left Ribbon Split */}
            <div
              className="absolute top-1/2 left-0 w-1/2 h-[50px] -mt-[25px] bg-[linear-gradient(to_bottom,#8B0000,#4A1428,#8B0000)] shadow-[0_4px_15px_rgba(0,0,0,0.4)] border-t-2 border-b-2 border-[#C9A227] transition-all duration-[1200ms]"
              style={{
                transformOrigin: 'left center',
                transform: gateOpen ? 'scaleX(0) rotate(-5deg)' : 'scaleX(1) rotate(0deg)',
                opacity: gateOpen ? 0 : 1,
              }}
            />
            {/* Right Ribbon Split */}
            <div
              className="absolute top-1/2 right-0 w-1/2 h-[50px] -mt-[25px] bg-[linear-gradient(to_bottom,#8B0000,#4A1428,#8B0000)] shadow-[0_4px_15px_rgba(0,0,0,0.4)] border-t-2 border-b-2 border-[#C9A227] transition-all duration-[1200ms]"
              style={{
                transformOrigin: 'right center',
                transform: gateOpen ? 'scaleX(0) rotate(5deg)' : 'scaleX(1) rotate(0deg)',
                opacity: gateOpen ? 0 : 1,
              }}
            />

            {/* Central Interactive Bow Knot */}
            <div
              onClick={handleOpenGate}
              role="button"
              tabIndex={0}
              aria-expanded={gateOpen}
              aria-label="Untie ceremonial ribbon to open invitation"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenGate();
                }
              }}
              className="relative pointer-events-auto cursor-pointer flex flex-col items-center z-[20] transition-all duration-800"
              style={{
                transform: gateOpen ? 'scale(0) rotate(90deg)' : 'scale(1) rotate(0deg)',
                opacity: gateOpen ? 0 : 1,
              }}
            >
              <div 
                className="absolute inset-[-12px] rounded-full border-2 border-[#C9A227] pointer-events-none"
                style={{ animation: 'bowGlowPulse 2.5s infinite ease-in-out' }}
              />

              <div className="flex items-center justify-center relative">
                <div 
                  className="w-[38px] h-[60px] border-[3px] border-[#C9A227] rounded-[50%_50%_50%_50%/_60%_60%_40%_40%] bg-[linear-gradient(135deg,#8B0000,#4A1428)] shadow-[0_4px_10px_rgba(0,0,0,0.3)]" 
                  style={{ transform: 'rotate(-38deg) translateX(8px)' }} 
                />

                {/* Central Royal Medallion */}
                <div className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-full bg-[#4A1428] border-[3px] border-[#C9A227] flex flex-col items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-[2] p-2 text-center">
                  <span className="font-serif text-[0.85srem] sm:text-[0.95rem] text-[#F8E58C] font-bold">Rohan &amp; Priya</span>
                </div>

                <div 
                  className="w-[38px] h-[60px] border-[3px] border-[#C9A227] rounded-[50%_50%_50%_50%/_60%_60%_40%_40%] bg-[linear-gradient(135deg,#8B0000,#4A1428)] shadow-[0_4px_10px_rgba(0,0,0,0.3)]" 
                  style={{ transform: 'rotate(38deg) translateX(-8px)' }} 
                />
              </div>

              {/* Ribbon Drapes */}
              <div className="flex gap-4 -mt-[10px]">
                <span className="w-[16px] h-[45px] bg-[linear-gradient(to_bottom,#8B0000,#4A1428)] border-x border-[#C9A227]" style={{ transform: 'rotate(18deg)', clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }} />
                <span className="w-[16px] h-[45px] bg-[linear-gradient(to_bottom,#8B0000,#4A1428)] border-x border-[#C9A227]" style={{ transform: 'rotate(-18deg)', clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }} />
              </div>

              <div className="mt-3 font-serif italic text-[1.05rem] text-[#FFF8D6] [text-shadow:0_2px_6px_rgba(0,0,0,0.8)] whitespace-nowrap">
                Tap Bow to Untie Ribbon
              </div>
            </div>
          </div>
        </div>

        {/* Revealed Wedding Hero Card Centered inside the Arch Background */}
        <div
          className="relative z-[6] flex items-center justify-center w-full h-full p-5 transition-all duration-1000 delay-300"
          style={{
            opacity: gateOpen ? 1 : 0,
            transform: gateOpen ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(30px)',
          }}
        >
          <div className="max-w-[540px] w-full p-[30px_20px] text-center flex flex-col items-center justify-center mt-5">
            <h3 className="text-[0.8rem] tracking-[3px] uppercase text-[#6B1E3C] font-semibold mb-2">
              ✦ SHUBH VIVAH · SAVE THE DATE ✦
            </h3>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] text-[#4A1428] mb-[10px] leading-[1.2]">
              Rohan <span className="gold-shimmer-text">&amp;</span> Priya
            </h1>
            <p className="font-serif italic text-[1.05rem] text-[#555] mb-5 max-w-[400px]">
              Together with their families, request the honor of your presence to celebrate their wedding
            </p>

            <div className="flex gap-[6px] sm:gap-[10px] justify-center mb-[25px]">
              <div className="bg-[rgba(255,249,242,0.85)] border border-[rgba(201,162,39,0.4)] p-[6px_8px] sm:p-[8px_12px] rounded-[8px] min-w-[48px] sm:min-w-[60px] shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                <div className="font-serif text-[1.1rem] sm:text-[1.4rem] font-bold text-[#4A1428]">{timeLeft.days}</div>
                <small className="text-[0.65rem] uppercase tracking-[1px] text-[#777] block">Days</small>
              </div>
              <div className="bg-[rgba(255,249,242,0.85)] border border-[rgba(201,162,39,0.4)] p-[6px_8px] sm:p-[8px_12px] rounded-[8px] min-w-[48px] sm:min-w-[60px] shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                <div className="font-serif text-[1.1rem] sm:text-[1.4rem] font-bold text-[#4A1428]">{timeLeft.hours}</div>
                <small className="text-[0.65rem] uppercase tracking-[1px] text-[#777] block">Hours</small>
              </div>
              <div className="bg-[rgba(255,249,242,0.85)] border border-[rgba(201,162,39,0.4)] p-[6px_8px] sm:p-[8px_12px] rounded-[8px] min-w-[48px] sm:min-w-[60px] shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                <div className="font-serif text-[1.1rem] sm:text-[1.4rem] font-bold text-[#4A1428]">{timeLeft.minutes}</div>
                <small className="text-[0.65rem] uppercase tracking-[1px] text-[#777] block">Mins</small>
              </div>
              <div className="bg-[rgba(255,249,242,0.85)] border border-[rgba(201,162,39,0.4)] p-[6px_8px] sm:p-[8px_12px] rounded-[8px] min-w-[48px] sm:min-w-[60px] shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                <div className="font-serif text-[1.1rem] sm:text-[1.4rem] font-bold text-[#4A1428]">{timeLeft.seconds}</div>
                <small className="text-[0.65rem] uppercase tracking-[1px] text-[#777] block">Secs</small>
              </div>
            </div>

            {/* <a href="#events" className="bg-[linear-gradient(135deg,#C9A227,#9A7B18)] text-[#FFF] p-[12px_28px] rounded-[30px] no-underline font-medium text-[0.95rem] shadow-[0_6px_20px_rgba(201,162,39,0.3)] transition-transform duration-300 hover:-translate-y-0.5">
              Explore Wedding Events
            </a> */}
          </div>
        </div>
      </section>
    </>
  );
}

/* ==========================================================================
   Styles Object with Valid CamelCase Keys
   ========================================================================== */
const styles = {
  hero: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0c0203',
    color: '#ffffff',
    boxSizing: 'border-box',
    fontFamily: '"Georgia", "Times New Roman", serif',
  },
  heroBackdrop: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at center, #420a10 0%, #170305 60%, #080102 100%)',
    zIndex: 1,
  },
  petalCanvas: {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    pointerEvents: 'none',
  },
  heroToran: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '60px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    zIndex: 10,
    pointerEvents: 'none',
    paddingTop: '5px',
  },
  toranFlowerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))',
  },
  gateContainer: {
    position: 'absolute',
    inset: 0,
    zIndex: 5,
    perspective: '1400px',
    display: 'flex',
  },
  gatePanel: {
    position: 'absolute',
    top: 0,
    width: '50%',
    height: '100%',
    background: 'linear-gradient(145deg, #42080d 0%, #210305 100%)',
    border: '4px solid #e8c766',
    boxSizing: 'border-box',
    transition: 'transform 2.2s cubic-bezier(0.77, 0, 0.175, 1)',
    transformStyle: 'preserve-3d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'inset 0 0 80px rgba(0,0,0,0.9)',
  },
  gateLeft: {
    left: 0,
    transformOrigin: 'left center',
    borderRight: '2px solid #e8c766',
  },
  gateRight: {
    right: 0,
    transformOrigin: 'right center',
    borderLeft: '2px solid #e8c766',
  },
  gateArchFrame: {
    position: 'absolute',
    inset: '20px',
    border: '2px solid rgba(232, 199, 102, 0.7)',
    borderRadius: '180px 180px 0 0',
    pointerEvents: 'none',
  },
  gateJaliPattern: {
    position: 'absolute',
    inset: '30px',
    border: '1px dashed rgba(232, 199, 102, 0.3)',
    borderRadius: '160px 160px 0 0',
    backgroundImage: 'radial-gradient(#e8c766 1.5px, transparent 1.5px)',
    backgroundSize: '24px 24px',
    opacity: 0.2,
  },
  gateEmblemContainer: {
    textAlign: 'center',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  emblemIcon: {
    fontSize: '3.5rem',
    filter: 'drop-shadow(0 0 15px rgba(232, 199, 102, 0.6))',
  },
  diyaHanger: {
    fontSize: '1.8rem',
    marginTop: '20px',
    animation: 'float 3s ease-in-out infinite alternate',
  },
  ribbonWrapper: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: '80px',
    transform: 'translateY(-50%)',
    zIndex: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  ribbonBand: {
    position: 'absolute',
    height: '55px',
    width: '50%',
    background: 'linear-gradient(180deg, #b71c1c 0%, #880e4f 50%, #4a0007 100%)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.4)',
    borderTop: '2px solid #e8c766',
    borderBottom: '2px solid #e8c766',
    transition: 'transform 1.4s cubic-bezier(0.7, 0, 0.84, 0), opacity 1.2s ease',
  },
  ribbonBowContainer: {
    position: 'relative',
    zIndex: 9,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.8s ease',
    outline: 'none',
    pointerEvents: 'auto',
  },
  bowPulseRing: {
    position: 'absolute',
    inset: '-15px',
    borderRadius: '50%',
    border: '2px solid #e8c766',
    animation: 'bowGlowPulse 2.5s infinite ease-in-out',
    pointerEvents: 'none',
  },
  bowKnot: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bowLoop: {
    width: '48px',
    height: '70px',
    background: 'linear-gradient(135deg, #d32f2f, #880e4f)',
    border: '2px solid #e8c766',
    borderRadius: '50% 50% 12% 12%',
    boxShadow: '0 6px 12px rgba(0,0,0,0.5)',
  },
  bowCenterSeal: {
    position: 'relative',
    zIndex: 2,
    width: '135px',
    height: '135px',
    background: 'radial-gradient(circle, #fff3d1 0%, #e8c766 60%, #9e7d20 100%)',
    border: '3px solid #ffffff',
    borderRadius: '50%',
    boxShadow: '0 8px 25px rgba(0,0,0,0.7)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2b0508',
    textAlign: 'center',
    padding: '10px',
    boxSizing: 'border-box',
  },
  sealSubhead: {
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: '#5c1218',
  },
  sealNames: {
    fontSize: '0.95rem',
    fontWeight: 'bold',
    margin: '3px 0',
  },
  sealDivider: {
    fontSize: '0.7rem',
    color: '#8e6b00',
  },
  sealCtaMini: {
    fontSize: '0.6rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '600',
    color: '#3d0c11',
  },
  bowRibbonTails: {
    position: 'absolute',
    top: '95px',
    display: 'flex',
    gap: '18px',
  },
  tail: {
    width: '22px',
    height: '55px',
    background: 'linear-gradient(180deg, #b71c1c, #4a0007)',
    border: '1px solid #e8c766',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)',
  },
  gateCtaPrompt: {
    marginTop: '60px',
    fontSize: '0.85rem',
    color: '#ffe082',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    textShadow: '0 2px 6px rgba(0,0,0,0.9)',
    fontWeight: 600,
  },
  heroContent: {
    position: 'relative',
    zIndex: 3,
    textAlign: 'center',
    transition: 'opacity 1.4s ease 0.6s, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
    padding: '0 20px',
    maxWidth: '750px',
    width: '100%',
    boxSizing: 'border-box',
  },
  invitationCard: {
    background: 'rgba(23, 3, 5, 0.75)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(232, 199, 102, 0.5)',
    padding: 'clamp(25px, 5vw, 45px) clamp(15px, 4vw, 35px)',
    borderRadius: '24px',
    boxShadow: '0 15px 40px rgba(0,0,0,0.8)',
  },
  heroEyebrow: {
    color: '#e8c766',
    fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
    letterSpacing: '3px',
    marginBottom: '1.2rem',
    marginTop: 0,
  },
  heroTitle: {
    fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
    color: '#ffffff',
    marginBottom: '0.8rem',
    marginTop: 0,
    lineHeight: 1.1,
  },
  heroSub: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)',
    color: '#e0e0e0',
    marginBottom: '2.2rem',
    lineHeight: 1.6,
  },
  countdownContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '2.2rem',
  },
  countdownBox: {
    background: 'rgba(232, 199, 102, 0.1)',
    border: '1px solid rgba(232, 199, 102, 0.4)',
    padding: '12px 16px',
    borderRadius: '12px',
    minWidth: '60px',
  },
  countdownNum: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#ffe082',
  },
  countdownLabel: {
    fontSize: '0.7rem',
    color: '#cccccc',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  btnGold: {
    display: 'inline-block',
    padding: '14px 36px',
    background: 'linear-gradient(135deg, #ffe082 0%, #e8c766 50%, #b89228 100%)',
    color: '#210305',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    textDecoration: 'none',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    borderRadius: '30px',
    boxShadow: '0 6px 20px rgba(232, 199, 102, 0.4)',
  },
};