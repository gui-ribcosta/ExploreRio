export function createCard(local) {
  const card = document.createElement("div");
  card.className = "card";

  const preco =
    local.preco === 0 || local.preco === "Gratuito"
      ? "Gratuito"
      : `R$ ${local.preco}`;

  card.innerHTML = `
    <img src="${local.imagem}" alt="${local.nome}" />

    <div class="card-content">
      <h3>${local.nome}</h3>
      <div class="card-info">${local.regiao}</div>

      <div class="card-bottom">
        <div class="card-price">${preco}</div>
        <div class="card-time">${local.duracao}</div>
      </div>
    </div>
  `;

  return card;
}