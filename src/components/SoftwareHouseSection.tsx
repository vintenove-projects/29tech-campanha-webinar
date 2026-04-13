import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const SoftwareHouseSection = () => {
  const { t, i18n } = useTranslation();

  const sprintColumns = [
    {
      title: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Backlog" :
             i18n.language === 'en' ? "Backlog" : "Pendiente",
      items: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? ["Definir escopo", "Análise de requisitos"] :
             i18n.language === 'en' ? ["Define scope", "Requirements analysis"] : ["Definir alcance", "Análisis de requisitos"],
    },
    {
      title: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Em progresso" :
             i18n.language === 'en' ? "In progress" : "En progreso",
      items: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? ["API de pagamentos", "Dashboard admin"] :
             i18n.language === 'en' ? ["Payment API", "Admin Dashboard"] : ["API de pagos", "Panel de administración"],
    },
    {
      title: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Concluído" :
             i18n.language === 'en' ? "Completed" : "Completado",
      items: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? ["Setup do projeto", "Design system", "Auth module"] :
             i18n.language === 'en' ? ["Project setup", "Design system", "Auth module"] : ["Configuración del proyecto", "Sistema de diseño", "Módulo de autenticación"],
    },
  ];

  return (
  <section className="py-20 sm:py-28 md:py-36 bg-surface">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-5 gap-10 md:gap-16 items-center">
      <div className="md:col-span-3 order-2 md:order-1">
        <motion.div
          className="bg-background rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 md:p-8"
          animate={{
            boxShadow: [
              "0 2px 8px rgba(0,0,0,0.04)",
              "0 8px 24px rgba(0,0,0,0.08)",
              "0 2px 8px rgba(0,0,0,0.04)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
        >
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-primary/50" />
            <div className="w-3 h-3 rounded-full bg-primary/30" />
            <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-muted-foreground truncate">
              Sprint Board — Projeto Alpha
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {sprintColumns.map((col) => (
              <div key={col.title}>
                <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3">
                  {col.title}
                </p>
                <div className="space-y-1.5 sm:space-y-2">
                  {col.items.map((item, i) => (
                    <motion.div
                      key={item}
                      className="bg-surface rounded-lg sm:rounded-xl p-2 sm:p-3 text-[10px] sm:text-xs text-foreground"
                      animate={{
                        boxShadow: [
                          "0 1px 3px rgba(0,0,0,0.04)",
                          "0 3px 10px rgba(0,0,0,0.07)",
                          "0 1px 3px rgba(0,0,0,0.04)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="md:col-span-2 order-1 md:order-2">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
          {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Software House" :
           i18n.language === 'en' ? "Software House" : "Software House"}
        </span>
        <h2
          className="font-light tracking-tight text-foreground mt-4 mb-5 sm:mb-6 leading-[1.1]"
          style={{ fontSize: "clamp(26px, 4vw, 48px)" }}
        >
          {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Tem uma ideia mas não tem time para construir?" :
           i18n.language === 'en' ? "Have an idea but no team to build it?" : "¿Tienes una idea pero no tienes equipo para construirla?"}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8 sm:mb-10 max-w-lg">
          {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Criamos sistemas, apps e produtos digitais do zero — com escopo definido, prazo real e metodologia que reduz o tempo de desenvolvimento em até 70%." :
           i18n.language === 'en' ? "We create systems, apps and digital products from scratch — with defined scope, real deadline and methodology that reduces development time by up to 70%." : "Creamos sistemas, aplicaciones y productos digitales desde cero — con alcance definido, plazo real y metodología que reduce el tiempo de desarrollo hasta un 70%."}
        </p>
        <a
          href="#contato"
          className="inline-flex rounded-full border-2 border-foreground px-6 sm:px-7 py-3 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-all hover:scale-105"
        >
          {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Quero desenvolver meu produto" :
           i18n.language === 'en' ? "I want to develop my product" : "Quiero desarrollar mi producto"}
        </a>
      </div>
    </div>
  </section>
  );
};

export default SoftwareHouseSection;
