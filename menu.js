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

    .dh-nav::-webkit-scrollbar{
      width:8px;
    }

    .dh-nav::-webkit-scrollbar-track{
      background:#241d1c;
      border-radius:999px;
    }

    .dh-nav::-webkit-scrollbar-thumb{
      background:#7d6b64;
      border-radius:999px;
    }

    @media(max-width:900px){
      .dh-nav{
        max-height:none !important;
        overflow-y:visible !important;
        padding-right:18px !important;
      }
    }
  `;

  document.head.appendChild(estilo);
}

function inserirImagemCapaDireitosHumanos() {
  const paginaDireitosHumanos = location.pathname === "/direitos-humanos/historia-conceito-direitos-humanos.html" || location.pathname === "/direitos-humanos/historia-conceito-direitos-humanos";
  if (!paginaDireitosHumanos) return;
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

function aplicarEstiloImagemCapaDireitosHumanos() {
  if (document.getElementById("estilo-capa-direitos-humanos")) return;

  const estilo = document.createElement("style");
  estilo.id = "estilo-capa-direitos-humanos";
  estilo.textContent = `
    .dh-capa-imagem{
      margin:34px 0 42px;
      padding:0;
      border-radius:20px;
      overflow:hidden;
      background:#161313;
      border:1px solid #2f2424;
      box-shadow:0 16px 38px rgba(0,0,0,.14);
    }

    .dh-capa-imagem img{
      display:block;
      width:100%;
      height:auto;
      filter:grayscale(100%);
    }

    .dh-capa-imagem figcaption{
      margin:0;
      padding:16px 20px 18px;
      background:#1e1918;
      color:#eadfd4;
      font-size:14.5px;
      line-height:1.65;
      text-align:left;
      border-top:1px solid rgba(255,255,255,.10);
    }

    @media(max-width:900px){
      .dh-capa-imagem{
        margin:28px 0 34px;
        border-radius:16px;
      }

      .dh-capa-imagem figcaption{
        font-size:13.5px;
        padding:14px 16px 16px;
      }
    }
  `;

  document.head.appendChild(estilo);
}

aplicarAjustesDeNavegacaoLateral();
aplicarEstiloImagemCapaDireitosHumanos();
inserirImagemCapaDireitosHumanos();

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
