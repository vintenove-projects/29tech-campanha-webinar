import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo-29tech.png";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for home page to render, then scroll
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: t("navbar.services"), href: "#servicos" },
    { label: t("navbar.how_it_works"), href: "#como-funciona" },
    { label: t("navbar.clients"), href: "#clientes" },
    { label: t("navbar.blog"), href: "/blog", isRoute: true },
  ];

  useEffect(() => {
    const onScroll = () => {
      if (location.pathname === "/blog") {
        // Na página blog, a hero tem 60vh, então fica sólida quando sai dela
        const blogHeroHeight = window.innerHeight * 0.6;
        setScrolled(window.scrollY > blogHeroHeight);
      } else {
        // Na home, usa a lógica original (85% da altura da viewport)
        const heroHeight = window.innerHeight * 0.85;
        setScrolled(window.scrollY > heroHeight);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "hsl(var(--primary))" : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
          <img
            src={logo}
            alt="29Tech"
            className="h-10 transition-all duration-300"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (link.isRoute) {
                  e.preventDefault();
                  navigate(link.href);
                } else {
                  handleNavClick(e, link.href);
                }
              }}
              className="text-sm font-bold transition-colors duration-300"
              style={{ color: "rgba(255,255,255,1)" }}
              title={`${link.label} - 29Tech`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contato"
            onClick={(e) => handleNavClick(e, "#contato")}
            className="inline-flex items-center justify-center rounded-full border-2 border-primary-foreground px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300"
            title="Agendar diagnóstico gratuito de outsourcing"
          >
            {t("darkSection.cta")}
          </a>
          <LanguageSwitcher />
        </div>

        <button
          className="md:hidden transition-colors duration-300"
          style={{ color: scrolled ? "white" : "white" }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden border-t px-6 py-6 flex flex-col gap-4 transition-colors duration-300"
          style={{
            backgroundColor: scrolled ? "hsl(var(--primary))" : "hsl(var(--background))",
            borderColor: scrolled ? "rgba(255,255,255,0.2)" : "hsl(var(--border))",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base transition-colors"
              style={{ color: scrolled ? "rgba(255,255,255,0.9)" : "hsl(var(--muted-foreground))" }}
              onClick={(e) => {
                if (link.isRoute) {
                  e.preventDefault();
                  navigate(link.href);
                } else {
                  handleNavClick(e, link.href);
                }
                setMobileOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="#contato"
              className="flex-1 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium"
              style={{
                backgroundColor: scrolled ? "white" : "hsl(var(--primary))",
                color: scrolled ? "hsl(var(--primary))" : "white",
              }}
              onClick={(e) => { handleNavClick(e, "#contato"); setMobileOpen(false); }}
            >
              {t("darkSection.cta")}
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
