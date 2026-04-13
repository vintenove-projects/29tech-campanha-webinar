import { useTranslation } from "react-i18next";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const Testimonials = () => {
  const { t } = useTranslation();
  const clients = t("testimonials.clients", { returnObjects: true }) as TestimonialItem[];

  return (
    <section id="clientes" className="py-20 sm:py-28 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2
          className="font-light tracking-tight text-foreground mb-10 sm:mb-16"
          style={{ fontSize: "clamp(26px, 4vw, 48px)" }}
        >
          {t("testimonials.title")}
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {clients.map((item, i) => (
            <div
              key={i}
              className="bg-background border border-border rounded-[20px] p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-sm sm:text-base text-foreground leading-relaxed mb-6 sm:mb-8">
                "{item.quote}"
              </p>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.role} · {item.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
