# ◈ SOLO LEVELING OS — PWA

Sistema de produtividade RPG estilo Solo Leveling, instalável como app.

---

## 📁 Estrutura de arquivos

```
solo-leveling-pwa/
├── index.html        ← App principal
├── manifest.json     ← Configuração PWA
├── sw.js             ← Service Worker (offline)
├── README.md         ← Este arquivo
└── icons/
    ├── icon-16.png
    ├── icon-32.png
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-120.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-180.png
    ├── icon-192.png
    └── icon-512.png
```

---

## 🚀 Deploy no GitHub Pages (grátis)

### Passo 1 — Crie o repositório

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **New repository**
3. Nome: `solo-leveling` (ou qualquer nome)
4. Deixa **Public**
5. Clique **Create repository**

### Passo 2 — Suba os arquivos via terminal

```bash
# Entre na pasta do projeto
cd solo-leveling-pwa

# Inicia o git
git init

# Adiciona todos os arquivos
git add .

# Primeiro commit
git commit -m "feat: Solo Leveling OS PWA"

# Conecta ao seu repositório (troque SEU_USER pelo seu usuário GitHub)
git remote add origin https://github.com/SEU_USER/solo-leveling.git

# Sobe
git branch -M main
git push -u origin main
```

### Passo 3 — Ativa o GitHub Pages

1. No repositório, clique em **Settings**
2. No menu lateral, clique em **Pages**
3. Em *Source*, selecione **Deploy from a branch**
4. Em *Branch*, selecione **main** e pasta **/ (root)**
5. Clique **Save**

Aguarde ~2 minutos. Seu app estará em:
```
https://SEU_USER.github.io/solo-leveling/
```

---

## 📱 Instalar no Celular (Android)

1. Abra o link do GitHub Pages no **Chrome**
2. Chrome mostra banner "Adicionar à tela inicial" — toque nele
3. Ou: menu (⋮) → **Adicionar à tela inicial**
4. Confirma → ícone aparece na tela inicial
5. Abre sem barra do navegador, igual a um app nativo ✅

**iOS (iPhone/iPad):**
1. Abra no **Safari** (obrigatório no iOS)
2. Toque no botão de compartilhar (□↑)
3. Role e toque em **Adicionar à Tela de Início**
4. Confirma o nome e toque **Adicionar**

---

## 💻 Instalar no PC (Chrome/Edge)

1. Abra o link no Chrome ou Edge
2. Na barra de endereço, aparece um ícone **⊕ Instalar**
3. Clique e confirme
4. O app aparece no menu Iniciar (Windows) ou Applications (Mac/Linux)
5. Abre em janela própria, sem interface do navegador ✅

Ou pelo menu: `⋮ → Salvar e compartilhar → Instalar página como app`

---

## 🔄 Atualizar o app depois

```bash
# Faça suas mudanças nos arquivos, depois:
git add .
git commit -m "update: descrição da mudança"
git push

# GitHub Pages atualiza em ~1-2 minutos
# No celular: o Service Worker baixa a nova versão automaticamente
```

Para forçar atualização da cache, mude o `CACHE_NAME` no `sw.js`:
```js
const CACHE_NAME = 'sl-os-v2'; // incrementa a versão
```

---

## 💾 Dados salvos

O app salva teus dados no **localStorage** do navegador automaticamente a cada 30 segundos e ao fechar. Os dados ficam no dispositivo — não somem ao fechar o app.

> ⚠️ Se limpar os dados do navegador/app, o progresso é perdido. Para backup, futuramente pode exportar via JSON.

---

## 🛠 Rodar localmente (sem internet)

```bash
# Opção 1: Python (mais fácil)
cd solo-leveling-pwa
python3 -m http.server 8080
# Acesse: http://localhost:8080

# Opção 2: Node.js
npx serve .
# Acesse: http://localhost:3000

# Opção 3: VS Code
# Instale a extensão "Live Server"
# Clique direito no index.html → "Open with Live Server"
```

> ⚠️ O Service Worker só funciona em HTTPS ou localhost. No GitHub Pages já é HTTPS automático.

---

*Solo Leveling OS — Arise, Hunter.*
