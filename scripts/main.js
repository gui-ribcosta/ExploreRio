import { renderCards } from "./explorer.js";
import { populateFilters } from "./filters.js";

document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("cardsContainer");
  if (!container) return;

  const searchInput = document.getElementById("searchInput");
  const categoriaFilter = document.getElementById("tipoFilter");
  const regiaoFilter = document.getElementById("regiaoFilter");
  const precoFilter = document.getElementById("precoFilter");
  const duracaoFilter = document.getElementById("duracaoFilter");
  const searchBtn = document.getElementById("searchBtn");

  populateFilters();

  // 🔥 1️⃣ Pegar filtros da URL
  const params = new URLSearchParams(window.location.search);

  const filtrosIniciais = {
    nome: params.get("nome") || "",
    categoria: params.get("tipo") || "",
    regiao: params.get("regiao") || "",
    periodo: "",
    duracao: params.get("duracao") || "",
    badge: ""
  };

  // 🔥 2️⃣ Preencher os inputs com o que veio da URL
  if (searchInput) searchInput.value = filtrosIniciais.nome;
  if (categoriaFilter) categoriaFilter.value = filtrosIniciais.categoria;
  if (regiaoFilter) regiaoFilter.value = filtrosIniciais.regiao;
  if (duracaoFilter) duracaoFilter.value = filtrosIniciais.duracao;

  // 🔥 3️⃣ Render inicial já filtrado automaticamente
  renderCards(container, filtrosIniciais);

  // 🔥 4️⃣ Filtrar ao clicar
  function aplicarFiltros() {
    const filtros = {
      nome: searchInput?.value || "",
      categoria: categoriaFilter?.value || "",
      regiao: regiaoFilter?.value || "",
      periodo: "",
      duracao: duracaoFilter?.value || "",
      badge: ""
    };

    renderCards(container, filtros);
  }

  searchBtn?.addEventListener("click", aplicarFiltros);

});
