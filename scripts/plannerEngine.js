import { locais } from "./data.js";
import { calcularScore } from "./scoring.js";

export function gerarRoteiros(preferencias) {
  const { diasRoteiro, tipos, pontosSelecionados = [] } = preferencias;

  const poolBase = locais.filter(local => {
    if (tipos?.length > 0)
      return tipos.some(t => local.tipoPasseio?.includes(t.toLowerCase()));
    return true;
  });

  const comScore = poolBase
    .map(l => ({ ...l, score: calcularScore(l, preferencias) }))
    .sort((a, b) => b.score - a.score);

  // Roteiro 1: 100% IA, ignora favoritos
  const r1 = montarRoteiro("Sugestão da IA", "ia", comScore, diasRoteiro, []);

  // Roteiro 2: SOMENTE os favoritos escolhidos, sem extras
  const r2 = montarRoteiroSomenteFavoritos("Com Seus Favoritos", "favoritos", comScore, diasRoteiro, pontosSelecionados);

  // Roteiro 3: favoritos + exploratório (locais diferentes do r2)
  const usadosR2 = new Set(r2.dias.flatMap(d => d.atividades.map(a => a.nome)));
  const poolExp = comScore.filter(l => pontosSelecionados.includes(l.nome) || !usadosR2.has(l.nome));
  // Aumentamos o limite para garantir extras no exploratório
  const r3 = montarRoteiro("Exploratório", "exploratorio", poolExp, diasRoteiro, pontosSelecionados, 10); 


  return [r1, r2, r3];
}

function montarRoteiroSomenteFavoritos(nome, tipo, locaisOrdenados, dias, obrigatoriosNomes = []) {
  const roteiro = Array.from({ length: dias }, () => ({ atividades: [], tempoTotal: 0, custoDia: 0 }));
  let custoTotal = 0;

  if (obrigatoriosNomes.length === 0)
    return { nome, tipo, dias: roteiro, custoTotal, semFavoritos: true };

  locaisOrdenados
    .filter(l => obrigatoriosNomes.includes(l.nome))
    .forEach((local, idx) => {
      const dia = idx % dias;
      adicionarAtividade(roteiro[dia], local);
      custoTotal += local.preco || 0;
    });

  return { nome, tipo, dias: roteiro, custoTotal };
}

function montarRoteiro(nome, tipo, locaisOrdenados, dias, obrigatoriosNomes = [], limiteHoras = 8) {
  const roteiro = Array.from({ length: dias }, () => ({ atividades: [], tempoTotal: 0, custoDia: 0 }));
  let custoTotal = 0;
  const jaAdicionados = new Set();

  locaisOrdenados.filter(l => obrigatoriosNomes.includes(l.nome)).forEach((local, idx) => {
    const duracao = typeof local.duracao === "number" ? local.duracao : 2;
    const dia = idx % dias;
    if (roteiro[dia].tempoTotal + duracao <= limiteHoras + 2) {
      adicionarAtividade(roteiro[dia], local);
      jaAdicionados.add(local.nome);
      custoTotal += local.preco || 0;
    }
  });

  locaisOrdenados.forEach(local => {
    if (jaAdicionados.has(local.nome)) return;
    const duracao = typeof local.duracao === "number" ? local.duracao : 2;
    for (let i = 0; i < dias; i++) {
      if (roteiro[i].tempoTotal + duracao <= limiteHoras) {
        adicionarAtividade(roteiro[i], local);
        jaAdicionados.add(local.nome);
        custoTotal += local.preco || 0;
        break;
      }
    }
  });

  return { nome, tipo, dias: roteiro, custoTotal };
}

function adicionarAtividade(dia, local) {
  const duracao = typeof local.duracao === "number" ? local.duracao : 2;
  dia.atividades.push(local);
  dia.tempoTotal += duracao;
  dia.custoDia += local.preco || 0;
}