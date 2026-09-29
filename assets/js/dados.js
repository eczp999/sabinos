/* ==========================================================================
   SABINO'S LANCHES — Dados do site
   --------------------------------------------------------------------------
   Este é o único arquivo que precisa ser editado no dia a dia.
   Preços, descrições e horários ficam todos aqui.
   Fonte dos dados: pedido.anota.ai/loja/sabinos-lanches + @sabinoslanche
   ========================================================================== */

const CONFIG = {
  nome: "Sabino's Lanches",
  slogan: 'Aqui se divulga o protagonista',

  // Link oficial de pedidos (Anota Aí) — é para cá que todos os botões apontam.
  anotaAi: 'https://pedido.anota.ai/loja/sabinos-lanches',

  /* --------------------------------------------------------------------
     WHATSAPP — PREENCHER AQUI
     Coloque o número no formato internacional, só dígitos: 55 + DDD + número.
     Exemplo: '5543999999999'
     Enquanto estiver vazio (''), os botões de WhatsApp somem sozinhos do site
     e o Anota Aí assume como canal único. Nada quebra.
     -------------------------------------------------------------------- */
  whatsapp: '',

  instagram: 'https://www.instagram.com/sabinoslanche/',
  endereco: {
    rua: 'Avenida Maringá, 1550',
    bairro: 'Vitória',
    cidade: 'Londrina',
    uf: 'PR',
    cep: '86060-000',
    maps: 'https://www.google.com/maps/search/?api=1&query=Avenida+Maring%C3%A1+1550+Vit%C3%B3ria+Londrina+PR',
  },
  cnpj: '58.988.349/0001-63',

  /* Horários conforme a bio oficial do Instagram.
     0 = domingo … 6 = sábado. `null` = fechado.
     Usados tanto no texto quanto no selo "aberto agora" do topo. */
  horarios: {
    0: { abre: '18:00', fecha: '23:00' },
    1: { abre: '18:00', fecha: '23:00' },
    2: null, // terça — único dia fechado
    3: { abre: '18:00', fecha: '23:00' },
    4: { abre: '18:00', fecha: '23:00' },
    5: { abre: '18:00', fecha: '00:00' },
    6: { abre: '18:00', fecha: '00:00' },
  },

  pagamentos: ['Pix', 'Cartão de crédito', 'Google Pay', 'Nubank', 'iFood'],
};

/* --------------------------------------------------------------------------
   CATEGORIAS — a ordem aqui define a ordem do menu e dos filtros.
   -------------------------------------------------------------------------- */
const CATEGORIAS = [
  { id: 'combos',         nome: 'Combos',          chamada: 'Lanche + batata + bebida' },
  { id: 'lanches',        nome: 'Lanches',         chamada: 'Os prensados da casa' },
  { id: 'duplos',         nome: 'Duplos',          chamada: 'Duas carnes de 170g' },
  { id: 'batatita',       nome: 'Batatita',        chamada: 'Crocante por fora' },
  { id: 'maioneses',      nome: 'Maioneses',       chamada: 'O segredo da casa' },
  { id: 'acompanhamentos',nome: 'Acompanhamentos', chamada: 'Pra dividir (ou não)' },
  { id: 'bebidas',        nome: 'Bebidas',         chamada: 'Pra descer redondo' },
];

/* --------------------------------------------------------------------------
   PRODUTOS
   preco        → preço atual
   precoDe      → preço cheio, só quando está em promoção
   img          → nome do arquivo em assets/img/menu/
   destaque     → aparece na vitrine da home
   ardencia     → 1 a 5, só para as maioneses
   -------------------------------------------------------------------------- */
const PRODUTOS = [
  /* ---------- COMBOS ---------- */
  { cat: 'combos', nome: 'Combo Sabino’s', img: 'combo-sabinos', preco: 62.40,
    desc: 'O clássico que carrega nosso nome: 170g de carne suculenta, queijo americano derretendo, catupiry cremoso, cheddar e nossa maionese secretinha. No combo você ainda leva a nossa batatinha crocante e bebida.' },
  { cat: 'combos', nome: 'Combo S.F.C', img: 'combo-sfc', preco: 64.40,
    desc: 'Nosso S.F.C, batata, coca-cola lata e acompanha maionese caseira da casa na faixa!' },
  { cat: 'combos', nome: 'Combo Baconzitos', img: 'combo-baconzitos', preco: 63.40,
    desc: 'Baconzitos, Batatitas e Coca gelaada!' },
  { cat: 'combos', nome: 'Combo Salad', img: 'combo-salad', preco: 55.40,
    desc: 'Nosso suculento SALAD, batata, coca-cola lata e acompanha maionese secretinha na faixa.' },

  /* ---------- LANCHES ---------- */
  { cat: 'lanches', nome: 'Sabino’s', img: 'sabinos', preco: 43.90, destaque: true,
    desc: 'O clássico que carrega nosso nome: 170g de carne suculenta, queijo americano derretendo, catupiry cremoso, cheddar e nossa maionese secretinha. Simplesmente absurdo.' },
  { cat: 'lanches', nome: 'Baconzitos', img: 'baconzitos', preco: 44.90, precoDe: 52.00, destaque: true,
    desc: 'O cheese bacon do jeito certo: 170g de carne, queijo americano, bacon em cubos crocante, cebola caramelizada, ketchup, tomate em cubos e a maionese secretinha que é a alma da Sabino’s.' },
  { cat: 'lanches', nome: 'Salad', img: 'salad', preco: 36.90, precoDe: 41.00, destaque: true,
    desc: 'O cheese salada como você nunca viu: 170g de carne no ponto, queijo americano, cheddar, alface americana crocante, tomate em cubos e maionese secretinha. Leve e destruidor ao mesmo tempo.' },
  { cat: 'lanches', nome: 'SFC — Sabino’s Fried Chicken', img: 'sfc', preco: 45.90, destaque: true,
    desc: 'Frango 200g em cubos na chapa, bacon pedaçudo, queijo americano, maionese do Reino (especialidade da casa), alface americana, cebola e picles. Crocância, sabor e respeito no mesmo lanche.' },
  { cat: 'lanches', nome: 'Melt Bacon', img: 'melt-bacon', preco: 52.90,
    desc: 'Carne 170g, cheddar fatia, cheddar cremoso, bacon, cebola caramelizada, picles mccoys, maionese secretinha.' },
  { cat: 'lanches', nome: 'Black Melt', img: 'black-melt', preco: 52.90,
    desc: 'Dois hambúrgueres de 170g com cebola na chapa, cheddar cremoso, cebola crispy e nossa maionese secretinha. Um soco de sabor. É o nosso Patty Melt.' },
  { cat: 'lanches', nome: 'Sabinos Bacon', img: 'sabinos-bacon', preco: 49.90,
    desc: 'Carne 170g, american cheese, catupiry, bacon em cubinhos, tomate e maionese secretinha.' },
  { cat: 'lanches', nome: 'American Hype', img: 'american-hype', preco: 37.90,
    desc: 'Uma referência da américa, sabor viciante. Carne 170g, queijo americano, mostarda no ponto, maionese secretinha, ketchup, pickles e cebola picada. Um prensado com hype de verdade.' },
  { cat: 'lanches', nome: 'Vegetariano', img: 'vegetariano', preco: 58.90,
    desc: 'Mix de cogumelos refogados, gorgonzola marcante, alface, tomate, cebola e maionese secretinha. Sabor intenso, zero carne. Um prensado vegetariano de respeito.' },
  { cat: 'lanches', nome: 'Prenssadim', img: 'prenssadim', preco: 29.90,
    desc: 'Nosso pão, carne e queijo: carne 170g, queijo americano, ketchup, mostarda e a maionese secretinha. Delicado, gostoso e aprovado pelos pequenos (e grandes também).' },

  /* ---------- DUPLOS ---------- */
  { cat: 'duplos', nome: 'Duplo Melt Bacon', img: 'duplo-melt-bacon', preco: 65.90,
    desc: 'Duas carnes de 170g, cheddar fatia, muito mais cheddar cremoso, bacon crocante, cebola caramelizada, picles mccoys, maionese secretinha.' },
  { cat: 'duplos', nome: 'Duplo Sabinos Bacon', img: 'duplo-sabinos-bacon', preco: 65.90,
    desc: 'Duas carnes de 170g, american cheese, muito mais catupiry, bacon crocante, tomate em cubinhos, maionese secretinha.' },
  { cat: 'duplos', nome: 'Duplo Baconzitos', img: 'duplo-baconzitos', preco: 59.90,
    desc: 'Dois hambúrgueres de 170g de carne, bacon pedaçudos, cebola chapeada, 2x american cheese escorrendo e maionese secretinha. Com tomate e ketchup pra fechar do jeito certo!' },
  { cat: 'duplos', nome: 'Duplo Sabinos', img: 'duplo-sabinos', preco: 56.90,
    desc: 'Dois hambúrgueres de 170g de carne suculenta, american cheese derretendo, muiiitoo Catupiry, cheddar e aquela maionese secretinha. É cremosidade no talo, prensado no grau.' },
  { cat: 'duplos', nome: 'Duplo American Hype', img: 'duplo-american-hype', preco: 54.90,
    desc: 'Dois hambúrgueres de 170g de carne, 2x american cheese, mostarda, maionese secretinha, ketchup, pickles, cebola picada. Combinação clássica, sabor absurdo!' },
  { cat: 'duplos', nome: 'Duplo Salad', img: 'duplo-salad', preco: 52.90,
    desc: 'Dois hambúrgueres de 170g de carne, 2x american cheese, 2x cheddar, alfaceee americana crocante, tomate fresquinho e maionese secretinha. Crocante, irresistível.' },
  { cat: 'duplos', nome: 'Duplo Prenssadim', img: 'duplo-prenssadim', preco: 49.90,
    desc: 'Nosso pão, carne e queijo DUPLO: dois hambúrgueres de 170g, queijo americano, ketchup, mostarda e a maionese secretinha. O simples que deu certo!' },

  /* ---------- BATATITA ---------- */
  { cat: 'batatita', nome: 'Fritas sequinha', img: 'fritas', preco: 12.00,
    desc: 'Nossa batata frita: sequinha, crocante e salgada no ponto. Sozinha ela já se defende — com a secretinha por cima, vira outra coisa.' },

  /* ---------- MAIONESES ---------- */
  { cat: 'maioneses', nome: 'Maionese Secretinha', img: 'maionese-secretinha', preco: 5.50, ardencia: 0,
    desc: 'Maionese marcante, o segredo da casa está aqui!' },
  { cat: 'maioneses', nome: 'Picantonese', img: 'picantonese', preco: 5.50, ardencia: 2,
    desc: 'Aqui a maionese de pimenta não vem pra brigar, vem pra flertar. Cremosa, saborosa e com aquela ardência leve que dá só um “tapinha” no seu paladar — nada de susto, só emoção controlada!' },
  { cat: 'maioneses', nome: 'Molho Estressadinho', img: 'molho-estressadinho', preco: 5.50, ardencia: 4,
    desc: 'Aqui a pimenta não flerta… ela chega chegando. Cremosa, intensa e feita com pimenta dedo de moça — é sabor com atitude! Vai dar aquele upgrade monstro no seu lanche… mas já deixa a bebida por perto.' },
  { cat: 'maioneses', nome: 'Hulk', img: 'hulk', preco: 5.50, ardencia: 0,
    desc: 'Nossa maionese verde. Não é só maionese… é o toque que muda tudo no lanche. Cremosa na medida certa, com ervas selecionadas e aquele frescor marcante que bate já na primeira mordida.' },
  { cat: 'maioneses', nome: 'Pepanese', img: 'pepanese', preco: 5.50, ardencia: 0,
    desc: 'Maionese de bacon. Cremosa daquele jeito absurdo e carregada no sabor defumado que bate forte e conquista fácil. Passou no lanche, virou outro nível.' },

  /* ---------- ACOMPANHAMENTOS ---------- */
  { cat: 'acompanhamentos', nome: '8 Almofadinhas de Queijo Gouda', img: 'almofadinhas', preco: 29.90,
    desc: '8 unidades da nossa deliciosa almofadinha de queijo gouda.' },
  { cat: 'acompanhamentos', nome: '6 Almofadinhas de Queijo Gouda', img: 'almofadinhas', preco: 23.90,
    desc: '6 unidades da nossa deliciosa almofadinha de queijo gouda.' },
  { cat: 'acompanhamentos', nome: '3 Almofadinhas de Queijo Gouda', img: 'almofadinhas', preco: 16.90,
    desc: '3 unidades da nossa deliciosa almofadinha de queijo gouda.' },
  { cat: 'acompanhamentos', nome: '8 Bolinhos de Mandioca c/ Carne Seca', img: 'bolinho-mandioca', preco: 31.00,
    desc: '8 unidades do nosso delicioso bolinho de mandioca com carne seca.' },
  { cat: 'acompanhamentos', nome: '6 Bolinhos de Mandioca c/ Carne Seca', img: 'bolinho-mandioca', preco: 24.50,
    desc: '6 unidades do nosso delicioso bolinho de mandioca com carne seca.' },
  { cat: 'acompanhamentos', nome: '3 Bolinhos de Mandioca c/ Carne Seca', img: 'bolinho-mandioca', preco: 17.50,
    desc: '3 unidades do nosso delicioso bolinho de mandioca com carne seca.' },

  /* ---------- BEBIDAS ---------- */
  { cat: 'bebidas', nome: 'Coca-Cola Lata 350ml', img: 'coca-lata', preco: 8.50,
    desc: 'Clássica, gelada e indispensável. Aquele gole que combina perfeitamente com o prensado.' },
  { cat: 'bebidas', nome: 'Coca-Cola Zero Lata 350ml', img: 'coca-zero', preco: 8.50, desc: 'Lata 350ml, bem gelada.' },
  { cat: 'bebidas', nome: 'Guaraná Zero 350ml', img: 'guarana-zero', preco: 8.50, desc: 'Lata 350ml, bem gelada.' },
  { cat: 'bebidas', nome: 'Sprite Zero 350ml', img: 'sprite-zero', preco: 8.50, desc: 'Lata 350ml, bem gelada.' },
  { cat: 'bebidas', nome: 'Refriko Tubaína 300ml', img: 'tubaina', preco: 7.00, desc: 'Aquela tubaína de sempre, 300ml.' },
  { cat: 'bebidas', nome: 'Suco Del Valle Uva 290ml', img: 'suco-uva', preco: 8.50, desc: 'Néctar de uva, lata 290ml.' },
  { cat: 'bebidas', nome: 'Suco Del Valle Maracujá 290ml', img: 'suco-maracuja', preco: 8.50, desc: 'Néctar de maracujá, lata 290ml.' },
  { cat: 'bebidas', nome: 'Suco Natural Sunap Laranja 330ml', img: 'suco-laranja', preco: 9.00, desc: 'Suco natural de laranja, 330ml.' },
  { cat: 'bebidas', nome: 'Cerveja Spaten Puro Malte 350ml', img: 'spaten', preco: 9.00, desc: 'Lata sleek 350ml, puro malte.' },
  { cat: 'bebidas', nome: 'Água sem gás Crystal 500ml', img: 'agua-sem-gas', preco: 4.00, desc: 'Garrafa 500ml.' },
  { cat: 'bebidas', nome: 'Água com gás Crystal 500ml', img: 'agua-com-gas', preco: 5.00, desc: 'Garrafa 500ml.' },
];
