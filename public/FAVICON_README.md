# 🎨 Favicon Setup

Este documento descreve como configurar o favicon para o projeto 29Tech.

## Arquivos de Favicon Necessários

O projeto está configurado para usar vários arquivos de favicon em diferentes formatos e tamanhos:

```
public/
├── favicon.ico           (32x32, 64x64 - formato ICO)
├── favicon-32x32.png     (32x32 - formato PNG)
├── favicon-192x192.png   (192x192 - formato PNG para Android)
├── favicon-180x180.png   (180x180 - formato PNG para Apple devices)
├── favicon.svg           (Escalável - formato SVG)
└── manifest.json         (Configuração de PWA)
```

## Como Gerar o Favicon

### Opção 1: Usar Ferramenta Online (Recomendado)

1. Acesse: https://www.favicon-generator.org/ ou https://realfavicongenerator.net/

2. Faça upload da imagem enviada (a imagem com o logo 29Tech)

3. Customize as configurações:
   - Cor tema: `#ff6b35` (laranja da 29Tech)
   - Fundo: Branco ou Transparente
   - Gerar para todas as plataformas

4. Baixe o arquivo ZIP com todos os formatos

5. Extraia os arquivos para a pasta `public/`

### Opção 2: Usar npm package (sharp)

```bash
npm install --save-dev sharp

# Criar script em package.json:
# "generate:favicon": "node scripts/generate-favicon.js"
```

Criar arquivo `scripts/generate-favicon.js`:
```javascript
const sharp = require('sharp');
const fs = require('fs');

const imageBuffer = fs.readFileSync('./source-favicon.png');

// ICO
sharp(imageBuffer).resize(32, 32).toFile('public/favicon.ico');

// PNG 32x32
sharp(imageBuffer).resize(32, 32).toFile('public/favicon-32x32.png');

// PNG 192x192
sharp(imageBuffer).resize(192, 192).toFile('public/favicon-192x192.png');

// PNG 180x180
sharp(imageBuffer).resize(180, 180).toFile('public/favicon-180x180.png');
```

### Opção 3: Usar ImageMagick (CLI)

```bash
# Se tiver ImageMagick instalado:
convert source-favicon.png -define icon:auto-resize=32 public/favicon.ico
convert source-favicon.png -resize 32x32 public/favicon-32x32.png
convert source-favicon.png -resize 192x192 public/favicon-192x192.png
convert source-favicon.png -resize 180x180 public/favicon-180x180.png
```

## Status Atual

### ✅ Configurado no Projeto:

- ✅ `index.html` com referências para todos os favicon files
- ✅ `manifest.json` com ícones configurados
- ✅ `favicon.svg` como fallback escalável
- ✅ Meta tags para Apple, Android e navegadores

### ⏳ Pendente:

- ⏳ Substituir `favicon.ico` com a imagem final
- ⏳ Gerar `favicon-32x32.png` 
- ⏳ Gerar `favicon-192x192.png`
- ⏳ Gerar `favicon-180x180.png`

## Como Testar

Após adicionar os arquivos:

1. Limpe o cache do navegador (Ctrl+Shift+Delete)
2. Abra https://lpsoftware.vintenove.com/
3. Verifique se o ícone aparece na aba do navegador
4. Verifique a barra de endereços
5. Teste em dispositivos mobile

## Requisitos Técnicos

- **Tamanho recomendado**: 512x512px ou maior
- **Formato original**: PNG, SVG ou JPG com fundo transparente
- **Cores**: Compatible com #ff6b35 (laranja 29Tech)
- **Proporção**: Quadrado (1:1)

## Referências

- [MDN Favicon Guide](https://developer.mozilla.org/en-US/docs/Glossary/Favicon)
- [Real Favicon Generator](https://realfavicongenerator.net/)
- [Favicon Format Reference](https://www.w3.org/2005/10/howto-favicon)

---

**Próximo passo**: Quando tiver a imagem final, use uma das opções acima para gerar todos os formatos de favicon.
