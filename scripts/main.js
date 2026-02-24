import { renderCards } from "./explorer.js";
import { populateFilters } from "./filters.js";

document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("cardsContainer");
  if (!container) return;

  const searchInput = document.getElementById("searchInput");
  const categoriaFilter = document.getElementById("tipoFilter");
  const regiaoFilter = document.getElementById("regiaoFilter");
  const searchBtn = document.getElementById("searchBtn");

  populateFilters();

  function aplicarFiltros() {
    const filtros = {
      nome: searchInput?.value || "",
      categoria: categoriaFilter?.value || "",
      regiao: regiaoFilter?.value || "",
      periodo: "",
      duracao: "",
      badge: ""
    };

    renderCards(container, filtros);
  }

  // Render inicial (mostra todos)
  renderCards(container, {
    nome: "",
    categoria: "",
    regiao: "",
    periodo: "",
    duracao: "",
    badge: ""
  });

  // Agora só filtra ao clicar
  searchBtn?.addEventListener("click", aplicarFiltros);

});