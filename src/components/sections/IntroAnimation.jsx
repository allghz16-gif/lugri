import React, { useState, useEffect, useRef, useCallback } from 'react';

const logoParts = [
  { src: '/images/logo/ub.png', alt: 'UB', from: 'translate3d(-25vw,-25vh,0) scale(0.7)' },
  { src: '/images/logo/emub.png', alt: 'EM UB', from: 'translate3d(-8vw,25vh,0) scale(0.7)' },
  { src: '/images/logo/lugrireal.png', alt: 'Lugri', from: 'translate3d(8vw,-30vh,0) scale(0.6)' },
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*';

function scrambleInto(el, finalText, delayMs = 0, durationMs = 900) {
  if (!el) return () => {};
  let rafId;
  let cancelled = false;
  const timeout = setTimeout(() => {
    if (cancelled) return;
    const len = finalText.length;
    let start = null;
    // Each letter gets its own reveal point along the timeline, but every
    // frame is driven by requestAnimationFrame (real elapsed time) instead
    // of a fixed setInterval tick, so the scramble stays smooth regardless
    // of frame rate.
    const tick = (ts) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / durationMs, 1);
      let out = '';
      for (let i = 0; i < len; i++) {
        const revealAt = ((i + 1) / len);
        if (finalText[i] === ' ') {
          out += ' ';
        } else if (progress >= revealAt) {
          out += finalText[i];
        } else {
          out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      el.textContent = out;
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        el.textContent = finalText;
      }
    };
    rafId = requestAnimationFrame(tick);
  }, delayMs);
  return () => {
    cancelled = true;
    clearTimeout(timeout);
    if (rafId) cancelAnimationFrame(rafId);
  };
}

export default function IntroAnimation({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const introRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const cardRefs = useRef([]);
  const reducedMotionRef = useRef(false);
  const tiltRafRef = useRef(null);

  useEffect(() => {
    reducedMotionRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Background Particle Network Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const points = Array.from({ length: 45 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(151,230,20,${0.15 * (1 - dist / 140)})`;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = 'rgba(151,230,20,0.5)';
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Parallax (layered depth) + cursor spotlight, driven from one handler
  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 12,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      });
      if (introRef.current) {
        introRef.current.style.setProperty('--sx', `${e.clientX}px`);
        introRef.current.style.setProperty('--sy', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // 3D tilt per logo card — throttled to one calc per animation frame so
  // fast mouse movement never queues up more work than the browser can paint
  const handleCardMove = useCallback((idx) => (e) => {
    if (reducedMotionRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (tiltRafRef.current) cancelAnimationFrame(tiltRafRef.current);
    tiltRafRef.current = requestAnimationFrame(() => {
      const card = cardRefs.current[idx];
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width - 0.5;
      const py = (clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(500px) rotateX(${-py * 16}deg) rotateY(${px * 16}deg) scale(1.05)`;
    });
  }, []);

  const handleCardLeave = useCallback((idx) => () => {
    const card = cardRefs.current[idx];
    if (!card) return;
    card.style.transform = 'perspective(500px) rotateX(0) rotateY(0) scale(1)';
  }, []);

  // Text scramble reveal
  useEffect(() => {
    if (reducedMotionRef.current) {
      if (line1Ref.current) line1Ref.current.textContent = 'Kementerian';
      if (line2Ref.current) line2Ref.current.textContent = 'Luar Negeri';
      return;
    }
    const c1 = scrambleInto(line1Ref.current, 'Kementerian', 1700, 850);
    const c2 = scrambleInto(line2Ref.current, 'Luar Negeri', 1950, 850);
    return () => {
      c1();
      c2();
    };
  }, []);

  // Timer Otomatis Selesai
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      handleFinish();
    }, 6000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleFinish = () => {
    setIsExiting(true);
    document.body.style.overflow = '';
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 900);
  };

  return (
    <div
      ref={introRef}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000820] text-white select-none overflow-hidden transition-[clip-path,opacity] duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        clipPath: isExiting ? 'circle(0% at 8% 8%)' : 'circle(150% at 50% 50%)',
      }}
    >
      {/* Background Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-70" />

      {/* Radial Ambient Glow — parallax depth layer (moves more than content) */}
      <div
        className="absolute w-[500px] h-[500px] bg-[#001662] rounded-full blur-[140px] opacity-60 animate-pulse pointer-events-none"
        style={{ transform: `translate3d(${mouse.x * -1.6}px, ${mouse.y * -1.6}px, 0)`, transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)', willChange: 'transform' }}
      />
      <div
        className="absolute w-[300px] h-[300px] bg-[#97E614] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{ transform: `translate3d(${mouse.x * -1.2}px, ${mouse.y * -1.2}px, 0)`, transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)', willChange: 'transform' }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          transform: `translate3d(${mouse.x * 0.4}px, ${mouse.y * 0.4}px, 0)`,
          transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          willChange: 'transform',
        }}
      />

      {/* Cursor spotlight — a fixed-size glow that translates toward the
          cursor; animating transform (GPU-composited) instead of the
          gradient position itself is what makes the follow feel silky */}
      <div className="spotlight" />

      {/* Film grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay grain" />

      {/* SKIP BUTTON with auto-filling progress underline */}
      <button
        onClick={handleFinish}
        className="absolute top-6 right-6 overflow-hidden text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-[#97E614] transition-all duration-500 border border-slate-700/60 hover:border-[#97E614] rounded-full px-5 py-2 backdrop-blur-md bg-white/5 z-20 hover:bg-white/10"
      >
        <span className="relative z-10">Skip Intro ➔</span>
        <span className="absolute left-0 bottom-0 h-[2px] bg-[#97E614] skip-progress" />
      </button>

      <div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl"
        style={{ transform: `translate3d(${mouse.x}px, ${mouse.y}px, 0)`, transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)', willChange: 'transform' }}
      >
        {/* LOGO SECTION */}
        <div
          className={`relative flex items-center justify-center gap-6 mb-10 ${isExiting ? 'logo-exit' : ''}`}
        >
          {/* Flash Hijau Ultra Ultra-Smooth */}
          <div
            className="absolute inset-0 -z-10 bg-[#97E614] blur-3xl opacity-0 logo-flash rounded-full pointer-events-none"
            style={{ animationDelay: '1.2s' }}
          />
          {logoParts.map((logo, idx) => (
            <div
              key={idx}
              className="relative w-16 h-16 md:w-20 md:h-20 logo-glass-in"
              style={{
                '--from': logo.from,
                animationDelay: `${0.3 + idx * 0.25}s`,
              }}
            >
              <div
                ref={(el) => (cardRefs.current[idx] = el)}
                onMouseMove={handleCardMove(idx)}
                onMouseLeave={handleCardLeave(idx)}
                className="group relative w-full h-full rounded-2xl bg-white/10 border border-white/20 p-3 shadow-2xl backdrop-blur-xl flex items-center justify-center overflow-hidden tilt-card"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-full object-contain filter drop-shadow-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* SUBTITLE PRE-HEADER */}
        <p
          className="text-[#97E614] text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-3 text-reveal-up"
          style={{ animationDelay: '1.4s' }}
        >
          Welcome to Official Website
        </p>

        {/* MAIN TITLE */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-none mb-4 overflow-hidden">
          <span className="inline-block text-reveal-left" style={{ animationDelay: '1.7s' }}>
            <span ref={line1Ref}>Kementerian</span>
          </span>{' '}
          <span
            className="inline-block text-[#97E614] drop-shadow-[0_0_25px_rgba(151,230,20,0.4)] text-reveal-right"
            style={{ animationDelay: '1.95s' }}
          >
            <span ref={line2Ref}>Luar Negeri</span>
          </span>
        </h1>

        {/* SUBTITLE FOOTER */}
        <p
          className="text-slate-300 font-medium text-base md:text-xl tracking-wide max-w-2xl blur-reveal mb-10"
          style={{ animationDelay: '2.3s' }}
        >
          Eksekutif Mahasiswa Universitas Brawijaya 2026
        </p>

        {/* PROGRESS BAR */}
        <div
          className="w-56 sm:w-72 h-[3px] bg-slate-800/80 rounded-full overflow-hidden backdrop-blur-sm progress-container-fade"
          style={{ animationDelay: '2.5s' }}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#001662] via-[#00d2ff] via-[#97E614] to-white animate-progress-line"
            style={{ animationDelay: '2.6s' }}
          />
        </div>
      </div>

      <style>{`
        /* 1. Spring/magnetic logo entrance — a gentler overshoot, spread over
           more time, so it reads as a soft settle rather than a snap */
        @keyframes logoGlassIn {
          0% {
            opacity: 0;
            transform: var(--from, translateY(30px) scale(0.7));
            filter: blur(16px);
          }
          55% {
            opacity: 1;
            filter: blur(0px);
          }
          82% {
            transform: translate3d(0,0,0) scale(1.035) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: translate3d(0,0,0) scale(1) rotate(0deg);
            filter: blur(0px);
          }
        }
        .logo-glass-in {
          opacity: 0;
          will-change: transform, opacity, filter;
          animation: logoGlassIn 1.5s cubic-bezier(0.22, 1.06, 0.36, 1) forwards;
        }
        .tilt-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
          will-change: transform;
          backface-visibility: hidden;
        }
        .logo-exit {
          animation: logoExit 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes logoExit {
          to { transform: translate3d(-42vw, -42vh, 0) scale(0.25); opacity: 0; }
        }

        /* 2. Soft-Fading Ambient Glow Hijau (3.2s) */
        @keyframes logoFlash {
          0% { opacity: 0; transform: scale(0.5); filter: blur(40px); }
          35% { opacity: 0.32; transform: scale(1.1); filter: blur(25px); }
          70% { opacity: 0.18; transform: scale(1.25); }
          100% { opacity: 0; transform: scale(1.4); filter: blur(50px); }
        }
        .logo-flash { animation: logoFlash 3.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        /* 3. Text Reveals Ultra Smooth */
        @keyframes textRevealUp {
          0% { opacity: 0; transform: translateY(22px); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        .text-reveal-up { opacity: 0; will-change: transform, opacity, filter; animation: textRevealUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes textRevealLeft {
          0% { opacity: 0; transform: translateX(-35px); filter: blur(10px); }
          100% { opacity: 1; transform: translateX(0); filter: blur(0px); }
        }
        .text-reveal-left { opacity: 0; will-change: transform, opacity, filter; animation: textRevealLeft 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes textRevealRight {
          0% { opacity: 0; transform: translateX(35px); filter: blur(10px); }
          100% { opacity: 1; transform: translateX(0); filter: blur(0px); }
        }
        .text-reveal-right { opacity: 0; will-change: transform, opacity, filter; animation: textRevealRight 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes blurReveal {
          0% { opacity: 0; filter: blur(14px); transform: translateY(10px) scale(0.98); }
          100% { opacity: 1; filter: blur(0px); transform: translateY(0) scale(1); }
        }
        .blur-reveal { opacity: 0; will-change: transform, opacity, filter; animation: blurReveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        /* 4. Progress Bar Fade & Smooth Fill */
        @keyframes containerFade { 0% { opacity: 0; } 100% { opacity: 1; } }
        .progress-container-fade { opacity: 0; animation: containerFade 0.6s ease forwards; }

        @keyframes progressLine { 0% { width: 0%; } 100% { width: 100%; } }
        .animate-progress-line {
          width: 0%;
          will-change: width;
          animation: progressLine 2.0s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          box-shadow: 0 0 12px rgba(151, 230, 20, 0.5);
        }

        /* 5. Skip button progress underline (mirrors the 6s auto-finish timer) */
        @keyframes skipProgress { 0% { width: 0%; } 100% { width: 100%; } }
        .skip-progress { width: 0%; animation: skipProgress 6s linear forwards; }

        /* 6. Cursor spotlight — fixed-size glow, follows via transform only
           (never animates the gradient itself) so the motion stays buttery */
        .spotlight {
          position: absolute;
          top: -320px;
          left: -320px;
          width: 640px;
          height: 640px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(151,230,20,0.12), transparent 70%);
          transform: translate3d(var(--sx, 50vw), var(--sy, 50vh), 0);
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
          pointer-events: none;
        }

        /* 7. Film grain */
        .grain {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
        }

        /* 8. Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .logo-glass-in, .logo-flash, .text-reveal-up, .text-reveal-left, .text-reveal-right,
          .blur-reveal, .progress-container-fade, .animate-progress-line, .skip-progress, .logo-exit {
            animation: none !important;
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
          }
          .tilt-card { transition: none !important; }
        }
      `}</style>
    </div>
  );
}