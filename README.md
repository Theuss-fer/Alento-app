# Alento

> Um lugar calmo para ler a Palavra.

Alento é um aplicativo mobile de leitura bíblica feito com React Native e Expo. Ele acolhe quem lê a Bíblia nas tradições **evangélica** e **católica**: a pessoa escolhe a tradição ao abrir o app e o aplicativo passa a mostrar o conjunto de livros e as versões dessa tradição.

O nome vem de *alento*: ânimo, conforto, fôlego. A ideia é uma leitura sem pressa, com visual leve e texto fácil de ler.

**Status:** em desenvolvimento. O MVP de leitura está pronto e funcionando com **texto de exemplo**. A integração com o texto bíblico real é a próxima etapa (veja [Fonte do texto bíblico](#fonte-do-texto-bíblico-e-direitos-autorais)).

## Objetivo

Este projeto tem dois objetivos:

1. **Produto:** oferecer uma leitura da Bíblia simples e acolhedora, sem exigir que a pessoa escolha entre tradições "no escuro": o app respeita o cânon de cada uma (66 livros na evangélica e 73 na católica).
2. **Portfólio:** praticar e demonstrar uma arquitetura mobile organizada, com separação entre interface, estado e acesso a dados.

## Funcionalidades atuais

- [x] Escolha de tradição (evangélica ou católica) na primeira abertura
- [x] Preferência salva no aparelho, com validação ao carregar
- [x] Lista de livros por testamento, respeitando o cânon da tradição (66 ou 73 livros)
- [x] Lista de capítulos de cada livro
- [x] Tela de leitura com navegação entre capítulos anterior e próximo
- [x] Configurações: trocar a tradição e a versão a qualquer momento
- [x] Linha de copyright da versão exibida na leitura
- [ ] Texto bíblico real (em andamento)

## Tecnologias

- [React Native](https://reactnative.dev/) e [Expo](https://expo.dev/)
- JavaScript
- [React Navigation](https://reactnavigation.org/) (native stack)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) para preferências locais
- Context API do React para o estado global

## Como rodar

Pré-requisitos: [Node.js](https://nodejs.org/) (versão LTS) e o app **Expo Go** no celular, na versão compatível com o SDK do projeto.

```bash
git clone https://github.com/Theuss-fer/Alento-app.git
cd Alento-app
npm install
npx expo start
```

Leia o QR code com o Expo Go. O celular e o computador precisam estar na mesma rede Wi-Fi (ou use `npx expo start --tunnel`).

## Estrutura do projeto

```
App.js                      Provedores e navegação
src/
  navigation/               RootNavigator (fluxo: escolha de tradição -> app)
  screens/                  Tradição, Home, Livros, Capítulos, Leitura, Configurações
  components/               Componentes reutilizáveis (Card, Screen)
  context/                  TraditionContext (tradição e versão, salvas no aparelho)
  services/                 bibleService (acesso ao texto bíblico)
  data/
    versoes.js              Catálogo de tradições e versões
    livros.js               Lista dos 73 livros, com filtro por tradição
    biblias/                Texto em JSON, um arquivo por livro, por versão
  theme/                    Cores, espaçamentos e raios (paleta creme e verde-sálvia)
```

## Decisões técnicas

- **Independente de versão.** As telas nunca sabem de onde vem o texto: elas só chamam o `bibleService` (`getCapitulos`, `getCapitulo`). Trocar a fonte (arquivo local, API) ou adicionar uma versão nova não exige mexer na interface.
- **Cânon por tradição.** Existe uma lista única de 73 livros, com os 7 deuterocanônicos marcados. A tradição evangélica é essa lista filtrada, em vez de duas listas para manter.
- **Navegação condicional.** O `RootNavigator` mostra a tela de escolha de tradição enquanto não há tradição salva e troca para o app sozinho quando ela é definida. Um estado de carregamento evita que a tela de escolha apareça por um instante para quem já escolheu.
- **Preferências validadas.** O que vem do `AsyncStorage` só é aceito se a tradição existir e a versão pertencer a ela; caso contrário, o app cai em um valor seguro.
- **Tema centralizado.** Cores, espaçamentos e raios ficam em `src/theme`, e as telas não usam valores soltos.

## Fonte do texto bíblico e direitos autorais

Os textos em `src/data/biblias` são **exemplos**. Versões como NVI, NVT, NTLH, Ave-Maria, Pastoral e Jerusalém têm direitos autorais das editoras, e este repositório não distribui o texto delas.

O plano é um modelo misto, aproveitando a arquitetura acima:

- **Tradição evangélica:** texto vindo de uma API pública de Bíblia em português, com cache local.
- **Tradição católica:** arquivos JSON locais de uma tradução em domínio público ou com licença aberta (licença a confirmar antes do uso).

Qualquer versão com copyright só entrará com autorização de quem detém os direitos.

## Roadmap

As ideias e a ordem de prioridade estão em [IDEIAS.md](./IDEIAS.md). Em resumo: texto real, versículo diário, planos de leitura, orações e favoritos, e recursos de estudo (resumo e devocional).

## Autor

Feito por [Matheus Barros Ferreira](https://github.com/Theuss-fer).
