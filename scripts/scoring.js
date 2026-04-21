export function calcularScore(local, preferencias) {
  let score = 0;

  const {
    tipos,
    hospedagem,
    orcamento,
    pontosSelecionados
  } = preferencias;

  const preco = local.preco || 0;

  /* ===============================
     🎯 1️⃣ PRIORIDADE MÁXIMA
  =================================*/
  if (pontosSelecionados?.includes(local.nome)) {
    score += 1000; // força entrar no topo
  }

  /* ===============================
     🎯 2️⃣ TIPO DE EXPERIÊNCIA
  =================================*/
  if (tipos?.some(tipo =>
    local.tipoPasseio && local.tipoPasseio.includes(tipo.toLowerCase())
  )) {
    score += 50;
  }

  /* ===============================
     📍 3️⃣ PROXIMIDADE DA HOSPEDAGEM
  =================================*/
  // Mapeamento de hospedagem para regiões dos locais
  const mapaHospedagem = {
    "zona-sul":   ["zona-sul"],
    "zona-norte":  ["zona-norte"],
    "zona-oeste":  ["zona-oeste"],
    "zona-leste":  ["zona-leste"],
    "centro":      ["centro"],
    "niteroi":     ["niteroi"]
  };

  const regioesProximas = mapaHospedagem[hospedagem] || [];
  if (regioesProximas.includes(local.regiao)) {
    score += 40;
  }

  // bônus leve para Zona Sul (turisticamente estratégica)
  if (local.regiao === "zona-sul") {
    score += 15;
  }

  // penalidade para locais de dia-inteiro quando poucos dias de roteiro
  const diasRoteiro = preferencias.diasRoteiro || 1;
  const durLocal = typeof local.duracao === "number" ? local.duracao : 2;
  if (durLocal >= 8 && diasRoteiro <= 2) {
    score -= 20;
  }

  /* ===============================
     💰 4️⃣ INTELIGÊNCIA DE ORÇAMENTO
  =================================*/

  if (orcamento) {
    const proporcao = preco / orcamento;

    if (preco === 0) {
      score += 60; // gratuito é sempre ótimo
    } else if (proporcao <= 0.05) {
      score += 40; // muito barato comparado ao orçamento
    } else if (proporcao <= 0.15) {
      score += 25;
    } else if (proporcao <= 0.30) {
      score += 10;
    } else if (proporcao > 0.50) {
      score -= 30; // caro demais proporcionalmente
    }
  }

  /* ===============================
     ⭐ 5️⃣ POPULARIDADE
  =================================*/
  if (local.rating) {
    score += local.rating * 8;
  }

  /* ===============================
     ⏳ 6️⃣ DURAÇÃO EQUILIBRADA
  =================================*/
  const duracao = typeof local.duracao === "number" ? local.duracao : 2;

  if (duracao <= 2) {
    score += 10; // fácil de encaixar no dia
  } else if (duracao >= 6) {
    score -= 10; // muito pesado
  }

  return score;
}