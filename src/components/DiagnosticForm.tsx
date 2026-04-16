import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const DiagnosticLeftSide = () => {
  const { t } = useTranslation();
  const headlines = t("diagnostic.headlines", { returnObjects: true }) as string[];
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = headlines[currentHeadline];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < text.length) {
      timeout = setTimeout(() => setDisplayText(text.slice(0, displayText.length + 1)), 40);
    } else if (!isDeleting && displayText.length === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), 3000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(text.slice(0, displayText.length - 1)), 25);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentHeadline]);

  return (
    <div>
      <div className="inline-block mb-6">
        <span className="px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-medium">
          {t("diagnostic.badge")}
        </span>
      </div>

      <h2
        className="font-light tracking-tight text-foreground mb-4"
        style={{ fontSize: "clamp(26px, 4vw, 40px)", minHeight: "7rem", whiteSpace: "pre-wrap", overflow: "visible" }}
      >
        {displayText}
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-1 animate-pulse align-middle" />
      </h2>

      <p className="text-base text-muted-foreground mb-8 leading-relaxed" style={{ whiteSpace: "pre-line" }}>
        {t("diagnostic.description")}
      </p>

      {/* Value Propositions */}
      <div className="space-y-5 mb-10">
        {[
          { title: t("diagnostic.values.v1Title"), desc: t("diagnostic.values.v1Desc") },
          { title: t("diagnostic.values.v2Title"), desc: t("diagnostic.values.v2Desc") },
          { title: t("diagnostic.values.v3Title"), desc: t("diagnostic.values.v3Desc") },
        ].map((item, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-sm font-bold">✓</span>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div className="bg-muted/50 rounded-xl p-6 border border-border shadow-sm">
        <p className="text-sm text-muted-foreground mb-4 italic">
          "{t("diagnostic.testimonial.quote")}"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20" />
          <div>
            <p className="font-semibold text-foreground text-sm">{t("diagnostic.testimonial.name")}</p>
            <p className="text-xs text-muted-foreground">{t("diagnostic.testimonial.role")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DiagnosticForm = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    site: "",
    receita: "",
    prazo: ""
  });
  const [loading, setLoading] = useState(false);

  const receitas = t("diagnostic.revenueOptions", { returnObjects: true }) as string[];
  const prazos = t("diagnostic.timelineOptions", { returnObjects: true }) as string[];

  const isFormValid = () => {
    return form.nome.trim() !== "" &&
           form.whatsapp.trim() !== "" &&
           form.email.trim() !== "" &&
           form.receita.trim() !== "" &&
           form.prazo.trim() !== "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert(t("diagnostic.validationError"));
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("tipo", "diagnostico");
      formData.append("nome", form.nome);
      formData.append("whatsapp", form.whatsapp);
      formData.append("email", form.email);
      formData.append("site", form.site);
      formData.append("receita", form.receita);
      formData.append("prazo", form.prazo);
      formData.append("data", new Date().toLocaleString("pt-BR"));

      await fetch(
        "https://script.google.com/macros/s/AKfycbwEZzYmt9bIcHvKFWFkaNi08xB3_dkh9wdazVAh_06FcBUk2h4c7xL7h3hXtnElPccx/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );

      // Qualification: first revenue option (below 80k) → not qualified
      const revenueOptions = t("diagnostic.revenueOptions", { returnObjects: true }) as string[];
      const isLowRevenue = form.receita === revenueOptions[0];
      const hasNoSite = !form.site || form.site.trim() === "";
      
      if (isLowRevenue || hasNoSite) {
        navigate("/nao-qualificado");
      } else {
        navigate("/obrigado");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert(i18n.language === 'pt-BR' || i18n.language === 'pt-PT'
        ? "Ocorreu um erro. Tente novamente."
        : i18n.language === 'en'
        ? "An error occurred. Please try again."
        : "Ocurrió un error. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-20 sm:py-28 md:py-36 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Grid 2 colunas */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:items-center">
          {/* Lado esquerdo - Conteúdo */}
          <DiagnosticLeftSide />

          {/* Lado direito - Formulário ou Mensagem de Sucesso com Flip Animation */}
          <div className="w-full flex justify-center">
            <div className="bg-primary rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md xl:max-w-sm">
                <form onSubmit={handleSubmit} className="w-full">
            <div className="space-y-5">
              {/* Nome */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  {t("diagnostic.fields.name")}
                </label>
                <input
                  type="text"
                  placeholder={i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Informe seu nome completo" :
                               i18n.language === 'en' ? "Enter your full name" : "Ingresa tu nombre completo"}
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full rounded-lg border-2 border-white/50 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white transition-colors"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  {t("diagnostic.fields.whatsapp")}
                </label>
                <input
                  type="tel"
                  placeholder="(00) 9 0000-0000"
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
                  className="w-full rounded-lg border-2 border-white/50 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  {t("diagnostic.fields.email")}
                </label>
                <input
                  type="email"
                  placeholder={i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "seu@email.com" :
                               i18n.language === 'en' ? "your@email.com" : "tu@email.com"}
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border-2 border-white/50 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white transition-colors"
                />
              </div>


              {/* Site */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Site da empresa" :
                   i18n.language === 'en' ? "Company website" : "Sitio web de la empresa"}
                  <span className="text-white/50 font-normal ml-1">{i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "(opcional)" :
                   i18n.language === 'en' ? "(optional)" : "(opcional)"}</span>
                </label>
                <input
                  type="url"
                  placeholder="https://suaempresa.com.br"
                  value={form.site}
                  onChange={(e) => setForm({ ...form, site: e.target.value })}
                  className="w-full rounded-lg border-2 border-white/50 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  {t("diagnostic.fields.revenue")}
                </label>
                <select
                  required
                  value={form.receita}
                  onChange={(e) => setForm({ ...form, receita: e.target.value })}
                  className="w-full rounded-lg border-2 border-white/50 bg-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white appearance-none cursor-pointer transition-colors"
                >
                  <option value="" className="bg-background text-foreground">
                    {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Faturamento" :
                     i18n.language === 'en' ? "Revenue" : "Ingresos"}
                  </option>
                  {receitas.map((receita) => (
                    <option key={receita} value={receita} className="bg-background text-foreground">
                      {receita}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prazo */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  {t("diagnostic.fields.timeline")}
                </label>
                <select
                  required
                  value={form.prazo}
                  onChange={(e) => setForm({ ...form, prazo: e.target.value })}
                  className="w-full rounded-lg border-2 border-white/50 bg-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white appearance-none cursor-pointer transition-colors"
                >
                  <option value="" className="bg-background text-foreground">
                    {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Selecione o prazo" :
                     i18n.language === 'en' ? "Select timeline" : "Selecciona plazo"}
                  </option>
                  {prazos.map((prazo) => (
                    <option key={prazo} value={prazo} className="bg-background text-foreground">
                      {prazo}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botão */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-white text-primary px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? "Enviando..." :
                            i18n.language === 'en' ? "Sending..." : "Enviando...") : t("diagnostic.button")}
                <span className="text-lg">→</span>
              </button>

              {/* Informação de privacidade */}
              <p className="text-xs text-white text-center mx-auto leading-relaxed max-w-xs">
                {i18n.language === 'pt-BR' || i18n.language === 'pt-PT' ? (
                  <>
                    Seus dados estão 100% seguros.<br />
                    Não compartilhamos com terceiros.
                  </>
                ) : i18n.language === 'en' ? (
                  <>
                    Your data is 100% safe.<br />
                    We don't share with third parties.
                  </>
                ) : (
                  <>
                    Tus datos están 100% seguros.<br />
                    No compartimos con terceros.
                  </>
                )}
              </p>
            </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticForm;
