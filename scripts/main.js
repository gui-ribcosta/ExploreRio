import { renderCards } from "./explorer.js";
import { populateFilters } from "./filters.js";
import { initModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  initModal();

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
    periodo: params.get("periodo") || "",
    duracao: params.get("duracao") || "",
    preco: params.get("preco") || "",
    badge: ""
  };

  // 🔥 2️⃣ Preencher os inputs com o que veio da URL
  if (searchInput) searchInput.value = filtrosIniciais.nome;
  if (categoriaFilter) categoriaFilter.value = filtrosIniciais.categoria;
  if (regiaoFilter) regiaoFilter.value = filtrosIniciais.regiao;
  if (duracaoFilter) duracaoFilter.value = filtrosIniciais.duracao;
  if (precoFilter) precoFilter.value = filtrosIniciais.preco;
  const periodoFilterInit = document.getElementById("periodoFilter");
  if (periodoFilterInit) periodoFilterInit.value = filtrosIniciais.periodo;

  // 🔥 3️⃣ Render inicial já filtrado automaticamente
  renderCards(container, filtrosIniciais);

  // 🔥 4️⃣ Filtrar ao clicar
  function aplicarFiltros() {
    const periodoFilter = document.getElementById("periodoFilter");
    const filtros = {
      nome: searchInput?.value || "",
      categoria: categoriaFilter?.value || "",
      regiao: regiaoFilter?.value || "",
      periodo: periodoFilter?.value || "",
      duracao: duracaoFilter?.value || "",
      preco: precoFilter?.value || "",
      badge: ""
    };

    renderCards(container, filtros);
  }

  searchBtn?.addEventListener("click", aplicarFiltros);

  // SCROLL TOP & HEADER
  const btnTop = document.getElementById("btnScrollTop");
  const header = document.querySelector(".header");
  
  window.addEventListener("scroll", () => {
    if (btnTop) {
      if (window.scrollY > 300) btnTop.classList.add("visible");
      else btnTop.classList.remove("visible");
    }

    if (header) {
      if (window.scrollY > 50) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
  });

  if (btnTop) {
    btnTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
