import { locais } from "./data.js";
import { createCard } from "./card.js";

export function renderCards(container, filtros) {
  container.innerHTML = "";

  const filtrados = locais.filter(local => {

    const matchNome =
      !filtros.nome ||
      local.nome.toLowerCase().includes(filtros.nome.toLowerCase());

    const matchCategoria =
      !filtros.categoria ||
      local.categorias.includes(filtros.categoria.toLowerCase());

    const matchBairro =
      !filtros.bairro ||
      local.bairro === filtros.bairro;

    const matchRegiao =
      !filtros.regiao ||
      local.regiao === filtros.regiao;

    const matchPeriodo =
      !filtros.periodo ||
      local.periodo === filtros.periodo;

    const matchDuracao =
      !filtros.duracao ||
      local.duracao === filtros.duracao;

    const matchBadge =
      !filtros.badge ||
      local.badges.includes(filtros.badge);

    return (
      matchNome &&
      matchCategoria &&
      matchBairro &&
      matchRegiao &&
      matchPeriodo &&
      matchDuracao &&
      matchBadge
    );
  });

  if (filtrados.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <h3>Nenhum resultado encontrado 😕</h3>
        <p>Tente ajustar os filtros.</p>
      </div>
    `;
    return;
  }

  filtrados.forEach(local => {
    container.appendChild(createCard(local));
  });
}