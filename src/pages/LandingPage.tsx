import { useState, useEffect, useRef } from "react";
import { Target, Rocket, Cpu, Layers, Settings, ArrowRight, BookOpen, Users, TrendingDown, Award, Globe, CheckCircle, AlertTriangle, Zap, FileText, MessageCircle, HelpCircle } from "lucide-react";
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

/* ─── Particle Canvas ─── */
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

/* ─── Logo Marquee ─── */
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

    try {
      const formData = new FormData();
      formData.append("tipo", "lp");
      formData.append("nome", form.name.trim());
      formData.append("whatsapp", form.whatsapp.trim());
      formData.append("site", form.website.trim());
      formData.append("receita", form.monthly_revenue);
      formData.append("data", new Date().toLocaleString("pt-BR"));

      await fetch(
        "https://script.google.com/macros/s/AKfycbwlGp-41K4So3DTNcBENVTDkLr1O-kaOJe9NRjxQ-LQA9uHhcNJb-CWY6GX_gLoLWI/exec",
        { method: "POST", mode: "no-cors", body: formData }
      );
    } catch (_) {
      // no-cors não retorna resposta, ignorar
    }

    const isLowRevenue = form.monthly_revenue === "Abaixo de R$ 80k";
    const hasNoSite = !form.website || form.website.trim() === "";

    if (isLowRevenue || hasNoSite) {
      window.location.href = "/nao-qualificado";
    } else {
      window.location.href = "/obrigado";
    }
  };

  const scrollToForm = () => document.getElementById("qualification-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
        <ParticleCanvas color="rgba(255,255,255,0.13)" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full pt-12 pb-14 sm:py-20 text-center">
          <FadeIn>
            <img src={logo29Tech} alt="29Tech" className="h-10 sm:h-16 w-auto mx-auto mb-5 sm:mb-8" />
            <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/30 bg-white/10 text-white text-[11px] sm:text-sm font-medium backdrop-blur-sm">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" /> Workshop Ao Vivo
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/30 bg-white/10 text-white text-[11px] sm:text-sm font-medium backdrop-blur-sm">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" /> 100% Gratuito
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/30 bg-white/10 text-white text-[11px] sm:text-sm font-medium backdrop-blur-sm">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" /> Exclusivo para Empresários
              </span>
            </div>
            <h1 className="text-[1.6rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 max-w-4xl mx-auto">
              Bastidores da IA:{" "}
              <span className="text-white/90">
                Onde você não apenas assiste, mas constrói seu produto personalizado com nossa metodologia.
              </span>
            </h1>
            <p className="text-white/85 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-7 sm:mb-12 leading-relaxed">
              Acesse a operação real da 29Tech. Veja como usamos Inteligência Artificial para escalar nossos projetos internos, conheça as soluções que entregamos para nossos clientes e saia do evento com o desenho de um produto de IA focado 100% no seu negócio.
            </p>
            <div className="flex flex-col items-stretch sm:items-center gap-3 sm:gap-4 px-1 sm:px-0">
              <button onClick={scrollToForm} className="group flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 sm:px-10 sm:py-5 text-primary font-bold text-sm sm:text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] w-full sm:w-auto">
                QUERO GARANTIR MINHA VAGA
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://wa.me/5511999999999?text=Ol%C3%A1%2C+tenho+uma+d%C3%BAvida+sobre+o+workshop+Bastidores+da+IA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/75 text-xs sm:text-sm underline underline-offset-4 decoration-white/40 hover:text-white hover:decoration-white transition-colors text-center"
              >
                Tenho uma dúvida específica e quero falar no WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ LOGOS MARQUEE ══════════ */}
      <LogoMarquee />

      {/* ══════════ DOR ══════════ */}
      <section className="py-10 sm:py-28 px-4 sm:px-5 bg-primary relative overflow-hidden">
        <ParticleCanvas color="rgba(255,255,255,0.08)" />
        <FadeIn className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 border border-white/25 flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <p className="text-lg sm:text-2xl md:text-3xl text-white/90 leading-relaxed font-light">
            O mercado está inundado de "especialistas" em IA que só entregam teoria e conceitos abstratos. Enquanto isso, sua empresa continua perdendo eficiência em processos manuais lentos ou tentando implementar ferramentas genéricas que não resolvem o seu problema real. O resultado?{" "}
            <span className="text-white font-bold">Desperdício de tempo, capital e a sensação de estar ficando para trás na corrida tecnológica.</span>
          </p>
        </FadeIn>
      </section>

      {/* ══════════ PROPOSTA DE VALOR — Branco ══════════ */}
      <section className="py-10 sm:py-32 px-4 sm:px-5 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-6 sm:mb-8">
              A 29Tech não apenas fala de IA — nós operamos com ela
            </h2>
            <p className="text-foreground/70 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto">
              No <strong className="text-foreground">Bastidores da IA</strong>, abrimos nossa "caixa-preta". Você verá o fluxo real de desenvolvimento que nos permite entregar com velocidade e qualidade acima da média. É a oportunidade de parar de experimentar sem rumo e começar a implementar o que realmente gera ROI.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ COMO FUNCIONA ══════════ */}
      <section className="py-10 sm:py-32 px-4 sm:px-5 bg-primary relative overflow-hidden">
        <ParticleCanvas color="rgba(255,255,255,0.10)" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <FadeIn className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
              Como Funciona
            </h2>
            <p className="text-white/70 text-sm sm:text-lg">O que acontece durante o workshop.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
            {[
              {
                step: "01",
                title: "Imersão nos Bastidores",
                desc: "Veja por dentro as automações e processos de IA que a 29Tech utiliza para acelerar sua própria produção.",
                icon: Cpu,
              },
              {
                step: "02",
                title: "Casos Reais",
                desc: "Demonstração prática de produtos de IA que construímos para nossos clientes e os resultados financeiros que eles geraram.",
                icon: TrendingDown,
              },
              {
                step: "03",
                title: "Oficina Mão na Massa",
                desc: "Durante a call, ajudaremos você a estruturar o escopo de um produto de IA personalizado para resolver o maior gargalo da sua empresa hoje.",
                icon: Target,
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.12}>
                <div className="group text-center p-6 sm:p-8 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 h-full">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-white/25 transition-colors">
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-white/50 tracking-[0.25em]">PASSO {item.step}</span>
                  <h3 className="text-lg sm:text-xl font-bold mt-2 mb-2 sm:mb-3 text-white">{item.title}</h3>
                  <p className="text-white/75 leading-relaxed text-xs sm:text-sm">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROVA E CREDIBILIDADE — Branco ══════════ */}
      <section className="py-10 sm:py-32 px-4 sm:px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
              Engenharia Sênior. Resultados Reais.
            </h2>
            <p className="text-foreground/50 text-sm sm:text-lg mt-3 max-w-2xl mx-auto">
              A 29Tech é referência em Squads de Elite que sustentam sistemas robustos e implementam IA onde ela realmente traz lucro e escala, fugindo do óbvio.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {[
              { icon: BookOpen, stat: "Framework 29", desc: "Metodologia própria de desenvolvimento, testada e publicada em artigo científico." },
              { icon: Users, stat: "+100", desc: "Empresas atendidas com soluções de software personalizadas." },
              { icon: TrendingDown, stat: "<8%", desc: "Churn dos nossos clientes. Retenção é consequência de resultado." },
              { icon: Award, stat: "ISTOÉ", desc: "Reconhecimento de mercado.", link: "https://www.instagram.com/p/DTTeQElDP8E/", linkLabel: "Ver publicação" },
              { icon: Globe, stat: "Global", desc: "Clientes atendidos no Brasil e na Europa." },
            ].map((item, i) => (
              <FadeIn key={item.stat} delay={i * 0.08}>
                <div className="group p-5 sm:p-6 rounded-2xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(255,68,0,0.08)] h-full flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center gap-4 sm:gap-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-primary mb-1 sm:mb-2">{item.stat}</h3>
                    <p className="text-foreground/60 leading-relaxed text-xs sm:text-sm">{item.desc}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-2 sm:mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors">
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

      {/* ══════════ O QUE ESTÁ INCLUSO ══════════ */}
      <section className="py-10 sm:py-28 px-4 sm:px-5 bg-primary relative overflow-hidden">
        <ParticleCanvas color="rgba(255,255,255,0.08)" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <FadeIn className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              O que está incluso
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {[
              "Acesso exclusivo ao workshop ao vivo e prático.",
              "Framework 29Tech de Implementação de IA (PDF).",
              "Sessão de mentoria coletiva para desenho do seu produto.",
              "Acesso direto aos nossos especialistas para tirar dúvidas de viabilidade.",
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-white text-sm sm:text-base leading-relaxed">{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FORMULÁRIO — Branco ══════════ */}
      <section id="qualification-form" className="py-10 sm:py-32 px-4 sm:px-5 bg-white">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                Vagas Limitadas
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-3">
                Garanta sua vaga no Workshop
              </h2>
              <p className="text-foreground/50 text-xs sm:text-sm max-w-md mx-auto">
                Para garantir que todos os participantes consigam interagir e sair com seu produto desenhado, restringimos o número de inscritos.
              </p>
            </div>

            <div className="p-6 sm:p-8 md:p-12 rounded-3xl border-2 border-primary/15 shadow-[0_8px_60px_rgba(255,68,0,0.06)]">
              <form onSubmit={handleSubmit} className="space-y-5">
                <LPInput label="Nome Completo" name="name" value={form.name} onChange={handleChange} required />
                <LPInput label="WhatsApp com DDD" name="whatsapp" type="tel" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={handleChange} required />
                <LPInput label="Site da Empresa" name="website" placeholder="www.suaempresa.com.br" value={form.website} onChange={handleChange} />

                <div>
                  <label className="block text-xs font-semibold text-foreground/60 mb-2 tracking-wide uppercase">Faturamento Mensal</label>
                  <select name="monthly_revenue" value={form.monthly_revenue} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border-2 border-primary/15 bg-white text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none">
                    <option value="">Selecione</option>
                    <option>Abaixo de R$ 80k</option>
                    <option>R$ 80k a R$ 200k</option>
                    <option>R$ 200k a R$ 500k</option>
                    <option>R$ 500k a R$ 1 Milhão</option>
                    <option>Acima de R$ 1 Milhão</option>
                  </select>
                </div>

                <button type="submit" disabled={submitting}
                  className="w-full py-4 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,68,0,0.35)] hover:scale-[1.02]">
                  {submitting ? "Enviando..." : "QUERO GARANTIR MINHA VAGA NO WORKSHOP"}
                </button>

                <div className="text-center">
                  <a
                    href="https://wa.me/5511999999999?text=Ol%C3%A1%2C+tenho+uma+d%C3%BAvida+sobre+o+workshop+Bastidores+da+IA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-foreground/50 hover:text-primary transition-colors underline underline-offset-4"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Tenho uma dúvida específica e quero falar no WhatsApp
                  </a>
                </div>

                <p className="text-[10px] text-foreground/35 text-center tracking-wide leading-relaxed">
                  Ao clicar em "Quero Garantir Minha Vaga", você aceita<br />
                  nossos termos e políticas de privacidade.<br />
                  Seus dados estão 100% seguros.
                </p>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ QUEBRA DE OBJEÇÕES ══════════ */}
      <section className="py-10 sm:py-28 px-4 sm:px-5 bg-primary relative overflow-hidden">
        <ParticleCanvas color="rgba(255,255,255,0.07)" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <FadeIn className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Dúvidas Frequentes
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {[
              {
                q: "Preciso entender de programação?",
                a: "Não. O foco é em estratégia de produto e eficiência de negócio. A IA é o meio, o resultado é o seu lucro.",
              },
              {
                q: "Serve para o meu setor?",
                a: "Sim. Se sua empresa possui processos digitais ou lida com dados e escala, a metodologia da 29Tech é aplicável.",
              },
              {
                q: "O workshop é gravado?",
                a: "Não. É um evento ao vivo para permitir a interação e a construção personalizada que prometemos.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-6 sm:p-8 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <HelpCircle className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                    <h3 className="text-white font-bold text-sm sm:text-base">"{item.q}"</h3>
                  </div>
                  <p className="text-white/75 text-sm leading-relaxed pl-8">{item.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
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
