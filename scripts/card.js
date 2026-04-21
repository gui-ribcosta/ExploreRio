import { getFavoritos, toggleFavoritoStorage } from "./favoritos.js";
import { openModal } from "./modal.js";

export function createCard(local) {
  const card = document.createElement("div");
  card.className = "card";

  const preco =
    local.preco === 0 || local.preco === undefined || local.preco === "Gratuito"
      ? "Gratuito"
      : `R$ ${local.preco}`;

  const categoriasBadges = local.categorias
    ? local.categorias.map(c => `<span class="badge badge-cat badge-${c}">${c.replace('-', ' ')}</span>`).join('')
    : "";

  const tiposBadges = local.tipoPasseio
    ? local.tipoPasseio.map(t => `<span class="badge badge-tipo badge-${t}">${t}</span>`).join('')
    : "";

  const isGratuito = local.preco === 0 || local.preco === undefined || local.preco === "Gratuito";
  const isEconomico = (local.preco || 0) <= 50 || isGratuito;

  const ecoBadge = isEconomico ? '<span class="badge badge-economico">Econômico</span>' : '';
  const grtBadge = isGratuito ? '<span class="badge badge-gratuito">Gratuito</span>' : '';

  const allBadges = grtBadge + ecoBadge + categoriasBadges + tiposBadges;

  const isFav = getFavoritos().has(local.nome);

  card.innerHTML = `
    <div class="card-img-wrapper">
      <img src="${local.imagem}" alt="${local.nome}" loading="lazy" />
      <button class="btn-fav-card ${isFav ? "ativo" : ""}" title="${isFav ? "Remover dos favoritos" : "Favoritar"}" data-nome="${local.nome}">
        <i class="fa-${isFav ? "solid" : "regular"} fa-heart"></i>
      </button>
    </div>

    <div class="card-content">
      <h3>${local.nome}</h3>
      <div class="card-info">${local.regiao}</div>
      <div class="badges-container">${allBadges}</div>

      <div class="card-bottom">
        <div class="card-price">${preco}</div>
        <div class="card-time">${local.duracao}h</div>
      </div>
    </div>
  `;

  const btnFav = card.querySelector(".btn-fav-card");
  btnFav.addEventListener("click", (e) => {
    e.stopPropagation();
    const agora = toggleFavoritoStorage(local.nome);
    btnFav.classList.toggle("ativo", agora);
    btnFav.title = agora ? "Remover dos favoritos" : "Favoritar";
    btnFav.innerHTML = `<i class="fa-${agora ? "solid" : "regular"} fa-heart"></i>`;
  });

  // ABRIR MODAL AO CLICAR NO CARD
  card.addEventListener("click", () => {
    openModal(local.nome);
  });

  // SINCRONIZAR CORAÇÃO SE MUDAR NO MODAL
  window.addEventListener("favoritoAtualizado", (e) => {
    if (e.detail.nome === local.nome) {
      const isFav = getFavoritos().has(local.nome);
      btnFav.classList.toggle("ativo", isFav);
      btnFav.title = isFav ? "Remover dos favoritos" : "Favoritar";
      btnFav.innerHTML = `<i class="fa-${isFav ? "solid" : "regular"} fa-heart"></i>`;
    }
  });

  return card;
}