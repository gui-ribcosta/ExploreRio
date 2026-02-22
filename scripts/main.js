import { pontos } from "./data.js";
import { renderCards } from "./cards.js";
import { initFilters } from "./filters.js";

document.addEventListener("DOMContentLoaded", () => {

  const famosos = pontos.filter(p =>
  p.categorias.includes("famosos")
);

renderCards(famosos);

  initFilters();

});

