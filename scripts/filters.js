import { locais } from "./data.js";

export function populateFilters() {
  const tipoFilter = document.getElementById("tipoFilter");
  const regiaoFilter = document.getElementById("regiaoFilter");

  if (!tipoFilter || !regiaoFilter) return;

  // Limpa antes de popular
  tipoFilter.innerHTML = `<option value="">Todas as categorias</option>`;
  regiaoFilter.innerHTML = `<option value="">Todas as regiões</option>`;

  const tipos = new Set();
  const regioes = new Set();

  locais.forEach(local => {
    local.categorias?.forEach(cat => tipos.add(cat));
    if (local.regiao) regioes.add(local.regiao);
  });

  // Ordenar
  const tiposOrdenados = [...tipos].sort((a, b) =>
    a.localeCompare(b)
  );

  const regioesOrdenadas = [...regioes].sort((a, b) =>
    a.localeCompare(b)
  );

  // Popular categorias
  tiposOrdenados.forEach(tipo => {
    const option = document.createElement("option");
    option.value = tipo;
    option.textContent = formatLabel(tipo);
    tipoFilter.appendChild(option);
  });

  // Popular regiões
  regioesOrdenadas.forEach(regiao => {
    const option = document.createElement("option");
    option.value = regiao;
    option.textContent = regiao;
    regiaoFilter.appendChild(option);
  });
}

// Formata labels bonitas
function formatLabel(text) {
  return text
    .replace(/-/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());
}