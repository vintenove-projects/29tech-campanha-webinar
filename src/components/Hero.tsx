import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const TYPING_PHRASES_PT_BR = [
  "um app sob medida.",
  "automação de processos.",
  "uma equipe de tech.",
  "um sistema escalável.",
  "integração com APIs.",
];

const TYPING_PHRASES_PT_PT = [
  "uma app à medida.",
  "automação de processos.",
  "uma equipa de tech.",
  "um sistema escalável.",
  "integração com APIs.",
];

const TYPING_PHRASES_EN = [
  "a custom app.",
  "process automation.",
  "a tech team.",
  "a scalable system.",
  "API integration.",
];

const TYPING_PHRASES_ES = [
  "una app personalizada.",
  "automatización de procesos.",
  "un equipo de tech.",
  "un sistema escalable.",
  "integración con APIs.",
];

const Hero = () => {
  const { t, i18n } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const prefersReduced = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const getTypingPhrases = () => {
    switch (i18n.language) {
      case 'pt-PT':
        return TYPING_PHRASES_PT_PT;
      case 'en':
        return TYPING_PHRASES_EN;
      case 'es':
        return TYPING_PHRASES_ES;
      default:
        return TYPING_PHRASES_PT_BR;
    }
  };

  const TYPING_PHRASES = getTypingPhrases();

  // Typing animation
  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIndex];
    const speed = isDeleting ? 40 : 80;
    const pause = isDeleting && charIndex === 0 ? 400 : !isDeleting && charIndex === phrase.length ? 2000 : speed;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < phrase.length) {
        setCharIndex(charIndex + 1);
        setDisplayText(phrase.slice(0, charIndex + 1));
      } else if (!isDeleting && charIndex === phrase.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex > 0) {
        setCharIndex(charIndex - 1);
        setDisplayText(phrase.slice(0, charIndex - 1));
      } else {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % TYPING_PHRASES.length);
      }
    }, pause);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  // Canvas dots
  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    section.addEventListener("mousemove", handleMouse);
    section.addEventListener("mouseleave", handleLeave);

    const spacing = 24;
    const attractRadius = 200;
    const attractStrength = 15;
    const springFactor = 0.06;

    interface Dot {
      baseX: number; baseY: number; cx: number; cy: number;
      vx: number; vy: number; phase: number; speed: number;
    }

    let dots: Dot[] = [];
    const buildDots = () => {
      dots = [];
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          dots.push({
            baseX: x, baseY: y, cx: x, cy: y,
            vx: 0, vy: 0,
            phase: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.4,
          });
        }
      }
    };
    buildDots();
    window.addEventListener("resize", buildDots);

    let animId: number;
    let time = 0;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.016;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const reduced = prefersReduced.current;

      for (const dot of dots) {
        const driftX = reduced ? 0 : Math.sin(time * dot.speed * 2 + dot.phase) * 18 + Math.cos(time * 0.6 + dot.baseY * 0.03) * 12;
        const driftY = reduced ? 0 : Math.cos(time * dot.speed * 1.5 + dot.phase) * 18 + Math.sin(time * 0.8 + dot.baseX * 0.03) * 12;

        const targetX = dot.baseX + driftX;
        const targetY = dot.baseY + driftY;

        const dx = dot.cx - mx;
        const dy = dot.cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let attractX = 0;
        let attractY = 0;
        if (dist < attractRadius && dist > 0 && !reduced) {
          const force = (1 - dist / attractRadius) * attractStrength;
          attractX = -(dx / dist) * force;
          attractY = -(dy / dist) * force;
        }

        dot.vx += (targetX + attractX - dot.cx) * springFactor;
        dot.vy += (targetY + attractY - dot.cy) * springFactor;
        dot.vx *= 0.85;
        dot.vy *= 0.85;
        dot.cx += dot.vx;
        dot.cy += dot.vy;

        const distFromMouse = Math.sqrt((dot.cx - mx) ** 2 + (dot.cy - my) ** 2);
        const proximity = Math.max(0, 1 - distFromMouse / attractRadius);
        const size = 2 + proximity * 5;

        ctx.beginPath();
        ctx.arc(dot.cx, dot.cy, size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 229, 213, 0.25)";
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", buildDots);
      section.removeEventListener("mousemove", handleMouse);
      section.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4"
      style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(13 78% 50%) 100%)" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1] block" style={{ display: "block" }} />

      <div className="relative z-[2] max-w-4xl mx-auto px-4 sm:px-6 text-center pointer-events-none">
        <h1
          className="font-light leading-[1.05] tracking-tight text-primary-foreground mb-6"
          style={{ fontSize: "clamp(36px, 8vw, 80px)" }}
        >
          {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Tecnologia para" :
           i18n.language === 'en' ? "Technology for" : "Tecnología para"}<br />
          {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "o seu negócio." :
           i18n.language === 'en' ? "your business." : "tu negocio."}
        </h1>
        <div
          className="font-light italic text-primary-foreground mb-6 sm:mb-8 min-h-[1.4em]"
          style={{ fontSize: "clamp(20px, 4vw, 40px)" }}
        >
          {i18n.language === 'pt-BR' ? 'Preciso de' :
           i18n.language === 'pt-PT' ? 'Preciso de' :
           i18n.language === 'en' ? 'I need' :
           'Necesito de'}{" "}
          <span className="border-r-2 border-primary-foreground pr-1 animate-pulse">
            {displayText}
          </span>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-primary-foreground/80 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
          {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "A 29Tech desenvolve software sob demanda e aloca profissionais tech pré-validados para empresas que querem crescer — sem montar um time interno do zero." :
           i18n.language === 'en' ? "29Tech develops software on demand and allocates pre-validated tech professionals to companies that want to grow — without building an internal team from scratch." : "29Tech desarrolla software bajo demanda y asigna profesionales tecnológicos pre-validados a empresas que quieren crecer — sin construir un equipo interno desde cero."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pointer-events-auto">
          <a
            href="#contato"
            className="w-full sm:w-auto rounded-full bg-primary-foreground px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium text-primary hover:opacity-90 transition-all hover:scale-105 text-center"
          >
            {t("darkSection.cta")}
          </a>
          <a
            href="#como-funciona"
            className="w-full sm:w-auto rounded-full border-2 border-primary-foreground px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all hover:scale-105 text-center"
          >
            {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? 'Ver como funciona' :
             i18n.language === 'en' ? 'See how it works' :
             'Ver cómo funciona'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
