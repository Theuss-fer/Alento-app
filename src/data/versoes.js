export const TRADICOES = [
  {id: 'evangelica', nome: 'Evangélica'},
  {id: 'catolica', nome: 'Católica'},
];

export const VERSOES = [
  {
    id: 'alm1911',
    nome: 'Almeida 1911',
    sigla: 'ALM1911',
    tradicao: 'evangelica',
    fonte: 'api',
    codigoApi: 'alm1911',
    copyright:
      'Tradução de João Ferreira de Almeida; edição de 1911. A obra-base é de domínio público no Brasil, mas direitos de eventuais revisões ou da edição fornecida pela API devem ser confirmados.',
  },
  {
    id: 'nvi',
    nome: 'Nova Versão Internacional',
    sigla: 'NVI',
    tradicao: 'evangelica',
    fonte: 'api',
    codigoApi: 'nvi',
    copyright:
      'Texto da Nova Versão Internacional: direitos da Biblica/Editora Vida. Conteúdo disponibilizado pela API.',
  },
  {
    id: 'exemplo-evangelica',
    nome: 'Versão de exemplo',
    sigla: 'Exemplo',
    tradicao: 'evangelica',
    fonte: 'local',
    copyright: 'Texto de exemplo. Substitua por uma versão com licença adequada.',
  },
  {
    id: 'exemplo-catolica',
    nome: 'Versão de exemplo',
    sigla: 'Exemplo',
    tradicao: 'catolica',
    fonte: 'local',
    copyright: 'Texto de exemplo. Substitua por uma versão com licença adequada.',
  },
];

export const versoesDaTradicao = (tradicao) =>
  VERSOES.filter((versao) => versao.tradicao === tradicao);


export const getVersao = (id) => VERSOES.find((versao) => versao.id === id);