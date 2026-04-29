import { Gift, Instagram, Linkedin, Globe, Download, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import logo29Tech from "@/assets/logo-29tech-orange.png";

const NotQualified = () => {
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

          {/* Ícone e headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-10 h-10 text-primary" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
              Obrigado pelo interesse!
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              O Workshop <strong className="text-foreground">Bastidores da IA</strong> é um evento focado em empresários com operações em estágio avançado, onde a implementação de IA gera impacto financeiro direto e imediato. Por isso, selecionamos os participantes com cuidado para garantir a melhor experiência a todos.
            </p>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              No momento, o seu perfil ainda não se encaixa nos critérios do evento — mas isso não é um "não" para sempre. 🚀
            </p>
          </motion.div>

          {/* Presente — Material PDF */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 space-y-4"
          >
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Gift className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Um presente da 29Tech pra você 🎁
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Preparamos um material exclusivo de introdução ao <strong className="text-foreground">Vibe Coding</strong> — a metodologia que está revolucionando o desenvolvimento com IA. É totalmente gratuito e vai te ajudar a entender como usar IA na prática para criar produtos digitais.
            </p>
            <a
              href="/material-vibe-coding-29tech.pdf"
              download="Material de Apoio - Bastidores da IA - 29Tech.pdf"
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-bold text-sm sm:text-base hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,68,0,0.3)] hover:scale-[1.02]"
            >
              <Download className="w-5 h-5 flex-shrink-0" />
              BAIXAR MATERIAL GRATUITO
              <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Redes sociais */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                Nos acompanhe nas redes sociais
              </h2>
              <p className="text-sm text-muted-foreground">
                Publicamos conteúdo sobre IA, Vibe Coding e tecnologia toda semana. Adicione a gente e fique por dentro!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://www.instagram.com/vintenove.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-all w-full sm:w-auto justify-center"
              >
                <Instagram className="w-4 h-4" /> @vintenove.co
              </a>
              <a
                href="https://www.linkedin.com/company/vintenove/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-all w-full sm:w-auto justify-center"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn 29Tech
              </a>
              <a
                href="https://vintenove.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-all w-full sm:w-auto justify-center"
              >
                <Globe className="w-4 h-4" /> vintenove.com
              </a>
            </div>
          </motion.div>

          {/* Mensagem final */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              Quando sua operação crescer, ficaremos felizes em ter você em um dos nossos próximos eventos. Até lá, continue evoluindo! 💪
            </p>
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

export default NotQualified;
