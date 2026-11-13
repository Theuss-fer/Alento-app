import {Fragment} from 'react';
import {StyleSheet, Text} from 'react-native';
import Card from '../components/Card';
import {useTradition} from '../context/TraditionContext';
import {livrosDaTradicao} from '../data/livros';
import {colors, spacing} from '../theme';
import Screen from './Screen';

const SECOES = [
  {id: 'AT', titulo: 'Antigo Testamento'},
  {id: 'NT', titulo: 'Novo Testamento'},
];

export default function LivrosScreen({navigation}) {
  const {tradicao} = useTradition();
  const livros = livrosDaTradicao(tradicao);

  return (
    <Screen
      titulo="Livros"
      subtitulo={`${livros.length} livros`}
      onBack={() => navigation.goBack()}
    >
      {SECOES.map((secao) => (
        <Fragment key={secao.id}>
          <Text style={styles.tituloSecao}>{secao.titulo}</Text>
          {livros
            .filter((livro) => livro.testamento === secao.id)
            .map((livro) => (
              <Card
                key={livro.id}
                titulo={livro.nome}
                onPress={() =>
                  navigation.navigate('Capitulos', {livroId: livro.id})
                }
              />
            ))}
        </Fragment>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  tituloSecao: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.medium,
    marginTop: spacing.medium,
  },
});
