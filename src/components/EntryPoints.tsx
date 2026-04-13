import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CardItem = ({ c, i }: { c: { num: string; title: string; desc: string; link: string }; i: number }) => (
  <motion.div
    className="group relative bg-background border border-border rounded-2xl p-6 sm:p-8 overflow-hidden cursor-pointer hover:bg-primary hover:border-primary transition-all duration-300"
    whileHover={{
      y: -6,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    }}
  >
    <span className="text-lg font-sans font-medium text-primary group-hover:text-primary-foreground transition-colors duration-300">
      {c.num}
    </span>
    <h3 className="font-sans font-bold text-foreground group-hover:text-primary-foreground mt-3 mb-3 sm:mb-4 tracking-tight transition-colors duration-300"
      style={{ fontSize: "clamp(18px, 2.5vw, 24px)" }}
    >
      {c.title}
    </h3>
    <p className="text-sm font-sans text-muted-foreground group-hover:text-primary-foreground/80 leading-relaxed mb-6 sm:mb-8 transition-colors duration-300">
      {c.desc}
    </p>
    <a
      href="#contato"
      className="inline-flex items-center gap-2 text-sm font-sans font-medium text-foreground group-hover:text-primary-foreground transition-colors duration-300"
      title={`${c.link} - 29Tech Outsourcing`}
    >
      {c.link}
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </a>
  </motion.div>
);

const EntryPoints = () => {
  const { t, i18n } = useTranslation();

  const cards = [
    {
      num: "01",
      title: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Preciso de um time tech" :
             i18n.language === 'en' ? "I need a tech team" : "Necesito un equipo de tech",
      desc: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Aloque profissionais validados para o seu projeto em dias. Sem CLT, sem risco." :
            i18n.language === 'en' ? "Allocate validated professionals to your project in days. No employment contract, no risk." : "Asigna profesionales validados a tu proyecto en días. Sin contrato, sin riesgo.",
      link: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Ver Alocação de Especialistas" :
            i18n.language === 'en' ? "See Expert Allocation" : "Ver Asignación de Especialistas",
    },
    {
      num: "02",
      title: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Preciso construir um produto" :
             i18n.language === 'en' ? "I need to build a product" : "Necesito construir un producto",
      desc: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Desenvolvemos seu software do zero, com escopo definido e prazo real." :
            i18n.language === 'en' ? "We develop your software from scratch, with defined scope and real deadline." : "Desarrollamos tu software desde cero, con alcance definido y plazo real.",
      link: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Ver Software House" :
            i18n.language === 'en' ? "See Software House" : "Ver Software House",
    },
    {
      num: "03",
      title: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Preciso de dados e IA" :
             i18n.language === 'en' ? "I need data and AI" : "Necesito datos e IA",
      desc: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Transformamos dados dispersos em decisões. IA aplicada ao seu negócio." :
            i18n.language === 'en' ? "We transform scattered data into decisions. AI applied to your business." : "Transformamos datos dispersos en decisiones. IA aplicada a tu negocio.",
      link: i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Ver IA e Dados" :
            i18n.language === 'en' ? "See Data & AI" : "Ver Datos e IA",
    },
  ];

  return (
    <section id="servicos" className="py-20 sm:py-28 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2
          className="font-light tracking-tight text-foreground mb-10 sm:mb-16"
          style={{ fontSize: "clamp(26px, 4vw, 48px)" }}
        >
          {t("entryPoints.title")}
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((c, i) => (
            <CardItem key={c.num} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EntryPoints;
