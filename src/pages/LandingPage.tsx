import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Target, Rocket, Cpu, Layers, Settings, ArrowRight, CheckCircle2, BookOpen, Users, TrendingDown, Award, Globe } from "lucide-react";
import { motion } from "framer-motion";

// Logos
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
          <div key={`${setIdx}-${i}`} className="flex-shrink-0 mx-4 sm:mx-8 flex items-center justify-center" style={{ minWidth: 100 }}>
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-6 sm:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              style={{ filter: "brightness(0) opacity(0.4)", maxWidth: 120 }}
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
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitting(false);
    if (error) { toast.error("Erro ao enviar. Tente novamente."); return; }
    setSubmitted(true);
  };

  const scrollToForm = () => document.getElementById("qualification-form")?.scrollIntoView({ behavior: "smooth" });

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-primary">
        <div className="text-center max-w-lg">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }}>
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Qualificação Enviada!</h2>
          <p className="text-white/70 text-lg">Nosso time vai analisar seu projeto e entrar em contato pelo WhatsApp em até 24 horas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>

      {/* ══════════ HERO — Laranja ══════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
        <ParticleCanvas color="rgba(255,255,255,0.13)" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 w-full py-16 sm:py-20 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-xs sm:text-sm font-medium mb-8 sm:mb-10 backdrop-blur-sm">
              <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 29Tech - Software House Global
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white mb-5 sm:mb-6 max-w-4xl mx-auto">
              Pare de esperar meses por software:{" "}
              <span className="text-white/90">
                Você traz o desafio hoje e vê o MVP pronto no nosso próximo encontro.
              </span>
            </h1>
            <p className="text-white/90 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Desenvolvemos soluções personalizadas com IA para reduzir seus custos operacionais e escalar sua empresa. Se o seu projeto for aprovado, você testa o MVP funcional na segunda reunião e recebe o software completo em até 30 dias.
            </p>
            <button onClick={scrollToForm} className="group inline-flex items-center gap-2 sm:gap-3 rounded-full bg-white px-7 py-4 sm:px-10 sm:py-5 text-primary font-bold text-base sm:text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]">
              QUERO MEU PROJETO
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ LOGOS MARQUEE ══════════ */}
      <LogoMarquee />

      {/* ══════════ DOR — Laranja claro ══════════ */}
      <section className="py-14 sm:py-28 px-5 bg-primary relative overflow-hidden">
        <ParticleCanvas color="rgba(255,255,255,0.08)" />
        <FadeIn className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 border border-white/25 flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <Target className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <p className="text-lg sm:text-2xl md:text-3xl text-white/90 leading-relaxed font-light">
            O mercado não espera. Cada dia com processos manuais ou softwares lentos é{" "}
            <span className="text-white font-semibold">dinheiro saindo do seu caixa</span>. Você não precisa de um cronograma de 6 meses; precisa de{" "}
            <span className="text-white font-bold underline decoration-white/50 underline-offset-4">execução 29Tech</span>.
          </p>
        </FadeIn>
      </section>

      {/* ══════════ MÉTODO — Branco ══════════ */}
      <section className="py-16 sm:py-32 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-2 sm:mb-3">
              Método 29Tech
            </h2>
            <p className="text-foreground/50 text-sm sm:text-lg">Do desafio à solução em 3 passos.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
            {[
              { step: "01", title: "Qualificação", desc: "Preencha o formulário detalhando seu desafio e faturamento. Analisamos se o seu projeto se encaixa no nosso modelo de escala.", icon: Target },
              { step: "02", title: "Briefing e MVP", desc: "Na Reunião 01 alinhamos o escopo. Na Reunião 02, você testa o MVP funcional em tempo real.", icon: Cpu },
              { step: "03", title: "Entrega em 30 Dias", desc: "Com o MVP validado, finalizamos a implementação e escalamos sua solução para entrega final em um mês.", icon: Rocket },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.12}>
                <div className="group text-center p-6 sm:p-8 rounded-2xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(255,68,0,0.08)] h-full">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-foreground/35 tracking-[0.25em]">PASSO {item.step}</span>
                  <h3 className="text-lg sm:text-xl font-bold mt-2 mb-2 sm:mb-3 text-foreground">{item.title}</h3>
                  <p className="text-foreground/60 leading-relaxed text-xs sm:text-sm">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ POR QUE A 29TECH — Prova Social ══════════ */}
      <section className="py-16 sm:py-32 px-5 relative overflow-hidden bg-primary">
        <ParticleCanvas color="rgba(255,255,255,0.10)" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <FadeIn className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Por que a 29Tech
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {[
              {
                icon: BookOpen,
                stat: "Framework 29",
                desc: "Metodologia própria de desenvolvimento, testada e publicada em artigo científico.",
              },
              {
                icon: Users,
                stat: "+100",
                desc: "Empresas atendidas com soluções de software personalizadas.",
              },
              {
                icon: TrendingDown,
                stat: "<8%",
                desc: "Churn dos nossos clientes. Retenção é consequência de resultado.",
              },
              {
                icon: Award,
                stat: "ISTOÉ",
                desc: "Reconhecimento de mercado.",
                link: "https://www.instagram.com/p/DTTeQElDP8E/",
                linkLabel: "Ver publicação",
              },
              {
                icon: Globe,
                stat: "Global",
                desc: "Clientes atendidos no Brasil e na Europa.",
              },
            ].map((item, i) => (
              <FadeIn key={item.stat} delay={i * 0.08}>
                <div className="group p-5 sm:p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 h-full flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center gap-4 sm:gap-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 sm:mb-4 group-hover:bg-white/25 transition-colors">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-1 sm:mb-2">{item.stat}</h3>
                    <p className="text-white/80 leading-relaxed text-xs sm:text-sm">{item.desc}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-2 sm:mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-white underline underline-offset-4 decoration-white/50 hover:decoration-white transition-colors">
                        {item.linkLabel} <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FORMULÁRIO — Branco ══════════ */}
      <section id="qualification-form" className="py-16 sm:py-32 px-5 bg-white">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="p-6 sm:p-8 md:p-12 rounded-3xl border-2 border-primary/15 shadow-[0_8px_60px_rgba(255,68,0,0.06)]">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-2 text-primary">
                Inicie sua Qualificação
              </h2>
              <p className="text-foreground/50 text-center mb-8 sm:mb-10 text-xs sm:text-sm">Preencha os dados abaixo para começarmos.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <LPInput label="Nome Completo" name="name" value={form.name} onChange={handleChange} required />
                <LPInput label="WhatsApp com DDD" name="whatsapp" type="tel" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={handleChange} required />
                <LPInput label="Site da Empresa" name="website" placeholder="www.suaempresa.com.br" value={form.website} onChange={handleChange} />

                <div>
                  <label className="block text-xs font-semibold text-foreground/60 mb-2 tracking-wide uppercase">Faturamento Mensal</label>
                  <select name="monthly_revenue" value={form.monthly_revenue} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border-2 border-primary/15 bg-white text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none">
                    <option value="">Selecione</option>
                    <option>R$ 80k a R$ 200k</option>
                    <option>R$ 200k a R$ 500k</option>
                    <option>R$ 500k a R$ 1 Milhão</option>
                    <option>Acima de R$ 1 Milhão</option>
                  </select>
                </div>

                <button type="submit" disabled={submitting}
                  className="w-full py-4 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold text-base transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,68,0,0.35)] hover:scale-[1.02]">
                  {submitting ? "Enviando..." : "ENVIAR PARA ANÁLISE"}
                </button>

                <p className="text-[10px] text-foreground/35 text-center tracking-wide leading-relaxed">
                  Ao clicar em "Enviar para Análise", você aceita nossos termos e políticas de privacidade. Seus dados estão 100% seguros.
                </p>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="py-8 text-center text-white/80 text-xs bg-primary border-t border-white/15 tracking-wide">
        © {new Date().getFullYear()} 29Tech. Todos os direitos reservados.
      </footer>
    </div>
  );
};

/* ─── Input ─── */
const LPInput = ({ label, name, value, onChange, type = "text", placeholder, required }: {
  label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; placeholder?: string; required?: boolean;
}) => (
  <div>
    <label className="block text-xs font-semibold text-foreground/60 mb-2 tracking-wide uppercase">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border-2 border-primary/15 bg-white text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
  </div>
);

export default LandingPage;
