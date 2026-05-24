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

function inserirImagemSecaoOito() {
  if (!paginaHistoriaDireitosHumanos()) return;
  if (document.querySelector(".dh-imagem-secao-oito")) return;

  const titulo = document.getElementById("seculo-xix-industrializacao-democracia-e-direitos-sociais");
  if (!titulo) return;

  const arquivo = "/imagens/imagensdh-" + "traba" + "lhadores" + "-fabrica-algodao-1908.jpg";
  titulo.insertAdjacentHTML("beforebegin", `
    <figure class="dh-imagem-secao dh-imagem-secao-oito">
      <img src="${arquivo}" alt="Fotografia em fábrica de algodão, 1908.">
      <figcaption>Fotografia de Lewis Hine em fábrica de algodão, 1908. A imagem introduz o debate sobre industrialização, questão social e formação dos direitos sociais.</figcaption>
    </figure>
  `);
}

function inserirImagemSecaoNove() {
  if (!paginaHistoriaDireitosHumanos()) return;
  if (document.querySelector(".dh-imagem-secao-nove")) return;

  const titulo = document.getElementById("seculo-xx-guerras-mundiais-e-crise-da-protecao-interna");
  if (!titulo) return;

  const arquivo = "/imagens/dh-ohrdruf-1945-crise-direitos-humanos.jpg";
  titulo.insertAdjacentHTML("beforebegin", `
    <figure class="dh-imagem-secao dh-imagem-secao-nove">
      <div class="dh-aviso-imagem">Registro histórico sensível</div>
      <img src="${arquivo}" alt="Registro histórico de Ohrdruf, Alemanha, abril de 1945.">
      <figcaption>Registro histórico de Ohrdruf, Alemanha, abril de 1945. A imagem introduz a discussão sobre a crise da proteção interna dos direitos e a necessidade de uma ordem internacional fundada na dignidade humana.</figcaption>
    </figure>
  `);
}

function inserirImagemSecaoDez() {
  if (!paginaHistoriaDireitosHumanos()) return;
  if (document.querySelector(".dh-imagem-secao-dez")) return;

  const titulo = document.getElementById("onu-e-declaracao-universal-de-1948");
  if (!titulo) return;

  const arquivo = "/imagens/imagensdh-" + "criancas-declaracao-universal-direitos-humanos.jpg";
  titulo.insertAdjacentHTML("beforebegin", `
    <figure class="dh-imagem-secao dh-imagem-secao-dez">
      <img src="${arquivo}" alt="Crianças observam uma cópia da Declaração Universal dos Direitos Humanos.">
      <figcaption>Crianças observam uma cópia da Declaração Universal dos Direitos Humanos. A imagem simboliza a passagem da experiência histórica da guerra para uma linguagem internacional de dignidade, educação, paz e proteção da pessoa humana.</figcaption>
    </figure>
  `);
}

function inserirImagemSecaoOnze() {
  if (!paginaHistoriaDireitosHumanos()) return;
  if (document.querySelector(".dh-imagem-secao-onze")) return;

  const titulo = document.getElementById("a-constituicao-brasileira-de-1988-e-a-recepcao-dos-direitos-humanos");
  if (!titulo) return;

  const arquivo = "/imagens/imagensdh-redemocratizacao-brasil-amanha-outro-dia.webp";
  titulo.insertAdjacentHTML("beforebegin", `
    <figure class="dh-imagem-secao dh-imagem-secao-onze">
      <img src="${arquivo}" alt="Manifestação popular no Brasil com faixa Amanhã vai ser outro dia.">
      <figcaption>Manifestação popular no contexto da resistência à ditadura militar brasileira e da luta pela redemocratização. A faixa “Amanhã vai ser outro dia!” sintetiza a esperança democrática que antecede a Constituição de 1988, marco interno da dignidade da pessoa humana e dos direitos fundamentais no Brasil.</figcaption>
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
    .dh-imagem-secao-oito img{filter:brightness(0.98) contrast(1.04) saturate(0.96);}
    .dh-imagem-secao-nove img{filter:grayscale(100%) brightness(0.94) contrast(1.08);}
    .dh-imagem-secao-dez img{filter:grayscale(100%) brightness(1.02) contrast(0.98);}
    .dh-imagem-secao-onze img{filter:grayscale(100%) brightness(1.02) contrast(1.04);}
    .dh-aviso-imagem{padding:12px 18px;background:#120f0f;color:#eadfd4;font-size:13px;letter-spacing:.04em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.12);}
    .dh-imagem-vertical{max-width:560px;}

    @media(max-width:900px){
      .dh-capa-imagem,.dh-imagem-secao{margin:28px 0 34px;border-radius:16px;}
      .dh-capa-imagem figcaption,.dh-imagem-secao figcaption{font-size:13.5px;padding:14px 16px 16px;}
      .dh-imagem-vertical,.dh-imagem-sete-bispos{max-width:100%;}
    }
  `;

  document.head.appendChild(estilo);
}

function aplicarIdentidadeLeituraEstadoPoder() {
  const paginaEstadoPoder = location.pathname.startsWith("/filosofia/estado-e-poder/");
  const possuiLayoutLeitura = Boolean(document.querySelector(".layout-leitura"));

  if (!paginaEstadoPoder || !possuiLayoutLeitura) return;
  if (document.getElementById("estilo-leitura-estado-poder")) return;

  document.body.classList.add("ep-leitura-interna");

  const estilo = document.createElement("style");
  estilo.id = "estilo-leitura-estado-poder";
  estilo.textContent = `
    body.ep-leitura-interna{
      background:
        radial-gradient(circle at 50% 0%,rgba(214,173,92,.13),transparent 32%),
        radial-gradient(circle at 18% 18%,rgba(255,255,255,.08),transparent 26%),
        linear-gradient(180deg,#3a3f46 0%,#2d3238 52%,#23282e 100%) !important;
      color:#f5f1e8;
    }

    body.ep-leitura-interna::before{
      content:"";
      position:fixed;
      inset:0;
      pointer-events:none;
      opacity:.10;
      background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);
      background-size:7px 7px;
      z-index:-1;
    }

    body.ep-leitura-interna header{
      background:rgba(31,35,40,.95) !important;
      border-bottom:1px solid rgba(214,173,92,.34) !important;
      backdrop-filter:blur(8px);
    }

    body.ep-leitura-interna .brand,
    body.ep-leitura-interna .brand a,
    body.ep-leitura-interna .menu-links a{
      color:#f5f1e8 !important;
    }

    body.ep-leitura-interna .menu-botao{
      border-color:rgba(214,173,92,.50) !important;
      color:#f1d28a !important;
    }

    body.ep-leitura-interna .menu-links{
      background:#23282e !important;
      border-right:1px solid rgba(214,173,92,.34) !important;
    }

    body.ep-leitura-interna .menu-fechar{color:#f5f1e8 !important;}

    body.ep-leitura-interna .hero{
      margin-top:34px;
      margin-bottom:34px;
      padding:44px 42px 40px !important;
      border:1px solid rgba(214,173,92,.32);
      border-radius:26px;
      background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(0,0,0,.12));
      box-shadow:0 20px 48px rgba(0,0,0,.22);
      text-align:center;
    }

    body.ep-leitura-interna .logo-trabalho{margin-bottom:22px !important;}
    body.ep-leitura-interna .logo-trabalho img{max-width:130px !important;filter:drop-shadow(0 8px 18px rgba(0,0,0,.28));}

    body.ep-leitura-interna .categoria{
      color:#f1d28a !important;
      letter-spacing:1.8px;
    }

    body.ep-leitura-interna .titulo-principal{
      max-width:900px;
      margin:0 auto 16px !important;
      color:#f7f2e8 !important;
      font-size:clamp(32px,4.6vw,54px) !important;
      line-height:1.12 !important;
      text-shadow:0 4px 14px rgba(0,0,0,.38);
    }

    body.ep-leitura-interna .subtitulo,
    body.ep-leitura-interna .hero p{
      color:#d9cfbf !important;
    }

    body.ep-leitura-interna .botao-imprimir{
      border:1px solid rgba(214,173,92,.50) !important;
      background:#23282e !important;
      color:#f1d28a !important;
      border-radius:999px;
      box-shadow:0 10px 24px rgba(0,0,0,.18);
    }

    body.ep-leitura-interna .layout-leitura{
      gap:32px !important;
      align-items:start;
    }

    body.ep-leitura-interna .controle-texto{
      background:#23282e !important;
      border:1px solid rgba(214,173,92,.34) !important;
      border-radius:22px !important;
      color:#f5f1e8 !important;
      box-shadow:0 18px 42px rgba(0,0,0,.24) !important;
      scrollbar-color:#d6ad5c #2d3238 !important;
    }

    body.ep-leitura-interna .controle-texto h2{color:#f7f2e8 !important;}
    body.ep-leitura-interna .controle-texto p{color:#d9cfbf !important;}

    body.ep-leitura-interna .controle-texto a{
      color:#f1d28a !important;
      background:rgba(255,255,255,.055) !important;
      border:1px solid rgba(214,173,92,.26) !important;
      border-radius:13px !important;
      transition:background .18s ease,border-color .18s ease,transform .18s ease;
    }

    body.ep-leitura-interna .controle-texto a:hover{
      background:rgba(214,173,92,.14) !important;
      border-color:rgba(214,173,92,.55) !important;
      transform:translateX(2px);
    }

    body.ep-leitura-interna .controle-texto::-webkit-scrollbar-track{background:#2d3238 !important;}
    body.ep-leitura-interna .controle-texto::-webkit-scrollbar-thumb{background:#d6ad5c !important;}

    body.ep-leitura-interna .conteudo-leitura .texto{
      max-width:820px !important;
      padding:46px 54px;
      border:1px solid rgba(214,173,92,.42);
      border-radius:26px;
      background:#f6f0e5;
      color:#27231d;
      box-shadow:0 24px 58px rgba(0,0,0,.28);
    }

    body.ep-leitura-interna .texto p{
      color:#2b2721;
      text-align:justify;
    }

    body.ep-leitura-interna .texto h2{
      color:#765420;
      border-bottom:1px solid rgba(118,84,32,.22);
      padding-bottom:8px;
    }

    body.ep-leitura-interna .texto h3{color:#8b672d;}
    body.ep-leitura-interna .texto a{color:#6d4d1d;}

    body.ep-leitura-interna .assinatura-texto p{color:#4c3f2c !important;}
    body.ep-leitura-interna .local-data{color:#6c6254 !important;}

    body.ep-leitura-interna .link-retorno a{
      color:#7b663b !important;
      border-bottom:1px solid rgba(123,102,59,.36);
    }

    body.ep-leitura-interna .figura-larga img,
    body.ep-leitura-interna .texto figure:not(.autor-retrato):not(.deusa-retrato):not(.figura-larga) img{
      border:1px solid rgba(214,173,92,.38) !important;
      box-shadow:0 14px 34px rgba(0,0,0,.16) !important;
    }

    @media(max-width:900px){
      body.ep-leitura-interna .hero{padding:34px 24px 32px !important;border-radius:20px;}
      body.ep-leitura-interna .conteudo-leitura .texto{padding:32px 24px;border-radius:20px;}
    }

    @media print{
      body.ep-leitura-interna{background:#fff !important;color:#000 !important;}
      body.ep-leitura-interna::before{display:none !important;}
      body.ep-leitura-interna .hero,
      body.ep-leitura-interna .conteudo-leitura .texto{
        background:#fff !important;
        border:none !important;
        border-radius:0 !important;
        box-shadow:none !important;
        color:#000 !important;
      }
      body.ep-leitura-interna .controle-texto{display:none !important;}
    }
  `;

  document.head.appendChild(estilo);
}

aplicarAjustesDeNavegacaoLateral();
aplicarEstiloImagensDireitosHumanos();
aplicarIdentidadeLeituraEstadoPoder();
inserirImagemCapaDireitosHumanos();
inserirImagemMagnaCarta();
inserirImagemSeteBispos();
inserirImagemDeclaracaoIndependencia();
inserirImagemSecaoOito();
inserirImagemSecaoNove();
inserirImagemSecaoDez();
inserirImagemSecaoOnze();

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