import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Target, Rocket, Cpu, Layers, Settings, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import uiComponents from "@/assets/lp-ui-components.jpg";
import architecture from "@/assets/lp-architecture.jpg";
import clientLogos from "@/assets/client-logos.png";

/* ─── Particle Canvas ─── */
const ParticleCanvas = ({ color = "rgba(255, 68, 0, 0.15)" }: { color?: string }) => {
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

    const spacing = 28;
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
        const driftX = prefersReduced ? 0 : Math.sin(time * dot.speed * 2 + dot.phase) * 16 + Math.cos(time * 0.5 + dot.baseY * 0.02) * 10;
        const driftY = prefersReduced ? 0 : Math.cos(time * dot.speed * 1.5 + dot.phase) * 16 + Math.sin(time * 0.7 + dot.baseX * 0.02) * 10;
        const targetX = dot.baseX + driftX; const targetY = dot.baseY + driftY;
        const dx = dot.cx - mx; const dy = dot.cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let attractX = 0; let attractY = 0;
        if (dist < 180 && dist > 0 && !prefersReduced) {
          const force = (1 - dist / 180) * 12;
          attractX = -(dx / dist) * force; attractY = -(dy / dist) * force;
        }
        dot.vx += (targetX + attractX - dot.cx) * 0.05; dot.vy += (targetY + attractY - dot.cy) * 0.05;
        dot.vx *= 0.85; dot.vy *= 0.85; dot.cx += dot.vx; dot.cy += dot.vy;
        const distFromMouse = Math.sqrt((dot.cx - mx) ** 2 + (dot.cy - my) ** 2);
        const proximity = Math.max(0, 1 - distFromMouse / 180);
        const size = 1.5 + proximity * 4;
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

/* ─── Logo Marquee ─── */
const LogoMarquee = () => (
  <div className="py-16 sm:py-20 overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
    <FadeIn className="text-center mb-10">
      <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/30">Empresas que confiam na 29Tech</p>
    </FadeIn>
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(to right, #0A0A0A, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(to left, #0A0A0A, transparent)" }} />
      <div className="flex animate-[marquee_25s_linear_infinite]" style={{ width: "max-content" }}>
        {[...Array(4)].map((_, i) => (
          <img key={i} src={clientLogos} alt="Logos de clientes 29Tech" className="h-16 sm:h-20 object-contain opacity-50 hover:opacity-80 transition-opacity mx-4" style={{ filter: "brightness(0.7)" }} />
        ))}
      </div>
    </div>
  </div>
);

/* ─── Main LP ─── */
const LandingPage = () => {
  const [form, setForm] = useState({
    name: "", whatsapp: "", role: "", company: "", monthly_revenue: "", main_challenge: "", terms_accepted: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.terms_accepted) { toast.error("Aceite os termos para continuar."); return; }
    setSubmitting(true);
    const { error } = await supabase.from("lead_qualifications").insert({
      name: form.name.trim(), whatsapp: form.whatsapp.trim(), role: form.role.trim(),
      company: form.company.trim(), monthly_revenue: form.monthly_revenue,
      main_challenge: form.main_challenge.trim(), terms_accepted: form.terms_accepted,
    });
    setSubmitting(false);
    if (error) { toast.error("Erro ao enviar. Tente novamente."); return; }
    setSubmitted(true);
  };

  const scrollToForm = () => document.getElementById("qualification-form")?.scrollIntoView({ behavior: "smooth" });

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="text-center max-w-lg">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }}>
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Qualificação Enviada!</h2>
          <p className="text-white/60 text-lg">Nosso time vai analisar seu projeto e entrar em contato pelo WhatsApp em até 24 horas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: "#050505", fontFamily: "'Bricolage Grotesque', sans-serif" }}>

      {/* ══════════ HERO — Laranja ══════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(14 100% 50%) 0%, hsl(13 78% 42%) 100%)" }}>
        <ParticleCanvas color="rgba(255, 229, 213, 0.22)" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-0">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-sm font-medium mb-8 backdrop-blur-sm">
              <Rocket className="w-4 h-4" /> 29Tech — Engenharia de Software com IA
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-extrabold leading-[1.08] tracking-tight text-white mb-6">
              Pare de esperar meses por software:{" "}
              <span className="text-white/90">
                Você traz o desafio hoje e vê o MVP pronto no nosso próximo encontro.
              </span>
            </h1>
            <p className="text-white/75 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
              Desenvolvemos soluções personalizadas com IA para reduzir seus custos operacionais e escalar sua empresa. Se o seu projeto for aprovado na nossa qualificação, você testa o MVP funcional na segunda reunião e recebe o software completo em até 30 dias.
            </p>
            <button onClick={scrollToForm} className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-primary font-bold text-base hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]">
              QUERO QUALIFICAR MEU PROJETO
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeIn>

          <FadeIn delay={0.2} className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-white/5 blur-2xl" />
              <img src={uiComponents} alt="Componentes de sistema 29Tech" width={1280} height={720} className="relative rounded-2xl border border-white/20 shadow-2xl" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ LOGOS MARQUEE ══════════ */}
      <LogoMarquee />

      {/* ══════════ DOR ══════════ */}
      <section className="py-20 sm:py-28 px-4" style={{ backgroundColor: "#050505" }}>
        <FadeIn className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8">
            <Target className="w-7 h-7 text-primary" />
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/70 leading-relaxed font-light">
            O mercado não espera. Cada dia com processos manuais ou softwares lentos é{" "}
            <span className="text-white font-semibold">dinheiro saindo do seu caixa</span>. Você não precisa de um cronograma de 6 meses; precisa de{" "}
            <span className="text-primary font-semibold">execução 29Tech</span>.
          </p>
        </FadeIn>
      </section>

      {/* ══════════ MÉTODO — com Partículas ══════════ */}
      <section className="py-24 sm:py-32 px-4 relative overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
        <ParticleCanvas color="rgba(255, 255, 255, 0.05)" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Método <span className="text-primary">29Tech</span>
            </h2>
            <p className="text-white/30 text-lg">Do desafio à solução em 3 passos.</p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-primary/5 blur-2xl" />
                <img src={architecture} alt="Arquitetura de software multi-plataforma" loading="lazy" width={800} height={600} className="relative rounded-2xl border border-white/10 shadow-xl" />
              </div>
            </FadeIn>
            <div className="space-y-6">
              {[
                { step: "01", title: "Qualificação", desc: "Preencha o formulário detalhando seu desafio e faturamento. Analisamos se o seu projeto se encaixa no nosso modelo de escala.", icon: Target },
                { step: "02", title: "Briefing e MVP", desc: "Na Reunião 01 alinhamos o escopo. Na Reunião 02, você testa o MVP funcional em tempo real.", icon: Cpu },
                { step: "03", title: "Entrega em 30 Dias", desc: "Com o MVP validado, finalizamos a implementação e escalamos sua solução para entrega final em um mês.", icon: Rocket },
              ].map((item, i) => (
                <FadeIn key={item.step} delay={i * 0.12}>
                  <div className="group flex gap-5 p-5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 hover:bg-white/[0.02]">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-primary/50 tracking-[0.2em]">PASSO {item.step}</span>
                      <h3 className="text-lg font-bold mt-0.5 mb-1">{item.title}</h3>
                      <p className="text-white/40 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ VALOR — Laranja ══════════ */}
      <section className="py-24 sm:py-32 px-4 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(14 100% 50%) 0%, hsl(14 100% 42%) 100%)" }}>
        <ParticleCanvas color="rgba(255, 229, 213, 0.18)" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Por que a 29Tech
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Settings, title: "Personalização Total", desc: "O software se adapta ao seu processo, não o contrário." },
              { icon: Cpu, title: "Integração com IA", desc: "Automações nativas para máxima eficiência operacional." },
              { icon: Layers, title: "Arquitetura Escalável", desc: "Tecnologia de elite pronta para o crescimento da sua demanda." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="group p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5 group-hover:bg-white/30 transition-colors">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FORMULÁRIO ══════════ */}
      <section id="qualification-form" className="py-24 sm:py-32 px-4 relative overflow-hidden" style={{ backgroundColor: "#050505" }}>
        <ParticleCanvas color="rgba(255, 68, 0, 0.08)" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, hsla(14,100%,50%,0.06) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <FadeIn>
            <div className="p-8 md:p-12 rounded-2xl border border-primary/15 shadow-[0_0_80px_rgba(255,68,0,0.04)]" style={{ backgroundColor: "#0D0D0D" }}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2">
                Inicie sua <span className="text-primary">Qualificação</span>
              </h2>
              <p className="text-white/30 text-center mb-10 text-sm">Preencha os dados abaixo para começarmos.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <LPInput label="Nome Completo" name="name" value={form.name} onChange={handleChange} required />
                <LPInput label="WhatsApp com DDD" name="whatsapp" type="tel" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={handleChange} required />
                <div className="grid sm:grid-cols-2 gap-5">
                  <LPInput label="Cargo" name="role" value={form.role} onChange={handleChange} required />
                  <LPInput label="Empresa" name="company" value={form.company} onChange={handleChange} required />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2 tracking-wide uppercase">Faturamento Mensal</label>
                  <select name="monthly_revenue" value={form.monthly_revenue} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
                    style={{ backgroundColor: "#111" }}>
                    <option value="">Selecione</option>
                    <option>R$ 80k a R$ 200k</option>
                    <option>R$ 200k a R$ 500k</option>
                    <option>R$ 500k a R$ 1 Milhão</option>
                    <option>Acima de R$ 1 Milhão</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2 tracking-wide uppercase">Qual o seu principal desafio hoje?</label>
                  <textarea name="main_challenge" value={form.main_challenge} onChange={handleChange} required rows={3} placeholder="Descreva brevemente..."
                    className="w-full px-4 py-3 rounded-xl border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    style={{ backgroundColor: "#111" }} />
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" name="terms_accepted" checked={form.terms_accepted} onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-white/20 text-primary focus:ring-primary focus:ring-offset-0" style={{ backgroundColor: "#111" }} />
                  <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                    Aceito os termos e políticas de privacidade
                  </span>
                </label>

                <button type="submit" disabled={submitting}
                  className="w-full py-4 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold text-base transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,68,0,0.35)] hover:scale-[1.02]">
                  {submitting ? "Enviando..." : "ENVIAR E SOLICITAR QUALIFICAÇÃO"}
                </button>

                <p className="text-[10px] text-white/20 text-center tracking-wide">
                  Seus dados estão 100% seguros. Não compartilhamos com terceiros.
                </p>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="py-8 text-center text-white/20 text-xs border-t border-white/5 tracking-wide">
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
    <label className="block text-xs font-semibold text-white/50 mb-2 tracking-wide uppercase">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
      style={{ backgroundColor: "#111" }} />
  </div>
);

export default LandingPage;
