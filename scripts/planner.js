import { gerarRoteiros } from "./plannerEngine.js";
import { locais } from "./data.js";

/* ===============================
   INICIALIZAÇÃO
=================================*/

document.addEventListener("DOMContentLoaded", () => {
  popularListaPontos();

  document
    .getElementById("gerarRoteiroBtn")
    .addEventListener("click", gerar);
});

/* ===============================
   GERAR ROTEIROS
=================================*/

function gerar() {
  const preferencias = coletarPreferencias();
  const roteiros = gerarRoteiros(preferencias);
  renderizarRoteiros(roteiros);
}

/* ===============================
   COLETAR DADOS DO FORM
=================================*/

function coletarPreferencias() {
  const diasRoteiro = parseInt(document.getElementById("diasRoteiro").value);
  const hospedagem = document.getElementById("hospedagem").value;
  const orcamento = parseFloat(document.getElementById("orcamento").value);

  const tipos = Array.from(
    document.querySelectorAll(".checkbox-group input:checked")
  ).map(cb => cb.value);

  const pontosSelecionados = Array.from(
    document.querySelectorAll("#listaPontos input:checked")
  ).map(cb => cb.value);

  return {
    diasRoteiro,
    hospedagem,
    orcamento,
    tipos,
    pontosSelecionados
  };
}

/* ===============================
   POPULAR CHECKBOXES
=================================*/

function popularListaPontos() {
  const lista = document.getElementById("listaPontos");

  locais.forEach(local => {
    const item = document.createElement("label");
    item.innerHTML = `
      <input type="checkbox" value="${local.nome}">
      ${local.nome} (R$ ${local.preco || 0})
    `;
    lista.appendChild(item);
  });
}

/* ===============================
   RENDERIZAÇÃO PROFISSIONAL
=================================*/

function renderizarRoteiros(roteiros) {
  const container = document.getElementById("roteirosContainer");
  container.innerHTML = "";

  roteiros.forEach(roteiro => {

    const card = document.createElement("div");
    card.className = "roteiro-card";

    card.innerHTML = `
      <div class="roteiro-header">
        <h3>${roteiro.nome}</h3>
        <div class="custo-total">
          Total: R$ ${roteiro.custoTotal.toFixed(2)}
        </div>
      </div>

      ${roteiro.dias.map((dia, index) => `
        <div class="dia">
          <h4>Dia ${index + 1}</h4>
          <ul>
            ${dia.atividades.map(a => `
              <li>${a.nome} — R$ ${a.preco || 0}</li>
            `).join("")}
          </ul>
        </div>
      `).join("")}

      <div class="barra-orcamento">
        <div class="barra-preenchida"
          style="
            width: ${roteiro.percentualOrcamento}%;
            background: ${roteiro.percentualOrcamento > 80 ? '#ef4444' : '#00b894'};
          ">
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}