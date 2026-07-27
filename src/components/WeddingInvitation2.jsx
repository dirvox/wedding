import React, { useState, useEffect, useRef } from 'react';

export default function WeddingInvitation2() {
  // Navigation
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Gate-opening hero animation
  const [gateOpen, setGateOpen] = useState(false);

  // Countdown
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // RSVP & Wishes
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [wishes, setWishes] = useState([
    { name: "Aman & Neha", message: "Congratulations to the beautiful couple! Milte hain shaadi mein, pakka!" },
    { name: "Rahul Sharma", message: "Wishing you both a lifetime of love, laughter, and endless happiness." }
  ]);
  const [newWish, setNewWish] = useState({ name: '', message: '' });

  // Scratch card (date reveal) & Confetti explosion
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const [dateRevealed, setDateRevealed] = useState(false);
  const canvasRef = useRef(null);
  const confettiCanvasRef = useRef(null);
  const isDrawing = useRef(false);
  const confettiParticles = useRef([]);
  const confettiAnimationRef = useRef(null);

  const weddingDateLabel = "15th December 2026";

  const events = [
    { emoji: '🌼', name: 'Haldi', hindi: 'हल्दी', date: '13 Dec 2026', time: '10:00 AM', venue: 'Family Courtyard', note: 'Aaiye, thoda peela rang lagayein!' },
    { emoji: '🌿', name: 'Mehendi', hindi: 'मेहंदी', date: '13 Dec 2026', time: '5:00 PM', venue: 'Garden Lawns', note: 'Henna, dhol aur thoda dance!' },
    { emoji: '🎶', name: 'Sangeet', hindi: 'संगीत', date: '14 Dec 2026', time: '7:00 PM', venue: 'Grand Palace Hall', note: 'Apne best moves ready rakhiye.' },
    { emoji: '💍', name: 'Wedding', hindi: 'विवाह', date: '15 Dec 2026', time: '8:00 PM', venue: 'Grand Palace, Delhi', note: 'Pheron ke saakshi baniye.' },
    { emoji: '🥂', name: 'Reception', hindi: 'स्वागत समारोह', date: '16 Dec 2026', time: '7:00 PM', venue: 'Grand Palace Lawns', note: 'Dinner, dance aur duaayein.' }
  ];

  // Countdown timer calculations
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

  // Initialize Scratch Card Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#E8C766');
    gradient.addColorStop(0.5, '#F9E7B9');
    gradient.addColorStop(1, '#C9A227');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#4A1428';
    ctx.font = '600 16px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ Scratch to Reveal Our Date ✦', canvas.width / 2, canvas.height / 2);
  }, []);

  // Confetti Engine Setup
  const triggerConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    const colors = ['#FFC107', '#E91E63', '#00BCD4', '#8BC34A', '#FF5722', '#9C27B0', '#E8C766', '#6B1E3C'];
    confettiParticles.current = Array.from({ length: 150 }).map(() => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 + window.scrollY + 100,
      radius: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 15,
      vy: (Math.random() - 0.7) * 18,
      opacity: 1,
      gravity: 0.25
    }));

    const animateConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      confettiParticles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.opacity -= 0.008;

        if (p.opacity > 0) {
          alive = true;
          ctx.beginPath();
          ctx.arc(p.x, p.y - window.scrollY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;
      if (alive) {
        confettiAnimationRef.current = requestAnimationFrame(animateConfetti);
      }
    };
    animateConfetti();
  };

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
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
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getMousePos(e);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
    ctx.fill();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    checkScratchedPercent();
  };

  const checkScratchedPercent = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparentPixels = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) transparentPixels++;
    }
    const percent = (transparentPixels / (pixels.length / 4)) * 100;
    setScratchedPercent(percent);
    if (percent > 55 && !dateRevealed) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setDateRevealed(true);
      triggerConfetti();
    }
  };

  const handleRSVP = (e) => {
    e.preventDefault();
    setRsvpSubmitted(true);
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
        html, body { overflow-x: hidden; max-width: 100%; background-color: var(--bg); }

        html, body, .wedding-container, * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar, *::-webkit-scrollbar {
          display: none; width: 0; height: 0;
        }

        .wedding-container { background-color: var(--bg); color: var(--text); font-family: 'Poppins', sans-serif; overflow-x: hidden; width: 100%; position: relative; }
        .display-font { font-family: 'Marcellus', serif; }
        .accent-font { font-family: 'Cormorant Garamond', serif; font-style: italic; }

        /* Fullscreen Overlay Canvas for Festive Popups */
        .confetti-overlay {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; z-index: 9999;
        }

        /* Continuous Dynamic Global Animation Accents across all sections */
        .section-petal-layer {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 1;
        }

        @keyframes driftParticle {
          0% { transform: translateY(110%) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-10%) translateX(70px) rotate(450deg); opacity: 0; }
        }

        .ambient-item {
          position: absolute; bottom: -20px;
          animation: driftParticle 14s linear infinite;
        }

        /* Navigation */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; background: rgba(255, 249, 242, 0.96);
          backdrop-filter: blur(8px); display: flex; justify-content: space-between; align-items: center;
          padding: 1rem 2.5rem; z-index: 1000; box-shadow: 0 2px 15px rgba(74,20,40,0.06);
        }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a { text-decoration: none; color: var(--text); font-weight: 500; font-size: 0.95rem; letter-spacing: 0.3px; transition: color 0.3s; position: relative; }
        .nav-links a::after { content: ''; position: absolute; left: 0; bottom: -4px; width: 0; height: 1px; background: var(--gold); transition: width 0.3s; }
        .nav-links a:hover { color: var(--maroon); }
        .nav-links a:hover::after { width: 100%; }
        .menu-btn { display: none; background: none; border: none; cursor: pointer; color: var(--maroon); }

        /* Gate-Opening Hero Layout */
        .hero {
          height: 100vh; min-height: 600px; position: relative; overflow: hidden;
          display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
        }
        .hero-backdrop {
          position: absolute; inset: 0;
          background: linear-gradient(rgba(74,20,40,0.6), rgba(74,20,40,0.45)),
                      url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920') center/cover;
        }
        .hero-content {
          position: relative; z-index: 2; padding: 2rem; color: #fff;
          opacity: 0; transform: translateY(30px);
          transition: opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.5s, transform 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.5s;
        }
        .hero-content.revealed { opacity: 1; transform: translateY(0); }
        .hero-eyebrow { letter-spacing: 5px; text-transform: uppercase; font-size: 0.9rem; color: var(--gold-light); margin-bottom: 0.8rem; }
        .hero-title { font-size: clamp(2.6rem, 7vw, 5rem); line-height: 1.1; margin-bottom: 0.5rem; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
        .hero-amp { color: var(--gold-light); font-size: 0.6em; }
        .hero-sub { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.25rem; margin: 1rem 0; opacity: 0.95; }

        .countdown-container { display: flex; gap: 1.2rem; justify-content: center; margin: 2rem 0; flex-wrap: wrap; }
        .countdown-box {
          background: rgba(74,20,40,0.45); border: 1px solid rgba(232,199,102,0.5);
          backdrop-filter: blur(8px); padding: 1rem 1.2rem; border-radius: 8px; min-width: 80px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2); animation: cardFloat 3s ease-in-out infinite alternate;
        }
        .countdown-box:nth-child(2n) { animation-delay: 0.5s; }
        @keyframes cardFloat { 0% { transform: translateY(0); } 100% { transform: translateY(-6px); } }
        .countdown-num { font-size: 2rem; font-weight: 600; color: #fff; font-family: 'Marcellus', serif; }
        .countdown-box small { opacity: 0.85; letter-spacing: 1px; text-transform: uppercase; font-size: 0.65rem; color: var(--gold-light); }

        .gate-panel {
          position: absolute; top: 0; height: 100%; width: 50%; z-index: 10;
          background: linear-gradient(135deg, var(--maroon-dark), var(--maroon));
          display: flex; align-items: center; transition: transform 1.8s cubic-bezier(0.77, 0, 0.175, 1);
          box-shadow: 0 0 60px rgba(0,0,0,0.65) inset;
        }
        .gate-left { left: 0; justify-content: flex-end; border-right: 3px solid var(--gold); }
        .gate-right { right: 0; justify-content: flex-start; border-left: 3px solid var(--gold); }
        .gate-left.open { transform: translateX(-101%); }
        .gate-right.open { transform: translateX(101%); }

        .gate-jali {
          width: 100%; height: 100%; opacity: 0.15;
          background-image: repeating-linear-gradient(45deg, var(--gold-light) 0 2px, transparent 2px 22px),
                            repeating-linear-gradient(-45deg, var(--gold-light) 0 2px, transparent 2px 22px);
        }
        .gate-emblem {
          position: absolute; top: 50%; transform: translateY(-50%); width: 90px; height: 90px;
          border: 2px solid var(--gold-light); border-radius: 50%;
          display: flex; align-items: center; justify-content: center; font-size: 2.2rem;
          background: var(--maroon-dark); box-shadow: 0 0 20px rgba(232,199,102,0.3);
        }
        .gate-left .gate-emblem { right: -45px; }
        .gate-right .gate-emblem { left: -45px; }

        .gate-cta {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 20;
          display: flex; flex-direction: column; align-items: center; gap: 1rem;
          color: var(--gold-light); text-align: center; transition: opacity 0.6s ease, visibility 0.6s;
        }
        .gate-cta.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        .gate-cta-ring {
          width: 90px; height: 90px; border: 2px solid var(--gold-light); border-radius: 50%;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          animation: pulseRing 2.4s ease-in-out infinite; background: rgba(74,20,40,0.7);
        }
        @keyframes pulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(232,199,102,0.5); transform: scale(1); }
          50% { box-shadow: 0 0 0 16px rgba(232,199,102,0); transform: scale(1.05); }
        }
        .gate-cta-text { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.2rem; letter-spacing: 1px; text-shadow: 0 2px 4px rgba(0,0,0,0.4); }
        .gate-cta-names { font-family: 'Marcellus', serif; font-size: 2rem; color: #fff; text-shadow: 0 2px 6px rgba(0,0,0,0.5); }

        /* Sections Layout */
        .section { padding: 6rem 1.5rem; position: relative; max-width: 100%; text-align: center; overflow: hidden; }
        .section-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 5; }
        .section-eyebrow { letter-spacing: 3px; text-transform: uppercase; font-size: 0.85rem; color: var(--gold); font-weight: 600; margin-bottom: 0.6rem; }
        .section-title { font-family: 'Marcellus', serif; font-size: clamp(2.2rem, 4vw, 3rem); margin-bottom: 1rem; color: var(--maroon-dark); }
        .section-divider { display: flex; align-items: center; justify-content: center; gap: 0.8rem; margin: 0 auto 3.5rem; color: var(--gold); }
        .section-divider .line { width: 60px; height: 1px; background: var(--gold); opacity: 0.5; }

        /* Content Styling */
        .story-card { max-width: 720px; margin: 0 auto; background: #fff; padding: 3rem 2.5rem; border-radius: 12px; box-shadow: 0 15px 45px rgba(74,20,40,0.06); border-top: 4px solid var(--gold); }
        .story-quote { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.6rem; color: var(--maroon); margin-bottom: 1.2rem; }
        .story-text { line-height: 1.9; color: #555; font-size: 1.05rem; }
        .story-img { width: 100%; max-height: 380px; object-fit: cover; border-radius: 8px; margin-top: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }

        /* Boarding Pass Cards */
        .events-wrap { display: flex; flex-direction: column; gap: 2rem; max-width: 800px; margin: 0 auto; }
        .ticket {
          display: flex; background: #fff; border-radius: 12px; overflow: hidden;
          box-shadow: 0 10px 30px rgba(74,20,40,0.06); text-align: left; position: relative;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s;
        }
        .ticket:nth-child(even) { transform: rotate(-0.6deg); }
        .ticket:nth-child(odd) { transform: rotate(0.6deg); }
        .ticket:hover { transform: rotate(0deg) translateY(-6px); box-shadow: 0 18px 40px rgba(74,20,40,0.12); }

        .ticket-stub {
          width: 110px; flex-shrink: 0; background: linear-gradient(160deg, var(--maroon), var(--maroon-dark));
          color: var(--gold-light); display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 0.4rem; position: relative;
        }
        .ticket-stub .emoji { font-size: 2.2rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }
        .ticket-stub .hindi { font-family: 'Cormorant Garamond', serif; font-size: 1rem; opacity: 0.9; font-weight: 600; }

        .ticket-perforation { width: 0; border-left: 2px dashed rgba(74,20,40,0.2); position: relative; }
        .ticket-perforation::before, .ticket-perforation::after {
          content: ''; position: absolute; left: -9px; width: 18px; height: 18px; border-radius: 50%; background: var(--bg);
        }
        .ticket-perforation::before { top: -9px; }
        .ticket-perforation::after { bottom: -9px; }

        .ticket-body { flex: 1; padding: 1.5rem 2rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .ticket-name { font-family: 'Marcellus', serif; font-size: 1.4rem; color: var(--maroon-dark); }
        .ticket-meta { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; font-size: 0.9rem; color: #666; }
        .ticket-meta span { display: flex; align-items: center; gap: 0.4rem; }
        .ticket-note { font-family: 'Cormorant Garamond', serif; font-style: italic; color: var(--maroon); font-size: 1.05rem; margin-top: 0.3rem; font-weight: 600; }
        .ticket-icon { width: 16px; height: 16px; fill: var(--gold); flex-shrink: 0; }

        /* Scratch Reveal Interface */
        .scratch-card-wrapper {
          position: relative; width: 340px; max-width: 90vw; height: 180px; margin: 2rem auto 0;
          border-radius: 14px; overflow: hidden; box-shadow: 0 15px 35px rgba(74,20,40,0.15);
          border: 3px solid var(--gold-light); background: #fff;
        }
        .scratch-card-reveal {
          position: absolute; inset: 0; background: linear-gradient(135deg, var(--maroon), var(--maroon-dark));
          display: flex; flex-direction: column; justify-content: center; align-items: center; color: #fff; gap: 0.3rem;
        }
        .scratch-canvas { position: absolute; top: 0; left: 0; cursor: grab; z-index: 2; touch-action: none; }
        .scratch-hint { font-size: 0.95rem; color: #666; }
        .scratch-progress { font-size: 0.8rem; color: var(--maroon); margin-top: 0.6rem; letter-spacing: 0.5px; font-weight: 600; }

        /* Map UI */
        .venue-map { width: 100%; max-width: 720px; height: 360px; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 35px rgba(74,20,40,0.08); margin: 2rem auto; border: 5px solid #fff; }
        .btn {
          background: var(--maroon); color: #fff; border: none; padding: 0.95rem 2.5rem;
          font-size: 1rem; border-radius: 30px; cursor: pointer; font-weight: 500; letter-spacing: 0.5px;
          transition: background 0.3s, transform 0.2s, box-shadow 0.3s; display: inline-flex; align-items: center; gap: 0.6rem; text-decoration: none;
          box-shadow: 0 4px 15px rgba(107,30,60,0.25);
        }
        .btn:hover { background: var(--maroon-dark); transform: translateY(-3px); box-shadow: 0 6px 20px rgba(107,30,60,0.35); }
        .btn-gold { background: var(--gold); color: var(--maroon-dark); box-shadow: 0 4px 15px rgba(201,162,39,0.25); }
        .btn-gold:hover { background: var(--gold-light); box-shadow: 0 6px 20px rgba(201,162,39,0.35); }

        /* Grid elements */
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.2rem; }
        .gallery-item { overflow: hidden; border-radius: 8px; height: 260px; cursor: pointer; position: relative; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1); }
        .gallery-item:hover img { transform: scale(1.15); }

        /* Dynamic Input Interfaces */
        .form-container { max-width: 640px; margin: 0 auto; background: #fff; padding: 3rem 2.5rem; border-radius: 12px; box-shadow: 0 12px 40px rgba(74,20,40,0.06); }
        .form-group { margin-bottom: 1.6rem; text-align: left; }
        .form-group label { display: block; margin-bottom: 0.6rem; font-weight: 500; font-size: 0.95rem; color: var(--maroon-dark); }
        .form-input { width: 100%; padding: 0.9rem; border: 1px solid #e3d9d0; border-radius: 8px; font-family: inherit; background: #FFFCF8; font-size: 1rem; transition: border-color 0.3s; }
        .form-input:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,162,39,0.15); }

        .svg-icon { width: 18px; height: 18px; fill: currentColor; vertical-align: middle; }
        .wish-card { background: #fff; padding: 1.6rem 2rem; border-radius: 10px; text-align: left; box-shadow: 0 5px 18px rgba(74,20,40,0.04); border-left: 4px solid var(--gold); }

        footer { background: var(--maroon-dark); color: #fff; padding: 5rem 1.5rem; text-align: center; position: relative; }

        @media (max-width: 768px) {
          .nav-links {
            display: ${isMenuOpen ? 'flex' : 'none'};
            flex-direction: column; position: absolute; top: 100%; left: 0; right: 0;
            background: rgba(255, 249, 242, 0.98); padding: 2.5rem; text-align: center; box-shadow: 0 15px 25px rgba(74,20,40,0.08); gap: 1.4rem;
          }
          .menu-btn { display: block; }
          .ticket { flex-direction: row; }
          .ticket-stub { width: 85px; }
          .ticket-body { padding: 1.2rem 1.4rem; }
          .section { padding: 4.5rem 1.2rem; }
        }
        @media (max-width: 480px) {
          .gate-emblem { width: 68px; height: 68px; font-size: 1.6rem; }
          .gate-left .gate-emblem { right: -34px; }
          .gate-right .gate-emblem { left: -34px; }
          .gate-cta-ring { width: 76px; height: 76px; }
          .countdown-box { min-width: 68px; padding: 0.7rem 0.8rem; }
          .countdown-num { font-size: 1.6rem; }
        }
      `}</style>

      {/* Confetti Explosion Layer */}
      <canvas ref={confettiCanvasRef} className="confetti-overlay" />

      {/* Navigation Context */}
      <nav className="navbar">
        <h2 className="display-font" style={{ color: 'var(--maroon)', fontSize: '1.5rem', letterSpacing: '1px' }}>Rohan & Priya</h2>
        <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? (
            <svg className="svg-icon" viewBox="0 0 24 24" style={{ width: 28, height: 28 }}><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          ) : (
            <svg className="svg-icon" viewBox="0 0 24 24" style={{ width: 28, height: 28 }}><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
          )}
        </button>
        <ul className="nav-links">
          <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
          <li><a href="#story" onClick={() => setIsMenuOpen(false)}>Our Story</a></li>
          <li><a href="#events" onClick={() => setIsMenuOpen(false)}>Events</a></li>
          <li><a href="#gallery" onClick={() => setIsMenuOpen(false)}>Gallery</a></li>
          <li><a href="#venue" onClick={() => setIsMenuOpen(false)}>Venue</a></li>
          <li><a href="#rsvp" onClick={() => setIsMenuOpen(false)}>RSVP</a></li>
        </ul>
      </nav>

      {/* HERO with gate-opening interaction */}
      <section id="home" className="hero">
        <div className="hero-backdrop" />

        {/* Gate panels */}
        <div className={`gate-panel gate-left ${gateOpen ? 'open' : ''}`}>
          <div className="gate-jali" />
          <div className="gate-emblem">🕉️</div>
        </div>
        <div className={`gate-panel gate-right ${gateOpen ? 'open' : ''}`}>
          <div className="gate-jali" />
          <div className="gate-emblem">🪔</div>
        </div>

        {/* Call to action to open the invitation layout */}
        <div className={`gate-cta ${gateOpen ? 'hidden' : ''}`}>
          <div className="gate-cta-names">Rohan & Priya</div>
          <div className="gate-cta-ring" onClick={() => setGateOpen(true)} role="button" tabIndex={0}
               onKeyDown={(e) => { if (e.key === 'Enter') setGateOpen(true); }} aria-label="Open the invitation">
            <svg className="svg-icon" viewBox="0 0 24 24" style={{ width: 34, height: 34, fill: '#E8C766' }}>
              <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm1 13.5l-4-4 1.41-1.41L13 13.67l3.59-3.59L18 11.5l-5 5z"/>
            </svg>
          </div>
          <div className="gate-cta-text">Tap to open the invitation</div>
        </div>

        {/* Hero content revealed behind the interactive entry gate */}
        <div className={`hero-content ${gateOpen ? 'revealed' : ''}`}>
          <h3 className="hero-eyebrow">Shubh Vivah · Save The Date</h3>
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

          <a href="#story" className="btn btn-gold" style={{ marginTop: '1rem' }}>View Full Invitation</a>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="section">
        <div className="section-petal-layer">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="ambient-item" style={{ left: `${15 + i * 20}%`, animationDelay: `${i * 1.8}s`, fontSize: i % 2 === 0 ? '1.3rem' : '1rem' }}>🌸</span>
          ))}
        </div>
        <div className="section-inner">
          <p className="section-eyebrow">The Beginning</p>
          <h2 className="section-title">Our Story</h2>
          <div className="section-divider"><span className="line" /> 🌸 <span className="line" /></div>
          <div className="story-card">
            <p className="story-quote">"Every love story is beautiful, but ours is our favourite."</p>
            <p className="story-text">
              Hum mile, dost bane, pyaar hua, aur ab shuru ho rahi hai hamari sabse khoobsurat kahani — humesha ke liye.
              Join us as we step into this new chapter, surrounded by the people we love most.
            </p>
            <img className="story-img" src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600" alt="Couple Moments" />
          </div>
        </div>
      </section>

      {/* Events & Interactive Scratch Card Section */}
      <section id="events" className="section" style={{ background: 'rgba(107,30,60,0.02)' }}>
        <div className="section-petal-layer">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="ambient-item" style={{ left: `${5 + i * 18}%`, animationDelay: `${0.4 + i * 2}s`, fontSize: '1.2rem' }}>✨</span>
          ))}
        </div>
        <div className="section-inner">
          <p className="section-eyebrow">Itinerary</p>
          <h2 className="section-title">Wedding Events</h2>
          <div className="section-divider"><span className="line" /> 🪔 <span className="line" /></div>

          <div className="events-wrap">
            {events.map((ev, i) => (
              <div className="ticket" key={i}>
                <div className="ticket-stub">
                  <span className="emoji">{ev.emoji}</span>
                  <span className="hindi">{ev.hindi}</span>
                </div>
                <div className="ticket-perforation" />
                <div className="ticket-body">
                  <h3 className="ticket-name display-font">{ev.name}</h3>
                  <div className="ticket-meta">
                    <span>
                      <svg className="ticket-icon" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
                      {ev.date}
                    </span>
                    <span>
                      <svg className="ticket-icon" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                      {ev.time}
                    </span>
                    <span>
                      <svg className="ticket-icon" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                      {ev.venue}
                    </span>
                  </div>
                  <p className="ticket-note">{ev.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Scratch Card Mechanism */}
          <div className="scratch-section" style={{ marginTop: '5rem' }}>
            <h3 className="display-font" style={{ fontSize: '1.8rem', color: 'var(--maroon-dark)' }}>✨ Scratch & Save the Date</h3>
            <p className="scratch-hint">Ungli ghumaiye, humari khaas tareekh dekhiye</p>
            
            <div className="scratch-card-wrapper">
              <div className="scratch-card-reveal">
                <span style={{ fontSize: '1.8rem', animation: 'cardFloat 1.5s ease-in-out infinite alternative' }}>💛</span>
                <h4 className="display-font" style={{ fontSize: '1.5rem', letterSpacing: '0.5px' }}>{weddingDateLabel}</h4>
                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>8:00 PM · Devrana, Meerut</p>
              </div>
              <canvas
                ref={canvasRef}
                className="scratch-canvas"
                width={340}
                height={180}
                onMouseDown={startDrawing}
                onMouseMove={scratch}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={scratch}
                onTouchEnd={stopDrawing}
              />
            </div>
            {!dateRevealed ? (
              <p className="scratch-progress">{Math.min(100, Math.round(scratchedPercent))}% revealed</p>
            ) : (
              <p className="scratch-progress" style={{ color: '#8BC34A', fontSize: '0.9rem' }}>🎉 Date Unlocked Successfully!</p>
            )}
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section id="venue" className="section">
        <div className="section-petal-layer">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="ambient-item" style={{ left: `${10 + i * 25}%`, animationDelay: `${0.8 + i * 1.5}s`, fontSize: '1.1rem' }}>🌸</span>
          ))}
        </div>
        <div className="section-inner">
          <p className="section-eyebrow">Location</p>
          <h2 className="section-title">Wedding Venue</h2>
          <div className="section-divider"><span className="line" /> 📍 <span className="line" /></div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem" }}>
            <div style={{ textAlign: "center" }}>
              <h3 className="display-font" style={{ fontSize: "1.5rem", color: "var(--maroon)", marginBottom: '0.3rem' }}>Devrana</h3>
              <p style={{ color: "#555", fontSize: '1.05rem' }}>Devrana, Meerut,<br />Uttar Pradesh - 251201</p>
            </div>

            <div className="venue-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2s0x0!2s0x0!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Wedding Venue Map Location"
              />
            </div>

            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn">Get Directions</a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section" style={{ background: 'rgba(107,30,60,0.02)' }}>
        <div className="section-inner">
          <p className="section-eyebrow">Memories</p>
          <h2 className="section-title">Moments Captured</h2>
          <div className="section-divider"><span className="line" /> 📷 <span className="line" /></div>
          <div className="gallery-grid">
            <div className="gallery-item"><img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=400" alt="Prewedding Celebration 1" /></div>
            <div className="gallery-item"><img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=400" alt="Prewedding Celebration 2" /></div>
            <div className="gallery-item"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400" alt="Prewedding Celebration 3" /></div>
            <div className="gallery-item"><img src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=400" alt="Prewedding Celebration 4" /></div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="section">
        <div className="section-petal-layer">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="ambient-item" style={{ left: `${8 + i * 22}%`, animationDelay: `${i * 2.5}s`, fontSize: '1.2rem' }}>✨</span>
          ))}
        </div>
        <div className="section-inner">
          <p className="section-eyebrow">Confirm</p>
          <h2 className="section-title">Are You Attending?</h2>
          <div className="section-divider"><span className="line" /> 💌 <span className="line" /></div>
          
          <div className="form-container">
            {rsvpSubmitted ? (
              <div style={{ padding: '2rem 0', animation: 'cardFloat 2s ease-in-out infinite alternate' }}>
                <span style={{ fontSize: '3.5rem' }}>🎉</span>
                <h3 className="display-font" style={{ color: 'var(--maroon)', marginTop: '1rem', fontSize: '1.8rem' }}>Shukriya!</h3>
                <p style={{ marginTop: '0.5rem', color: '#555' }}>Your RSVP response has been recorded successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleRSVP}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="form-input" required placeholder="Enter your name" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" className="form-input" required placeholder="Enter your phone number" />
                </div>
                <div className="form-group">
                  <label>Number of Guests</label>
                  <input type="number" className="form-input" min="1" max="10" defaultValue="1" />
                </div>
                <div className="form-group">
                  <label>Will you attend?</label>
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '0.6rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input type="radio" name="attend" defaultChecked /> Yes, absolutely!
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input type="radio" name="attend" /> Regretfully, No
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>Submit RSVP</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Wishes Section */}
      <section id="wishes" className="section" style={{ background: 'rgba(107,30,60,0.02)' }}>
        <div className="section-inner">
          <p className="section-eyebrow">Blessings</p>
          <h2 className="section-title">Leave Your Wishes ❤️</h2>
          <div className="section-divider"><span className="line" /> 🙏 <span className="line" /></div>
          
          <div className="form-container" style={{ marginBottom: '3.5rem' }}>
            <form onSubmit={handleWishSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" className="form-input" value={newWish.name}
                       onChange={(e) => setNewWish({ ...newWish, name: e.target.value })} required placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label>Your Message</label>
                <textarea className="form-input" rows="4" value={newWish.message}
                          onChange={(e) => setNewWish({ ...newWish, message: e.target.value })} required placeholder="Write your wishes here..." />
              </div>
              <button type="submit" className="btn">
                <svg className="svg-icon" viewBox="0 0 24 24" style={{ marginRight: '0.4rem', fill: '#fff' }}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                Send Blessing
              </button>
            </form>
          </div>

          <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {wishes.map((w, index) => (
              <div key={index} className="wish-card">
                <h4 style={{ color: 'var(--maroon)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontInt: '1.1rem' }}>
                  <svg className="svg-icon" viewBox="0 0 24 24" style={{ fill: 'var(--gold)' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.5 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  {w.name}
                </h4>
                <p style={{ fontStyle: 'italic', color: '#555', lineHeight: '1.6' }}>"{w.message}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Details */}
      <footer>
        <h2 className="display-font" style={{ color: 'var(--gold-light)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '1.2rem' }}>Thank You</h2>
        <p style={{ opacity: 0.9, maxWidth: '460px', margin: '0 auto 2.5rem auto', lineHeight: '1.8', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.2rem' }}>
          Aapka aana humare liye khushi ki baat hogi. We look forward to celebrating our special day with you.
        </p>
        <p style={{ fontSize: '0.85rem', opacity: 0.6, letterSpacing: '1.5px' }}>© 2026 ROHAN & PRIYA. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}