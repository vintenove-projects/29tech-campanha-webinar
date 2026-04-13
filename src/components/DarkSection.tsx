import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const DarkSection = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      const reduced = prefersReduced;

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
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
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
    <section ref={sectionRef} className="relative py-20 sm:py-28 md:py-40 overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />

      <div className="relative z-[2] max-w-4xl mx-auto px-4 sm:px-6 text-center pointer-events-none">
        <h2 className="sr-only">Serviço de Diagnóstico Gratuito de Outsourcing de Desenvolvimento</h2>
        <h3
          className="font-light tracking-tight text-white leading-[1.1] mb-5 sm:mb-6"
          style={{ fontSize: "clamp(26px, 5vw, 60px)" }}
        >
          {t("darkSection.title")}<br />
          {t("darkSection.subtitle")}
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
          {t("darkSection.description")}<br />
          {t("darkSection.guarantee")}
        </p>
        <a
          href="#contato"
          className="inline-flex rounded-full bg-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 pointer-events-auto"
          title="Diagnóstico gratuito de outsourcing"
        >
          {t("darkSection.cta")}
        </a>
      </div>
    </section>
  );
};

export default DarkSection;
