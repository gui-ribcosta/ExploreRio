import { pontos } from "./data.js";
import { renderCards } from "./cards.js";

export function initFilters() {

  const botoes = document.querySelectorAll(".filter-btn");

  botoes.forEach(botao => {
    botao.addEventListener("click", () => {

      botoes.forEach(b => b.classList.remove("active"));
      botao.classList.add("active");

      const categoria = botao.dataset.category;

      const filtrados = pontos.filter(p =>
        p.categorias.includes(categoria)
      );

      renderCards(filtrados);
    });
  });

}

const filtroRegiao = document.getElementById("filtro-regiao");
const filtroPeriodo = document.getElementById("filtro-periodo");
const filtroDuracao = document.getElementById("filtro-duracao");

[filtroRegiao, filtroPeriodo, filtroDuracao].forEach(select => {
  select.addEventListener("change", aplicarFiltros);
});

function aplicarFiltros() {

  const regiao = filtroRegiao.value;
  const periodo = filtroPeriodo.value;
  const duracao = filtroDuracao.value;

  const filtrados = pontos.filter(p => {

    const matchRegiao = !regiao || p.regiao === regiao;
    const matchPeriodo = !periodo || p.periodo === periodo;
    const matchDuracao = !duracao || p.duracao === duracao;

    return matchRegiao && matchPeriodo && matchDuracao;
  });

  renderCards(filtrados);
}

