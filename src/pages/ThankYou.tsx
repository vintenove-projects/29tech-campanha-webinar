import { CheckCircle2, Instagram, Linkedin, Globe, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import logo29Tech from "@/assets/logo-29tech-orange.png";

const WHATSAPP_GROUP = "https://chat.whatsapp.com/EP7EtMVfkBFIBAZpgvf2Ja";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>

      {/* Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          <img src={logo29Tech} alt="29Tech" className="h-10 sm:h-14" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="max-w-2xl w-full text-center space-y-8">

          {/* Confirmação */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
              Você foi selecionado!
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Parabéns! Sua inscrição foi confirmada para o{" "}
              <strong className="text-foreground">Workshop Bastidores da IA</strong>.{" "}
              Agora é só entrar no nosso grupo exclusivo no WhatsApp para receber o material da aula, o link de acesso e todos os avisos importantes.
            </p>
          </motion.div>

          {/* CTA Principal — Grupo WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <a
              href={WHATSAPP_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-5 rounded-full bg-primary text-white font-bold text-base sm:text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,68,0,0.35)] hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              ENTRAR NO GRUPO EXCLUSIVO
              <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              Grupo no WhatsApp · Material da aula · Avisos e link de acesso
            </p>
          </motion.div>

          {/* O que esperar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-primary/5 border border-primary/15 rounded-2xl p-6 sm:p-8 text-left space-y-4"
          >
            <h2 className="text-lg sm:text-xl font-bold text-foreground text-center">
              O que você vai receber no grupo
            </h2>
            <ul className="space-y-3">
              {[
                "Material exclusivo da aula (PDF + Framework 29Tech de IA)",
                "Link de acesso ao workshop ao vivo",
                "Avisos e lembretes antes do evento",
                "Acesso direto para tirar dúvidas com nossos especialistas",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Redes sociais */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="space-y-4"
          >
            <p className="text-sm text-muted-foreground">
              Enquanto isso, conheça mais sobre a 29Tech:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://www.instagram.com/vintenove.co/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-all w-full sm:w-auto justify-center">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              <a href="https://www.linkedin.com/company/vintenove/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-all w-full sm:w-auto justify-center">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href="https://vintenove.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-all w-full sm:w-auto justify-center">
                <Globe className="w-4 h-4" /> Site Oficial
              </a>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
          </div>
          <span>© {new Date().getFullYear()} 29Tech. Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  );
};

export default ThankYou;
