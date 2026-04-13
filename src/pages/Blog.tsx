import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getArticles } from "@/services/articleService";

const BlogHero = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const prefersReduced = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    section.addEventListener("mousemove", handleMouse);
    section.addEventListener("mouseleave", handleLeave);

    const spacing = 24;
    const attractRadius = 200;
    const attractStrength = 15;
    const springFactor = 0.06;

    interface Dot {
      baseX: number; baseY: number; cx: number; cy: number;
      vx: number; vy: number; phase: number; speed: number;
    }

    let dots: Dot[] = [];
    const buildDots = () => {
      dots = [];
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          dots.push({
            baseX: x, baseY: y, cx: x, cy: y,
            vx: 0, vy: 0,
            phase: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.4,
          });
        }
      }
    };
    buildDots();
    window.addEventListener("resize", buildDots);

    let animId: number;
    let time = 0;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.016;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const reduced = prefersReduced.current;

      for (const dot of dots) {
        const driftX = reduced ? 0 : Math.sin(time * dot.speed * 2 + dot.phase) * 18 + Math.cos(time * 0.6 + dot.baseY * 0.03) * 12;
        const driftY = reduced ? 0 : Math.cos(time * dot.speed * 1.5 + dot.phase) * 18 + Math.sin(time * 0.8 + dot.baseX * 0.03) * 12;

        const targetX = dot.baseX + driftX;
        const targetY = dot.baseY + driftY;

        const dx = dot.cx - mx;
        const dy = dot.cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let attractX = 0;
        let attractY = 0;
        if (dist < attractRadius && dist > 0 && !reduced) {
          const force = (1 - dist / attractRadius) * attractStrength;
          attractX = -(dx / dist) * force;
          attractY = -(dy / dist) * force;
        }

        dot.vx += (targetX + attractX - dot.cx) * springFactor;
        dot.vy += (targetY + attractY - dot.cy) * springFactor;
        dot.vx *= 0.85;
        dot.vy *= 0.85;
        dot.cx += dot.vx;
        dot.cy += dot.vy;

        const distFromMouse = Math.sqrt((dot.cx - mx) ** 2 + (dot.cy - my) ** 2);
        const proximity = Math.max(0, 1 - distFromMouse / attractRadius);
        const size = 2 + proximity * 5;

        ctx.beginPath();
        ctx.arc(dot.cx, dot.cy, size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 229, 213, 0.25)";
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", buildDots);
      section.removeEventListener("mousemove", handleMouse);
      section.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 px-4"
      style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(13 78% 50%) 100%)" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1] block" style={{ display: "block" }} />
      <div className="relative z-[2] max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1
          className="font-light leading-[1.05] tracking-tight text-primary-foreground mb-4"
          style={{ fontSize: "clamp(36px, 8vw, 72px)" }}
        >
          {t("blog.title")}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
          {t("blog.subtitle")}
        </p>
      </div>
    </section>
  );
};

interface Article {
  id: string;
  title: string;
  body: string;
  image_url: string | null;
  image_source: string | null;
  author_name: string;
  author_instagram: string | null;
  hashtags: string[] | null;
  created_at: string;
}

const ArticleCard = ({ article }: { article: Article }) => {
  const navigate = useNavigate();
  const excerpt = article.body
    .replace(/<[^>]*>/g, "")
    .substring(0, 200)
    .trim();

  return (
    <article
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/blog/${article.id}`)}
    >
      {article.image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6 space-y-3">
        <time className="text-xs text-muted-foreground">
          {format(new Date(article.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </time>
        <h2 className="text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
          {article.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {excerpt}...
        </p>
        <div className="flex items-center gap-2 pt-2">
          <span className="text-sm font-medium text-foreground">{article.author_name}</span>
          {article.author_instagram && (
            <span className="text-xs text-muted-foreground">{article.author_instagram}</span>
          )}
        </div>
        {article.hashtags && article.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {article.hashtags.slice(0, 5).map((tag, i) => (
              <span key={i} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

const Blog = () => {
  const { t } = useTranslation();
  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BlogHero />
      <div className="py-16 sm:py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-muted rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        ) : articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">{t("blog.empty")}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
