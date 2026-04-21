const FAVORITOS_KEY = "explorerio_favoritos";

export function getFavoritos() {
  try { return new Set(JSON.parse(localStorage.getItem(FAVORITOS_KEY) || "[]")); }
  catch { return new Set(); }
}

export function toggleFavoritoStorage(nome) {
  const favs = getFavoritos();
  if (favs.has(nome)) favs.delete(nome);
  else favs.add(nome);
  localStorage.setItem(FAVORITOS_KEY, JSON.stringify([...favs]));
  return favs.has(nome);
}
