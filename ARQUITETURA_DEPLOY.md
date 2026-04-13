# 🏗️ Arquitetura de Deploy - 29Tech

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Componentes](#componentes)
3. [Workflow](#workflow)
4. [Branches](#branches)
5. [Ambientes](#ambientes)
6. [Ferramentas](#ferramentas)
7. [Processo de Desenvolvimento](#processo-de-desenvolvimento)
8. [Integração com Google Sheets](#integração-com-google-sheets)
9. [Checklist de Deploy](#checklist-de-deploy)

---

## 🎯 Visão Geral

A arquitetura de deploy do projeto 29Tech utiliza um fluxo profissional com:
- **Desenvolvimento local** com Vite (Hot Reload)
- **Controle de versão** com Git e GitHub
- **Deploy automático** via Vercel
- **Domínio custom** (vintenove.com)
- **Integração com Google Sheets** para coleta de leads

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUXO COMPLETO                           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Developer Local    GitHub Branch    Vercel Deploy    Prod   │
│  (localhost:5173)   (preview/main)   (automático)   (live)   │
│       │                  │                │             │    │
│       ├──────────────────┤                │             │    │
│       │  git push        │                │             │    │
│       │                  ├────────────────┤             │    │
│       │                  │  merge main    │             │    │
│       │                  │                ├─────────────┤    │
│       │                  │                │  deploy     │    │
│       │                  │                │             │    │
│       └────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Componentes

### Frontend
- **Framework:** React 18.3.1
- **Bundler:** Vite 5.4.19
- **Language:** TypeScript 5.8.3
- **UI Components:** shadcn/ui (Radix UI)
- **Styling:** Tailwind CSS 3.4.17
- **Router:** React Router DOM 6.30.1
- **Forms:** React Hook Form 7.61.1
- **Animations:** Framer Motion 12.36.0

### Backend/Services
- **Hosting:** Vercel (Edge Functions)
- **Database:** Google Sheets
- **Forms Integration:** Google Apps Script
- **Analytics:** Vercel Analytics

### DevOps
- **Version Control:** GitHub
- **CI/CD:** Vercel (automático)
- **Package Manager:** npm
- **Node Version:** v20.14.1

---

## 📊 Workflow

### 1. Desenvolvimento Local

**Iniciar servidor:**
```bash
cd /c/Users/marco/vintenove
npm run dev
```

**Acesso:**
- Local: `http://localhost:5173`
- Network: `use --host` para expor

**Features:**
- Hot Module Replacement (HMR)
- Fast Refresh
- TypeScript checking em tempo real

### 2. Git Workflow

**Branch Strategy:**
- `main` → Produção (deploy automático)
- `preview` → Desenvolvimento (testes)

**Fluxo:**
```bash
# 1. Trabalhar na preview
git checkout preview
git add .
git commit -m "Descrição da mudança"
git push origin preview

# 2. Testar localmente em http://localhost:5173

# 3. Aprovação (quando pronto)
git checkout main
git pull origin main
git merge preview
git push origin main

# 4. Vercel detecta push em main
# 5. Deploy automático em ~1-2 minutos
```

---

## 🌿 Branches

### `main` (Produção)
- **Status:** Sempre em produção
- **Deploy:** Automático via Vercel
- **URL:** https://vintenove.com
- **Proteção:** Merge apenas de `preview` com aprovação

### `preview` (Desenvolvimento)
- **Status:** Ambiente de testes
- **Deploy:** Nenhum (apenas local)
- **URL:** http://localhost:5173
- **Uso:** Desenvolver e testar features

---

## 🌍 Ambientes

### Local (Desenvolvimento)
```
URL: http://localhost:5173
Framework: Vite Dev Server
Port: 5173
Database: Local (Google Sheets em tempo real)
Rebuild: Hot Reload (instantâneo)
```

### Staging (Preview)
```
Não aplicável neste setup
(Use branch preview localmente)
```

### Production (Vercel)
```
URL: https://vintenove.com
Framework: Vite Build + Vercel Edge
Port: Automático (443/80)
Database: Google Sheets (Apps Script)
Deploy: Automático ao fazer push em main
TTL: ~1-2 minutos após push
```

---

## 🛠️ Ferramentas

### Development Tools
```bash
npm run dev          # Vite dev server
npm run build        # Build para produção
npm run build:dev    # Build em modo desenvolvimento
npm run preview      # Preview da build
npm run lint         # ESLint
npm run test         # Vitest (uma vez)
npm run test:watch   # Vitest (modo watch)
```

### Git Configuration
```
User: Marcos Paixão (Vinte Nove Projects)
Email: vintenovetech@gmail.com
Remote: github.com/vintenove-projects/vintenove
Protocol: HTTPS (GitHub CLI)
```

### Vercel Configuration
```
Project: vintenove-projects/vintenove
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node Version: 20.x
Environment: Production
Auto-deploy: Ativado
```

---

## 📝 Processo de Desenvolvimento

### 1. Nova Feature

```bash
# 1. Garantir que está na branch preview
git checkout preview
git pull origin preview

# 2. Criar a feature
# - Editar arquivos em src/
# - Testar em http://localhost:5173
# - Hot Reload automático

# 3. Commit
git add .
git commit -m "Add: descrição da feature"
git push origin preview
```

### 2. Validação

```bash
# Abrir http://localhost:5173 no navegador
# Testar todas as funcionalidades
# Verificar responsive (F12)
# Testar formulário (integração Google Sheets)
# Conferir console (F12 > Console)
```

### 3. Deploy

```bash
# Quando aprovado:
git checkout main
git pull origin main
git merge preview
git push origin main

# Vercel automaticamente:
# 1. Detecta push em main
# 2. Inicia build
# 3. Roda testes
# 4. Deploy em produção
# 5. Disponível em https://vintenove.com
```

---

## 📧 Integração com Google Sheets

### Formulário de Contato

**Localização:** `src/components/FinalCTA.tsx`

**Fluxo:**
```
1. Usuário preenche formulário
   - Nome
   - WhatsApp (validado)
   - Ramo de atuação (select)

2. Submissão → Google Apps Script
   - URL: https://script.google.com/macros/s/AKfycbxgVdXMd0c4OmZzvW-gO05UqosB9C7igqku156Uki_JPQ8JkTKXU1PXyx7y13Uv4g0c/exec
   - Método: POST
   - Headers: Content-Type: application/json

3. Apps Script recebe dados
   - Parse JSON
   - Append row na planilha
   - Retorna sucesso

4. Confirmação ao usuário
   - Toast: "Obrigado! Entraremos em contato em breve."
   - Limpa formulário

5. Dados aparecem em:
   - https://docs.google.com/spreadsheets/d/147_x_t_Avh36CdD-7KEm98qF-EAJ9eGLge2hsD3SUWQ/
```

**Apps Script Code:**
```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toLocaleString("pt-BR"),
      data.nome,
      data.whatsapp,
      data.ramo,
    ]);

    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## ✅ Checklist de Deploy

### Antes de fazer Merge

- [ ] Código testado localmente em http://localhost:5173
- [ ] Nenhum erro no console (F12)
- [ ] Responsivo em mobile, tablet e desktop
- [ ] Formulário testado (integração Google Sheets)
- [ ] Links funcionando corretamente
- [ ] Sem console warnings/errors
- [ ] Git status limpo (sem uncommitted changes)

### Processo de Merge

```bash
# 1. Estar em preview com tudo commitado
git status  # Deve estar clean

# 2. Fazer merge
git checkout main
git pull origin main
git merge preview
git push origin main

# 3. Verificar Vercel
# https://vercel.com/vintenove-projects/vintenove/deployments
```

### Após Deploy

- [ ] Aguardar ~1-2 minutos (build + deploy)
- [ ] Acessar https://vintenove.com
- [ ] Testar formulário
- [ ] Verificar Google Sheets (novos leads)
- [ ] Conferir analytics do Vercel

---

## 📊 Status da Arquitetura

| Componente | Status | Detalhes |
|-----------|--------|----------|
| **GitHub** | ✅ | Repositório ativo com branches |
| **Vercel** | ✅ | Deploy automático funcionando |
| **Domínio** | ✅ | vintenove.com configurado |
| **Dev Local** | ✅ | Vite rodando em localhost:5173 |
| **Google Sheets** | ✅ | Integrado com Apps Script |
| **Git Identity** | ✅ | Marcos Paixão configurado |
| **.claude/launch.json** | ✅ | Criado com todas as configs |

---

## 🚀 Próximos Passos

1. **Features planejadas:**
   - Email validation aprimorada
   - Toast notifications customizadas
   - Seção de Portfolio/Cases
   - Seção de Time
   - Mobile optimizations

2. **Workflow:**
   - Develop em `preview`
   - Testar localmente
   - Merge em `main` quando aprovado
   - Deploy automático em produção

3. **Monitoramento:**
   - Vercel Analytics
   - Google Sheets (leads)
   - Console errors

---

## 📚 Referências

- **Vite:** https://vitejs.dev
- **Vercel:** https://vercel.com
- **GitHub:** https://github.com/vintenove-projects/vintenove
- **Domínio:** https://vintenove.com
- **Google Sheets:** https://docs.google.com/spreadsheets/d/147_x_t_Avh36CdD-7KEm98qF-EAJ9eGLge2hsD3SUWQ/

---

**Última atualização:** 30/03/2026
**Versão:** 1.0
**Autor:** Marcos Paixão (Vinte Nove Projects)
