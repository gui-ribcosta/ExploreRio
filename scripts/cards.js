import { pontos } from "./data.js";

export const container = document.getElementById("cards-container");
export let categoriaAtiva = "famosos";

export function renderCards(lista) {
  container.innerHTML = "";
  lista.forEach(lugar => {
    const badgesHTML = lugar.badges.slice(0,3)
      .map(b => `<span class="badge badge-${b}">${b.replaceAll("-", " ")}</span>`)
      .join("");

    container.innerHTML += `
      <div class="card">
        <img src="${lugar.imagem}" alt="${lugar.nome}">
        <div class="card-content">
          <h3>${lugar.nome}</h3>
          <p class="bairro"><strong>Bairro:</strong> ${lugar.bairro}</p>
          <p class="duracao"><strong>Duração:</strong> ${lugar.duracao}</p>
          <div class="badges">${badgesHTML}</div>
        </div>
      </div>
    `;
  });
}
