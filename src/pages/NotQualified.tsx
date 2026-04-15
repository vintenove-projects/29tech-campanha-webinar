import { XCircle, Instagram, Linkedin, Globe } from "lucide-react";
import { motion } from "framer-motion";
import logo29Tech from "@/assets/logo-29tech-orange.png";

const NotQualified = () => {
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
          {/* Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <XCircle className="w-10 h-10 text-muted-foreground" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight text-balance">
              No momento, seu projeto não se enquadra no nosso modelo de aceleração de 30 dias.
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-md sm:max-w-xl mx-auto leading-relaxed text-balance">
              Nossa metodologia de desenvolvimento ultra-rápido é otimizada para empresas em um estágio específico de operação e escala. Mas isso não significa que não podemos ajudar você a chegar lá.
            </p>
          </motion.div>

          {/* Value Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface rounded-2xl p-6 sm:p-8 border border-border"
          >
            <p className="text-muted-foreground leading-relaxed text-balance">
              Acreditamos que a tecnologia e a IA devem ser acessíveis para quem deseja escalar. Por isso, disponibilizamos materiais gratuitos, estudos de caso e insights de automação em nossas redes sociais para ajudar você a preparar sua operação para o próximo nível.
            </p>
          </motion.div>

          {/* Social / Resources */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-lg sm:text-xl font-bold text-foreground text-balance">
              Prepare sua empresa para o futuro com nossos conteúdos:
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://vintenove.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
              >
                <Globe className="w-5 h-5" />
                Artigos e Cases
              </a>

              <a
                href="https://www.instagram.com/vintenove.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
              >
                <Instagram className="w-5 h-5" />
                Dicas de Escala e IA
              </a>

              <a
                href="https://www.linkedin.com/company/vintenove/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
              >
                <Linkedin className="w-5 h-5" />
                Insights de Mercado
              </a>
            </div>
          </motion.div>

          {/* Closing Message */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed text-balance">
              Continue acompanhando a 29Tech. Assim que sua operação atingir o novo patamar, ficaremos felizes em reavaliar seu projeto para uma implementação de elite.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
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

export default NotQualified;
