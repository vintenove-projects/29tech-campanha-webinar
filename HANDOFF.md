# 📋 Handoff - Deploy 29Tech Campanha Software

**Data:** 15 de Abril de 2026  
**Status:** Em Progresso - Aguardando Configuração DNS Final  
**Responsável Anterior:** Claude Code  
**Próximo Responsável:** [Seu Nome]

---

## 🎯 Objetivo do Projeto

Fazer deploy do site de campanha **29Tech** (React + Vite) para:
- **URL Principal:** `https://lpsoftware.vintenove.com`
- **Plataforma:** Vercel (deploy automático)
- **Servidor Estático:** Hostinger (redirect/proxy)

---

## ✅ O Que Foi Feito

### 1. **Configuração de Git & SSH** ✓
- Chave SSH (ED25519) gerada e adicionada ao GitHub
- Repositório clonado com sucesso via SSH
- Acesso: `git@github.com:vintenove-projects/29tech-campanha-software.git`

### 2. **Deploy no Vercel** ✓
- Projeto detectado automaticamente pelo Vercel
- Build automático realizado
- **URL de Produção:** https://29tech-campanha-software.vercel.app
- **URLs Alternativas:**
  - `29tech-campanha-software-git-main-vintenovetech-8838s-projects.vercel.app`
  - `29tech-campanha-software-cluc849p4-vintenovetech-8838s-projects.vercel.app`

### 3. **Configuração Hostinger** ⚠️
- Arquivo `.htaccess` criado e feito upload (localizado em `/Users/marcosvpantoja/Downloads/.htaccess`)
- **Tentativas realizadas:**
  - ✓ Redirect 301 simples (funcionou)
  - ✗ Reverse proxy (bloqueado pelo Hostinger - 503 Service Unavailable)
- **Solução Atual:** Redirect 301 para o Vercel funcionando
- **Próxima Solução:** Apontar DNS diretamente para o Vercel

---

## ⚠️ Status Atual

### Domínio: `lpsoftware.vintenove.com`
- ✓ Conectado ao Hostinger
- ✓ Arquivo `.htaccess` uploaded na `public_html`
- ✓ Redirect funcionando (HTTP 301)
- ❌ URL customizada NÃO mantida (redireciona para Vercel)

### Próximo Passo Crítico
**Apontar DNS do Hostinger para Vercel** para manter a URL `lpsoftware.vintenove.com`

---

## 🚀 Próximos Passos

### **PASSO 1: Adicionar Domínio no Vercel**

1. Acesse: https://vercel.com/vintenovetech-8838s-projects/29tech-campanha-software/settings/domains
2. Clique em **"Add Domain"**
3. Digite: `lpsoftware.vintenove.com`
4. Clique em **"Add"**
5. **IMPORTANTE:** Copie o **CNAME** ou **Nameservers** que Vercel fornecerá

### **PASSO 2: Atualizar DNS no Hostinger**

1. Acesse o painel do Hostinger: https://hpanel.hostinger.com
2. Vá para: **Domínios > lpsoftware.vintenove.com > Registros DNS**
3. Procure pelo registro que precisa ser atualizado (Vercel vai indicar qual)
4. **Se for CNAME:**
   - Substitua o valor atual pelo CNAME do Vercel
5. **Se for Nameservers:**
   - Substitua os nameservers atuais pelos do Vercel
6. Clique em "Salvar"
7. **Aguarde 5-30 minutos** para o DNS atualizar

### **PASSO 3: Verificar Funcionamento**

```bash
# Testar DNS propagação
nslookup lpsoftware.vintenove.com

# Testar acesso
curl -I https://lpsoftware.vintenove.com
# Esperado: HTTP 200 (não 301)
```

---

## 📚 Informações Importantes

### Repositório GitHub
```
Endereço: git@github.com:vintenove-projects/29tech-campanha-software.git
Branch Principal: main
Branch de Desenvolvimento: preview
Autenticação: SSH (chave em ~/.ssh/id_ed25519)
```

### Vercel Project
```
Nome: 29tech-campanha-software
URL: https://29tech-campanha-software.vercel.app
Propriétário: vintenovetech-8838s-projects
Configuração: Vite + React + TypeScript
Build Command: npm run build
Output Directory: dist
Auto-deploy: Ativado (ao fazer push em main)
```

### Hostinger
```
Domínio: lpsoftware.vintenove.com
Tipo de Hospedagem: PHP/HTML (Premium)
Servidor: LiteSpeed com PHP 8.3.30
Pasta Raiz: public_html
Arquivo .htaccess: Localizado em public_html
```

### Credenciais & Acessos
```
GitHub: Autenticado via SSH
Vercel: Conectado via GitHub OAuth
Hostinger: Acesso via hpanel.hostinger.com (user: vintenovetech@gmail.com)
```

---

## 🔄 Workflow Contínuo

**Para fazer alterações no site:**

1. **Clonar/Navegar até o repositório:**
   ```bash
   cd 29tech-campanha-software
   ```

2. **Editar código localmente:**
   ```bash
   git checkout preview  # branch de desenvolvimento
   npm run dev          # testar localmente em http://localhost:5173
   ```

3. **Commitar e fazer push:**
   ```bash
   git add .
   git commit -m "Descrição da mudança"
   git push origin preview
   ```

4. **Fazer merge para produção:**
   ```bash
   git checkout main
   git pull origin main
   git merge preview
   git push origin main
   # Vercel fará deploy automático em ~1-2 minutos
   ```

---

## 🔗 URLs de Referência

| Recurso | URL |
|---------|-----|
| Vercel Dashboard | https://vercel.com |
| Vercel Project | https://vercel.com/vintenovetech-8838s-projects/29tech-campanha-software |
| Vercel Settings | https://vercel.com/vintenovetech-8838s-projects/29tech-campanha-software/settings |
| Vercel Domains | https://vercel.com/vintenovetech-8838s-projects/29tech-campanha-software/settings/domains |
| Hostinger Panel | https://hpanel.hostinger.com |
| GitHub Repo | https://github.com/vintenove-projects/29tech-campanha-software |
| Site (Vercel) | https://29tech-campanha-software.vercel.app |
| Site (Customizado) | https://lpsoftware.vintenove.com |

---

## 📝 Notas Importantes

### DNS & Replicação
- Pode levar **5-30 minutos** para o DNS se propagar globalmente
- Use `nslookup` ou `dig` para verificar status
- Limpe o cache local do navegador (Ctrl+Shift+Delete) após atualizar DNS

### Certificado SSL
- Vercel fornece certificado SSL automático
- Hostinger já tem SSL ativado
- Ambos os domínios devem funcionar com HTTPS

### Problemas Conhecidos
- ✗ Reverse proxy via .htaccess não funciona (mod_proxy não habilitado)
- ✓ Redirect 301 funciona perfeitamente
- ✓ Deploy automático no Vercel funciona

---

## 🆘 Troubleshooting

### Domínio ainda mostra redirect
- **Solução:** Aguarde propagação DNS (5-30 min)
- Limpe cache do navegador
- Teste em modo incógnito
- Use `nslookup` para confirmar atualização

### Erro 503 no Hostinger
- **Causa:** Mod_proxy não habilitado
- **Solução:** Usar DNS apontamento (opção 2)

### Deploy não funciona
- Verificar se push foi feito em `main`
- Verificar build logs no Vercel
- Confirmar variáveis de ambiente

---

## 📞 Contatos & Referências

- **Projeto Owner:** Marcos Paixão (Vinte Nove Projects)
- **Email:** vintenovetech@gmail.com
- **GitHub Org:** vintenove-projects

---

**Última atualização:** 15 de Abril de 2026 às 14:12 GMT
**Próximo checkpoint:** Após configurar DNS no Vercel
