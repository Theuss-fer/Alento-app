import Card from '../components/Card';
import Screen from './Screen';

export default function HomeScreen({navigation}) {
  return (
    <Screen
      titulo="Alento"
      subtitulo="Um lugar calmo para ler a Palavra."
    >
      <Card
        titulo="Ler a Bíblia"
        sub="Escolha um livro e um capítulo"
        onPress={() => navigation.navigate('Livros')}
      />
    </Screen>
  );
}
