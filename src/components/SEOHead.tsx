import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  keywords?: string[];
}

export const SEOHead = ({
  title,
  description,
  image = 'https://lpsoftware.vintenove.com/og-image.png',
  url = 'https://lpsoftware.vintenove.com/',
  type = 'website',
  author = '29Tech',
  keywords = []
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update/create meta tags
    const updateMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const updateProperty = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Standard meta tags
    updateMeta('description', description);
    updateMeta('author', author);
    if (keywords.length > 0) {
      updateMeta('keywords', keywords.join(', '));
    }
    updateMeta('viewport', 'width=device-width, initial-scale=1.0');
    updateMeta('theme-color', '#ff6b35');

    // Open Graph
    updateProperty('og:type', type);
    updateProperty('og:url', url);
    updateProperty('og:title', title);
    updateProperty('og:description', description);
    updateProperty('og:image', image);
    updateProperty('og:image:width', '1200');
    updateProperty('og:image:height', '630');
    updateProperty('og:locale', 'pt_BR');
    updateProperty('og:site_name', '29Tech');

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);
    updateMeta('twitter:site', '@vintenove');

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

  }, [title, description, image, url, type, author, keywords]);

  return null;
};

export default SEOHead;
