function inserirEstiloUnico(id, css) {
  if (document.getElementById(id)) return;
  const estilo = document.createElement("style");
  estilo.id = id;
  estilo.textContent = css;
  document.head.appendChild(estilo);
}

function aplicarAjustesDeNavegacaoLateral() {
  inserirEstiloUnico("ajuste-navegacao-lateral", `
    .dh-nav{max-height:calc(100vh - 120px) !important;overflow-y:auto !important;padding-right:14px !important;scrollbar-width:thin;scrollbar-color:#7d6b64 #241d1c;}
    .dh-nav::-webkit-scrollbar{width:8px;}.dh-nav::-webkit-scrollbar-track{background:#241d1c;border-radius:999px;}.dh-nav::-webkit-scrollbar-thumb{background:#7d6b64;border-radius:999px;}
    @media(max-width:900px){.dh-nav{max-height:none !important;overflow-y:visible !important;padding-right:18px !important;}}
  `);
}

function paginaHistoriaDireitosHumanos() {
  return location.pathname === "/direitos-humanos/historia-conceito-direitos-humanos.html" || location.pathname === "/direitos-humanos/historia-conceito-direitos-humanos";
}

function inserirFiguraAntesDoTitulo(idTitulo, classe, src, alt, legenda, extraClasse = "") {
  if (!paginaHistoriaDireitosHumanos() || document.querySelector("." + classe)) return;
  const titulo = document.getElementById(idTitulo);
  if (!titulo) return;
  titulo.insertAdjacentHTML("beforebegin", `
    <figure class="dh-imagem-secao ${classe} ${extraClasse}">
      <img src="${src}" alt="${alt}">
      <figcaption>${legenda}</figcaption>
    </figure>`);
}

function inserirImagemCapaDireitosHumanos() {
  if (!paginaHistoriaDireitosHumanos() || document.querySelector(".dh-capa-imagem")) return;
  const slot = document.querySelector(".dh-artigo .dh-image-slot");
  if (!slot) return;
  slot.outerHTML = `
    <figure class="dh-capa-imagem">
      <img src="/imagens/protestoira.webp" alt="Manifestação política no contexto da Revolução Iraniana de 1979.">
      <figcaption>Manifestação política no contexto da Revolução Iraniana de 1979. O cartaz central reúne referências ao Islã, à Constituição, ao progresso, à liberdade intelectual e à recusa do terror, expressando a tensão entre promessa revolucionária, limitação constitucional do poder e risco de violência política.</figcaption>
    </figure>`;
}

function inserirImagensHistoriaDireitosHumanos() {
  inserirFiguraAntesDoTitulo("magna-carta-de-1215-limitacao-juridica-do-poder-real", "dh-imagem-magna-carta", "/imagens/dh-magna-carta-runnymede.png", "Representação histórica de João Sem Terra diante dos barões em Runnymede.", "Representação histórica de João Sem Terra diante dos barões em Runnymede, no contexto da Magna Carta de 1215. A cena simboliza a contenção das arbitrariedades da Coroa e a afirmação de que o poder régio deveria submeter-se à lei.", "dh-imagem-vertical");
  inserirFiguraAntesDoTitulo("habeas-corpus-act-e-bill-of-rights-consolidacao-inglesa-das-garantias", "dh-imagem-sete-bispos", "/imagens/dh-sete-bispos-1688.png", "Representação histórica dos Sete Bispos no contexto da crise política inglesa de 1688.", "Representação histórica dos Sete Bispos no contexto da crise política inglesa de 1688. A cena simboliza a tensão entre autoridade da Coroa, liberdade de petição e consolidação de garantias jurídicas.");
  inserirFiguraAntesDoTitulo("revolucoes-americana-e-francesa-positivacao-dos-direitos", "dh-imagem-declaracao-independencia", "/imagens/dh-declaracao-independencia-trumbull.jpg", "Pintura Declaration of Independence, de John Trumbull.", "John Trumbull, <em>Declaration of Independence</em>, 1819. A pintura representa a apresentação do projeto da Declaração de Independência ao Segundo Congresso Continental, em 1776, simbolizando a passagem das ideias revolucionárias de liberdade e direitos para a forma documental e política.");
  inserirFiguraAntesDoTitulo("seculo-xix-industrializacao-democracia-e-direitos-sociais", "dh-imagem-secao-oito", "/imagens/imagensdh-trabalhadores-fabrica-algodao-1908.jpg", "Fotografia em fábrica de algodão, 1908.", "Fotografia de Lewis Hine em fábrica de algodão, 1908. A imagem introduz o debate sobre industrialização, questão social e formação dos direitos sociais.");
  inserirFiguraAntesDoTitulo("onu-e-declaracao-universal-de-1948", "dh-imagem-secao-dez", "/imagens/imagensdh-criancas-declaracao-universal-direitos-humanos.jpg", "Crianças observam uma cópia da Declaração Universal dos Direitos Humanos.", "Crianças observam uma cópia da Declaração Universal dos Direitos Humanos. A imagem simboliza a passagem da experiência histórica da guerra para uma linguagem internacional de dignidade, educação, paz e proteção da pessoa humana.");
  inserirFiguraAntesDoTitulo("a-constituicao-brasileira-de-1988-e-a-recepcao-dos-direitos-humanos", "dh-imagem-secao-onze", "/imagens/imagensdh-redemocratizacao-brasil-amanha-outro-dia.webp", "Manifestação popular no Brasil com faixa Amanhã vai ser outro dia.", "Manifestação popular no contexto da resistência à ditadura militar brasileira e da luta pela redemocratização. A faixa “Amanhã vai ser outro dia!” sintetiza a esperança democrática que antecede a Constituição de 1988, marco interno da dignidade da pessoa humana e dos direitos fundamentais no Brasil.");

  if (paginaHistoriaDireitosHumanos() && !document.querySelector(".dh-imagem-secao-nove")) {
    const titulo = document.getElementById("seculo-xx-guerras-mundiais-e-crise-da-protecao-interna");
    if (titulo) titulo.insertAdjacentHTML("beforebegin", `
      <figure class="dh-imagem-secao dh-imagem-secao-nove">
        <div class="dh-aviso-imagem">Registro histórico sensível</div>
        <img src="/imagens/dh-ohrdruf-1945-crise-direitos-humanos.jpg" alt="Registro histórico de Ohrdruf, Alemanha, abril de 1945.">
        <figcaption>Registro histórico de Ohrdruf, Alemanha, abril de 1945. A imagem introduz a discussão sobre a crise da proteção interna dos direitos e a necessidade de uma ordem internacional fundada na dignidade humana.</figcaption>
      </figure>`);
  }
}

function aplicarEstiloImagensDireitosHumanos() {
  inserirEstiloUnico("estilo-imagens-direitos-humanos", `
    .dh-capa-imagem{margin:34px 0 42px;padding:0;border-radius:20px;overflow:hidden;background:#211817;border:1px solid rgba(216,184,120,.28);box-shadow:0 16px 38px rgba(0,0,0,.14);}
    .dh-capa-imagem img{display:block;width:100%;height:auto;filter:grayscale(100%);}
    .dh-capa-imagem figcaption,.dh-imagem-secao figcaption{margin:0;padding:16px 20px 18px;background:#261b1a;color:#f3e3d5;font-size:14.5px;line-height:1.65;text-align:left;border-top:1px solid rgba(255,255,255,.10);}
    .dh-imagem-secao{margin:48px auto 42px;padding:0;border-radius:20px;overflow:hidden;background:#211817;border:1px solid rgba(216,184,120,.28);box-shadow:0 14px 34px rgba(0,0,0,.12);}
    .dh-imagem-secao img{display:block;width:100%;height:auto;filter:grayscale(100%);}
    .dh-imagem-sete-bispos{max-width:620px;}.dh-imagem-vertical{max-width:560px;}.dh-aviso-imagem{padding:12px 18px;background:#171111;color:#f3e3d5;font-size:13px;letter-spacing:.04em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.12);}
    @media(max-width:900px){.dh-capa-imagem,.dh-imagem-secao{margin:28px 0 34px;border-radius:16px;}.dh-capa-imagem figcaption,.dh-imagem-secao figcaption{font-size:13.5px;padding:14px 16px 16px;}.dh-imagem-vertical,.dh-imagem-sete-bispos{max-width:100%;}}
  `);
}

function aplicarIdentidadeLeituraEstadoPoder() {
  const paginaEstadoPoder = location.pathname.startsWith("/filosofia/estado-e-poder/");
  const possuiLayoutLeitura = Boolean(document.querySelector(".layout-leitura"));
  if (!paginaEstadoPoder || !possuiLayoutLeitura) return;
  document.body.classList.add("ep-leitura-interna");
  inserirEstiloUnico("estilo-leitura-estado-poder", `
    body.ep-leitura-interna{background:radial-gradient(circle at 50% 0%,rgba(214,173,92,.13),transparent 32%),radial-gradient(circle at 18% 18%,rgba(255,255,255,.08),transparent 26%),linear-gradient(180deg,#3a3f46 0%,#2d3238 52%,#23282e 100%) !important;color:#f5f1e8;}
    body.ep-leitura-interna::before{content:"";position:fixed;inset:0;pointer-events:none;opacity:.10;background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:7px 7px;z-index:-1;}
    body.ep-leitura-interna header{background:rgba(31,35,40,.95) !important;border-bottom:1px solid rgba(214,173,92,.34) !important;backdrop-filter:blur(8px);}
    body.ep-leitura-interna .brand,body.ep-leitura-interna .brand a,body.ep-leitura-interna .menu-links a{color:#f5f1e8 !important;}
    body.ep-leitura-interna .menu-botao{border-color:rgba(214,173,92,.50) !important;color:#f1d28a !important;}
    body.ep-leitura-interna .menu-links{background:#23282e !important;border-right:1px solid rgba(214,173,92,.34) !important;}body.ep-leitura-interna .menu-fechar{color:#f5f1e8 !important;}
    body.ep-leitura-interna .hero{margin-top:34px;margin-bottom:34px;padding:44px 42px 40px !important;border:1px solid rgba(214,173,92,.32);border-radius:26px;background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(0,0,0,.12));box-shadow:0 20px 48px rgba(0,0,0,.22);text-align:center;}
    body.ep-leitura-interna .logo-trabalho{margin-bottom:22px !important;}body.ep-leitura-interna .logo-trabalho img{max-width:130px !important;filter:drop-shadow(0 8px 18px rgba(0,0,0,.28));}
    body.ep-leitura-interna .categoria{color:#f1d28a !important;letter-spacing:1.8px;}body.ep-leitura-interna .titulo-principal{max-width:900px;margin:0 auto 16px !important;color:#f7f2e8 !important;font-size:clamp(32px,4.6vw,54px) !important;line-height:1.12 !important;text-shadow:0 4px 14px rgba(0,0,0,.38);}
    body.ep-leitura-interna .subtitulo,body.ep-leitura-interna .hero p{color:#d9cfbf !important;}body.ep-leitura-interna .botao-imprimir{border:1px solid rgba(214,173,92,.50) !important;background:#23282e !important;color:#f1d28a !important;border-radius:999px;box-shadow:0 10px 24px rgba(0,0,0,.18);}
    body.ep-leitura-interna .layout-leitura{gap:32px !important;align-items:start;}body.ep-leitura-interna .controle-texto{background:#23282e !important;border:1px solid rgba(214,173,92,.34) !important;border-radius:22px !important;color:#f5f1e8 !important;box-shadow:0 18px 42px rgba(0,0,0,.24) !important;scrollbar-color:#d6ad5c #2d3238 !important;}
    body.ep-leitura-interna .controle-texto h2{color:#f7f2e8 !important;}body.ep-leitura-interna .controle-texto p{color:#d9cfbf !important;}
    body.ep-leitura-interna .controle-texto a{color:#f1d28a !important;background:rgba(255,255,255,.055) !important;border:1px solid rgba(214,173,92,.26) !important;border-radius:13px !important;transition:background .18s ease,border-color .18s ease,transform .18s ease;}
    body.ep-leitura-interna .controle-texto a:hover{background:rgba(214,173,92,.14) !important;border-color:rgba(214,173,92,.55) !important;transform:translateX(2px);}
    body.ep-leitura-interna .conteudo-leitura .texto{max-width:820px !important;padding:46px 54px;border:1px solid rgba(214,173,92,.42);border-radius:26px;background:#f6f0e5;color:#27231d;box-shadow:0 24px 58px rgba(0,0,0,.28);}
    body.ep-leitura-interna .texto p{color:#2b2721;text-align:justify;}body.ep-leitura-interna .texto h2{color:#765420;border-bottom:1px solid rgba(118,84,32,.22);padding-bottom:8px;}body.ep-leitura-interna .texto h3{color:#8b672d;}body.ep-leitura-interna .texto a{color:#6d4d1d;}
    body.ep-leitura-interna .assinatura-texto p{color:#4c3f2c !important;}body.ep-leitura-interna .local-data{color:#6c6254 !important;}body.ep-leitura-interna .link-retorno a{color:#7b663b !important;border-bottom:1px solid rgba(123,102,59,.36);}
    body.ep-leitura-interna .layout-leitura .figura-larga,body.ep-leitura-interna .layout-leitura .texto figure:not(.autor-retrato):not(.deusa-retrato){width:min(720px,100%) !important;max-width:100% !important;margin:34px auto 40px !important;transform:none !important;text-align:center !important;}
    body.ep-leitura-interna .layout-leitura .figura-larga img,body.ep-leitura-interna .layout-leitura .texto figure:not(.autor-retrato):not(.deusa-retrato) img{width:100% !important;max-width:100% !important;max-height:72vh !important;height:auto !important;object-fit:contain !important;box-sizing:border-box !important;border:1px solid rgba(214,173,92,.38) !important;box-shadow:0 14px 34px rgba(0,0,0,.16) !important;}
    body.ep-leitura-interna .layout-leitura .figura-larga figcaption,body.ep-leitura-interna .layout-leitura .texto figure:not(.autor-retrato):not(.deusa-retrato) figcaption{font-size:14.5px !important;line-height:1.55 !important;margin-top:10px !important;color:#6c6254 !important;}
    @media(max-width:900px){body.ep-leitura-interna .hero{padding:34px 24px 32px !important;border-radius:20px;}body.ep-leitura-interna .conteudo-leitura .texto{padding:32px 24px;border-radius:20px;}body.ep-leitura-interna .layout-leitura .figura-larga,body.ep-leitura-interna .layout-leitura .texto figure:not(.autor-retrato):not(.deusa-retrato){width:100% !important;margin:28px auto 34px !important;}}
    @media print{body.ep-leitura-interna{background:#fff !important;color:#000 !important;}body.ep-leitura-interna::before{display:none !important;}body.ep-leitura-interna .hero,body.ep-leitura-interna .conteudo-leitura .texto{background:#fff !important;border:none !important;border-radius:0 !important;box-shadow:none !important;color:#000 !important;}body.ep-leitura-interna .controle-texto{display:none !important;}}
  `);
}

function ajustarRetornoTextosEstadoPoder() {
  const path = location.pathname;
  const paginasTextos = ["contratualismo-classico", "contraponto-bentham", "triade-do-poder", "legalidade-legitimidade"];
  const deveAjustar = path.startsWith("/filosofia/estado-e-poder/") && paginasTextos.some(nome => path.includes(nome));
  if (!deveAjustar) return;
  document.querySelectorAll(".link-retorno a").forEach(link => {
    link.href = "/filosofia/estado-e-poder/textos-e-analises/";
    link.textContent = "Voltar para Textos e Análises";
  });
}

function aplicarAcabamentoInternoDireitosHumanos() {
  const paginaDireitosHumanos = location.pathname.startsWith("/direitos-humanos/");
  const possuiArtigo = Boolean(document.querySelector(".dh-artigo"));
  if (!paginaDireitosHumanos || !possuiArtigo) return;
  document.body.classList.add("dh-leitura-interna");
  const artigo = document.querySelector(".dh-artigo");
  if (artigo && !artigo.querySelector(".dh-retorno-eixo")) artigo.insertAdjacentHTML("beforeend", `<div class="dh-retorno-eixo"><a href="/direitos-humanos/">← Voltar para Direitos Humanos e Aplicações Práticas</a></div>`);
  inserirEstiloUnico("acabamento-interno-direitos-humanos", `
    body.dh-leitura-interna{background:radial-gradient(circle at 50% 0%,rgba(123,24,35,.25),transparent 34%),radial-gradient(circle at 18% 20%,rgba(255,255,255,.10),transparent 26%),linear-gradient(180deg,#2b1b1a 0%,#241817 48%,#30211f 100%) !important;color:#fbf2e8;}
    body.dh-leitura-interna .dh-artigo{background:#fbf4ec !important;border:1px solid rgba(216,184,120,.46) !important;border-radius:28px !important;box-shadow:0 26px 64px rgba(0,0,0,.24) !important;color:#2b2925;}body.dh-leitura-interna .dh-artigo h2{color:#5b1118 !important;}body.dh-leitura-interna .dh-artigo p{color:#2b2925 !important;}
    body.dh-leitura-interna .dh-retorno-eixo{margin-top:46px;padding-top:22px;border-top:1px solid rgba(91,17,24,.16);text-align:right;}body.dh-leitura-interna .dh-retorno-eixo a{color:#7b1823;text-decoration:none;border-bottom:1px solid rgba(123,24,35,.35);font-style:italic;}
    @media(max-width:900px){body.dh-leitura-interna .dh-artigo{padding:32px 24px !important;border-radius:22px !important;}body.dh-leitura-interna .dh-retorno-eixo{text-align:left;}}
  `);
}

function paginaANPPDireitosHumanos() {
  return location.pathname === "/direitos-humanos/anpp-acordo-nao-persecucao-penal.html" || location.pathname === "/direitos-humanos/anpp-acordo-nao-persecucao-penal";
}

function figuraANPP(classe, src, alt, legenda, extraClasse = "") {
  return `
    <figure class="dh-imagem-secao anpp-infografico ${classe} ${extraClasse}">
      <img src="${src}" alt="${alt}">
      <figcaption>${legenda}</figcaption>
    </figure>`;
}

function inserirFiguraAntesDoTituloANPP(idTitulo, classe, src, alt, legenda, extraClasse = "") {
  if (!paginaANPPDireitosHumanos() || document.querySelector("." + classe)) return;
  const titulo = document.getElementById(idTitulo);
  if (!titulo) return;
  titulo.insertAdjacentHTML("beforebegin", figuraANPP(classe, src, alt, legenda, extraClasse));
}

function inserirFiguraDepoisDoParagrafoANPP(trechoInicial, classe, src, alt, legenda, extraClasse = "") {
  if (!paginaANPPDireitosHumanos() || document.querySelector("." + classe)) return;
  const paragrafos = Array.from(document.querySelectorAll(".dh-artigo p"));
  const alvo = paragrafos.find(p => p.textContent.trim().startsWith(trechoInicial));
  if (!alvo) return;
  alvo.insertAdjacentHTML("afterend", figuraANPP(classe, src, alt, legenda, extraClasse));
}

function aplicarEstiloInfograficosANPP() {
  if (!paginaANPPDireitosHumanos()) return;
  inserirEstiloUnico("estilo-infograficos-anpp", `
    body.dh-leitura-interna .anpp-infografico{max-width:880px;margin:42px auto 44px;border-radius:22px;border:1px solid rgba(91,17,24,.22);background:#211817;box-shadow:0 18px 42px rgba(0,0,0,.16);}
    body.dh-leitura-interna .anpp-infografico img{display:block;width:100%;height:auto;filter:none !important;}
    body.dh-leitura-interna .anpp-infografico figcaption{background:#241817;color:#f3e3d5;font-size:14.5px;line-height:1.62;text-align:left;}
    body.dh-leitura-interna .anpp-infografico-largo{max-width:1000px;}
    @media(max-width:900px){body.dh-leitura-interna .anpp-infografico{max-width:100%;margin:30px 0 34px;border-radius:16px;}body.dh-leitura-interna .anpp-infografico figcaption{font-size:13.5px;}}
  `);
}

function inserirInfograficosANPP() {
  if (!paginaANPPDireitosHumanos()) return;
  inserirFiguraAntesDoTituloANPP("requisitos", "anpp-img-requisitos", "/imagens/anppimagem1.png", "Infográfico sobre requisitos mínimos e vedações principais do ANPP.", "Mapa visual dos requisitos mínimos e das vedações centrais do ANPP, útil para fixar o ponto de partida do art. 28-A do CPP.");
  inserirFiguraDepoisDoParagrafoANPP("O rito inicial pode ser descrito em etapas.", "anpp-img-rito", "/imagens/anppimagem2.png", "Infográfico sobre o rito inicial da persecução penal e a chegada ao ANPP.", "Fluxo simplificado da notícia do fato até a análise ministerial do acordo, distinguindo investigação, arquivamento, transação penal, ANPP e denúncia.");
  inserirFiguraDepoisDoParagrafoANPP("Na ação penal pública, portanto, os sujeitos centrais do ANPP", "anpp-img-sujeitos", "/imagens/anppimagem3.png", "Infográfico sobre os sujeitos do ANPP e a função de cada participante.", "Distribuição institucional dos papéis no ANPP: Ministério Público, investigado ou acusado, defesa técnica, juiz, vítima e autoridade policial.");
  inserirFiguraDepoisDoParagrafoANPP("A ação penal privada exige tratamento próprio.", "anpp-img-publica-privada", "/imagens/anppimagem4.png", "Infográfico comparando ação penal pública e ação penal privada no ANPP.", "Comparação entre ação penal pública e ação penal privada no ANPP, com destaque para denúncia, queixa-crime, titularidade, vítima, querelante e controle judicial.", "anpp-infografico-largo");
  inserirFiguraDepoisDoParagrafoANPP("Essa distinção entre crimes com vítima determinada e crimes sem vítima evidente", "anpp-img-vitima", "/imagens/anppimagem5.png", "Infográfico sobre vítima determinada, vítima difusa e crimes sem vítima evidente no ANPP.", "Síntese das diferenças entre vítima individualizada, vítima difusa ou coletiva e ente público como sujeito passivo, especialmente para fins de reparação do dano.", "anpp-infografico-largo");
  inserirFiguraDepoisDoParagrafoANPP("A recusa fundamentada do Ministério Público constitui outro ponto central.", "anpp-img-recusas", "/imagens/anppimagem6.png", "Infográfico sobre recusas no ANPP.", "Quadro de controle das recusas no ANPP: recusa fundamentada do Ministério Público, recusa do investigado ou acusado e recusa judicial de homologação.");
  inserirFiguraDepoisDoParagrafoANPP("As condições previstas no art. 28-A do Código de Processo Penal", "anpp-img-condicoes", "/imagens/anppimagem7.png", "Infográfico sobre as condições possíveis do ANPP.", "Resumo das condições possíveis do ANPP: reparação do dano, renúncia a bens, prestação de serviços, prestação pecuniária e outra condição proporcional e compatível.");
  inserirFiguraDepoisDoParagrafoANPP("A escolha das condições deve obedecer ao juízo de necessidade e suficiência.", "anpp-img-aplicacao-condicoes", "/imagens/anppimagem8.png", "Infográfico sobre quando aplicar cada condição do ANPP.", "Matriz prática para escolha das condições conforme o caso concreto, observando proporcionalidade, suficiência, capacidade de cumprimento e natureza do bem jurídico lesado.", "anpp-infografico-largo");
  inserirFiguraDepoisDoParagrafoANPP("Uma vez homologado judicialmente o acordo", "anpp-img-cumprimento", "/imagens/anppimagem9.png", "Infográfico sobre cumprimento, descumprimento e rescisão do ANPP.", "Fluxo prático do acordo após a homologação: execução, comprovação, cumprimento integral, extinção da punibilidade, descumprimento injustificado e rescisão.", "anpp-infografico-largo");
  inserirFiguraDepoisDoParagrafoANPP("O cumprimento do ANPP não gera condenação criminal.", "anpp-img-efeitos", "/imagens/anppimagem10.png", "Infográfico sobre os efeitos jurídicos do ANPP.", "Síntese dos efeitos finais do ANPP: ausência de condenação, ausência de antecedentes penais ordinários, extinção da punibilidade e restrição a novos benefícios consensuais por cinco anos.", "anpp-infografico-largo");
}

function destaqueANPP(classe, titulo, citacao, texto) {
  return `
    <section class="anpp-destaque-conceito ${classe}">
      <div class="anpp-destaque-cabecalho">${titulo}</div>
      <div class="anpp-destaque-corpo">
        <p class="anpp-destaque-citacao">“${citacao}”</p>
        <p class="anpp-destaque-texto">${texto}</p>
      </div>
    </section>`;
}

function inserirDestaqueDepoisDoParagrafoANPP(trechoInicial, classe, titulo, citacao, texto) {
  if (!paginaANPPDireitosHumanos() || document.querySelector("." + classe)) return;
  const paragrafos = Array.from(document.querySelectorAll(".dh-artigo p"));
  const alvo = paragrafos.find(p => p.textContent.trim().startsWith(trechoInicial));
  if (!alvo) return;
  alvo.insertAdjacentHTML("afterend", destaqueANPP(classe, titulo, citacao, texto));
}

function aplicarEstiloDestaquesANPP() {
  if (!paginaANPPDireitosHumanos()) return;
  inserirEstiloUnico("estilo-destaques-anpp", `
    body.dh-leitura-interna .anpp-destaque-conceito{margin:32px 0 38px;border-radius:18px;overflow:hidden;background:#fff7ef;border-left:6px solid #7b1823;box-shadow:0 14px 34px rgba(0,0,0,.08);border-top:1px solid rgba(91,17,24,.16);border-right:1px solid rgba(91,17,24,.16);border-bottom:1px solid rgba(91,17,24,.16);}
    body.dh-leitura-interna .anpp-destaque-cabecalho{background:#241b1a;color:#fff3e6;font-weight:700;font-size:18px;line-height:1.35;padding:16px 22px;letter-spacing:.01em;}
    body.dh-leitura-interna .anpp-destaque-corpo{padding:22px 26px 24px;background:#fff7ef;}
    body.dh-leitura-interna .anpp-destaque-conceito p{margin:0;text-align:left !important;color:#2b2925 !important;}
    body.dh-leitura-interna .anpp-destaque-citacao{font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:23px !important;line-height:1.55 !important;color:#3a2421 !important;margin-bottom:12px !important;}
    body.dh-leitura-interna .anpp-destaque-texto{font-size:16.5px !important;line-height:1.68 !important;color:#2e2925 !important;}
    @media(max-width:900px){body.dh-leitura-interna .anpp-destaque-conceito{margin:26px 0 32px;border-radius:14px;}body.dh-leitura-interna .anpp-destaque-cabecalho{font-size:16px;padding:14px 16px;}body.dh-leitura-interna .anpp-destaque-corpo{padding:18px 18px 20px;}body.dh-leitura-interna .anpp-destaque-citacao{font-size:20px !important;}}
  `);
}

function inserirDestaquesANPP() {
  if (!paginaANPPDireitosHumanos()) return;
  inserirDestaqueDepoisDoParagrafoANPP("Essa constatação inicial é fundamental.", "anpp-destaque-justa-causa", "Conceito-chave — Justa causa e maturidade do caso", "o acordo pressupõe um caso apto à denúncia", "O ANPP não serve para suprir investigação frágil. Antes da proposta, devem existir elementos suficientes de autoria e materialidade; se não houver justa causa, o caminho adequado é o arquivamento ou o aprofundamento investigativo.");
  inserirDestaqueDepoisDoParagrafoANPP("Essa lógica revela o caráter híbrido do ANPP.", "anpp-destaque-natureza", "Natureza jurídica destacada — Negócio jurídico processual penal", "negócio jurídico processual penal com conteúdo penal relevante", "O acordo é consensual, mas não é contrato privado. Ele nasce no processo penal, depende de defesa técnica, passa por homologação judicial e pode produzir a extinção da punibilidade.");
  inserirDestaqueDepoisDoParagrafoANPP("Essa racionalização não significa renúncia descontrolada", "anpp-destaque-limites", "Limites fundamentais — Cabimento restrito", "pena mínima inferior a quatro anos, sem violência ou grave ameaça", "A racionalização da persecução penal não elimina a legalidade. O ANPP só pode ser proposto dentro da moldura do art. 28-A do CPP e das vedações legais e jurisprudenciais aplicáveis.");
  inserirDestaqueDepoisDoParagrafoANPP("A posição do juiz é uma das características", "anpp-destaque-homologacao", "Ponto institucional — Homologação judicial", "o juiz controla legalidade, regularidade e voluntariedade", "O juiz não negocia o acordo nem substitui o Ministério Público. Sua função é garantir que o pacto respeite a lei, a defesa técnica e a vontade livre do investigado.");
  inserirDestaqueDepoisDoParagrafoANPP("O primeiro pressuposto é negativo:", "anpp-destaque-arquivamento", "Pressuposto negativo — Não pode ser caso de arquivamento", "não pode ser caso de arquivamento", "Se o fato não tem base probatória mínima, não há espaço legítimo para acordo. O ANPP pressupõe persecução penal possível; onde falta justa causa, não se negocia responsabilização.");
  inserirDestaqueDepoisDoParagrafoANPP("O quarto requisito é a confissão formal", "anpp-destaque-confissao", "Requisito estrutural — Confissão formal e circunstanciada", "confissão formal e circunstanciada", "A confissão deve ser documentada, voluntária e acompanhada de defesa técnica. Não basta aceitar condições; o investigado deve confessar os fatos essenciais de modo minimamente individualizado.");
  inserirDestaqueDepoisDoParagrafoANPP("O quinto requisito é que o acordo", "anpp-destaque-suficiencia", "Juízo de suficiência — Reprovação e prevenção", "necessário e suficiente para reprovação e prevenção", "Mesmo presentes os requisitos objetivos, o Ministério Público deve avaliar se a solução consensual é proporcional ao caso concreto e adequada à finalidade preventiva do sistema penal.");
  inserirDestaqueDepoisDoParagrafoANPP("A recusa fundamentada do Ministério Público constitui", "anpp-destaque-recusa", "Controle da negativa — Recusa fundamentada", "a negativa ministerial não pode ser arbitrária", "O ANPP não é direito automático do investigado, mas a recusa do Ministério Público deve ser motivada. A fundamentação permite controle interno e evita seletividade sem justificativa.");
  inserirDestaqueDepoisDoParagrafoANPP("A natureza jurídica do ANPP também exige distinção", "anpp-destaque-nao-pena", "Distinção essencial — Condição não é pena", "as condições assumidas pelo investigado não são penas em sentido técnico", "As obrigações do ANPP funcionam como equivalentes sancionatórios, mas não decorrem de condenação. Por isso, cumprimento do acordo não equivale a cumprimento de pena criminal.");
  inserirDestaqueDepoisDoParagrafoANPP("O cumprimento integral das condições conduz", "anpp-destaque-extincao", "Efeito final — Extinção da punibilidade", "cumprimento integral das condições conduz à extinção da punibilidade", "A extinção da punibilidade encerra a pretensão penal nos limites do acordo. Não é absolvição, nem condenação: é consequência legal do adimplemento das condições pactuadas.");
  inserirDestaqueDepoisDoParagrafoANPP("O descumprimento do acordo deve ser analisado", "anpp-destaque-descumprimento", "Descumprimento — Rescisão e retomada da persecução", "rescisão judicial do ANPP e posterior oferecimento da denúncia", "O descumprimento injustificado não gera condenação automática. Ele desfaz a via consensual e permite a retomada do processo penal, preservando contraditório e ampla defesa.");
  inserirDestaqueDepoisDoParagrafoANPP("O cumprimento do ANPP não gera condenação criminal.", "anpp-destaque-antecedentes", "Efeito registral — Sem condenação e sem antecedentes ordinários", "não gera condenação criminal", "O acordo cumprido não produz sentença condenatória nem antecedentes penais comuns. Ainda assim, pode impedir novo benefício consensual no período legal de cinco anos.");
}

function iniciarMenu() {
  const menu = document.querySelector(".menu-links");
  const botao = document.querySelector(".menu-botao");
  const botaoFechar = document.querySelector(".menu-fechar");
  if (!menu || !botao || !botaoFechar) return;
  botao.addEventListener("click", () => { menu.classList.toggle("active"); });
  botaoFechar.addEventListener("click", () => { menu.classList.remove("active"); });
  document.addEventListener("click", (e) => {
    const clicouDentroMenu = menu.contains(e.target);
    const clicouNoBotao = botao.contains(e.target);
    if (!clicouDentroMenu && !clicouNoBotao) menu.classList.remove("active");
  });
}

aplicarAjustesDeNavegacaoLateral();
aplicarEstiloImagensDireitosHumanos();
aplicarIdentidadeLeituraEstadoPoder();
ajustarRetornoTextosEstadoPoder();
aplicarAcabamentoInternoDireitosHumanos();
aplicarEstiloInfograficosANPP();
aplicarEstiloDestaquesANPP();
inserirImagemCapaDireitosHumanos();
inserirImagensHistoriaDireitosHumanos();
inserirInfograficosANPP();
inserirDestaquesANPP();
