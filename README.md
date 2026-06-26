# MB System — Site Institucional

Site corporativo da **MB System**, empresa de tecnologia e soluções digitais.
Desenvolvido em **HTML5, CSS3 e JavaScript puro** (sem dependências e sem build),
pronto para hospedagem gratuita no **GitHub Pages**.

Design moderno, clean e profissional, com as cores da marca (azul + azul-marinho),
animações suaves, modo claro/escuro e totalmente responsivo. Pegada 2026. 🚀

## ✨ Recursos

- Hero animado com fundo "aurora" e bloco de código ilustrativo
- Navbar fixa com efeito glass, barra de progresso de scroll e menu mobile
- Modo claro/escuro (salvo no navegador)
- Animações de entrada ao rolar (scroll reveal)
- Contadores animados e barras de competências
- Seção de Serviços, Sobre, Competências
- Portfólio de **Projetos** com filtro por categoria
- Seção de **Clientes** e carrossel de **depoimentos** (com swipe no celular)
- Formulário de **contato** com validação (abre o e-mail já preenchido)
- Botão "voltar ao topo" e marquee de tecnologias
- Acessibilidade: respeita `prefers-reduced-motion`

## 📁 Estrutura

```
.
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/logo.png
├── .nojekyll
├── .gitignore
└── README.md
```

## 🚀 Como rodar localmente

Basta abrir o `index.html` no navegador. Ou, para um servidor local:

```bash
# Python
python -m http.server 8000
# depois acesse http://localhost:8000
```

## 🌐 Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie os arquivos:

```bash
git init
git add .
git commit -m "Site institucional MB System"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

2. No GitHub, vá em **Settings → Pages**.
3. Em **Source**, selecione a branch `main` e a pasta `/ (root)`.
4. Salve. Em alguns minutos o site estará no ar em
   `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`.

> O arquivo `.nojekyll` garante que o GitHub Pages sirva a pasta `assets` sem processamento.

## ✏️ Como personalizar

- **Cores da marca:** edite as variáveis no topo de `assets/css/style.css` (`--blue`, `--navy`, etc.).
- **Textos, projetos e clientes:** edite diretamente o `index.html`.
- **Contato (e-mail / WhatsApp / redes):** procure por `contato@mbsystem.com.br` e
  `wa.me/5500000000000` no `index.html` e substitua pelos seus dados reais.
- **Logo:** substitua `assets/img/logo.png`.

---

© MB System. Todos os direitos reservados.
