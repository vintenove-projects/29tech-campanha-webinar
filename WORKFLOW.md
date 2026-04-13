# 🚀 Workflow de Desenvolvimento - Vintenove

## Branches

- **`main`** → Produção (Vercel Deploy automático)
- **`preview`** → Desenvolvimento local (seu ambiente de teste)

## Fluxo de trabalho

### 1️⃣ Desenvolvimento Local (Preview)

```bash
# Você sempre trabalha na branch preview
git checkout preview

# Fazer alterações no código
# ...

# Commit e push
git add .
git commit -m "Descrição da mudança"
git push origin preview
```

**Server local:** `npm run dev` (porta 8080)

### 2️⃣ Testar Localmente

Claude inicia o servidor local para você conferir as alterações em:
👉 `http://localhost:8080`

### 3️⃣ Aprovar e Enviar para Produção

Quando aprovado, Claude faz:

```bash
# Mesclar preview na main
git checkout main
git pull origin main
git merge preview
git push origin main
```

O Vercel detecta o push em `main` e faz deploy automático em **produção**.

---

## Comandos rápidos

| Comando | O que faz |
|---------|-----------|
| `git checkout preview` | Volta para a branch de desenvolvimento |
| `git checkout main` | Vai para a branch de produção |
| `npm run dev` | Inicia servidor local na porta 8080 |
| `npm run build` | Build para produção |

---

## Status atual

- ✅ Branch `preview` criada e configurada
- ✅ Validação de WhatsApp adicionada
- ⏳ Aguardando aprovação para fazer merge na `main`
