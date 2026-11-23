import { API_LIVROS } from '../data/apiLivros';
import { BIBLIAS } from '../data/biblias';
import { getVersao } from '../data/versoes';

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'https://abibliadigital.api.br/api';
const CACHE_PREFIX = '@alento/capitulo/';

function getLivroLocal(versaoId, livroId) {
  return BIBLIAS[versaoId]?.[livroId];
}

export function livroDisponivel(versaoId, livroId) {
  const versao = getVersao(versaoId);

  if (versao?.fonte === 'api') {
    return Boolean(API_LIVROS[livroId]);
  }

  return Boolean(getLivroLocal(versaoId, livroId));
}

async function buscarCapituloNaApi(versao, livroId, capitulo) {
  const abrev = API_LIVROS[livroId]?.abrev;
  if (!abrev) {
    return null;
  }

  const chave = `${CACHE_PREFIX}${versao.codigoApi}/${abrev}/${capitulo}`;

  try {
    const salvo = await AsyncStorage.getItem(chave);
    if (salvo) {
      return JSON.parse(salvo);
    }
  } catch (error) {
    // cache ilegível: segue para a rede
  }

  try {
    const resposta = await fetch(
      `${API_BASE}/verses/${versao.codigoApi}/${abrev}/${capitulo}`,
    );
    if (!resposta.ok) {
      return null;
    }

    const dados = await resposta.json();
    if (!Array.isArray(dados?.verses) || dados.verses.length === 0) {
      return null;
    }

    const versiculos = dados.verses.map((v) => ({
      numero: v.number,
      texto: v.text,
    }));

    try {
      await AsyncStorage.setItem(chave, JSON.stringify(versiculos));
    } catch (error) {
      // não conseguiu guardar: o capítulo ainda aparece nesta vez
    }

    return versiculos;
  } catch (error) {
    return null;
  }
}

export async function getCapitulos(versaoId, livroId) {
  const versao = getVersao(versaoId);

  if (versao?.fonte === 'api') {
    const total = API_LIVROS[livroId]?.capitulos ?? 0;
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const livro = getLivroLocal(versaoId, livroId);
  if (!livro?.capitulos) {
    return [];
  }

  return Object.keys(livro.capitulos)
    .map(Number)
    .sort((a, b) => a - b);
}

export async function getCapitulo(versaoId, livroId, capitulo) {
  const versao = getVersao(versaoId);

  if (versao?.fonte === 'api') {
    return buscarCapituloNaApi(versao, livroId, capitulo);
  }

  const versiculos = getLivroLocal(versaoId, livroId)?.capitulos?.[capitulo];
  if (!Array.isArray(versiculos)) {
    return null;
  }

  return versiculos.map((texto, index) => ({
    numero: index + 1,
    texto,
  }));
}