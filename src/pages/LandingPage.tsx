import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Target, Rocket, Cpu, Layers, Settings, ArrowRight, CheckCircle2, BookOpen, Users, TrendingDown, Award, Globe } from "lucide-react";
import { motion } from "framer-motion";

// Logos
import logo29Tech from "@/assets/logo-29tech.png";
import logoOab from "@/assets/logos/oab.png";
import logoHortolandia from "@/assets/logos/hortolandia.png";
import logoSynkro from "@/assets/logos/synkro.png";
import logoVp from "@/assets/logos/vp.png";
import logoIasd from "@/assets/logos/iasd.png";
import logoLetssale from "@/assets/logos/letssale.png";
import logoSolo7 from "@/assets/logos/solo7.png";
import logoPantera from "@/assets/logos/pantera.png";
import logoClickmenos from "@/assets/logos/clickmenos.png";
import logoExtra from "@/assets/logos/whatsapp-logo.png";

const clientLogos = [
  { src: logoOab, alt: "OAB" },
  { src: logoHortolandia, alt: "Hortolândia" },
  { src: logoSynkro, alt: "Synkro" },
  { src: logoVp, alt: "VP" },
  { src: logoIasd, alt: "IASD" },
  { src: logoLetssale, alt: "LetsSale" },
  { src: logoSolo7, alt: "Solo7" },
  { src: logoPantera, alt: "Pantera Scale" },
  { src: logoClickmenos, alt: "Clickmenos" },
  { src: logoExtra, alt: "Cliente" },
];

/* ─── Particle Canvas (white particles on orange) ─── */
const ParticleCanvas = ({ color = "rgba(255,255,255,0.12)" }: { color?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
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
    container.addEventListener("mousemove", handleMouse);
    container.addEventListener("mouseleave", handleLeave);

    const spacing = 30;
    interface Dot { baseX: number; baseY: number; cx: number; cy: number; vx: number; vy: number; phase: number; speed: number; }
    let dots: Dot[] = [];
    const buildDots = () => {
      dots = [];
      const w = canvas.offsetWidth; const h = canvas.offsetHeight;
      for (let x = spacing; x < w; x += spacing)
        for (let y = spacing; y < h; y += spacing)
          dots.push({ baseX: x, baseY: y, cx: x, cy: y, vx: 0, vy: 0, phase: Math.random() * Math.PI * 2, speed: 0.3 + Math.random() * 0.4 });
    };
    buildDots();
    window.addEventListener("resize", buildDots);

    let animId: number; let time = 0;
    const draw = () => {
      const w = canvas.offsetWidth; const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.016;
      const mx = mouseRef.current.x; const my = mouseRef.current.y;
      for (const dot of dots) {
        const driftX = prefersReduced ? 0 : Math.sin(time * dot.speed * 2 + dot.phase) * 14 + Math.cos(time * 0.5 + dot.baseY * 0.02) * 8;
        const driftY = prefersReduced ? 0 : Math.cos(time * dot.speed * 1.5 + dot.phase) * 14 + Math.sin(time * 0.7 + dot.baseX * 0.02) * 8;
        const targetX = dot.baseX + driftX; const targetY = dot.baseY + driftY;
        const dx = dot.cx - mx; const dy = dot.cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let attractX = 0; let attractY = 0;
        if (dist < 160 && dist > 0 && !prefersReduced) {
          const force = (1 - dist / 160) * 10;
          attractX = -(dx / dist) * force; attractY = -(dy / dist) * force;
        }
        dot.vx += (targetX + attractX - dot.cx) * 0.05; dot.vy += (targetY + attractY - dot.cy) * 0.05;
        dot.vx *= 0.85; dot.vy *= 0.85; dot.cx += dot.vx; dot.cy += dot.vy;
        const distFromMouse = Math.sqrt((dot.cx - mx) ** 2 + (dot.cy - my) ** 2);
        const proximity = Math.max(0, 1 - distFromMouse / 160);
        const size = 1.5 + proximity * 3.5;
        ctx.beginPath(); ctx.arc(dot.cx, dot.cy, size, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); window.removeEventListener("resize", buildDots); container.removeEventListener("mousemove", handleMouse); container.removeEventListener("mouseleave", handleLeave); cancelAnimationFrame(animId); };
  }, [color]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-auto">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />
    </div>
  );
};

/* ─── Scroll fade-in ─── */
const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

/* ─── Logo Row ─── */
const LogoRow = ({ reverse = false, duration = 25 }: { reverse?: boolean; duration?: number }) => (
  <div className="relative overflow-hidden py-1.5">
    <div
      className="flex"
      style={{
        width: "max-content",
        animation: `${reverse ? "marquee-reverse" : "marquee"} ${duration}s linear infinite`,
      }}
    >
      {[...Array(4)].map((_, setIdx) =>
        clientLogos.map((logo, i) => (
          <div key={`${setIdx}-${i}`} className="flex-shrink-0 mx-4 sm:mx-8 flex items-center justify-center" style={{ minWidth: 100, height: 40 }}>
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-[32px] sm:max-h-[40px] w-auto object-contain"
              style={{ filter: "brightness(0) opacity(0.4)", minHeight: 28 }}
              loading="lazy"
            />
          </div>
        ))
      )}
    </div>
  </div>
);

/* ─── Logo Marquee (3 rows, alternating directions) ─── */
const LogoMarquee = () => (
  <section className="py-10 sm:py-20 overflow-hidden bg-white">
    <FadeIn className="text-center mb-6 sm:mb-10">
      <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-foreground/40">Empresas que confiam na 29Tech</p>
    </FadeIn>
    <div className="relative space-y-2 sm:space-y-3">
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 bg-gradient-to-l from-white to-transparent" />
      <LogoRow duration={28} />
      <LogoRow reverse duration={22} />
      <LogoRow duration={32} />
    </div>
  </section>
);

/* ─── Main LP ─── */
const LandingPage = () => {
  const [form, setForm] = useState({
    name: "", whatsapp: "", website: "", monthly_revenue: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("lead_qualifications").insert({
      name: form.name.trim(), whatsapp: form.whatsapp.trim(),
      website: form.website.trim(), monthly_revenue: form.monthly_revenue,
      terms_accepted: true,
    });
    if (error) { 
      setSubmitting(false);
      toast.error("Erro ao enviar. Tente novamente."); 
      return; 
    }
    // Redireciona direto para obrigado sem mostrar animação
    window.location.href = "/obrigado";
  };











  };

  const scrollToForm = () => document.getElementById("qualification-form")?.scrollIntoView({ behavior: "smooth" });

