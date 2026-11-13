export const TRADICOES = [
  {id: 'evangelica', nome: 'Evangélica'},
  {id: 'catolica', nome: 'Católica'},
];

export const VERSOES = [
  {
    id: 'exemplo-evangelica',
    nome: 'Versão de exemplo',
    sigla: 'Exemplo',
    tradicao: 'evangelica',
    copyright: 'Texto de exemplo. Substitua por uma versão com licença adequada.',
  },
  {
    id: 'exemplo-catolica',
    nome: 'Versão de exemplo',
    sigla: 'Exemplo',
    tradicao: 'catolica',
    copyright: 'Texto de exemplo. Substitua por uma versão com licença adequada.',
  },
];

export const versoesDaTradicao = (tradicao) =>
  VERSOES.filter((versao) => versao.tradicao === tradicao);
