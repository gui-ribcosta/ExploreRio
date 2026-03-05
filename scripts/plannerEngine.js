import { locais } from "./data.js";
import { calcularScore } from "./scoring.js";

export function gerarRoteiros(preferencias) {

  const {
    diasRoteiro,
    orcamento,
    tipos,
    hospedagem,
    pontosSelecionados
  } = preferencias;

  // 1️⃣ FILTRO BASE
  const baseFiltrada = locais.filter(local => {
    if (tipos?.length > 0) {
      return tipos.some(tipo =>
        local.categorias.includes(tipo.toLowerCase())
      );
    }
    return true;
  });

  // 2️⃣ APLICAR SCORE INTELIGENTE
  const comScore = baseFiltrada.map(local => ({
    ...local,
    score: calcularScore(local, preferencias)
  }));

  const ordenados = comScore.sort((a, b) => b.score - a.score);

  // 3️⃣ GERAR 3 VARIAÇÕES
  return [
    montarRoteiro("Roteiro Equilibrado", ordenados, diasRoteiro, orcamento, pontosSelecionados),
    montarRoteiro("Roteiro Econômico", ordenados.filter(l => l.preco <= 50), diasRoteiro, orcamento, pontosSelecionados),
    montarRoteiro("Roteiro Premium", ordenados, diasRoteiro, orcamento * 1.5, pontosSelecionados)
  ];
}

/* ===============================
   MONTAGEM PRINCIPAL
=================================*/

function montarRoteiro(nome, locaisOrdenados, dias, orcamentoMax, pontosSelecionados = []) {

  const roteiro = Array.from({ length: dias }, () => ({
    atividades: [],
    tempoTotal: 0,
    custoDia: 0
  }));

  let custoTotal = 0;

  // 🔥 1️⃣ GARANTIR INCLUSÃO DOS OBRIGATÓRIOS
  const obrigatorios = locaisOrdenados.filter(local =>
    pontosSelecionados?.includes(local.nome)
  );

  obrigatorios.forEach((local, index) => {
    const dia = index % dias;
    adicionarAtividade(roteiro[dia], local);
    custoTotal += local.preco || 0;
  });

  // 🔥 2️⃣ COMPLETAR COM BASE NO SCORE E ORÇAMENTO
  locaisOrdenados.forEach(local => {

    if (pontosSelecionados?.includes(local.nome)) return;

    const preco = local.preco || 0;

    if (custoTotal + preco > orcamentoMax) return;

    for (let i = 0; i < dias; i++) {
      if (roteiro[i].tempoTotal + (parseInt(local.duracao) || 2) <= 8) {
        adicionarAtividade(roteiro[i], local);
        custoTotal += preco;
        break;
      }
    }

  });

  return {
    nome,
    dias: roteiro,
    custoTotal,
    orcamentoMax,
    percentualOrcamento: Math.min((custoTotal / orcamentoMax) * 100, 100)
  };
}

/* ===============================
   FUNÇÃO AUXILIAR
=================================*/

function adicionarAtividade(dia, local) {
  const duracao = parseInt(local.duracao) || 2;
  dia.atividades.push(local);
  dia.tempoTotal += duracao;
  dia.custoDia += local.preco || 0;
}