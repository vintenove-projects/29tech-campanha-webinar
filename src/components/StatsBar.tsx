import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const StatsBar = () => {
  const { i18n } = useTranslation();

  const getStats = () => {
    const isEN = i18n.language === 'en';
    const isES = i18n.language === 'es';

    return [
      { target: 7, prefix: "", suffix: isEN ? " days" : isES ? " días" : " dias", desc: isEN ? "Professional allocated in up to 7 business days" : isES ? "Profesional asignado en hasta 7 días hábiles" : "Profissional alocado em até 7 dias úteis" },
      { target: 100, prefix: "+", suffix: "", desc: isEN ? "Companies served" : isES ? "Empresas atendidas" : "Empresas atendidas" },
      { target: 90, prefix: "", suffix: isEN ? " days" : isES ? " días" : " dias", desc: isEN ? "Guarantee on every professional" : isES ? "Garantía en todo profesional" : "Garantia em todo profissional" },
      { target: 8, prefix: "<", suffix: "%", desc: isEN ? "Churn of our clients" : isES ? "Churn de nuestros clientes" : "Churn dos nossos clientes" },
    ];
  };

const CountUp = ({ target, prefix, suffix }: { target: number; prefix: string; suffix: string }) => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const runCount = () => {
      const duration = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    runCount();
    const interval = setInterval(() => {
      setValue(0);
      runCount();
    }, 5000);

    return () => clearInterval(interval);
  }, [visible, target]);

  return (
    <span ref={ref} className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight inline-block">
      {prefix}{value}<span className="text-base sm:text-lg md:text-xl font-medium">{suffix}</span>
    </span>
  );
};

  const stats = getStats();

  return (
    <section className="bg-surface py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-4">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <CountUp target={s.target} prefix={s.prefix} suffix={s.suffix} />
            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 sm:mt-2 leading-snug">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
