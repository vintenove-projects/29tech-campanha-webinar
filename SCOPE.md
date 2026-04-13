# 29Tech — Escopo Completo do Site & Prompt de Recriação

## 📋 Visão Geral

Site institucional single-page da **29Tech**, empresa de tecnologia que oferece alocação de profissionais tech (outsourcing) e desenvolvimento de software sob demanda (software house). O site é voltado para empresas que precisam de tecnologia mas não possuem time interno.

**Stack:** React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion
**Fonte:** Bricolage Grotesque (Google Fonts)
**Cor primária:** `#FF3C00` (laranja intenso — HSL 14 100% 50%)
**Cor bordô:** HSL 338 100% 23%
**Estilo visual:** Minimalista editorial, fundo branco, tipografia grande e leve (font-light), cantos arredondados generosos (20px), animações canvas interativas.

---

## 🧩 Estrutura de Seções (ordem no layout)

### 1. Navbar (fixo no topo)
- Logo da 29Tech (imagem PNG) à esquerda
- Links de navegação: Serviços, Como funciona, Clientes, Blog
- Botão CTA: "Agendar diagnóstico" (rounded-full, bg-primary)
- Menu hambúrguer no mobile (ícones Menu/X do Lucide)
- Fundo `bg-background/95` com `backdrop-blur-sm`
- Altura: `h-20`, `z-50`

### 2. Hero (fullscreen)
- **Fundo:** Canvas com grid de dots (pontos) laranja (`rgba(255, 60, 0)`)
  - Dots em movimento autônomo contínuo (drift via sin/cos + requestAnimationFrame)
  - Repulsão ao mouse (raio 120px, spring easing)
  - Dots visíveis mesmo sem mouse (alpha base 0.06)
  - Canvas fica atrás do texto (z-[1]), texto em z-[2]
  - Mouse tracking na section inteira, não só no canvas
  - Botões mantêm `pointer-events-auto`
- **Título principal (H1):** "Tecnologia para o seu negócio." — `text-5xl` a `text-[80px]`, `font-light`
- **Texto digitado (typewriter):** "Preciso de [frase]" com cursor piscando
  - Frases rotativas: "um app sob medida.", "automação de processos.", "uma equipe de tech.", "um sistema escalável.", "integração com APIs."
  - Velocidade: 80ms digitando, 40ms apagando, 2s pausa no final, 400ms pausa entre frases
  - Cor primária, tamanho `text-2xl` a `text-4xl`
- **Subtítulo:** "A 29Tech desenvolve software sob demanda e aloca profissionais tech pré-validados para empresas que querem crescer — sem montar um time interno do zero."
- **CTAs:**
  - "Agendar diagnóstico gratuito" → `#contato` (bg-primary, rounded-full)
  - "Ver como funciona" → `#como-funciona` (border-2 border-foreground, rounded-full, hover inverte cores)

### 3. Stats Bar (barra de números)
- Fundo: `bg-surface` (cinza claro HSL 20 14% 96%)
- Grid 2 colunas mobile, 4 colunas desktop
- **4 métricas:**
  - `7 dias` — Profissional alocado em até 7 dias úteis
  - `+100` — Empresas atendidas
  - `90 dias` — Garantia em todo profissional
  - `<8%` — Churn dos nossos clientes
- **Animação:** CountUp de 0 ao valor final (1.2s, easing cúbico) ao entrar na viewport (IntersectionObserver threshold 0.5)
- **Loop:** Reinicia a contagem a cada 5 segundos enquanto visível
- Números em `text-primary`, `font-bold`, `text-3xl`/`text-4xl`

### 4. Entry Points ("Por onde você começa?")
- Fundo: `bg-background`
- Título H2: "Por onde você começa?" — `text-3xl`/`text-5xl`, `font-light`
- **3 cards em grid (md:grid-cols-3):**
  - Card 01: "Preciso de um time tech" — Alocação de especialistas
  - Card 02: "Preciso construir um produto" — Software House
  - Card 03: "Preciso de dados e IA" — IA e Dados
- **Estilo dos cards:**
  - `bg-surface`, `border border-border`, `rounded-[20px]`, padding `p-8`/`p-10`
  - Número do card em `text-primary` (01, 02, 03)
  - Link com seta (ArrowRight do Lucide)
- **Animação dos cards:**
  - Shimmer contínuo de sombra (Framer Motion `animate` com boxShadow loop 3s)
  - Hover: `translateY(-6px)` com spring + sombra maior
  - Linha laranja no topo: `scaleX(0→1)` no hover, `bg-primary`, `h-1`

### 5. Outsourcing Section ("Alocação de Especialistas Tech")
- Fundo: `bg-background`
- Layout: grid `md:grid-cols-5` — 2 colunas texto + 3 colunas visual
- **Texto (esquerda):**
  - Tag: "ALOCAÇÃO DE ESPECIALISTAS TECH" (uppercase, tracking wide, text-primary)
  - H2: "Time tech quando você precisa, sem os custos de manter um time fixo."
  - 3 passos numerados (1, 2, 3)
  - CTA: "Quero alocar um especialista" (bg-primary, rounded-full)
- **Visual (direita):**
  - Card container `bg-surface rounded-[24px]`
  - 3 profile cards com avatar (iniciais), nome, role
  - Tags: "disponível" (bg-primary/10) e "29Tech validado" (ícone CheckCircle)
  - Animação: shimmer de sombra contínuo + hover elevação

### 6. Dark Section (seção bordô)
- Fundo: `bg-bordeaux` (HSL 338 100% 23%)
- **Canvas de partículas brancas:**
  - 350 partículas flutuantes
  - Drift contínuo (velocidade base + random)
  - Scatter no mouse (raio 150px)
  - Tamanho: 1–3px, alpha: 0.06–0.18
  - Wrap around nas bordas
- **Texto (centralizado, branco):**
  - H2: "Você não precisa saber de tech. Precisa saber o que quer resolver."
  - Subtítulo: "Nosso time traduz o seu desafio de negócio em tecnologia..."
  - CTA: "Agendar diagnóstico gratuito" (bg-background, text-bordeaux)

### 7. Software House Section ("Tem uma ideia mas não tem time?")
- Fundo: `bg-surface`
- Layout: grid `md:grid-cols-5` — 3 colunas visual + 2 colunas texto
- **Visual (esquerda):**
  - Sprint Board mockup com 3 colunas: Backlog, Em progresso, Concluído
  - Janela fake com 3 dots coloridos (vermelho, laranja, laranja claro)
  - Cards de tarefas com animação de sombra contínua
- **Texto (direita):**
  - Tag: "SOFTWARE HOUSE"
  - H2: "Tem uma ideia mas não tem time para construir?"
  - CTA: "Quero desenvolver meu produto" (border-2 border-foreground, hover inverte)

### 8. Testimonials ("Empresas que cresceram com a 29Tech")
- Fundo: `bg-background`
- Grid `md:grid-cols-3`
- 3 depoimentos com quote, nome, cargo e empresa:
  - Iwry Rozemberg — CEO, ClickMenos
  - Rafael Tavares — CEO, Campori Online
  - João Batista — Diretor, IASD
- Cards: `border border-border`, `rounded-[20px]`, hover shadow

### 9. FAQ ("Perguntas frequentes")
- Fundo: `bg-background`
- Max-width: `max-w-3xl`
- Componente Accordion (Radix UI) com 5 perguntas:
  1. Diferença entre outsourcing e freelancer
  2. Tempo de alocação (7 dias úteis)
  3. Precisa saber de tecnologia?
  4. Garantia de qualidade (90 dias)
  5. Investimento para começar
- Estilo: `rounded-[16px]`, border muda para `border-primary/30` quando aberto
- Trigger sem underline no hover

### 10. Final CTA / Formulário de Contato
- Fundo: `bg-background`
- H2: "Seu projeto começa aqui."
- Subtítulo: "Nosso time entra em contato em até 24h..."
- **Formulário inline** (flex row no desktop, column no mobile):
  - Input: Nome
  - Input: WhatsApp (type tel)
  - Input: Ramo de atuação
  - Botão: "Quero meu diagnóstico gratuito" (bg-primary)
- Inputs: `rounded-full`, `border border-border`, focus ring
- Submit: `alert()` placeholder (TODO: integrar backend)

### 11. Footer
- Fundo: `bg-foreground` (preto/escuro)
- Logo invertida (`brightness-0 invert`)
- Links: Serviços, Como funciona, Clientes, Blog
- Contato: contato@29tech.com.br
- Copyright: © 2026 29Tech

---

## 🎨 Design System

### Cores (HSL em CSS variables)
```css
--background: 0 0% 100%;        /* Branco */
--foreground: 0 0% 4%;          /* Quase preto */
--primary: 14 100% 50%;         /* #FF3C00 laranja */
--primary-foreground: 0 0% 100%;
--muted: 20 4% 95%;
--muted-foreground: 0 0% 33%;
--bordeaux: 338 100% 23%;       /* Bordô escuro */
--bordeaux-foreground: 0 0% 100%;
--surface: 20 14% 96%;          /* Cinza claro para cards */
--border: 20 6% 90%;
--ring: 14 100% 50%;
--radius: 1.25rem;
```

### Tipografia
- **Fonte:** Bricolage Grotesque (Google Fonts, opsz 12-96, weight 200-800)
- **Títulos:** `font-light` (weight 300), tracking-tight
- **Corpo:** `text-sm` ou `text-base`, `text-muted-foreground`
- **Tags/labels:** `text-xs`, `uppercase`, `tracking-[0.2em]`, `font-semibold`

### Componentes recorrentes
- **Botão primário:** `rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 hover:scale-105`
- **Botão outline:** `rounded-full border-2 border-foreground px-8 py-3.5 text-sm font-medium text-foreground hover:bg-foreground hover:text-background hover:scale-105`
- **Card:** `bg-surface border border-border rounded-[20px] p-8 md:p-10`

---

## 🎬 Sistema de Animações

### Canvas — Hero (dot grid)
- Grid de pontos com spacing 40px
- Drift autônomo: `sin(time * speed + phase) * 4` e `cos(time * speed * 0.7 + phase) * 4`
- Repulsão: raio 120px, força 20, spring factor 0.08, damping 0.85
- Alpha base: 0.06 (sem mouse) até 0.16 (com mouse perto)
- Tamanho: 1.5px base até 3.5px perto do mouse
- Cor: `rgba(255, 60, 0, alpha)`

### Canvas — Dark Section (partículas)
- 350 partículas brancas
- Velocidade base: horizontal `±0.15`, vertical `-0.2 a -0.6` (subindo)
- Mouse scatter: raio 150px, força 1.5
- Spring back: fator 0.02
- Alpha: 0.06–0.18, tamanho: 1–3px

### Framer Motion — Cards
- `animate={{ boxShadow: [...] }}` loop 3s com delay escalonado
- `whileHover={{ y: -6 }}` com spring stiffness 300, damping 20
- Linha laranja top: `initial={{ scaleX: 0 }}` → `whileHover={{ scaleX: 1 }}`

### CountUp — Stats
- IntersectionObserver (threshold 0.5)
- Contagem de 0 ao target em 1.2s com easing cúbico `1 - (1 - t)^3`
- Loop: reinicia a cada 5 segundos enquanto visível

### Acessibilidade
- Todas as animações respeitam `prefers-reduced-motion: reduce`
- Canvas: drift e repulsão desativados, apenas pontos estáticos
- Framer Motion: pode ser configurado com `useReducedMotion()`

---

## 📱 Responsividade

- **Mobile:** 1 coluna, menu hambúrguer, textos menores
- **Tablet (md):** Grids de 2-3 colunas, navegação desktop
- **Desktop (lg+):** Layout completo, tipografia maior (até 80px no H1)
- Breakpoints Tailwind padrão: `sm:640px`, `md:768px`, `lg:1024px`

---

## 🔗 Navegação (anchor links)

| Link | Destino |
|------|---------|
| `#servicos` | Entry Points |
| `#como-funciona` | Outsourcing Section |
| `#clientes` | Testimonials |
| `#blog` | (placeholder) |
| `#contato` | Final CTA / Formulário |

---

## 📦 Dependências Principais

- `react` 18.3 + `react-dom`
- `vite` (bundler)
- `tailwindcss` + `tailwindcss-animate`
- `framer-motion` 12.x (animações de componentes)
- `lucide-react` (ícones: Menu, X, ArrowRight, CheckCircle)
- `@radix-ui/react-accordion` (FAQ)
- Shadcn/UI components (button, card, accordion, etc.)

---

## 🚀 TODO / Próximos Passos

- [ ] Integrar formulário de contato com backend (Lovable Cloud / Supabase)
- [ ] Adicionar botão flutuante de WhatsApp
- [ ] Implementar fade-in com scroll (Intersection Observer) em cada seção
- [ ] Adicionar página de Blog
- [ ] SEO: meta tags, Open Graph, JSON-LD
- [ ] Analytics (Google Analytics / Plausible)
- [ ] Publicar com domínio customizado

---

## 🤖 Prompt de Recriação

> Crie um site institucional single-page para a empresa **29Tech** (tecnologia/outsourcing/software house). Use React + Vite + TypeScript + Tailwind CSS + Framer Motion. Fonte: **Bricolage Grotesque**. Cor primária: `#FF3C00` (laranja). Estilo minimalista editorial com fundo branco, tipografia grande e leve (font-light), cantos arredondados (20px).
>
> **Seções na ordem:**
> 1. Navbar fixo com logo, links (Serviços, Como funciona, Clientes, Blog) e botão CTA
> 2. Hero fullscreen com canvas de dot grid animado (drift autônomo + repulsão ao mouse), título "Tecnologia para o seu negócio.", animação typewriter "Preciso de [frases rotativas]", subtítulo e 2 CTAs
> 3. Stats bar com 4 números (7 dias, +100, 90 dias, <8%) que contam de 0 ao valor e reiniciam a cada 5s
> 4. Entry Points: 3 cards ("Preciso de um time tech", "Preciso construir um produto", "Preciso de dados e IA") com shimmer de sombra contínuo e hover com elevação + linha laranja animada no topo
> 5. Outsourcing: texto + cards de perfis profissionais com tags "disponível" e "validado"
> 6. Seção bordô escuro (HSL 338 100% 23%) com 350 partículas brancas flutuantes em canvas + texto "Você não precisa saber de tech"
> 7. Software House: sprint board mockup + texto + CTA
> 8. Testimonials: 3 depoimentos de clientes
> 9. FAQ: accordion com 5 perguntas
> 10. Formulário de contato: Nome, WhatsApp, Ramo + botão submit
> 11. Footer escuro com logo invertida, links e copyright
>
> **Animações:** Todas contínuas desde o carregamento. Canvas usa requestAnimationFrame. Cards usam Framer Motion animate (não só whileHover). Mouse adiciona camada de interação sobre o movimento autônomo. Respeitar prefers-reduced-motion.
