import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo-29tech.png";
import NewArticleModal from "./NewArticleModal";

const Footer = () => {
  const { t } = useTranslation();
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const location = useLocation();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopyrightClick = () => {
    if (location.pathname !== "/blog") return;

    clickCountRef.current += 1;

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      setArticleModalOpen(true);
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 1000);
    }
  };

  return (
    <>
      <footer className="bg-foreground py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:justify-between">
          <a href="#">
            <img src={logo} alt="29Tech" className="h-7 sm:h-8 brightness-0 invert" />
          </a>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {[
              { key: "services", label: t("navbar.services"), href: "#servicos" },
              { key: "how_it_works", label: t("navbar.how_it_works"), href: "#como-funciona" },
              { key: "clients", label: t("navbar.clients"), href: "#clientes" },
              { key: "blog", label: t("navbar.blog"), href: "#blog" },
            ].map((l) => (
              <a
                key={l.key}
                href={l.href}
                className="text-xs sm:text-sm text-background/60 hover:text-background transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <a
              href={`mailto:${t("footer.email")}`}
              className="text-xs sm:text-sm text-background/60 hover:text-background transition-colors"
            >
              {t("footer.email")}
            </a>

            <div className="flex gap-6">
              <a
                href="https://www.instagram.com/vintenove.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-background/60 hover:text-background transition-colors font-medium"
              >
                {t("footer.instagram")}
              </a>

              <a
                href="https://www.linkedin.com/company/vintenove"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-background/60 hover:text-background transition-colors font-medium"
              >
                {t("footer.linkedin")}
              </a>

              <a
                href="https://www.facebook.com/vintenove.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-background/60 hover:text-background transition-colors font-medium"
              >
                {t("footer.facebook")}
              </a>
            </div>

            <button
              onClick={handleCopyrightClick}
              className="text-xs sm:text-sm text-background/50 mt-2 transition-colors bg-transparent border-none select-none"
              style={{ cursor: location.pathname === "/blog" ? "pointer" : "default" }}
            >
              {t("footer.copyright")}
            </button>
          </div>
        </div>
      </footer>

      <NewArticleModal open={articleModalOpen} onOpenChange={setArticleModalOpen} onArticleSaved={() => window.location.reload()} />
    </>
  );
};

export default Footer;
