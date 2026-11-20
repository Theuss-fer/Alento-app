import {StyleSheet, Text} from 'react-native';
import Card from '../components/Card';
import {useTradition} from '../context/TraditionContext';
import {livrosDaTradicao} from '../data/livros';
import {TRADICOES, versoesDaTradicao} from '../data/versoes';
import {colors, spacing} from '../theme';
import Screen from './Screen';

export default function ConfigScreen({navigation}) {
  const {tradicao, setTradicao, versaoId, setVersao} = useTradition();

  return (
    <Screen
      titulo="Configurações"
      onBack={() => navigation.goBack()}
    >
      <Text style={styles.tituloSecao}>Tradição</Text>
      {TRADICOES.map((t) => (
        <Card
          key={t.id}
          titulo={t.nome}
          sub={`${livrosDaTradicao(t.id).length} livros`}
          selecionado={t.id === tradicao}
          onPress={() => {
            if (t.id !== tradicao) {
              setTradicao(t.id);
            }
          }}
        />
      ))}

      <Text style={styles.tituloSecao}>Versão</Text>
      {versoesDaTradicao(tradicao).map((v) => (
        <Card
          key={v.id}
          titulo={v.nome}
          selecionado={v.id === versaoId}
          onPress={() => setVersao(v.id)}
        />
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
