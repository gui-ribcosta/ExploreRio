import { getFavoritos, toggleFavoritoStorage } from "./favoritos.js";
import { locais } from "./data.js";

export function initModal() {
  console.log("Iniciando Modal...");
  const modalHTML = `
    <div id="detailsModal" class="modal">
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <div class="modal-hero">
          <img id="modalImg" src="" alt="">
          <div class="modal-hero-overlay">
            <div class="modal-hero-content">
              <h2 id="modalTitle">Nome do Local</h2>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-main">
            <div class="modal-section">
              <h3><i class="fa-solid fa-scroll"></i> História</h3>
              <p id="modalHistory">Carregando...</p>
            </div>
            <div class="modal-section" style="margin-top:30px">
              <h3><i class="fa-solid fa-thumbs-up"></i> Pontos Fortes e Fracos</h3>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <ul id="modalPros" class="modal-list li-pos"></ul>
                <ul id="modalCons" class="modal-list li-neg"></ul>
              </div>
            </div>
            <div class="modal-section" style="margin-top:30px">
              <h3><i class="fa-solid fa-lightbulb"></i> Recomendações</h3>
              <p id="modalRecs">Carregando...</p>
            </div>
          </div>
          <div class="modal-sidebar">
            <div class="modal-sidebar-info">
              <div class="info-item">
                <label>Localização</label>
                <span id="modalLoc">Carregando...</span>
              </div>
              <div class="info-item">
                <label>Valor</label>
                <span id="modalPrice">Carregando...</span>
              </div>
              <div class="info-item">
                <label>Melhor Horário</label>
                <span id="modalTime">Carregando...</span>
              </div>
              <div class="info-item">
                <label>Avaliação</label>
                <span id="modalRating">Carregando...</span>
              </div>
              <button id="modalFavBtn" class="modal-btn-fav">
                <i class="fa-regular fa-heart"></i> Adicionar aos Favoritos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  if (!document.getElementById("detailsModal")) {
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  const modal = document.getElementById("detailsModal");
  const closeBtn = modal.querySelector(".modal-close");

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeBtn.click();
  });
}

export function openModal(localNome) {
  const local = locais.find(l => l.nome === localNome);
  if (!local) return;

  const modal = document.getElementById("detailsModal");
  const d = local.detalhes || {
    historia: "Este local é um dos tesouros do Rio de Janeiro, oferecendo experiências únicas e paisagens deslumbrantes.",
    pontosFortes: ["Beleza natural", "Ambiente agradável", "Ótimo para fotos"],
    pontosFracos: ["Pode estar lotado em feriados"],
    recomendacoes: "Leve água, use calçados confortáveis e não esqueça a câmera!",
    melhorHorario: local.periodo === "manha" ? "Pela manhã, logo cedo." : "No meio da tarde para aproveitar a luz."
  };

  document.getElementById("modalImg").src = local.imagem;
  document.getElementById("modalTitle").innerText = local.nome;
  document.getElementById("modalHistory").innerText = d.historia;
  document.getElementById("modalRecs").innerText = d.recomendacoes;
  document.getElementById("modalLoc").innerText = `${local.bairro || ""}, ${local.regiao.replace("-", " ")}`;
  document.getElementById("modalPrice").innerText = local.preco === 0 ? "Gratuito" : `R$ ${local.preco}`;
  document.getElementById("modalTime").innerText = d.melhorHorario;
  document.getElementById("modalRating").innerText = `⭐ ${local.rating || 4.5}`;

  const pros = document.getElementById("modalPros");
  const cons = document.getElementById("modalCons");
  pros.innerHTML = (d.pontosFortes || []).map(p => `<li><i class="fa-solid fa-check"></i> ${p}</li>`).join("");
  cons.innerHTML = (d.pontosFracos || []).map(p => `<li><i class="fa-solid fa-xmark"></i> ${p}</li>`).join("");

  const favBtn = document.getElementById("modalFavBtn");
  const updateFavBtn = () => {
    const isFav = getFavoritos().has(local.nome);
    favBtn.classList.toggle("ativo", isFav);
    favBtn.innerHTML = isFav 
      ? `<i class="fa-solid fa-heart"></i> Remover dos Favoritos`
      : `<i class="fa-regular fa-heart"></i> Adicionar aos Favoritos`;
  };

  updateFavBtn();

  favBtn.onclick = () => {
    toggleFavoritoStorage(local.nome);
    updateFavBtn();
    // Notificar outros componentes se necessário (ex: atualizar o ícone no card)
    window.dispatchEvent(new CustomEvent("favoritoAtualizado", { detail: { nome: local.nome } }));
  };

  console.log("Modal aberto para:", localNome);
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}
