import { CheckCircle2, Instagram, Linkedin, Globe } from "lucide-react";
import { motion } from "framer-motion";
import logo29Tech from "@/assets/logo-29tech.png";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          <img src={logo29Tech} alt="29Tech" className="h-8" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center space-y-12">
          {/* Confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
              Projeto Qualificado<br />com Sucesso!
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Com base nas informações enviadas,<br className="hidden sm:inline" /> sua empresa preenche os requisitos para<br className="hidden sm:inline" /> o modelo de aceleração da 29Tech.<br /><br className="sm:hidden" /> Você acaba de dar o primeiro passo para ter<br className="hidden sm:inline" /> seu software personalizado pronto em <strong className="text-foreground">30 dias</strong>.
            </p>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface rounded-2xl p-6 sm:p-8 border border-border"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
              Próximos Passos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nosso time de especialistas analisará<br className="hidden sm:inline" /> os detalhes técnicos do seu desafio.<br /><br className="sm:hidden" /> Entraremos em contato diretamente via WhatsApp<br className="hidden sm:inline" /> nas próximas <strong className="text-foreground">24h</strong> para agendar sua{" "}
              <strong className="text-primary">Reunião 01 de Briefing</strong>.
            </p>
          </motion.div>

          {/* Social Proof / Authority */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              Enquanto aguarda nosso contato,<br /> conheça mais sobre nossa<br className="sm:hidden" /> tecnologia e cultura:
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/vintenove.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>

              <a
                href="https://www.linkedin.com/company/vintenove/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>

              <a
                href="https://vintenove.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
              >
                <Globe className="w-5 h-5" />
                Site Oficial
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Termos de Uso
            </a>
          </div>
          <span>Copyright © 2026 29Tech. Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  );
};

export default ThankYou;
