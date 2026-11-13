import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTradition} from '../context/TraditionContext';
import {livrosDaTradicao} from '../data/livros';
import {versoesDaTradicao} from '../data/versoes';
import {getCapitulos} from '../services/bibleService';
import {colors, radius, spacing} from '../theme';
import Screen from './Screen';

export default function CapitulosScreen({navigation, route}) {
  const {tradicao} = useTradition();
  const {livroId} = route.params;
  const livro = livrosDaTradicao(tradicao).find((item) => item.id === livroId);
  const versaoId = versoesDaTradicao(tradicao)[0].id;
  const [capitulos, setCapitulos] = useState(null);

  useEffect(() => {
    let ativo = true;

    async function carregarCapitulos() {
      const resultado = await getCapitulos(versaoId, livroId);
      if (ativo) {
        setCapitulos(resultado);
      }
    }

    carregarCapitulos();
    return () => {
      ativo = false;
    };
  }, [livroId, versaoId]);

  return (
    <Screen
      titulo={livro?.nome ?? 'Livro não encontrado'}
      subtitulo="Escolha um capítulo"
      onBack={() => navigation.goBack()}
    >
      {capitulos === null ? null : capitulos.length === 0 ? (
        <Text style={styles.aviso}>
          Esta versão ainda não tem o texto deste livro.
        </Text>
      ) : (
        <View style={styles.grade}>
          {capitulos.map((capitulo) => (
            <TouchableOpacity
              key={capitulo}
              style={styles.botao}
              onPress={() => console.log(capitulo)}
            >
              <Text style={styles.numero}>{capitulo}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  aviso: {
    color: colors.textMuted,
    fontSize: 15,
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.small,
  },
  botao: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radius.medium,
  },
  numero: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
