import {BIBLIAS} from '../data/biblias';

export  function livroDisponivel(versaoId, livroId) {
  return Boolean(BIBLIAS[versaoId]?.[livroId]);
}

export  function getCapitulos(versaoId, livroId) {
  const livro = BIBLIAS[versaoId]?.[livroId];
  if (!livro?.capitulos) {
    return [];
  }

  return Object.keys(livro.capitulos)
    .map(Number)
    .sort((a, b) => a - b);
}

export  function getCapitulo(versaoId, livroId, capitulo) {
  const capitulos = BIBLIAS[versaoId]?.[livroId]?.capitulos;
  const versiculos = capitulos?.[capitulo];

  if (!Array.isArray(versiculos)) {
    return null;
  }

  return versiculos.map((texto, index) => ({
    numero: index + 1,
    texto,
  }));
}
