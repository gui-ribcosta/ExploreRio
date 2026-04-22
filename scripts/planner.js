import { gerarRoteiros } from "./plannerEngine.js";
import { locais } from "./data.js";
import { getFavoritos } from "./favoritos.js";

/* ==============================
   AVALIAÇÕES GOOGLE
================================*/
const RATINGS = {
  "Cristo Redentor": 4.8, "Pão de Açúcar": 4.7, "Praia de Copacabana": 4.6,
  "Arpoador": 4.7, "Maracanã": 4.6, "Sambódromo": 4.3, "Roda Gigante do Rio": 4.2,
  "Arcos da Lapa": 4.6, "Ilha Grande": 4.8, "Centro Histórico de Paraty": 4.7,
  "Floresta da Tijuca": 4.6, "Pedra da Gávea": 4.5, "Mirante Dona Marta": 4.7,
  "Vista Chinesa": 4.4, "Pedra Bonita": 4.6, "Pedra do Telégrafo": 4.5,
  "Parque Lage": 4.7, "Jardim Botânico": 4.7, "Parque das Catacumbas": 4.4,
  "Quinta da Boa Vista": 4.5, "Parque da Cidade": 4.5, "Morro Dois Irmãos": 4.7,
  "Museu do Amanhã": 4.5, "Museu Histórico Nacional": 4.4, "Museu do Flamengo": 4.3,
  "CCBB Rio de Janeiro": 4.5, "Museu de Arte Moderna do Rio de Janeiro": 4.5,
  "Museu Nacional de Belas Artes": 4.5, "Forte de Copacabana": 4.4,
  "Pedra do Sal": 4.4, "Igreja da Candelária": 4.6, "Biblioteca Nacional do Brasil": 4.5,
  "Feira de São Cristóvão": 4.4, "Caminho Niemeyer": 4.4, "Rocinha": 4.2,
  "Vidigal": 4.6, "Ilha de Paquetá": 4.4, "Marina da Glória": 4.3,
  "Escadaria Selarón": 4.7, "BioParque do Rio": 4.4, "AquaRio": 4.3,
  "Praia da Joatinga": 4.6, "Praia Vermelha": 4.7, "Praia de Grumari": 4.6,
  "Estádio Nilton Santos": 4.4, "Rampa Pedra Bonita": 4.5, "Cabo Frio": 4.5,
  "Arraial do Cabo": 4.7, "Búzios": 4.6, "Saquarema": 4.4, "Petrópolis": 4.5,
  "Teresópolis": 4.5, "Nova Friburgo": 4.4, "Visconde de Mauá": 4.5,
  "Angra dos Reis": 4.6
};

const getRating = nome => RATINGS[nome] ?? 4.0;

/* ==============================
   ESTADO
================================*/
const selected = new Set();
let tabAtual = "todos";
let sortAtual = "rating";
let queryAtual = "";
let catAtual = "";
let regAtual = "";
let perAtual = "";

/* ==============================
   INIT
================================*/
document.addEventListener("DOMContentLoaded", () => {
  renderLista();
  configurarFiltros();
  configurarValidacaoDias();
  configurarOrcamento();
  document.getElementById("gerarRoteiroBtn").addEventListener("click", gerar);

  const togglePontosBtn = document.getElementById("togglePontosBtn");
  const pontosContent = document.getElementById("pontosContent");
  if (togglePontosBtn && pontosContent) {
    togglePontosBtn.addEventListener("click", () => {
      pontosContent.classList.toggle("collapsed");
      if (pontosContent.classList.contains("collapsed")) {
        togglePontosBtn.innerHTML = 'Ver pontos turísticos <i class="fa-solid fa-chevron-down" style="margin-left: 8px;"></i>';
      } else {
        togglePontosBtn.innerHTML = 'Ocultar pontos turísticos <i class="fa-solid fa-chevron-up" style="margin-left: 8px;"></i>';
      }
    });
  }
});

function configurarOrcamento() {
  const cbEcon = document.querySelector('input[value="economico"]');
  const section = document.getElementById("budgetSection");
  if (!cbEcon || !section) return;

  cbEcon.addEventListener("change", () => {
    section.style.display = cbEcon.checked ? "block" : "none";
  });
}

/* ==============================
   GERAR
================================*/
function gerar() {
  const btn = document.getElementById("gerarRoteiroBtn");
  const prefs = coletarPreferencias();
  if (prefs.diasRoteiro > prefs.diasViagem) {
    document.getElementById("erroDias").style.display = "flex";
    return;
  }
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Gerando...`;
  setTimeout(() => {
    renderizarRoteiros(gerarRoteiros(prefs));
    btn.disabled = false;
    btn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> Gerar Roteiros`;
    document.getElementById("roteirosContainer").scrollIntoView({ behavior: "smooth" });
  }, 600);
}

function coletarPreferencias() {
  return {
    diasViagem:  parseInt(document.getElementById("diasViagem").value),
    diasRoteiro: parseInt(document.getElementById("diasRoteiro").value),
    hospedagem:  document.getElementById("hospedagem").value,
    tipos: Array.from(document.querySelectorAll(".checkbox-grid input:checked")).map(cb => cb.value),
    pontosSelecionados: Array.from(selected)
  };
}

/* ==============================
   RENDER LISTA (MINIMALISTA)
================================*/
function getListaFiltrada() {
  let lista = locais.filter(l => {
    const matchNome = l.nome.toLowerCase().includes(queryAtual);
    const matchCat  = !catAtual || (l.categorias || []).includes(catAtual);
    const matchReg  = !regAtual || l.regiao === regAtual;
    const matchPer  = !perAtual || l.periodo === perAtual;
    const matchTab  = tabAtual === "todos" || getFavoritos().has(l.nome);
    return matchNome && matchCat && matchReg && matchPer && matchTab;
  });

  lista.sort((a, b) => {
    if (sortAtual === "rating")     return getRating(b.nome) - getRating(a.nome);
    if (sortAtual === "nome")       return a.nome.localeCompare(b.nome);
    if (sortAtual === "preco-asc")  return (a.preco || 0) - (b.preco || 0);
    if (sortAtual === "preco-desc") return (b.preco || 0) - (a.preco || 0);
    return 0;
  });

  return lista;
}

function renderLista() {
  const container = document.getElementById("listaPontos");
  const lista = getListaFiltrada();
  container.innerHTML = "";

  // Atualizar contadores das tabs
  document.getElementById("countTodos").textContent = locais.filter(l => {
    return l.nome.toLowerCase().includes(queryAtual) &&
           (!catAtual || (l.categorias||[]).includes(catAtual)) &&
           (!regAtual || l.regiao === regAtual) &&
           (!perAtual || l.periodo === perAtual);
  }).length;
  document.getElementById("countFavoritos").textContent = getFavoritos().size;

  if (lista.length === 0) {
    container.innerHTML = `<p class="sem-resultados">${tabAtual === "favoritos" ? "Nenhum favorito encontrado. Adicione locais clicando no ❤️ na página Explore." : "Nenhum ponto encontrado."}</p>`;
    return;
  }

  lista.forEach(local => {
    const isSel = selected.has(local.nome);
    const rating = getRating(local.nome);
    const stars = "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "");
    const precoText = local.preco ? `R$ ${local.preco}` : "Gratuito";
    const isGratuito = local.preco === 0 || local.preco === undefined || local.preco === "Gratuito";
    const isEconomico = (local.preco || 0) <= 50 || isGratuito;

    const ecoBadge = isEconomico ? '<span class="badge badge-economico">Econômico</span>' : '';
    const grtBadge = isGratuito ? '<span class="badge badge-gratuito">Gratuito</span>' : '';
    const tpsBadges = (local.tipoPasseio || []).map(t => `<span class="badge badge-tipo badge-${t}">${t}</span>`).join("");
    const catBadges = (local.categorias || []).slice(0,1).map(c => `<span class="badge badge-cat badge-${c}">${c}</span>`).join("");

    const item = document.createElement("div");
    item.className = "card-ponto" + (isSel ? " selecionado" : "");
    item.dataset.nome = local.nome;

    item.innerHTML = `
      <div class="card-ponto-check">
        <i class="fa-solid ${isSel ? "fa-circle-check" : "fa-circle-plus"}"></i>
      </div>
      <div class="card-img-thumb">
        <img src="${local.imagem || 'assets/images/default.jpg'}" alt="${local.nome}">
      </div>
      <div class="card-info-mini">
        <span class="card-nome">${local.nome}</span>
        <span class="card-meta">
          <span class="meta-loc"><i class="fa-solid fa-location-dot"></i> ${local.bairro || ""}</span>
          <span class="meta-sep">·</span>
          <span class="meta-rating" title="Avaliação Google">⭐ ${rating.toFixed(1)}</span>
          <span class="meta-sep">·</span>
          <span class="meta-preco ${local.preco ? "" : "gratuito"}">${precoText}</span>
          <span class="meta-sep">·</span>
          <span class="meta-dur"><i class="fa-solid fa-clock"></i> ${local.duracao}h</span>
        </span>
      </div>
      <div class="card-badges-mini">
        ${grtBadge + ecoBadge + catBadges + tpsBadges}
      </div>
    `;

    item.addEventListener("click", () => {
      toggleSelect(local.nome);
    });

    container.appendChild(item);
  });
}

function toggleSelect(nome) {
  const local = locais.find(l => l.nome === nome);
  const isEcon = document.querySelector('input[value="economico"]')?.checked;

  if (!selected.has(nome)) {
    // BLOQUEIO DE ORÇAMENTO
    if (isEcon) {
      const limitLocal = parseFloat(document.getElementById("budgetPerLocal").value) || 0;
      const limitTotal = parseFloat(document.getElementById("budgetTotal").value) || 0;
      
      let custoAtual = 0;
      selected.forEach(n => {
        const l = locais.find(x => x.nome === n);
        custoAtual += l?.preco || 0;
      });

      if ((local.preco || 0) > limitLocal) {
        alert(`Este local (R$ ${local.preco}) excede seu limite de R$ ${limitLocal} por ponto.`);
        return;
      }
      if (custoAtual + (local.preco || 0) > limitTotal) {
        alert(`Adicionar este local excederia seu orçamento total de R$ ${limitTotal}.`);
        return;
      }
    }
    selected.add(nome);
  } else {
    selected.delete(nome);
  }
  atualizarResumo();
  renderLista();
}

/* ==============================
   RESUMO SIDEBAR
================================*/
function atualizarResumo() {
  document.getElementById("contadorPontos").innerText = selected.size;
  let custo = 0;
  selected.forEach(nome => {
    const l = locais.find(x => x.nome === nome);
    custo += l?.preco || 0;
  });
  document.getElementById("estimativaCusto").innerText = custo.toFixed(2);

  const listaEl = document.getElementById("listaSelecionados");
  if (!listaEl) return;
  if (selected.size === 0) {
    listaEl.innerHTML = `<li class="vazio">Nenhum ponto selecionado</li>`;
    return;
  }
  listaEl.innerHTML = Array.from(selected).map(n => `
    <li>
      <i class="fa-solid fa-map-pin" style="color:#0f9d58"></i>
      <span>${n}</span>
      <button class="btn-remover" data-nome="${n}" title="Remover">✕</button>
    </li>
  `).join("");
  listaEl.querySelectorAll(".btn-remover").forEach(btn => {
    btn.addEventListener("click", () => toggleSelect(btn.dataset.nome));
  });
}

/* ==============================
   FILTROS + TABS
================================*/
function configurarFiltros() {
  document.getElementById("buscarPonto")?.addEventListener("input", e => { queryAtual = e.target.value.toLowerCase(); renderLista(); });
  document.getElementById("categoriaFilter")?.addEventListener("change", e => { catAtual = e.target.value; renderLista(); });
  document.getElementById("regiaoFilter")?.addEventListener("change", e => { regAtual = e.target.value; renderLista(); });
  document.getElementById("periodoFilter")?.addEventListener("change", e => { perAtual = e.target.value; renderLista(); });
  document.getElementById("sortFilter")?.addEventListener("change", e => { sortAtual = e.target.value; renderLista(); });

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      tabAtual = btn.dataset.tab;
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderLista();
    });
  });
}

/* ==============================
   VALIDAÇÃO DIAS
================================*/
function configurarValidacaoDias() {
  const validate = () => {
    const v = parseInt(document.getElementById("diasViagem").value);
    const r = parseInt(document.getElementById("diasRoteiro").value);
    const errEl = document.getElementById("erroDias");
    const sel = document.getElementById("diasRoteiro");
    if (r > v) { sel.classList.add("input-erro"); if(errEl) errEl.style.display="flex"; }
    else { sel.classList.remove("input-erro"); if(errEl) errEl.style.display="none"; }
  };
  document.getElementById("diasViagem")?.addEventListener("change", validate);
  document.getElementById("diasRoteiro")?.addEventListener("change", validate);
}

/* ==============================
   RENDERIZAR ROTEIROS
================================*/
const CFG = {
  ia:          { icon:"fa-robot",              cor:"#6366f1", bg:"#eef2ff", desc:"Gerado 100% pelos filtros, sem seleção manual." },
  favoritos:   { icon:"fa-heart",              cor:"#ec4899", bg:"#fdf2f8", desc:"Apenas os pontos que você favoritou, distribuídos nos dias." },
  exploratorio:{ icon:"fa-compass",            cor:"#f59e0b", bg:"#fffbeb", desc:"Seus favoritos + locais diferentes para variar." }
};

function renderizarRoteiros(roteiros) {
  const container = document.getElementById("roteirosContainer");
  container.innerHTML = "";

  if (roteiros.length > 0) {
    const topoBtn = document.createElement("div");
    topoBtn.className = "roteiros-topo";
    topoBtn.innerHTML = `
      <button class="btn-limpar" id="limparRoteirosBtn">
        <i class="fa-solid fa-trash-can"></i> Limpar Roteiros
      </button>
    `;
    container.appendChild(topoBtn);
    
    topoBtn.querySelector("#limparRoteirosBtn").addEventListener("click", () => {
      container.innerHTML = "";
    });
  }

  roteiros.forEach(roteiro => {
    const cfg = CFG[roteiro.tipo] || CFG.ia;
    const card = document.createElement("div");
    card.className = "roteiro-card";
    card.style.setProperty("--cor", cfg.cor);
    card.style.setProperty("--cor-fundo", cfg.bg);

    const avisoFav = roteiro.semFavoritos
      ? `<div class="aviso-sem-fav"><i class="fa-solid fa-circle-info"></i> Nenhum favorito selecionado. Clique em ❤️ nos pontos para adicioná-los.</div>`
      : "";

    const diasHTML = roteiro.dias.map((dia, i) => {
      if (dia.atividades.length === 0)
        return `<div class="dia"><h4><i class="fa-solid fa-calendar-day"></i> Dia ${i+1}</h4><p class="sem-ativ">Nenhuma atividade.</p></div>`;
      return `<div class="dia">
        <h4><i class="fa-solid fa-calendar-day"></i> Dia ${i+1}</h4>
        <ul>${dia.atividades.map(a => `
          <li>
            <span class="ativ-nome">${a.nome}</span>
            <span class="ativ-detalhe">
              <i class="fa-solid fa-clock"></i> ${a.duracao}h &nbsp;·&nbsp;
              <i class="fa-solid fa-ticket"></i> ${a.preco ? "R$ "+a.preco : "Gratuito"}
              &nbsp;·&nbsp; ⭐ ${getRating(a.nome).toFixed(1)}
            </span>
          </li>`).join("")}
        </ul>
        <div class="dia-custo">Total do dia: R$ ${dia.custoDia.toFixed(2)}</div>
      </div>`;
    }).join("");

    card.innerHTML = `
      <div class="roteiro-header">
        <div class="roteiro-titulo">
          <div class="roteiro-icon"><i class="fa-solid ${cfg.icon}"></i></div>
          <div>
            <h3>${roteiro.nome}</h3>
            <p class="roteiro-desc">${cfg.desc}</p>
          </div>
        </div>
        <div class="header-actions">
          <div class="custo-total"><i class="fa-solid fa-wallet"></i> R$ ${roteiro.custoTotal.toFixed(2)}</div>
          <button class="btn-toggle-roteiro" title="Expandir/Recolher">
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
      </div>
      ${avisoFav}
      <div class="dias-grid expanded">${diasHTML}</div>
    `;

    const btnToggle = card.querySelector(".btn-toggle-roteiro");
    const grid = card.querySelector(".dias-grid");
    btnToggle.addEventListener("click", () => {
      grid.classList.toggle("expanded");
      const icon = btnToggle.querySelector("i");
      icon.classList.toggle("fa-chevron-down");
      icon.classList.toggle("fa-chevron-right");
    });

    container.appendChild(card);
  });
}