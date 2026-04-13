
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  image_url TEXT,
  image_source TEXT,
  author_name TEXT NOT NULL,
  author_instagram TEXT,
  hashtags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Articles are viewable by everyone"
  ON public.articles FOR SELECT USING (true);

CREATE POLICY "Anyone can create articles"
  ON public.articles FOR INSERT WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);

CREATE POLICY "Article images are publicly accessible"
  ON storage.objects FOR SELECT USING (bucket_id = 'article-images');

CREATE POLICY "Anyone can upload article images"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'article-images');
