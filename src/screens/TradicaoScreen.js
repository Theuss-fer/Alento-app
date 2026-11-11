import {StyleSheet, Text} from 'react-native';
import Card from '../components/Card';
import Screen from './Screen';
import {useTradition} from '../context/TraditionContext';
import {colors, spacing} from '../theme';

const TRADICOES = [
  {id: 'evangelica', nome: 'Evangélica', sub: '66 livros'},
  {id: 'catolica', nome: 'Católica', sub: '73 livros'},
];

export default function TradicaoScreen() {
  const {setTradicao} = useTradition();

  return (
    <Screen
      titulo="Bem-vindo ao Alento"
      subtitulo="Com qual tradição você quer ler a Bíblia?"
    >
      {TRADICOES.map((tradicao) => (
        <Card
          key={tradicao.id}
          titulo={tradicao.nome}
          sub={tradicao.sub}
          onPress={() => setTradicao(tradicao.id)}
        />
      ))}
      <Text style={styles.aviso}>
        Você pode mudar essa escolha depois, em Configurações.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  aviso: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.small,
  },
});