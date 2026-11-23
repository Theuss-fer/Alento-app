# Ideias do Alento

Lista viva de ideias e decisões. Regra de uso: ideia nova entra em **Para analisar**, em uma linha, sem implementar na hora. Quando for aprovada, vai para **Planejadas**, em ordem de prioridade. Ao terminar, passa para **Feitas**. O que for descartado fica registrado com o motivo.

## Planejadas (em ordem de prioridade)

1. **Texto bíblico real**
   - Evangélica: A Bíblia Digital API (criar token grátis, testar `/books` e um capítulo, guardar as abreviações dos livros, usar cache local para respeitar o limite de requisições).
   - Católica: JSON local de uma tradução em domínio público ou com licença aberta (achar a tradução e confirmar a licença antes de usar).
   - Catálogo de versões ganha um campo `fonte` (`'api'` ou `'local'`) e os livros ganham o código usado pela API. O `bibleService` escolhe a fonte; as telas não mudam.
2. **Versículo diário** na Home, a partir de uma lista de referências e do texto da versão escolhida.
3. **Planos diários de leitura** (ex.: um livro em 21 dias). Guardar só as referências de cada dia e o progresso no aparelho, sem depender de licença de texto.
4. **Orações** (criar, listar, marcar como respondida) e **favoritos**.

## Para analisar

- **Resumo por capítulo.** Gerado com IA, de forma descritiva (o que o capítulo narra, sem interpretação), marcado como "gerado por IA" e revisado. Gerar uma vez e guardar, começando por poucos capítulos. A chave da IA não pode ficar no app, então precisa de backend (o projeto da IA Cristã em Spring Boot pode servir).
- **Devocional a partir do versículo do dia ou do capítulo lido**, com opções na tela do capítulo. Mesma dependência de backend do resumo.
- **Liturgia diária (apps católicos).** Não há API aberta e oficial confirmada, e o texto oficial pertence à CNBB. Caminhos: (1) cartão que abre a página de Liturgia Diária da CNBB; (2) guardar só as referências do dia e mostrar o texto da versão escolhida (precisa de uma fonte confiável do calendário litúrgico); (3) texto oficial só com autorização.
- **Autenticação e sincronização** (Firebase Auth e Firestore). Avaliar se vale para o escopo do portfólio.
- **Ajustes de leitura:** voltar ao topo ao trocar de capítulo, tamanho da fonte, "continuar de onde parou".
- **Lista de livros:** mostrar "Sem texto nesta versão" nos livros que a versão ainda não tem.
- **Modo escuro**, mantendo a paleta creme e verde-sálvia como padrão.

## Pendências de acabamento

- Prints das telas no README
- Ícone e splash definitivos (os atuais são do template)
- Trocar `com.seunome.alento` no `app.json` pelo identificador do pacote definitivo (não muda depois de publicado)
- Mover o `Screen` para `src/components`, se ainda estiver em `src/screens`

## Feitas

- [x] Tema centralizado (cores, espaçamentos, raios) e componentes `Card` e `Screen`
- [x] Escolha de tradição na primeira abertura, com preferência salva e validada
- [x] Navegação condicional (escolha de tradição ou Home) com tela de carregamento
- [x] Dados dos livros: 66 (evangélica) e 73 (católica) a partir de uma lista única
- [x] `bibleService` independente de versão, com texto de exemplo
- [x] Telas de Livros, Capítulos e Leitura (anterior e próximo, copyright da versão)
- [x] Configurações: trocar tradição e versão

## Descartadas

- **Copiar e colar capítulos de versões com copyright** (NVI, NTLH, Ave-Maria, Pastoral etc.). Motivo: direitos autorais das editoras; o caminho é API ou texto livre.
