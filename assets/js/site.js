/* ==========================================================================
   SABINO'S LANCHES — comportamento do site
   Depende de dados.js (CONFIG, CATEGORIAS, PRODUTOS).
   Baunilha pura: sem framework, sem build, sem dependência externa.
   ========================================================================== */
(function () {
  'use strict';

  const $  = (s, ctx) => (ctx || document).querySelector(s);
  const $$ = (s, ctx) => Array.from((ctx || document).querySelectorAll(s));

  const preco = (v) => 'R$ ' + v.toFixed(2).replace('.', ',');
  const imagemDe = (p) => 'assets/img/menu/' + p.img + '.webp';
  const nomeCategoria = (id) => (CATEGORIAS.find((c) => c.id === id) || {}).nome || '';

  /* ====================================================================
     1. LINKS DE PEDIDO
     Tudo que tem [data-pedir] aponta para o Anota Aí. O WhatsApp só entra
     em cena quando CONFIG.whatsapp estiver preenchido.
     ==================================================================== */
  function linkZap(texto) {
    if (!CONFIG.whatsapp) return null;
    return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto);
  }

  function ligarBotoesDePedido() {
    $$('[data-pedir]').forEach((el) => {
      el.href = CONFIG.anotaAi;
      el.target = '_blank';
      el.rel = 'noopener';
    });
  }

  /* ====================================================================
     2. CARTÃO DE PRODUTO
     ==================================================================== */
  const svgSacola =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M6 7h13l-1.2 9.2a2 2 0 01-2 1.8H9.2a2 2 0 01-2-1.8L6 7zM6 7L5.2 4H3" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<circle cx="10" cy="20" r="1.3" fill="currentColor"/><circle cx="16" cy="20" r="1.3" fill="currentColor"/></svg>';

  function montarCartao(p, indice) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cartao';
    b.dataset.produto = String(indice);
    b.setAttribute('aria-label', 'Ver detalhes de ' + p.nome + ', ' + preco(p.preco));

    const desconto = p.precoDe ? Math.round((1 - p.preco / p.precoDe) * 100) : 0;

    b.innerHTML =
      '<span class="cartao__img">' +
        (desconto ? '<span class="selo-promo">-' + desconto + '%</span>' : '') +
        '<img src="' + imagemDe(p) + '" alt="' + p.nome + '" width="200" height="200" loading="lazy" decoding="async">' +
      '</span>' +
      '<span class="cartao__corpo">' +
        '<span class="cartao__nome">' + p.nome + '</span>' +
        '<span class="cartao__desc">' + p.desc + '</span>' +
        '<span class="cartao__rodape">' +
          '<span class="cartao__preco">' +
            (p.precoDe ? '<s>' + preco(p.precoDe) + '</s>' : '') +
            '<b>' + preco(p.preco) + '</b>' +
          '</span>' +
          '<span class="cartao__acao" aria-hidden="true">' + svgSacola + '</span>' +
        '</span>' +
      '</span>';

    return b;
  }

  /* ====================================================================
     3. VITRINE (destaques da home)
     ==================================================================== */
  function montarVitrine() {
    const alvo = $('#vitrine-grade');
    if (!alvo) return;
    PRODUTOS.forEach((p, i) => {
      if (p.destaque) alvo.appendChild(montarCartao(p, i));
    });
  }

  /* ====================================================================
     4. CARDÁPIO COMPLETO + FILTROS
     ==================================================================== */
  function montarCardapio() {
    const lista = $('#cardapio-lista');
    const barra = $('#filtros');
    if (!lista || !barra) return;

    /* --- grupos por categoria --- */
    CATEGORIAS.forEach((cat) => {
      const itens = PRODUTOS.map((p, i) => ({ p, i })).filter((o) => o.p.cat === cat.id);
      if (!itens.length) return;

      const sec = document.createElement('section');
      sec.className = 'grupo';
      sec.id = 'cat-' + cat.id;
      sec.dataset.categoria = cat.id;

      const cab = document.createElement('header');
      cab.className = 'grupo__cabeca';
      cab.innerHTML =
        '<h3>' + cat.nome + '</h3>' +
        '<span>' + cat.chamada + '</span>' +
        '<em>' + itens.length + (itens.length > 1 ? ' itens' : ' item') + '</em>';

      const grade = document.createElement('div');
      grade.className = 'grupo__grade';
      itens.forEach((o) => grade.appendChild(montarCartao(o.p, o.i)));

      sec.append(cab, grade);
      lista.appendChild(sec);
    });

    /* --- botões de filtro --- */
    const filtros = [{ id: 'tudo', nome: 'Tudo' }].concat(
      CATEGORIAS.filter((c) => PRODUTOS.some((p) => p.cat === c.id))
    );

    filtros.forEach((f, idx) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'filtro';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      b.dataset.filtro = f.id;
      b.textContent = f.nome;
      barra.appendChild(b);
    });

    barra.addEventListener('click', (e) => {
      const b = e.target.closest('.filtro');
      if (!b) return;
      aplicarFiltro(b.dataset.filtro);
      $$('.filtro', barra).forEach((x) => x.setAttribute('aria-selected', String(x === b)));
      b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });

    /* navegação por teclado entre as abas de categoria */
    barra.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const abas = $$('.filtro', barra);
      const atual = abas.indexOf(document.activeElement);
      if (atual < 0) return;
      e.preventDefault();
      const prox = abas[(atual + (e.key === 'ArrowRight' ? 1 : abas.length - 1)) % abas.length];
      prox.focus();
      prox.click();
    });
  }

  function aplicarFiltro(id) {
    $$('.grupo').forEach((g) => {
      g.hidden = !(id === 'tudo' || g.dataset.categoria === id);
    });
    // mantém a barra de filtros à vista ao trocar de categoria
    const sec = $('#cardapio');
    if (sec && sec.getBoundingClientRect().top < -40) {
      window.scrollTo({ top: sec.offsetTop - 20, behavior: 'smooth' });
    }
  }

  /* ====================================================================
     5. MOLHOS
     ==================================================================== */
  function montarMolhos() {
    const alvo = $('#molhos-grade');
    if (!alvo) return;

    PRODUTOS.forEach((p, i) => {
      if (p.cat !== 'maioneses') return;

      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'molho';
      b.dataset.produto = String(i);
      b.setAttribute('aria-label', 'Ver detalhes de ' + p.nome);

      b.innerHTML =
        '<img src="' + imagemDe(p) + '" alt="' + p.nome + '" width="200" height="200" loading="lazy" decoding="async">' +
        '<h3>' + p.nome + '</h3>' +
        '<span class="molho__preco">' + preco(p.preco) + '</span>' +
        (p.ardencia ? barraArdencia(p.ardencia) : '<span class="ardencia--zero">Sem pimenta</span>');

      alvo.appendChild(b);
    });
  }

  function barraArdencia(nivel) {
    let s = '<span class="ardencia"><span class="ardencia__rotulo">Ardência</span>';
    for (let i = 1; i <= 5; i++) {
      s += '<span class="ardencia__nivel' + (i <= nivel ? ' ardencia__nivel--on' : '') + '"></span>';
    }
    return s + '</span>';
  }

  /* ====================================================================
     6. MODAL DO PRODUTO
     Abre ao clicar num lanche, mostra os detalhes e leva ao Anota Aí.
     ==================================================================== */
  const modal = {
    caixa: $('#modal'),
    painel: $('#modalCaixa'),
    ultimoFoco: null,

    abrir(p) {
      if (!this.caixa) return;
      this.ultimoFoco = document.activeElement;

      $('#modalImagem').src = imagemDe(p);
      $('#modalImagem').alt = p.nome;
      $('#modalCategoria').textContent = nomeCategoria(p.cat);
      $('#modalTitulo').textContent = p.nome;
      $('#modalDesc').textContent = p.desc;

      const desconto = p.precoDe ? Math.round((1 - p.preco / p.precoDe) * 100) : 0;
      $('#modalPreco').innerHTML =
        '<b>' + preco(p.preco) + '</b>' +
        (p.precoDe ? '<s>' + preco(p.precoDe) + '</s><span class="selo-promo">-' + desconto + '%</span>' : '');

      const ard = $('#modalArdencia');
      if (p.ardencia) {
        ard.innerHTML = barraArdencia(p.ardencia);
        ard.hidden = false;
      } else {
        ard.hidden = true;
      }

      $('#modalAnota').href = CONFIG.anotaAi;

      const zap = $('#modalZap');
      const url = linkZap('Olá! Vim pelo site e queria pedir o ' + p.nome + ' (' + preco(p.preco).replace(' ', ' ') + '). Tem disponível?');
      if (url) { zap.href = url; zap.hidden = false; } else { zap.hidden = true; }

      this.caixa.hidden = false;
      document.body.style.overflow = 'hidden';
      this.painel.scrollTop = 0;
      $('#fecharModal').focus();
    },

    fechar() {
      if (!this.caixa || this.caixa.hidden) return;
      this.caixa.hidden = true;
      document.body.style.overflow = '';
      if (this.ultimoFoco) this.ultimoFoco.focus();
    },

    /* mantém o Tab preso dentro do diálogo enquanto ele estiver aberto */
    prenderFoco(e) {
      if (e.key !== 'Tab' || this.caixa.hidden) return;
      const focaveis = $$('a[href], button:not([disabled])', this.painel).filter((el) => !el.hidden && el.offsetParent !== null);
      if (!focaveis.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
    },
  };

  function ligarModal() {
    document.addEventListener('click', (e) => {
      const gatilho = e.target.closest('[data-produto]');
      if (gatilho) {
        const p = PRODUTOS[Number(gatilho.dataset.produto)];
        if (p) modal.abrir(p);
        return;
      }
      if (e.target.closest('[data-fechar-modal]') || e.target.closest('#fecharModal')) modal.fechar();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modal.fechar();
      modal.prenderFoco(e);
    });
  }

  /* ====================================================================
     7. HORÁRIOS — tabela + selo "aberto agora"
     ==================================================================== */
  const DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const emMinutos = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  };

  function estadoDaLoja(agora) {
    agora = agora || new Date();
    const minutos = agora.getHours() * 60 + agora.getMinutes();
    const hoje = agora.getDay();

    // 1) a janela de ontem ainda pode estar rolando (fechamento depois da meia-noite)
    const ontem = CONFIG.horarios[(hoje + 6) % 7];
    if (ontem) {
      const a = emMinutos(ontem.abre), f = emMinutos(ontem.fecha);
      if (f <= a && minutos < f) return { aberto: true, fecha: ontem.fecha };
    }

    // 2) a janela de hoje
    const j = CONFIG.horarios[hoje];
    if (j) {
      const a = emMinutos(j.abre);
      const f = emMinutos(j.fecha) <= a ? 24 * 60 : emMinutos(j.fecha);
      if (minutos >= a && minutos < f) return { aberto: true, fecha: j.fecha };
      if (minutos < a) return { aberto: false, abre: j.abre, dia: 'hoje' };
    }

    // 3) fechado — procura o próximo dia com atendimento
    for (let i = 1; i <= 7; i++) {
      const d = (hoje + i) % 7;
      if (CONFIG.horarios[d]) {
        return { aberto: false, abre: CONFIG.horarios[d].abre, dia: i === 1 ? 'amanhã' : DIAS[d].toLowerCase() };
      }
    }
    return { aberto: false };
  }

  function atualizarSelo() {
    const selo = $('#seloStatus');
    const txt = $('#seloStatusTexto');
    if (!selo || !txt) return;

    const e = estadoDaLoja();
    selo.classList.toggle('selo-status--aberto', e.aberto);
    selo.classList.toggle('selo-status--fechado', !e.aberto);

    if (e.aberto) txt.textContent = 'Aberto até ' + (e.fecha === '00:00' ? 'meia-noite' : e.fecha);
    else if (e.abre) txt.textContent = 'Abre ' + (e.dia === 'hoje' ? 'hoje' : e.dia) + ' às ' + e.abre;
    else txt.textContent = 'Fechado agora';
  }

  function montarTabelaHorarios() {
    const corpo = $('#tabelaHorarios tbody');
    if (!corpo) return;
    const hoje = new Date().getDay();

    // começa na segunda, termina no domingo
    [1, 2, 3, 4, 5, 6, 0].forEach((d) => {
      const j = CONFIG.horarios[d];
      const tr = document.createElement('tr');
      if (d === hoje) tr.className = 'hoje';
      if (!j) tr.className += ' fechado';
      tr.innerHTML =
        '<th scope="row">' + DIAS[d] + '</th>' +
        '<td>' + (j ? j.abre + ' – ' + (j.fecha === '00:00' ? '00:00' : j.fecha) : 'Fechado') + '</td>';
      corpo.appendChild(tr);
    });
  }

  function montarPagamentos() {
    const ul = $('#listaPagamentos');
    if (!ul) return;
    CONFIG.pagamentos.forEach((p) => {
      const li = document.createElement('li');
      li.textContent = p;
      ul.appendChild(li);
    });
  }

  /* ====================================================================
     8. TOPO: menu mobile, sombra ao rolar, link ativo
     ==================================================================== */
  function ligarTopo() {
    const topo = $('#topo');
    const nav = $('#navegacao');
    const botao = $('#abrirMenu');

    if (botao && nav) {
      botao.addEventListener('click', () => {
        const aberto = nav.classList.toggle('navegacao--aberta');
        botao.setAttribute('aria-expanded', String(aberto));
      });
      nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          nav.classList.remove('navegacao--aberta');
          botao.setAttribute('aria-expanded', 'false');
        }
      });
    }

    const flutuante = $('#flutuante');
    let ultimo = 0;

    const aoRolar = () => {
      const y = window.scrollY;
      if (topo) topo.classList.toggle('topo--rolado', y > 20);
      if (flutuante) flutuante.classList.toggle('flutuante--visivel', y > 520);
      ultimo = y;
    };

    let travado = false;
    window.addEventListener('scroll', () => {
      if (travado) return;
      travado = true;
      requestAnimationFrame(() => { aoRolar(); travado = false; });
    }, { passive: true });
    aoRolar();

    /* link ativo conforme a seção visível */
    const secoes = ['inicio', 'cardapio', 'historia', 'maioneses', 'visite']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if ('IntersectionObserver' in window && secoes.length) {
      const obs = new IntersectionObserver((entradas) => {
        entradas.forEach((en) => {
          if (!en.isIntersecting) return;
          $$('.navegacao a').forEach((a) => {
            a.classList.toggle('ativo', a.getAttribute('href') === '#' + en.target.id);
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      secoes.forEach((s) => obs.observe(s));
    }
  }

  /* ====================================================================
     9. FAIXA ROLANTE
     A animação desloca o trilho exatamente a largura de um grupo e reinicia,
     então a emenda não aparece. O que precisa ser calculado é QUANTOS grupos
     existem: no fim de cada volta o primeiro já saiu da tela, e o que restou
     tem de cobrir a largura toda do monitor. Em tela larga, duas cópias fixas
     não cobriam — era o buraco que aparecia.
     ==================================================================== */
  const VELOCIDADE_FAIXA = 32; // px por segundo — ritmo calmo, dá para ler

  function ligarFaixa() {
    const trilho = $('.faixa__trilho');
    if (!trilho) return;

    const montar = () => {
      const grupos = $$('.faixa__grupo', trilho);
      if (!grupos.length) return;

      // volta a um único grupo antes de medir, senão a conta acumula
      grupos.slice(1).forEach((g) => g.remove());
      const modelo = grupos[0];
      const largura = modelo.getBoundingClientRect().width;
      if (!largura) return;

      // +1 grupo para o que sai de cena, +1 de folga
      const necessarios = Math.ceil(window.innerWidth / largura) + 2;
      const fragmento = document.createDocumentFragment();
      for (let i = 1; i < necessarios; i++) fragmento.appendChild(modelo.cloneNode(true));
      trilho.appendChild(fragmento);

      trilho.style.setProperty('--faixa-largura', largura + 'px');
      trilho.style.setProperty('--faixa-dur', (largura / VELOCIDADE_FAIXA).toFixed(2) + 's');
    };

    montar();
    // a largura muda quando a fonte real substitui a de fallback
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(montar);

    let espera;
    window.addEventListener('resize', () => {
      clearTimeout(espera);
      espera = setTimeout(montar, 200);
    });
  }

  /* ====================================================================
     10. REVELAR AO ROLAR
     ==================================================================== */
  function ligarRevelacao() {
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alvos = $$('.secao__topo, .cartao, .pilares li, .cartao-info, .molho, .historia__texto, .mapa');

    if (semMovimento || !('IntersectionObserver' in window)) return;

    alvos.forEach((el, i) => {
      el.classList.add('revelar');
      el.style.transitionDelay = (i % 8) * 55 + 'ms';
    });

    const obs = new IntersectionObserver((entradas, o) => {
      entradas.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add('revelar--visivel');
        o.unobserve(el);
        // o atraso só serve para a entrada escalonada; mantê-lo deixaria
        // o hover do cartão lento depois. Some assim que a revelação acaba.
        el.addEventListener('transitionend', () => {
          el.style.transitionDelay = '';
          el.classList.remove('revelar');
        }, { once: true });
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });

    alvos.forEach((el) => obs.observe(el));
  }

  /* ====================================================================
     11. PARTIDA
     ==================================================================== */
  function iniciar() {
    montarVitrine();
    montarCardapio();
    montarMolhos();
    montarTabelaHorarios();
    montarPagamentos();
    ligarBotoesDePedido();
    ligarModal();
    ligarTopo();
    ligarFaixa();
    ligarRevelacao();
    atualizarSelo();
    setInterval(atualizarSelo, 60000); // o selo se corrige sozinho a cada minuto

    const ano = $('#ano');
    if (ano) ano.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
