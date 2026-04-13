import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Footer from "@/components/Footer";
import { ptBR as datePtBR, enUS, es as esLocale } from "date-fns/locale";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-29tech.png";
import { getArticleById } from "@/services/articleService";

const ArticleNavbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
          <img src={logo} alt="29Tech" className="h-10" style={{ filter: "brightness(0) invert(1)" }} />
        </a>
        <a
          href="#contato"
          onClick={handleContactClick}
          className="inline-flex items-center justify-center rounded-full border-2 border-primary-foreground px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300"
        >
          {t("darkSection.cta")}
        </a>
      </div>
    </nav>
  );
};

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dateLocale = i18n.language === "en" ? enUS : i18n.language === "es" ? esLocale : datePtBR;

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ArticleNavbar />
        <div className="pt-24 max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="h-12 w-full bg-muted rounded animate-pulse" />
          <div className="aspect-video bg-muted rounded-2xl animate-pulse" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 w-full bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <ArticleNavbar />
        <div className="pt-24 text-center py-20">
          <p className="text-muted-foreground text-lg">{t("blog.notFound")}</p>
          <Button variant="ghost" className="mt-4" onClick={() => navigate("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> {t("blog.back")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ArticleNavbar />
      <article className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Button
            variant="ghost"
            className="mb-8 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/blog")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> {t("blog.back")}
          </Button>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-col gap-1 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">{article.author_name}</span>
              {article.author_instagram && (
                <span className="text-sm text-muted-foreground">{article.author_instagram}</span>
              )}
            </div>
            <time className="text-sm text-muted-foreground">
              {format(new Date(article.created_at), "dd 'de' MMMM 'de' yyyy", { locale: dateLocale })}
            </time>
          </div>

          {article.image_url && (
            <div className="mb-8">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full rounded-2xl object-cover aspect-video"
              />
              {article.image_source && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {t("blog.source")}: {article.image_source}
                </p>
              )}
            </div>
          )}

          <div
            className="prose prose-lg max-w-none text-foreground
              prose-headings:text-foreground prose-p:text-foreground
              prose-strong:text-foreground prose-a:text-primary
              prose-ul:text-foreground prose-ol:text-foreground
              prose-li:text-foreground prose-blockquote:text-muted-foreground
              prose-blockquote:border-primary"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {article.hashtags && article.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
              {article.hashtags.map((tag: string, i: number) => (
                <span key={i} className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default ArticlePage;
