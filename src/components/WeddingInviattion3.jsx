import React, { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PETAL_EMOJIS = ['🌸', '🌺', '🌼', '💮', '🌷', '✨'];
const CONFETTI_COLORS = ['#C9A227', '#E8C766', '#6B1E3C', '#F3D9DA', '#FF6F91', '#8ECAE6', '#FFD166', '#B5838D'];

export default function WeddingInvitation3() {
  // Navigation
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Gate-opening hero animation state
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

  // Scratch card (date reveal)
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const [dateRevealed, setDateRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const weddingDateLabel = "15th December 2026";

  // Animation Refs
  const heroContentRef = useRef(null);
  const ganeshaRef = useRef(null);
  const storyRef = useRef(null);
  const eventsRef = useRef(null);
  const scratchWrapRef = useRef(null);
  const venueRef = useRef(null);
  const galleryRef = useRef(null);
  const rsvpRef = useRef(null);
  const wishesRef = useRef(null);

  // Events data
  const events = [
    { emoji: '🌼', name: 'Haldi', hindi: 'हल्दी', date: '13 Dec 2026', time: '10:00 AM', venue: 'Family Courtyard', note: 'Aaiye, thoda peela rang lagayein!' },
    { emoji: '🌿', name: 'Mehendi', hindi: 'मेहंदी', date: '13 Dec 2026', time: '5:00 PM', venue: 'Garden Lawns', note: 'Henna, dhol aur thoda dance!' },
    { emoji: '🎶', name: 'Sangeet', hindi: 'संगीत', date: '14 Dec 2026', time: '7:00 PM', venue: 'Grand Palace Hall', note: 'Apne best moves ready rakhiye.' },
    { emoji: '💍', name: 'Wedding', hindi: 'विवाह', date: '15 Dec 2026', time: '8:00 PM', venue: 'Devrana, Khatauli', note: 'Pheron ke saakshi baniye.' },
    { emoji: '🥂', name: 'Reception', hindi: 'स्वागत समारोह', date: '16 Dec 2026', time: '7:00 PM', venue: 'Grand Palace Lawns', note: 'Dinner, dance aur duaayein.' }
  ];

  // Floating background elements
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

  const [confettiPieces, setConfettiPieces] = useState([]);

  // GSAP ScrollTrigger Animations Initialization
  useEffect(() => {
    if (!gateOpen) return;

    // 1. Hero Content Reveal
    gsap.fromTo(heroContentRef.current, 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 }
    );

    // 2. Lord Ganesha Section Animation
    gsap.fromTo(ganeshaRef.current.querySelector('.ganesha-card'),
      { opacity: 0, scale: 0.9, y: 50 },
      { 
        opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: ganeshaRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 3. Our Story Section Animation
    gsap.fromTo(storyRef.current.querySelector('.story-card'),
      { opacity: 0, x: -60 },
      {
        opacity: 1, x: 0, duration: 1.2, ease: 'power2.out',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 75%'
        }
      }
    );

    // 4. Scratch Card Container Animation
    gsap.fromTo(scratchWrapRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: scratchWrapRef.current,
          start: 'top 85%'
        }
      }
    );

    // 5. Venue Section
    gsap.fromTo(venueRef.current.querySelector('.venue-card-wrap'),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: venueRef.current,
          start: 'top 80%'
        }
      }
    );

    // 6. Gallery Items Stagger
    gsap.fromTo(galleryRef.current.querySelectorAll('.gallery-item'),
      { opacity: 0, scale: 0.85, y: 30 },
      {
        opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 75%'
        }
      }
    );

    // 7. RSVP Form
    gsap.fromTo(rsvpRef.current.querySelector('.form-container'),
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: rsvpRef.current,
          start: 'top 80%'
        }
      }
    );

    // 8. Wishes Form & Cards
    gsap.fromTo(wishesRef.current.querySelector('.form-container'),
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: wishesRef.current,
          start: 'top 80%'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [gateOpen]);

  // Stagger reveal specifically for events when date gets revealed
  useEffect(() => {
    if (dateRevealed && eventsRef.current) {
      const tickets = eventsRef.current.querySelectorAll('.ticket');
      if (tickets.length > 0) {
        gsap.fromTo(tickets,
          { opacity: 0, x: -50, rotate: -3 },
          { opacity: 1, x: 0, rotate: (i) => i % 2 === 0 ? -0.4 : 0.4, duration: 0.8, stagger: 0.15, ease: 'back.out(1.2)' }
        );
      }
    }
  }, [dateRevealed]);

  // Countdown timer logic
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

  // Scratch card canvas canvas initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#E8C766');
    gradient.addColorStop(1, '#C9A227');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#4A1428';
    ctx.font = '600 16px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ Scratch to Reveal Our Date ✦', canvas.width / 2, canvas.height / 2);
  }, []);

  // Fire confetti burst on reveal
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
        html, body { overflow-x: hidden; max-width: 100%; }

        html, body, .wedding-container, * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar, .wedding-container::-webkit-scrollbar, *::-webkit-scrollbar {
          display: none;
          width: 0; height: 0;
        }

        .wedding-container { background-color: var(--bg); color: var(--text); font-family: 'Poppins', sans-serif; overflow-x: hidden; width: 100%; max-width: 100vw; position: relative; }
        .display-font { font-family: 'Marcellus', serif; }
        .accent-font { font-family: 'Cormorant Garamond', serif; font-style: italic; }

        /* Navigation */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; background: rgba(255, 249, 242, 0.95);
          backdrop-filter: blur(6px); display: flex; justify-content: space-between; align-items: center;
          padding: 1rem 2.5rem; z-index: 1000; box-shadow: 0 2px 12px rgba(74,20,40,0.06);
        }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a { text-decoration: none; color: var(--text); font-weight: 500; font-size: 0.95rem; letter-spacing: 0.3px; transition: color 0.3s; position: relative; }
        .nav-links a::after { content: ''; position: absolute; left: 0; bottom: -4px; width: 0; height: 1px; background: var(--gold); transition: width 0.3s; }
        .nav-links a:hover { color: var(--maroon); }
        .nav-links a:hover::after { width: 100%; }
        .menu-btn { display: none; background: none; border: none; cursor: pointer; color: var(--maroon); }

        /* Petals */
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-110vh) rotate(360deg) scale(1.1); opacity: 0; }
        }
        .petal {
          position: fixed; bottom: -60px; z-index: 5; pointer-events: none;
          animation: floatUp linear infinite; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.08));
        }

        /* Hero Frame Setup */
        .hero {
          height: 100vh; min-height: 600px; position: relative; overflow: hidden;
          display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
        }
        .hero-backdrop {
          position: absolute; inset: 0;
          background: linear-gradient(rgba(74,20,40,0.55), rgba(74,20,40,0.35)),
                      url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920') center/cover;
        }
        .hero-content { position: relative; z-index: 2; padding: 2rem; color: #fff; opacity: 0; }
        .hero-eyebrow { letter-spacing: 5px; text-transform: uppercase; font-size: 0.9rem; color: var(--gold-light); margin-bottom: 0.8rem; }
        .hero-title { font-size: clamp(2.6rem, 7vw, 5rem); line-height: 1.1; }
        .hero-amp { color: var(--gold-light); font-size: 0.6em; }
        .hero-sub { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.15rem; margin: 0.8rem 0 1.6rem; opacity: 0.9; }

        .countdown-container { display: flex; gap: 1rem; justify-content: center; margin: 0.5rem 0 1.8rem; flex-wrap: wrap; }
        .countdown-box {
          background: rgba(255,255,255,0.1); border: 1px solid rgba(232,199,102,0.4);
          backdrop-filter: blur(4px); padding: 0.8rem 1rem; border-radius: 8px; min-width: 72px;
          animation: floatSoft 3.5s ease-in-out infinite;
        }
        .countdown-box:nth-child(2) { animation-delay: 0.2s; }
        .countdown-box:nth-child(3) { animation-delay: 0.4s; }
        .countdown-box:nth-child(4) { animation-delay: 0.6s; }
        @keyframes floatSoft { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .countdown-num { font-size: 1.8rem; font-weight: 600; color: #fff; font-family: 'Marcellus', serif; }
        .countdown-box small { opacity: 0.8; letter-spacing: 1px; text-transform: uppercase; font-size: 0.65rem; }

        /* Decorative Split Gate Opening */
        .gate-panel {
          position: absolute; top: 0; height: 100%; width: 50%; z-index: 10;
          background: linear-gradient(135deg, var(--maroon-dark), var(--maroon));
          display: flex; align-items: center; transition: transform 1.6s cubic-bezier(0.77,0,0.18,1);
          box-shadow: 0 0 60px rgba(0,0,0,0.5) inset;
        }
        .gate-left { left: 0; justify-content: flex-end; border-right: 3px solid var(--gold); }
        .gate-right { right: 0; justify-content: flex-start; border-left: 3px solid var(--gold); }
        .gate-left.open { transform: translateX(-102%); }
        .gate-right.open { transform: translateX(102%); }
        .gate-jali {
          width: 100%; height: 100%; opacity: 0.9;
          background-image: repeating-linear-gradient(45deg, rgba(232,199,102,0.12) 0 2px, transparent 2px 22px), repeating-linear-gradient(-45deg, rgba(232,199,102,0.12) 0 2px, transparent 2px 22px);
        }
        .gate-emblem {
          position: absolute; top: 50%; transform: translateY(-50%); width: 90px; height: 90px;
          border: 2px solid var(--gold-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem;
          background: radial-gradient(circle, rgba(201,162,39,0.25), transparent 70%); animation: spinSlow 14s linear infinite;
        }
        @keyframes spinSlow { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }
        .gate-left .gate-emblem { right: -45px; }
        .gate-right .gate-emblem { left: -45px; }

        .gate-cta {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 20;
          display: flex; flex-direction: column; align-items: center; gap: 0.8rem; color: var(--gold-light); text-align: center; transition: opacity 0.6s ease, visibility 0.6s;
        }
        .gate-cta.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        .gate-cta-ring {
          width: 84px; height: 84px; border: 2px solid var(--gold-light); border-radius: 50%;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          animation: pulseRing 2.4s ease-in-out infinite; background: rgba(74,20,40,0.4); transition: transform 0.3s;
        }
        .gate-cta-ring:hover { transform: scale(1.1); }
        @keyframes pulseRing { 0%, 100% { box-shadow: 0 0 0 0 rgba(232,199,102,0.35); } 50% { box-shadow: 0 0 0 14px rgba(232,199,102,0); } }
        .gate-cta-text { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.1rem; letter-spacing: 1px; }
        .gate-cta-names { font-family: 'Marcellus', serif; font-size: 1.6rem; color: #fff; animation: shimmer 3s ease-in-out infinite; }
        @keyframes shimmer { 0%, 100% { text-shadow: 0 0 10px rgba(232,199,102,0.3); } 50% { text-shadow: 0 0 22px rgba(232,199,102,0.8); } }

        /* Sections Structure */
        .section { padding: 5rem 1.5rem; max-width: 1200px; margin: 0 auto; text-align: center; position: relative; }
        .section-eyebrow { letter-spacing: 3px; text-transform: uppercase; font-size: 0.8rem; color: var(--gold); font-weight: 600; margin-bottom: 0.6rem; }
        .section-title { font-family: 'Marcellus', serif; font-size: clamp(2rem, 4vw, 2.8rem); margin-bottom: 1rem; color: var(--maroon-dark); }
        .section-divider { display: flex; align-items: center; justify-content: center; gap: 0.8rem; margin: 0 auto 3rem; color: var(--gold); }
        .section-divider .line { width: 50px; height: 1px; background: var(--gold); opacity: 0.6; }
        .section-divider .spin-icon { display: inline-block; animation: spinSlow 8s linear infinite; }

        /* Lord Ganesha Custom Elements */
        .ganesha-card {
          max-width: 650px; margin: 0 auto; background: #fff; padding: 3rem 2rem; border-radius: 16px;
          box-shadow: 0 12px 44px rgba(74,20,40,0.06); border: 1px solid rgba(201,162,39,0.2); position: relative; opacity: 0;
        }
        .ganesha-card::before {
          content: ''; position: absolute; inset: 10px; border: 1px dashed rgba(201,162,39,0.3); border-radius: 12px; pointer-events: none;
        }
        .ganesha-frame {
          width: 160px; height: 160px; margin: 0 auto 1.5rem; border-radius: 50%;
          background: radial-gradient(circle, rgba(232,199,102,0.2) 0%, transparent 70%);
          display: flex; align-items: center; justify-content: center; position: relative;
        }
        .ganesha-frame::after {
          content: ''; position: absolute; inset: 0; border: 2px dotted var(--gold); border-radius: 50%; animation: spinSlow 30s linear infinite;
        }
        .ganesha-img { width: 110px; height: 110px; object-fit: contain; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.12)); }
        .ganesha-mantra { font-family: 'Marcellus', serif; color: var(--maroon); font-size: 1.25rem; margin-bottom: 1rem; letter-spacing: 0.5px; }

        /* Story setup */
        .story-card { max-width: 700px; margin: 0 auto; background: #fff; padding: 2.5rem; border-radius: 4px; box-shadow: 0 10px 40px rgba(74,20,40,0.08); border-top: 3px solid var(--gold); opacity: 0; }
        .story-quote { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.5rem; color: var(--maroon); margin-bottom: 1rem; }
        .story-text { line-height: 1.9; color: #555; }
        .story-img { width: 100%; max-height: 340px; object-fit: cover; border-radius: 4px; margin-top: 1.6rem; transition: transform 0.6s; }
        .story-img:hover { transform: scale(1.02); }

        /* Boarding Pass Ticket Layouts */
        .events-wrap { display: flex; flex-direction: column; gap: 1.6rem; max-width: 780px; margin: 0 auto; }
        .ticket {
          display: flex; background: #fff; border-radius: 10px; overflow: hidden;
          box-shadow: 0 8px 24px rgba(74,20,40,0.08); text-align: left; position: relative; opacity: 0;
        }
        .ticket-stub {
          width: 96px; flex-shrink: 0; background: linear-gradient(160deg, var(--maroon), var(--maroon-dark));
          color: var(--gold-light); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.3rem;
        }
        .ticket-stub .emoji { font-size: 1.8rem; display: inline-block; animation: wiggle 3.5s ease-in-out infinite; }
        @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-8deg); } 75% { transform: rotate(8deg); } }
        .ticket-stub .hindi { font-family: 'Cormorant Garamond', serif; font-size: 0.85rem; opacity: 0.85; }
        .ticket-perforation { width: 0; border-left: 2px dashed rgba(74,20,40,0.25); position: relative; }
        .ticket-perforation::before, .ticket-perforation::after { content: ''; position: absolute; left: -8px; width: 16px; height: 16px; border-radius: 50%; background: var(--bg); }
        .ticket-perforation::before { top: -8px; } .ticket-perforation::after { bottom: -8px; }
        .ticket-body { flex: 1; padding: 1.2rem 1.5rem; display: flex; flex-direction: column; gap: 0.35rem; }
        .ticket-name { font-family: 'Marcellus', serif; font-size: 1.3rem; color: var(--maroon-dark); }
        .ticket-meta { display: flex; flex-wrap: wrap; gap: 0.4rem 1.2rem; font-size: 0.85rem; color: #6b6b6b; }
        .ticket-meta span { display: flex; align-items: center; gap: 0.3rem; }
        .ticket-note { font-family: 'Cormorant Garamond', serif; font-style: italic; color: var(--maroon); font-size: 0.95rem; margin-top: 0.2rem; }

        /* Scratch Card Area */
        .scratch-card-wrapper {
          position: relative; width: 340px; height: 180px; max-width: 100%; margin: 0 auto;
          border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,.12); border: 3px solid var(--gold-light);
        }
        .scratch-card-reveal.celebrating { animation: revealPulse 0.9s ease; }
        @keyframes revealPulse { 0% { transform: scale(1); } 40% { transform: scale(1.06); } 100% { transform: scale(1); } }

        /* Confetti Burst Setup */
        @keyframes confettiFall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0.9; } }
        .confetti-piece { position: fixed; top: 0; z-index: 4000; pointer-events: none; animation-name: confettiFall; animation-timing-function: ease-in; animation-fill-mode: forwards; }

        /* Celebration Screen Popup */
        @keyframes popIn {
          0% { opacity: 0; transform: translate(-50%, -40%) scale(0.7); }
          60% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes popOut { to { opacity: 0; transform: translate(-50%, -50%) scale(0.85); } }
        .celebration-popup {
          position: fixed; top: 50%; left: 50%; z-index: 4100;
          background: linear-gradient(135deg, var(--maroon), var(--maroon-dark));
          border: 2px solid var(--gold-light); border-radius: 16px; padding: 2rem 2.5rem;
          text-align: center; color: #fff; box-shadow: 0 20px 60px rgba(0,0,0,0.35);
          animation: popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards, popOut 0.5s ease 3.3s forwards; max-width: 90vw;
        }
        .celebration-popup h3 { font-family: 'Marcellus', serif; color: var(--gold-light); font-size: 1.6rem; margin-bottom: 0.4rem; }

        /* Map & Interactive Elements */
        .venue-card-wrap { opacity: 0; }
        .venue-map { width: 100%; max-width: 700px; height: 340px; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 30px rgba(74,20,40,0.1); margin: 1.5rem auto; border: 4px solid #fff; }
        .btn {
          background: var(--maroon); color: #fff; border: none; padding: 0.85rem 2.2rem;
          font-size: 0.95rem; border-radius: 30px; cursor: pointer; font-weight: 500; letter-spacing: 0.4px;
          display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; transition: transform 0.2s, background 0.3s;
        }
        .btn:hover { background: var(--maroon-dark); transform: translateY(-2px); }
        .btn-gold { background: var(--gold); color: var(--maroon-dark); }
        .btn-gold:hover { background: var(--gold-light); }

        /* Grid setups */
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 1rem; }
        .gallery-item { overflow: hidden; border-radius: 6px; height: 240px; opacity: 0; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
        .gallery-item:hover img { transform: scale(1.1); }

        .form-container { max-width: 600px; margin: 0 auto; background: #fff; padding: 2.5rem; border-radius: 10px; box-shadow: 0 10px 34px rgba(74,20,40,0.08); opacity: 0; }
        .form-group { margin-bottom: 1.4rem; text-align: left; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem; color: var(--maroon-dark); }
        .form-input { width: 100%; padding: 0.8rem; border: 1px solid #e3d9d0; border-radius: 6px; font-family: inherit; background: #FFFCF8; }
        .form-input:focus { outline: none; border-color: var(--gold); }

        .svg-icon { width: 18px; height: 18px; fill: currentColor; vertical-align: middle; }
        .wish-card { background: #fff; padding: 1.4rem 1.6rem; border-radius: 8px; text-align: left; box-shadow: 0 3px 12px rgba(74,20,40,0.05); border-left: 3px solid var(--gold); transition: transform 0.2s; }
        .wish-card:hover { transform: translateX(4px); }

        footer { background: var(--maroon-dark); color: #fff; padding: 4rem 1.5rem; text-align: center; }

        @media (max-width: 768px) {
          .nav-links {
            display: ${isMenuOpen ? 'flex' : 'none'};
            flex-direction: column; position: absolute; top: 100%; left: 0; right: 0;
            background: var(--bg); padding: 2rem; text-align: center; box-shadow: 0 10px 20px rgba(74,20,40,0.08); gap: 1.2rem;
          }
          .menu-btn { display: block; }
          .ticket { flex-direction: row; }
          .ticket-stub { width: 76px; }
          .section { padding: 3.5rem 1.2rem; }
        }
        @media (max-width: 480px) {
          .gate-emblem { width: 60px; height: 60px; font-size: 1.5rem; }
          .gate-cta-ring { width: 68px; height: 68px; }
          .countdown-box { min-width: 60px; padding: 0.6rem 0.7rem; }
          .countdown-num { font-size: 1.4rem; }
        }
      `}</style>

      {/* Floating Petals Layer */}
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}rem`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            filter: `hue-rotate(${p.hue}deg) drop-shadow(0 2px 4px rgba(0,0,0,0.08))`
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Confetti Setup */}
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

      {/* Celebration Popup Alert */}
      {showConfetti && (
        <div className="celebration-popup">
          <h3>🎉 Date Revealed!</h3>
          <p>{weddingDateLabel} · 8:00 PM · Devrana, Khatauli</p>
        </div>
      )}

      {/* Navbar Container */}
      <nav className="navbar">
        <h2 className="display-font" style={{ color: 'var(--maroon)', fontSize: '1.4rem' }}>R & P</h2>
        <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? (
            <svg className="svg-icon" viewBox="0 0 24 24" style={{ width: 26, height: 26 }}><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          ) : (
            <svg className="svg-icon" viewBox="0 0 24 24" style={{ width: 26, height: 26 }}><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
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

      {/* HERO SECTION */}
      <section id="home" className="hero">
        <div className="hero-backdrop" />

        <div className={`gate-panel gate-left ${gateOpen ? 'open' : ''}`}>
          <div className="gate-jali" />
          <div className="gate-emblem">🕉️</div>
        </div>
        <div className={`gate-panel gate-right ${gateOpen ? 'open' : ''}`}>
          <div className="gate-jali" />
          <div className="gate-emblem">🪔</div>
        </div>

        <div className={`gate-cta ${gateOpen ? 'hidden' : ''}`}>
          <div className="gate-cta-names">Rohan & Priya</div>
          <div className="gate-cta-ring" onClick={() => setGateOpen(true)} role="button" tabIndex={0}
               onKeyDown={(e) => { if (e.key === 'Enter') setGateOpen(true); }} aria-label="Open the invitation">
            <svg className="svg-icon" viewBox="0 0 24 24" style={{ width: 30, height: 30, fill: '#E8C766' }}>
              <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm1 13.5l-4-4 1.41-1.41L13 13.67l3.59-3.59L18 11.5l-5 5z"/>
            </svg>
          </div>
          <div className="gate-cta-text">Tap to open the invitation</div>
        </div>

        <div ref={heroContentRef} className="hero-content">
          <h3 className="hero-eyebrow">Shubh Vivah · Save the Date</h3>
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

          <a href="#events" className="btn btn-gold">View Full Invitation</a>
        </div>
      </section>

      {/* NEW SECTION: LORD GANESHA DEVOTIONAL BLESSING */}
      <section id="ganesha-blessing" ref={ganeshaRef} className="section">
        <div className="ganesha-card">
          <div className="ganesha-frame">
            {/* Replace source path below with your beautiful Lord Ganesha asset vector/transparent image */}
            <img 
              className="ganesha-img" 
              src="/shree-ganesh.png" 
              alt="Lord Ganesha Blessing" 
            />
          </div>
          <p className="ganesha-mantra">॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥</p>
          <p className="ganesha-mantra" style={{ fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
            ॥ निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
          </p>
          <p style={{ color: '#555', maxWidth: '520px', margin: '0 auto', lineHeight: '1.8', fontSize: '0.95rem' }}>
            With the divine blessings of Lord Ganesha, who removes all obstacles and brings prosperity, we invite you to grace our marriage celebrations.
          </p>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section id="story" ref={storyRef} className="section">
        <p className="section-eyebrow">The Beginning</p>
        <h2 className="section-title">Our Story</h2>
        <div className="section-divider"><span className="line" /> <span className="spin-icon">🌸</span> <span className="line" /></div>
        <div className="story-card">
          <p className="story-quote">"Every love story is beautiful, but ours is our favourite."</p>
          <p className="story-text">
            Hum mile, dost bane, pyaar hua, aur ab shuru ho rahi hai hamari sabse khoobsurat kahani — humesha ke liye.
            Join us as we step into this new chapter, surrounded by the people we love most.
          </p>
          <img className="story-img" src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600" alt="Couple Moments" />
        </div>
      </section>

      {/* EVENTS & SCRATCH CARD SECTION */}
      <section id="events" ref={eventsRef} className="section" style={{ background: 'rgba(107,30,60,0.03)', padding: '80px 20px' }}>
        <p className="section-eyebrow">Itinerary</p>
        <h2 className="section-title">Wedding Events</h2>
        <div className="section-divider"><span className="line" /> <span className="spin-icon">🪔</span> <span className="line" /></div>

        <div ref={scratchWrapRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', marginBottom: '50px' }}>
          <h3 className="display-font" style={{ color: 'var(--maroon-dark)', fontSize: '28px', marginBottom: '10px' }}>✨ Scratch & Save The Date</h3>
          <p style={{ color: '#666', marginBottom: '25px', fontSize: '0.95rem' }}>Scratch the card below to reveal our special wedding details ❤️</p>
          
          <div className="scratch-card-wrapper">
            <div className={`scratch-card-reveal ${dateRevealed ? 'celebrating' : ''}`} style={{ position: 'absolute', inset: 0, borderRadius: '20px', background: 'linear-gradient(135deg,#fff7ef,#ffe2b4,#ffd59f)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '36px' }}>💍</div>
              <h2 style={{ margin: '8px 0', color: '#6b1e3c' }}>{weddingDateLabel}</h2>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>8:00 PM • Devrana, Khatauli</p>
            </div>
            <canvas ref={canvasRef} width={340} height={180} onMouseDown={startDrawing} onMouseMove={scratch} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={scratch} onTouchEnd={stopDrawing} style={{ position: 'absolute', inset: 0, borderRadius: '20px', cursor: 'pointer', touchAction: 'none', zIndex: 2 }} />
          </div>
          {!dateRevealed && <p style={{ marginTop: '18px', color: '#6b1e3c', fontWeight: '600', fontSize: '0.9rem' }}>{Math.round(scratchedPercent)}% Revealed</p>}
        </div>

        {dateRevealed && (
          <div className="events-wrap" style={{ display: 'grid', gap: '25px', marginTop: '40px' }}>
            {events.map((ev, i) => (
              <div key={i} className="ticket">
                <div className="ticket-stub">
                  <span className="emoji">{ev.emoji}</span>
                  <span className="hindi">{ev.hindi}</span>
                </div>
                <div className="ticket-perforation"></div>
                <div className="ticket-body">
                  <h3 className="ticket-name display-font">{ev.name}</h3>
                  <div className="ticket-meta">
                    <span>📅 {ev.date}</span>
                    <span>🕒 {ev.time}</span>
                    <span>📍 {ev.venue}</span>
                  </div>
                  <p className="ticket-note">{ev.note}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* VENUE SECTION */}
      <section id="venue" ref={venueRef} className="section">
        <p className="section-eyebrow">Location</p>
        <h2 className="section-title">Wedding Venue</h2>
        <div className="section-divider"><span className="line" /> 📍 <span className="line" /></div>
        
        <div className="venue-card-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 className="display-font" style={{ fontSize: '1.4rem', color: 'var(--maroon)', marginBottom: '0.3rem' }}>Devrana</h3>
            <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>Devrana, Khatauli, Muzaffarnagar,<br />Uttar Pradesh - 251201</p>
          </div>
          <div className="venue-map">
            <iframe src="https://maps.google.com/maps?q=Devrana,%20Khatauli&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Venue Map Location" />
          </div>
          <a href="https://maps.google.com/?q=Devrana,+Khatauli" target="_blank" rel="noreferrer" className="btn">Get Directions</a>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" ref={galleryRef} className="section" style={{ background: 'rgba(107,30,60,0.03)' }}>
        <p className="section-eyebrow">Memories</p>
        <h2 className="section-title">Moments Captured</h2>
        <div className="section-divider"><span className="line" /> <span className="spin-icon">📷</span> <span className="line" /></div>
        <div className="gallery-grid">
          <div className="gallery-item"><img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=400" alt="Pre Wedding 1" /></div>
          <div className="gallery-item"><img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=400" alt="Pre Wedding 2" /></div>
          <div className="gallery-item"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400" alt="Pre Wedding 3" /></div>
          <div className="gallery-item"><img src="https://images.unsplash.com/photo-1332712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=400" alt="Pre Wedding 4" /></div>
        </div>
      </section>

      {/* RSVP SECTION */}
      <section id="rsvp" ref={rsvpRef} className="section">
        <p className="section-eyebrow">Confirm</p>
        <h2 className="section-title">Are You Attending?</h2>
        <div className="section-divider"><span className="line" /> <span className="spin-icon">💌</span> <span className="line" /></div>
        <div className="form-container">
          {rsvpSubmitted ? (
            <div style={{ padding: '2rem 0' }}>
              <span style={{ fontSize: '3rem' }}>🎉</span>
              <h3 className="display-font" style={{ color: 'var(--maroon)', marginTop: '1rem' }}>Shukriya!</h3>
              <p>Your RSVP response has been recorded successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleRSVP}>
              <div className="form-group"><label>Full Name</label><input type="text" className="form-input" required placeholder="Enter your name" /></div>
              <div className="form-group"><label>Phone Number</label><input type="tel" className="form-input" required placeholder="Enter your phone number" /></div>
              <div className="form-group"><label>Number of Guests</label><input type="number" className="form-input" min="1" max="10" defaultValue="1" /></div>
              <div className="form-group">
                <label>Will you attend?</label>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}><input type="radio" name="attend" defaultChecked /> Yes, absolutely!</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}><input type="radio" name="attend" /> Regretfully, No</label>
                </div>
              </div>
              <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>Submit RSVP</button>
            </form>
          )}
        </div>
      </section>

      {/* WISHES & BLESSINGS SECTION */}
      <section id="wishes" ref={wishesRef} className="section" style={{ background: 'rgba(107,30,60,0.03)' }}>
        <p className="section-eyebrow">Blessings</p>
        <h2 className="section-title">Leave Your Wishes ❤️</h2>
        <div className="section-divider"><span className="line" /> <span className="spin-icon">🙏</span> <span className="line" /></div>
        
        <div className="form-container" style={{ marginBottom: '3rem' }}>
          <form onSubmit={handleWishSubmit}>
            <div className="form-group"><label>Your Name</label><input type="text" className="form-input" value={newWish.name} onChange={(e) => setNewWish({ ...newWish, name: e.target.value })} required placeholder="Enter your name" /></div>
            <div className="form-group"><label>Your Message</label><textarea className="form-input" rows="4" value={newWish.message} onChange={(e) => setNewWish({ ...newWish, message: e.target.value })} required placeholder="Write your wishes here..." /></div>
            <button type="submit" className="btn">
              <svg className="svg-icon" viewBox="0 0 24 24" style={{ marginRight: '0.3rem', fill: '#fff' }}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>Send Blessing
            </button>
          </form>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {wishes.map((w, index) => (
            <div key={index} className="wish-card">
              <h4 style={{ color: 'var(--maroon)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <svg className="svg-icon" viewBox="0 0 24 24" style={{ fill: 'var(--gold)' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.5 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>{w.name}
              </h4>
              <p style={{ fontStyle: 'italic', color: '#555', fontSize: '0.95rem' }}>"{w.message}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <h2 className="display-font" style={{ color: 'var(--gold-light)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>Thank You</h2>
        <p style={{ opacity: 0.85, maxWidth: '420px', margin: '0 auto 2rem auto', lineHeight: '1.7', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem' }}>
          Aapka aana humare liye khushi ki baat hogi. We look forward to celebrating our special day with you.
        </p>
        <p style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '1px' }}>© 2026 ROHAN & PRIYA. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}