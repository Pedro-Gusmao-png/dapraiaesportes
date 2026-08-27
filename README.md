# Da Praia Esportes — Site / Loja Virtual

Site one-page da **Da Praia Esportes** (futmesa), tema **claro e profissional**
(estilo loja esportiva: branco dominante + azuis estratégicos).
HTML + CSS + JS puros. Leve, responsivo, sem dependências — basta abrir o `index.html`.

---

## Paleta oficial (usada em todo o código)

| Cor            | Hex       | Onde é usada                                  |
| -------------- | --------- | --------------------------------------------- |
| Azul principal | `#0057B8` | Botões, links, ícones, CTAs                   |
| Azul escuro    | `#003B7A` | Hero, footer, CTA final, títulos              |
| Azul secundário| `#1976D2` | Hovers e detalhes interativos                 |
| Branco         | `#FFFFFF` | Fundo principal, cards                        |
| Cinza claro    | `#F5F8FC` | Seções alternadas, fundo de cards             |
| Cor do texto   | `#172033` | Textos, menus                                 |
| Verde WhatsApp | `#25D366` | SOMENTE em elementos do WhatsApp              |
| Borda suave    | `#DCE6F2` | Bordas de cards (derivada da paleta)          |

Todas as cores ficam em **`css/variables.css`** — mudou ali, muda o site inteiro.

## Estrutura de pastas

```
dapraiaesportes/
├── index.html              ← página única
├── README.md               ← este guia
├── css/
│   ├── reset.css           ← zera estilos do navegador
│   ├── variables.css       ← CORES E FONTES (edite aqui)
│   ├── style.css           ← estilo das seções (ordem = ordem do HTML)
│   └── responsive.css      ← tablet e celular (mobile é prioridade)
├── js/
│   ├── config.js            ← CONTATOS E PRODUTOS (edite aqui)
│   ├── ui.js                ← menu, header, contatos, toast, ano
│   ├── cart.js              ← orçamento (carrinho → WhatsApp)
│   ├── animations.js        ← animações de entrada e contadores
│   ├── carousel.js          ← carrossel da seção "Nossa Trajetória"
│   └── main.js              ← inicialização (chama tudo)
└── assets/
    ├── favicon/            ← ícone da aba
    ├── icons/              ← espaço p/ ícones extras
    ├── videos/             ← vídeos do site (kaio-jorge.mp4)
    └── img/
        ├── logo/           ← logo oficial (usada no header, footer e hero)
        └── produtos/       ← FOTOS DAS FUTMESAS (foto1.jpg ... foto5.jpg)
```

---

## O que fazer primeiro (4 passos)

### 1. WhatsApp, Instagram e e-mail

Em **`js/config.js`**:

```js
const CONFIG = {
  whatsapp: '5581999999999',     // país+DDD+número (só dígitos)
  instagram: 'dapraiaesportes', // sem @
  email: 'contato@...',
  defaultMessage: 'Olá! Vim pelo site...',
};
```

O site inteiro atualiza sozinho (header, hero, flutuante, footer...).

### 2. Fotos das futmesas

Veja `assets/img/produtos/LEIA-ME.txt`.
Resumo: salve as fotos na pasta e troque `.svg` por `.jpg` nos `<img>` de "Modelos".

### 3. Textos marcados com ✏️ EDITE

No `index.html`: garantia (meses), números (+200 mesas, +50 cidades),
depoimentos, telefone visível no rodapé, horários.

---

## Como funciona o "carrinho" (orçamento)

1. Cliente clica em **"Quero essa!"** → item entra na gaveta lateral.
2. Em **"Finalizar no WhatsApp"** abre a conversa com a lista montada.
3. Os produtos são cadastrados no array `PRODUCTS` do `config.js`.

## Recursos incluídos

- Header branco fixo com sombra ao rolar + botão "Solicitar orçamento"
- Hero azul escuro→azul principal com imagem animada
- Barra de vantagens sobreposta ao hero
- Contadores animados + animações discretas de entrada
- Seção "Nossa Trajetória" (2019 → 2026) com carrossel de fotos (setas, pontos, swipe e teclado) — para adicionar fotos basta incluir um novo `<figure class="carousel__slide">` no HTML
- Seção "Personalizados" com vídeo do atleta Kaio Jorge (arquivo em `assets/videos/`)
- Depoimentos em carrossel automático (3 por vez no desktop, 2 no tablet, 1 no celular; troca a cada 3,5s, pausa com hover/toque)
- Seção-manifesto pré-rodapé com marca d'água gigante "DA PRAIA" e pilares da marca
- FAQ persuasivo acessível (`<details>`) com intro fixa, checklist de confiança e CTA final em destaque
- Orçamento salvo no navegador (localStorage)
- Botão flutuante do WhatsApp pulsando
- SEO básico + Open Graph
