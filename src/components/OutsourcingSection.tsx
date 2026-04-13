import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const profiles = [
  { name: "Ana Ferreira", role: "Frontend Developer", available: true },
  { name: "Lucas Mendes", role: "Data Engineer", available: true },
  { name: "Mariana Costa", role: "Product Designer", available: false },
];

const OutsourcingSection = () => {
  const { t, i18n } = useTranslation();

  const steps = i18n.language === 'pt-BR' || i18n.language === 'pt-PT'
    ? [
        "Você descreve o que precisa resolver",
        "A 29Tech seleciona e valida o profissional ideal",
        "Ele entra no seu projeto em até 7 dias úteis",
      ]
    : i18n.language === 'en'
    ? [
        "You describe what you need to solve",
        "29Tech selects and validates the ideal professional",
        "They join your project within 7 business days",
      ]
    : [
        "Describes lo que necesitas resolver",
        "29Tech selecciona y valida al profesional ideal",
        "Se une a tu proyecto en hasta 7 días hábiles",
      ];

  return (
  <section id="como-funciona" className="py-20 sm:py-28 md:py-36 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-5 gap-10 md:gap-16 items-center">
      <div className="md:col-span-2">
        <h2 className="sr-only">Alocação de Profissionais Tech | Outsourcing de Desenvolvimento</h2>
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
          {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Alocação de Especialistas Tech" :
           i18n.language === 'en' ? "Tech Specialist Allocation" : "Asignación de Especialistas de Tech"}
        </span>
        <h3
          className="font-light tracking-tight text-foreground mt-4 mb-5 sm:mb-6 leading-[1.1]"
          style={{ fontSize: "clamp(26px, 4vw, 48px)" }}
        >
          {t("outsourcing.title")}<br/>
          {t("outsourcing.titleHighlight")}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 sm:mb-8">
          {t("outsourcing.description")}
        </p>

        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-xs font-bold text-primary mt-0.5">{i + 1}</span>
              <p className="text-sm text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>

        <a
          href="#contato"
          className="inline-flex rounded-full bg-primary px-6 sm:px-7 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
          title="Alocar especialista - Outsourcing de desenvolvimento"
        >
          {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Quero alocar um especialista" :
           i18n.language === 'en' ? "I want to allocate a specialist" : "Quiero asignar un especialista"}
        </a>
      </div>

      <div className="md:col-span-3">
        <div className="bg-surface rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
          {profiles.map((p, i) => (
            <motion.div
              key={i}
              className="bg-background rounded-[12px] sm:rounded-[16px] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between"
              animate={{
                boxShadow: [
                  "0 1px 4px rgba(0,0,0,0.04)",
                  "0 4px 16px rgba(0,0,0,0.08)",
                  "0 1px 4px rgba(0,0,0,0.04)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center text-xs sm:text-sm font-semibold text-foreground shrink-0">
                  {p.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {p.available && (
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap">
                    {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "disponível" :
                     i18n.language === 'en' ? "available" : "disponible"}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary whitespace-nowrap">
                  <CheckCircle size={14} /> {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "29Tech validado" :
                                           i18n.language === 'en' ? "29Tech validated" : "29Tech validado"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

export default OutsourcingSection;
