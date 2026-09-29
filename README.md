# Sabino's Lanches — Site

Site institucional e cardápio digital da **Sabino's Lanches**, hamburgueria de
prensados em Londrina/PR.

🔗 **Site no ar:** https://eczp999.github.io/sabinos/

---

## Sobre

Hamburgueria na Av. Maringá, 1550, especializada em **prensados** — pão dourado
na chapa, 170g de carne e a maionese secretinha da casa.

O site traz o cardápio completo (44 itens em 7 categorias, todos com foto),
e o pedido é finalizado no Anota Aí: clicou no lanche, abre um pop-up com os
detalhes e o botão que leva direto para a plataforma.

## Como rodar localmente

Não tem build nem dependência. Basta abrir o `index.html` no navegador.

Para servir por HTTP (recomendado, para o carregamento das imagens se comportar
igual à produção):

```bash
python -m http.server 5181
```

E acessar `http://localhost:5181`.

## Estrutura

```
index.html              a página inteira
assets/css/estilo.css   estilos (tokens da marca no topo do arquivo)
assets/js/dados.js      ← cardápio, preços, horários e contato
assets/js/site.js       comportamento (modal, filtros, selo de "aberto agora")
assets/img/menu/        40 fotos .webp com fundo recortado
assets/img/_originais/  os .png originais do Anota Aí (backup)
LEIA-ME.md              documentação completa do projeto
```

Para manutenção do dia a dia — preço, descrição, item novo, horário — mexe-se
apenas em `assets/js/dados.js`. Tudo comentado em português.

Detalhes de implementação, decisões de design e pendências estão no
[LEIA-ME.md](LEIA-ME.md).

## Stack

HTML, CSS e JavaScript puros. Sem framework, sem build, sem dependência externa
além das fontes do Google (Anton + Barlow). Hospedado no GitHub Pages.

## Licença

GPL-3.0 — ver [LICENSE](LICENSE).
