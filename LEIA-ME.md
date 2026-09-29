# Sabino's Lanches — Site V1

Site institucional + cardápio digital. HTML, CSS e JavaScript puros: sem build,
sem framework, sem dependência externa além das fontes do Google.

Para ver: abra `index.html` no navegador. Para publicar: suba a pasta inteira
em qualquer hospedagem estática (Vercel, Netlify, Hostinger, GitHub Pages).

---

## 1. O que precisa da sua ação

### ⚠️ Número do WhatsApp — único item pendente
Não consegui o número em nenhuma fonte pública (nem no Instagram, nem no
Linktree, nem no Anota Aí). Abra `assets/js/dados.js` e preencha:

```js
whatsapp: '5543999999999',   // 55 + DDD + número, só dígitos
```

Enquanto estiver vazio, **os botões de WhatsApp somem sozinhos** e o Anota Aí
assume como canal único. O site funciona 100% assim — nada quebra, não fica
botão morto. Ao preencher, aparece no modal um botão verde que já abre a
conversa com o lanche escolhido escrito na mensagem.

### 📸 Foto da Maionese Secretinha
É o produto mais citado do cardápio ("a alma da Sabino's") e a foto que está no
Anota Aí é só um pote plástico liso — destoa de todas as outras, que têm os
grafismos da marca. Vale uma foto nova; é a que mais aparece.

### 🕐 Divergência de horário
- **Instagram (bio):** 18:00 às 23:00, fds até 00:00, fechado terça
- **Anota Aí:** abre 15:29/15:30 nos mesmos dias

Usei o horário do Instagram, que é o que vocês comunicam ao público. Se o certo
for o do Anota Aí, ajuste em `dados.js` → `CONFIG.horarios`.

---

## 2. Estrutura

```
V1/
├── index.html                  a página inteira
├── assets/
│   ├── css/estilo.css          estilos (tokens no topo do arquivo)
│   ├── js/dados.js             ← CARDÁPIO, PREÇOS, HORÁRIOS, CONTATO
│   ├── js/site.js              comportamento (modal, filtros, selo de aberto)
│   └── img/
│       ├── menu/               40 fotos .webp, fundo recortado (usadas no site)
│       └── _originais/         os .png originais do Anota Aí (backup)
└── LEIA-ME.md
```

**No dia a dia você só mexe em `dados.js`.** Preço, descrição, item novo,
horário, endereço — está tudo lá, comentado em português.

### Adicionar um lanche
1. Salve a foto em `assets/img/menu/` como `.webp` (fundo transparente).
2. Acrescente o item na lista `PRODUTOS`:

```js
{ cat: 'lanches', nome: 'Nome do Lanche', img: 'nome-do-arquivo',
  preco: 45.90, desc: 'Descrição que aparece no cartão e no pop-up.' },
```

Campos opcionais: `precoDe: 52.00` (mostra o preço riscado e calcula o selo de
desconto sozinho), `destaque: true` (entra na vitrine da home), `ardencia: 1..5`
(barra de pimenta, só para maioneses).

---

## 3. Como o pedido funciona

Foi exatamente o fluxo que você pediu:

1. A pessoa clica em qualquer lanche do cardápio.
2. Abre um pop-up com foto grande, descrição completa e preço.
3. O pop-up avisa que o pedido é finalizado no Anota Aí.
4. Botão **"Pedir no Anota Aí"** leva para lá em aba nova.
   (Quando houver WhatsApp, aparece também o botão verde.)

Fora isso, há 4 botões diretos para o Anota Aí: topo, herói, card de pagamentos
e o botão flutuante que surge no mobile depois de rolar a página.

---

## 4. Pesquisa que embasou o site

**A marca.** O diferencial da casa é o **prensado** — não é o hambúrguer
empilhado de sempre. Isso apareceu na review do @viagemgastronomica no TikTok
("novo prensado em Londrina") e nas próprias descrições de vocês ("um prensado
com hype de verdade", "prensado no grau"). Virou o eixo do texto do site.

**O slogan.** "Aqui se divulga o protagonista", da bio do Instagram, virou o
título da home — e as fotos do cardápio já trazem uma **coroa desenhada à mão**,
que amarra perfeitamente com a ideia de protagonista. O traço laranja sob o
título no herói é um eco desses mesmos rabiscos de marcador.

**A maionese secretinha** aparece em quase todo item do cardápio. Tratei como o
que ela é: assinatura da casa, com seção própria para as 5 maioneses e barra de
ardência usando os níveis que vocês mesmos escrevem (Picantonese 2, Estressadinho 4).

**Dados confirmados:** Av. Maringá 1550, Vitória, Londrina/PR, CEP 86060-000 ·
Sabinos Delivery LTDA, CNPJ 58.988.349/0001-63 (aberta em 2025) · 20,4 mil
seguidores · Pix, crédito, Google Pay, Nubank e iFood · sem pedido mínimo.

**Paleta.** Conferi contra o logo do Instagram e bate: o selo é vinho com a
tipografia em laranja. Mantive `#5D0E0B` / `#D17D0A` / `#EBDCCD` exatamente como
você mandou.

**Referências.** A estrutura segue a lógica do La Brasa Burger (herói escuro de
foto cheia, números animados, cardápio em grade) e as imagens do Pinterest
(selos de desconto, faixa laranja rolando, cartões com foto recortada).

---

## 5. Cardápio: o que limpei

Os dados vieram do Anota Aí. Duas coisas ali são erro de cadastro e ficaram de
fora ou foram corrigidas — vale arrumar também no painel de vocês:

| No Anota Aí | No site | Por quê |
|---|---|---|
| "Salad" R$ 29,90, descrição `seasdas`, sem foto | **removido** | registro de teste duplicado |
| "3 Bolinho de Mandioca c/ Carne Seca - **Cópia**" | "3 Bolinhos de Mandioca c/ Carne Seca" | "- Cópia" era resíduo de duplicação |
| "Combo Sabino\`s" (crase) | "Combo Sabino's" | apóstrofo correto |

Mantive de propósito os "erros" que são voz da marca: *muiiitoo* Catupiry,
*alfaceee* americana, Coca *gelaada*. Isso é jeito de falar de vocês, não é typo.

**Total publicado: 44 itens em 7 categorias.**

---

## 6. Detalhes técnicos

- **Fotos.** As do Anota Aí só existem em 200×200 px. Recortei o fundo
  (branco e preto) e converti para WebP: de 2,2 MB caiu para ~510 KB no total.
  O layout foi desenhado para nunca ampliar a foto além do que ela aguenta —
  por isso o peso visual está na tipografia, não em foto gigante estourada.
  Se um dia tiverem fotos em alta, é só trocar os arquivos em `img/menu/`.
- **Selo "aberto agora"** no topo se calcula sozinho pelo relógio do visitante e
  se atualiza a cada minuto. Entende que sexta e sábado viram meia-noite.
- **Acessibilidade:** todos os textos passam em contraste AA (medido: de 5,4:1 a
  13,7:1), alvos de toque de 44 px, foco visível no teclado, o pop-up prende o
  Tab e devolve o foco ao fechar, Esc fecha, e `prefers-reduced-motion`
  desliga as animações para quem pediu isso no sistema.
- **SEO:** título e descrição próprios, Open Graph para compartilhamento e dados
  estruturados `Restaurant` (endereço + horários) para o Google.
- Responsivo testado em 375, 760, 1180 e 1280 px. Sem rolagem horizontal.
- Imprime legível (o cardápio sai em preto sobre branco).
