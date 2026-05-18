function aplicarAjustesDeNavegacaoLateral() {
  if (document.getElementById("ajuste-navegacao-lateral")) return;

  const estilo = document.createElement("style");
  estilo.id = "ajuste-navegacao-lateral";
  estilo.textContent = `
    .dh-nav{
      max-height:calc(100vh - 120px) !important;
      overflow-y:auto !important;
      padding-right:14px !important;
      scrollbar-width:thin;
      scrollbar-color:#7d6b64 #241d1c;
    }

    .dh-nav::-webkit-scrollbar{width:8px;}
    .dh-nav::-webkit-scrollbar-track{background:#241d1c;border-radius:999px;}
    .dh-nav::-webkit-scrollbar-thumb{background:#7d6b64;border-radius:999px;}

    @media(max-width:900px){
      .dh-nav{max-height:none !important;overflow-y:visible !important;padding-right:18px !important;}
    }
  `;

  document.head.appendChild(estilo);
}

function paginaHistoriaDireitosHumanos() {
  return location.pathname === "/direitos-humanos/historia-conceito-direitos-humanos.html" || location.pathname === "/direitos-humanos/historia-conceito-direitos-humanos";
}

function inserirImagemCapaDireitosHumanos() {
  if (!paginaHistoriaDireitosHumanos()) return;
  if (document.querySelector(".dh-capa-imagem")) return;

  const slot = document.querySelector(".dh-artigo .dh-image-slot");
  if (!slot) return;

  slot.outerHTML = `
    <figure class="dh-capa-imagem">
      <img src="/imagens/protestoira.webp" alt="Manifestação política no contexto da Revolução Iraniana de 1979, com cartaz sobre Constituição, progresso, liberdade intelectual e recusa do terror.">
      <figcaption>Manifestação política no contexto da Revolução Iraniana de 1979. O cartaz central reúne referências ao Islã, à Constituição, ao progresso, à liberdade intelectual e à recusa do terror, expressando a tensão entre promessa revolucionária, limitação constitucional do poder e risco de violência política.</figcaption>
    </figure>
  `;
}

function inserirImagemMagnaCarta() {
  if (!paginaHistoriaDireitosHumanos()) return;
  if (document.querySelector(".dh-imagem-magna-carta")) return;

  const tituloMagnaCarta = document.getElementById("magna-carta-de-1215-limitacao-juridica-do-poder-real");
  if (!tituloMagnaCarta) return;

  tituloMagnaCarta.insertAdjacentHTML("beforebegin", `
    <figure class="dh-imagem-secao dh-imagem-magna-carta dh-imagem-vertical">
      <img src="/imagens/dh-magna-carta-runnymede.png" alt="Representação histórica de João Sem Terra diante dos barões em Runnymede, no contexto da Magna Carta de 1215.">
      <figcaption>Representação histórica de João Sem Terra diante dos barões em Runnymede, no contexto da Magna Carta de 1215. A cena simboliza a contenção das arbitrariedades da Coroa e a afirmação de que o poder régio deveria submeter-se à lei.</figcaption>
    </figure>
  `);
}

function inserirImagemSeteBispos() {
  if (!paginaHistoriaDireitosHumanos()) return;
  if (document.querySelector(".dh-imagem-sete-bispos")) return;

  const titulo = document.getElementById("habeas-corpus-act-e-bill-of-rights-consolidacao-inglesa-das-garantias");
  if (!titulo) return;

  titulo.insertAdjacentHTML("beforebegin", `
    <figure class="dh-imagem-secao dh-imagem-sete-bispos">
      <img src="/imagens/dh-sete-bispos-1688.png" alt="Representação histórica dos Sete Bispos no contexto da crise política inglesa de 1688.">
      <figcaption>Representação histórica dos Sete Bispos no contexto da crise política inglesa de 1688. A cena simboliza a tensão entre autoridade da Coroa, liberdade de petição e consolidação de garantias jurídicas.</figcaption>
    </figure>
  `);
}

function inserirImagemDeclaracaoIndependencia() {
  if (!paginaHistoriaDireitosHumanos()) return;
  if (document.querySelector(".dh-imagem-declaracao-independencia")) return;

  const titulo = document.getElementById("revolucoes-americana-e-francesa-positivacao-dos-direitos");
  if (!titulo) return;

  titulo.insertAdjacentHTML("beforebegin", `
    <figure class="dh-imagem-secao dh-imagem-declaracao-independencia">
      <img src="/imagens/dh-declaracao-independencia-trumbull.jpg" alt="Pintura Declaration of Independence, de John Trumbull, representando a apresentação do projeto da Declaração de Independência ao Segundo Congresso Continental.">
      <figcaption>John Trumbull, <em>Declaration of Independence</em>, 1819. A pintura representa a apresentação do projeto da Declaração de Independência ao Segundo Congresso Continental, em 1776, simbolizando a passagem das ideias revolucionárias de liberdade e direitos para a forma documental e política.</figcaption>
    </figure>
  `);
}

function aplicarEstiloImagensDireitosHumanos() {
  if (document.getElementById("estilo-imagens-direitos-humanos")) return;

  const estilo = document.createElement("style");
  estilo.id = "estilo-imagens-direitos-humanos";
  estilo.textContent = `
    .dh-capa-imagem{
      margin:34px 0 42px;padding:0;border-radius:20px;overflow:hidden;background:#161313;border:1px solid #2f2424;box-shadow:0 16px 38px rgba(0,0,0,.14);
    }

    .dh-capa-imagem img{display:block;width:100%;height:auto;filter:grayscale(100%);}

    .dh-capa-imagem figcaption,
    .dh-imagem-secao figcaption{
      margin:0;padding:16px 20px 18px;background:#1e1918;color:#eadfd4;font-size:14.5px;line-height:1.65;text-align:left;border-top:1px solid rgba(255,255,255,.10);
    }

    .dh-imagem-secao{
      margin:48px auto 42px;padding:0;border-radius:20px;overflow:hidden;background:#161313;border:1px solid #2f2424;box-shadow:0 14px 34px rgba(0,0,0,.12);
    }

    .dh-imagem-secao img{display:block;width:100%;height:auto;filter:grayscale(100%);}
    .dh-imagem-sete-bispos{max-width:620px;}
    .dh-imagem-sete-bispos img{filter:brightness(0.99) contrast(1.03) saturate(0.97);}
    .dh-imagem-declaracao-independencia img{filter:brightness(0.96) contrast(1.04) saturate(0.92);}
    .dh-imagem-vertical{max-width:560px;}

    @media(max-width:900px){
      .dh-capa-imagem,.dh-imagem-secao{margin:28px 0 34px;border-radius:16px;}
      .dh-capa-imagem figcaption,.dh-imagem-secao figcaption{font-size:13.5px;padding:14px 16px 16px;}
      .dh-imagem-vertical,.dh-imagem-sete-bispos{max-width:100%;}
    }
  `;

  document.head.appendChild(estilo);
}

aplicarAjustesDeNavegacaoLateral();
aplicarEstiloImagensDireitosHumanos();
inserirImagemCapaDireitosHumanos();
inserirImagemMagnaCarta();
inserirImagemSeteBispos();
inserirImagemDeclaracaoIndependencia();

function iniciarMenu() {
  const menu = document.querySelector(".menu-links");
  const botao = document.querySelector(".menu-botao");
  const botaoFechar = document.querySelector(".menu-fechar");

  if (!menu || !botao || !botaoFechar) return;

  botao.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  botaoFechar.addEventListener("click", () => {
    menu.classList.remove("active");
  });

  document.addEventListener("click", (e) => {
    const clicouDentroMenu = menu.contains(e.target);
    const clicouNoBotao = botao.contains(e.target);

    if (!clicouDentroMenu && !clicouNoBotao) {
      menu.classList.remove("active");
    }
  });
}
