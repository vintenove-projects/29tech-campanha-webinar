import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const FinalCTA = () => {
  const [form, setForm] = useState({ nome: "", whatsapp: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Enviar para Google Sheets via Apps Script Web App
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxgVdXMd0c4OmZzvW-gO05UqosB9C7igqku156Uki_JPQ8JkTKXU1PXyx7y13Uv4g0c/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({
            nome: form.nome,
            whatsapp: form.whatsapp,
            data: new Date().toLocaleString("pt-BR"),
          }),
        }
      );

      alert("Obrigado! Entraremos em contato em breve.");
      setForm({ nome: "", whatsapp: "" });
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const advantages = [
    {
      title: "Adapta conforme seu crescimento",
      description: "Cresce com você, sem limitações"
    },
    {
      title: "Sem compromissos de longo prazo",
      description: "Flexibilidade total, você controla"
    },
    {
      title: "Profissionais experientes",
      description: "Time validado e de confiança"
    }
  ];

  const roadmap = [
    { step: "1", title: "Agendar", desc: "Marque seu diagnóstico gratuito" },
    { step: "2", title: "Diagnóstico", desc: "Entendemos seu desafio em 24h" },
    { step: "3", title: "Implementar", desc: "Começamos a solução em 7 dias" }
  ];

  return (
    <section id="contato" className="py-20 sm:py-28 md:py-36 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Vantagens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 sm:mb-20">
          {advantages.map((adv, idx) => (
            <div key={idx} className="text-center">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                {adv.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {adv.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Principal */}
        <div className="text-center mb-16 sm:mb-20">
          <h2
            className="font-light tracking-tight text-foreground mb-4"
            style={{ fontSize: "clamp(26px, 5vw, 60px)" }}
          >
            Seu projeto começa aqui.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-10 sm:mb-14 leading-relaxed">
            Nosso time entra em contato em até 24h, entende o seu desafio e apresenta a solução certa.
          </p>
        </div>

        {/* Roadmap */}
        <RoadmapSection roadmap={roadmap} />

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-end">
            <input
              type="text"
              placeholder="Nome"
              required
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="flex-1 rounded-full border border-border bg-background px-5 sm:px-6 py-3 sm:py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="tel"
              placeholder="(11) 99999-9999"
              required
              maxLength={15}
              value={form.whatsapp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 11) {
                  const formatted = value
                    .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
                    .replace(/(\d{2})(\d{4})(\d{3})/, '($1) $2-$3');
                  setForm({ ...form, whatsapp: formatted });
                }
              }}
              title="Insira o WhatsApp (ex: 11 99999-9999)"
              className="flex-1 rounded-full border border-border bg-background px-5 sm:px-6 py-3 sm:py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : "Quero meu diagnóstico"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// Animated Roadmap Component
interface RoadmapItem {
  step: string;
  title: string;
  desc: string;
}

interface RoadmapSectionProps {
  roadmap: RoadmapItem[];
}

const RoadmapSection = ({ roadmap }: RoadmapSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Animação sequencial dos círculos
  const circleVariants = (index: number) => ({
    hidden: { opacity: 0.3, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: [0.3, 1, 0.3],
      scale: 1,
      transition: {
        opacity: {
          duration: 5,
          times: [0, 0.15 + index * 0.25, 1],
          repeat: Infinity,
          repeatDelay: 0,
          ease: "easeInOut" as const,
              delay: custom * 0.1,
        },
        scale: {
          duration: 0.5,
          ease: "easeOut" as const,
        },
      },
    }),
  });

  // Animação da linha conectora
  const lineVariants = (index: number) => ({
    hidden: { scaleX: 0 },
    visible: {
      scaleX: [0, 1, 0],
      transition: {
        duration: 5,
        times: [0, 0.15 + index * 0.25 + 0.12, 1],
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatDelay: 0,
        delay: 0.2,
      },
    },
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div ref={ref} className="mb-16 sm:mb-20">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {roadmap.map((item, idx) => (
          <motion.div
            key={idx}
            className="relative flex flex-col items-center"
            variants={itemVariants}
          >
            {/* Linha conectora animada */}
            {idx < roadmap.length - 1 && (
              <motion.div
                className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-transparent transform -translate-y-1/2 origin-left"
                variants={lineVariants(idx)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
            )}

            {/* Círculo com número - animação sequencial */}
            <motion.div
              className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mb-3 relative z-10"
              variants={circleVariants(idx)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={idx}
              whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(var(--primary), 0.5)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.step}
            </motion.div>

            {/* Título */}
            <h4 className="text-sm font-semibold text-foreground mb-1">
              {item.title}
            </h4>

            {/* Descrição */}
            <p className="text-xs text-muted-foreground text-center">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FinalCTA;
