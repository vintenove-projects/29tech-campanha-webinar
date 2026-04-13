# Arquitetura — 29Tech Website

## Visão Geral

Site institucional da **29Tech**, empresa de outsourcing e alocação de desenvolvedores. Desenvolvido em React com TypeScript, com foco em performance, SEO e internacionalização.

**URL de produção:** https://www.vintenove.com
**Repositório:** github.com/vintenove-projects/vintenove
**Hospedagem:** Lovable (com deploy automático via GitHub)

---

## Stack Tecnológico

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Estilo | Tailwind CSS |
| Animações | Framer Motion |
| Roteamento | React Router DOM v6 |
| Internacionalização | react-i18next |
| Componentes UI | shadcn/ui (Radix UI) |
| Banco de dados | Supabase (PostgreSQL) |
| Gerência de estado assíncrono | TanStack Query (React Query) |
| Formulário de diagnóstico | Google Apps Script → Google Sheets |
| CI/CD | GitHub Actions |

---

## Estrutura de Arquivos

```
vintenove/
├── public/
│   ├── _redirects          # Redirecionamento SPA para Netlify
│   ├── sitemap.xml         # Sitemap para SEO
│   └── robots.txt
├── src/
│   ├── assets/             # Imagens e recursos estáticos
│   ├── components/         # Componentes React
│   │   ├── ui/             # Componentes base do shadcn/ui
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── DiagnosticForm.tsx
│   │   ├── EntryPoints.tsx
│   │   ├── OutsourcingSection.tsx
│   │   ├── DarkSection.tsx
│   │   ├── SoftwareHouseSection.tsx
│   │   ├── Testimonials.tsx
│   │   ├── TechMarquee.tsx
│   │   ├── StatsBar.tsx
│   │   ├── FAQ.tsx
│   │   ├── Footer.tsx
│   │   ├── NewArticleModal.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── LoadingScreen.tsx
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts   # Instância do cliente Supabase
│   │       └── types.ts    # Tipos gerados pelo Supabase
│   ├── locales/            # Arquivos de tradução
│   │   ├── pt-BR.json
│   │   ├── pt-PT.json
│   │   ├── en.json
│   │   └── es.json
│   ├── pages/
│   │   ├── Index.tsx       # Homepage
│   │   ├── Blog.tsx        # Listagem de artigos
│   │   ├── ArticlePage.tsx # Artigo individual
│   │   └── NotFound.tsx    # Página 404
│   ├── services/
│   │   └── articleService.ts  # Camada de acesso a dados do blog
│   ├── App.tsx             # Roteamento principal
│   ├── main.tsx            # Entry point
│   ├── i18n.ts             # Configuração de internacionalização
│   └── index.css           # Estilos globais e design tokens
├── .github/
│   └── workflows/
│       └── keep-supabase-alive.yml  # Ping automático no Supabase
├── vercel.json             # Redirecionamento SPA para Vercel
├── index.html              # HTML base com meta tags e schema SEO
└── vite.config.ts
```

---

## Páginas e Rotas

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | `Index.tsx` | Homepage com todos os blocos |
| `/blog` | `Blog.tsx` | Listagem de artigos do blog |
| `/blog/:id` | `ArticlePage.tsx` | Artigo individual |
| `*` | `NotFound.tsx` | Página 404 |

---

## Componentes da Homepage (em ordem)

```
Navbar
Hero               ← Animação de partículas canvas + typing animation
StatsBar           ← Números/métricas da empresa
EntryPoints        ← 3 cards de entrada (outsourcing, alocação, software house)
OutsourcingSection ← Seção de outsourcing com flip 3D
DarkSection        ← Seção escura com CTA
SoftwareHouseSection
TechMarquee        ← Carrossel de logos de tecnologias
Testimonials       ← Depoimentos de clientes
DiagnosticForm     ← Formulário de diagnóstico (id="contato")
FAQ                ← Perguntas frequentes com accordion
Footer
```

> Todos os botões de CTA do site apontam para `#contato`, que é o `id` do `DiagnosticForm`.

---

## Internacionalização (i18n)

O site suporta **4 idiomas** via `react-i18next`:

| Código | Idioma |
|--------|--------|
| `pt-BR` | Português (Brasil) — padrão |
| `pt-PT` | Português (Portugal) |
| `en` | Inglês |
| `es` | Espanhol |

- Configuração em `src/i18n.ts`
- Traduções em `src/locales/*.json`
- Seletor de idioma no `Navbar` via `LanguageSwitcher.tsx`
- Detecção automática pelo navegador

---

## Formulário de Diagnóstico

**Arquivo:** `src/components/DiagnosticForm.tsx`

O formulário coleta:
- Nome
- WhatsApp
- Email Corporativo
- Faturamento Anual (4 faixas)
- Prazo para início

**Envio:** via `fetch` para um endpoint do **Google Apps Script**, que grava os dados em uma **Google Sheets**.

**Validação:** todos os campos são obrigatórios. O botão de envio só é ativado quando todos estão preenchidos.

**Animação:** 3D flip (Framer Motion + `rotateY`) entre o formulário e a mensagem de sucesso.

**Headlines rotativas:** 3 textos com efeito de typing animation (digitação/apagamento).

---

## Blog

### Arquitetura do Blog

```
Blog.tsx (listagem)
  └── articleService.ts (camada de dados)
        └── Supabase (banco de dados)
              └── localStorage (cache/fallback)

ArticlePage.tsx (artigo individual)
  └── articleService.ts
        └── Supabase / localStorage

NewArticleModal.tsx (criação de artigos)
  └── articleService.ts → Supabase
```

### Banco de Dados — Supabase

**Projeto:** `vintenove-blog`
**URL:** `https://hasjrjwhlmwpzuavrqwa.supabase.co`

**Tabela `articles`:**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | uuid | Chave primária gerada automaticamente |
| `title` | text | Título do artigo |
| `body` | text | Conteúdo HTML do artigo |
| `image_url` | text | URL ou base64 da imagem de capa |
| `image_source` | text | Crédito da imagem |
| `author_name` | text | Nome do autor |
| `author_instagram` | text | @ do Instagram do autor |
| `hashtags` | text[] | Array de hashtags |
| `created_at` | timestamptz | Data de criação (automática) |

**Row Level Security (RLS):**
- Leitura pública (`select` liberado para todos)
- Inserção pública (`insert` liberado para todos)

### Cache e Fallback

O `articleService.ts` implementa cache em `localStorage`:
1. Busca artigos no Supabase
2. Se sucesso → salva no `localStorage` como cache
3. Se falhar → usa o cache do `localStorage`
4. Garante que o blog nunca quebra, mesmo sem conexão

### Criação de Artigos

Feita pelo `NewArticleModal.tsx`, acessível via botão no `Footer`. O modal possui:
- Upload de imagem de capa (salva como base64)
- Editor de texto rico (execCommand: bold, italic, listas, subtítulos)
- Campos de autor e Instagram
- Adição manual de hashtags
- Salvamento direto no Supabase

---

## SEO

### On-page
- `<title>` e `<meta description>` otimizados em `index.html`
- H1 visível somente para leitores de tela (`sr-only`) com keywords em `Hero.tsx`
- H2 sr-only em `OutsourcingSection`, `DarkSection`
- `title` attributes em todos os links e botões de CTA

### Schema Markup (JSON-LD em index.html)
- `Organization`
- `LocalBusiness` (com endereço e coordenadas de Campinas/SP)
- `Service` × 2 (Outsourcing de Desenvolvimento, Alocação de Profissionais Tech)
- `FAQPage`

### Sitemap
`public/sitemap.xml` com todas as rotas e prioridades:
- `/` → prioridade 1.0
- `/#contato` → prioridade 0.9
- `/#como-funciona`, `/#servicos`, `/#clientes` → prioridade 0.8 / 0.7

---

## Navbar

**Arquivo:** `src/components/Navbar.tsx`

- Fixa no topo (`fixed top-0 z-50`)
- **Transparente** enquanto o usuário está na seção Hero
- **Sólida** (cor primary) ao rolar além da Hero
- Na página `/blog`: fica sólida ao sair da Hero do blog (60vh)
- Na homepage: fica sólida após 85% da altura da viewport
- Menu mobile com hambúrguer

---

## Automação — GitHub Actions

**Arquivo:** `.github/workflows/keep-supabase-alive.yml`

Roda automaticamente a cada **5 dias** (cron `0 8 */5 * *`) e faz um ping na API do Supabase para evitar que o projeto seja pausado pelo plano gratuito.

**Segredos configurados no GitHub:**
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

---

## Variáveis de Ambiente

Arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_PROJECT_ID="hasjrjwhlmwpzuavrqwa"
VITE_SUPABASE_URL="https://hasjrjwhlmwpzuavrqwa.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="<anon key>"
```

> O arquivo `.env` **não deve ser commitado** no repositório.

---

## Deploy

- **Branch principal:** `main`
- **Deploy automático:** qualquer push na `main` dispara deploy via Lovable
- **Redirecionamento SPA:** `public/_redirects` (Netlify) e `vercel.json` garantem que rotas como `/blog` funcionem ao dar F5

---

## Dependências Principais

```json
{
  "react": "^18",
  "react-router-dom": "^6",
  "framer-motion": "última",
  "react-i18next": "última",
  "@tanstack/react-query": "última",
  "@supabase/supabase-js": "última",
  "tailwindcss": "última",
  "date-fns": "última",
  "lucide-react": "última",
  "sonner": "última"
}
```
