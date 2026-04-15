import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Zap, Target, Rocket, Cpu, Layers, Settings } from "lucide-react";

const LandingPage = () => {
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    role: "",
    company: "",
    monthly_revenue: "",
    main_challenge: "",
    terms_accepted: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.terms_accepted) {
      toast.error("Aceite os termos para continuar.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("lead_qualifications").insert({
      name: form.name.trim(),
      whatsapp: form.whatsapp.trim(),
      role: form.role.trim(),
      company: form.company.trim(),
      monthly_revenue: form.monthly_revenue,
      main_challenge: form.main_challenge.trim(),
      terms_accepted: form.terms_accepted,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Erro ao enviar. Tente novamente.");
      return;
    }
    setSubmitted(true);
  };

  const scrollToForm = () => {
    document.getElementById("qualification-form")?.scrollIntoView({ behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-cyan-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Qualificação Enviada!
          </h2>
          <p className="text-gray-400 text-lg">
            Nosso time vai analisar seu projeto e entrar em contato pelo WhatsApp em até 24 horas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Inter',sans-serif] overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            29Tech — Engenharia de Software com IA
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
            Pare de esperar meses por software:{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Você traz o desafio hoje e vê o MVP pronto no nosso próximo encontro.
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Desenvolvemos soluções personalizadas com IA para reduzir seus custos operacionais e
            escalar sua empresa. Se o seu projeto for aprovado na nossa qualificação, você testa o
            MVP funcional na segunda reunião e recebe o software completo em até 30 dias.
          </p>
          <button
            onClick={scrollToForm}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            QUERO QUALIFICAR MEU PROJETO
            <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* DOR */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-medium">
            O mercado não espera. Cada dia com processos manuais ou softwares lentos é{" "}
            <span className="text-white font-bold">dinheiro saindo do seu caixa</span>. Você não
            precisa de um cronograma de 6 meses; precisa de{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent font-bold">
              execução 29Tech
            </span>
            .
          </p>
        </div>
      </section>

      {/* MÉTODO 29TECH */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
            Método{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              29Tech
            </span>
          </h2>
          <p className="text-gray-500 text-center mb-16 text-lg">
            Do desafio à solução em 3 passos.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Qualificação",
                desc: "Preencha o formulário detalhando seu desafio e faturamento. Analisamos se o seu projeto se encaixa no nosso modelo de escala.",
                icon: Target,
              },
              {
                step: "02",
                title: "Briefing e MVP",
                desc: "Na Reunião 01 alinhamos o escopo. Na Reunião 02, você testa o MVP funcional em tempo real.",
                icon: Zap,
              },
              {
                step: "03",
                title: "Entrega em 30 Dias",
                desc: "Com o MVP validado, finalizamos a implementação e escalamos sua solução para entrega final em um mês.",
                icon: Rocket,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group relative p-8 rounded-2xl bg-[#0a0a0a] border border-gray-800 hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]"
              >
                <span className="text-5xl font-extrabold text-gray-800 group-hover:text-blue-500/20 transition-colors absolute top-6 right-6">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALOR */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16">
            Por que a{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              29Tech
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Settings,
                title: "Personalização Total",
                desc: "O software se adapta ao seu processo, não o contrário.",
              },
              {
                icon: Cpu,
                title: "Integração com IA",
                desc: "Automações nativas para máxima eficiência operacional.",
              },
              {
                icon: Layers,
                title: "Arquitetura Escalável",
                desc: "Tecnologia de elite pronta para o crescimento da sua demanda.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-2xl bg-[#111] border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-shadow">
                  <item.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="qualification-form" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a14] to-[#050505] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="p-8 md:p-12 rounded-2xl bg-[#0a0a0a] border border-cyan-500/20 shadow-[0_0_60px_rgba(6,182,212,0.06)]">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2">
              Inicie sua{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Qualificação
              </span>
            </h2>
            <p className="text-gray-500 text-center mb-10">
              Preencha os dados abaixo para começarmos.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                label="Nome Completo"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <InputField
                label="WhatsApp com DDD"
                name="whatsapp"
                type="tel"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                required
              />
              <InputField
                label="Cargo"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              />
              <InputField
                label="Empresa"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Faturamento Mensal
                </label>
                <select
                  name="monthly_revenue"
                  value={form.monthly_revenue}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors appearance-none"
                >
                  <option value="">Selecione</option>
                  <option>R$ 80k a R$ 200k</option>
                  <option>R$ 200k a R$ 500k</option>
                  <option>R$ 500k a R$ 1 Milhão</option>
                  <option>Acima de R$ 1 Milhão</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Qual o seu principal desafio hoje?
                </label>
                <textarea
                  name="main_challenge"
                  value={form.main_challenge}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-700 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="Descreva brevemente..."
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="terms_accepted"
                  checked={form.terms_accepted}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-gray-600 bg-[#111] text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Aceito os termos e políticas de privacidade
                </span>
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              >
                {submitting ? "Enviando..." : "ENVIAR E SOLICITAR QUALIFICAÇÃO"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-gray-800/50">
        © {new Date().getFullYear()} 29Tech. Todos os direitos reservados.
      </footer>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-700 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
    />
  </div>
);

export default LandingPage;
