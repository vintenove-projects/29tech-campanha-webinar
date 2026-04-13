import { supabase } from "@/integrations/supabase/client";

export interface Article {
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

const ARTICLES_LOCAL_KEY = "articles_local_cache";

const getLocalCache = (): Article[] => {
  try {
    const stored = localStorage.getItem(ARTICLES_LOCAL_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const setLocalCache = (articles: Article[]) => {
  try {
    localStorage.setItem(ARTICLES_LOCAL_KEY, JSON.stringify(articles));
  } catch {}
};

export const getArticles = async (): Promise<Article[]> => {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setLocalCache(data as Article[]);
      return data as Article[];
    }

    return getLocalCache();
  } catch {
    return getLocalCache();
  }
};

export const getArticleById = async (id: string): Promise<Article | null> => {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) return data as Article;

    return getLocalCache().find((a) => a.id === id) || null;
  } catch {
    return getLocalCache().find((a) => a.id === id) || null;
  }
};

export const saveArticle = async (article: Omit<Article, "id" | "created_at">): Promise<boolean> => {
  try {
    const { error } = await supabase.from("articles").insert(article);
    return !error;
  } catch {
    return false;
  }
};
