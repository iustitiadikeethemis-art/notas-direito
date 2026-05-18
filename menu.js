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

aplicarAjustesDeNavegacaoLateral();

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
