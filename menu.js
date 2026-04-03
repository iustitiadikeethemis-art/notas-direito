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
