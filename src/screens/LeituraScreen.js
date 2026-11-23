import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {useTradition} from '../context/TraditionContext';
import {livrosDaTradicao} from '../data/livros';
import {VERSOES} from '../data/versoes';
import {getCapitulo, getCapitulos} from '../services/bibleService';
import {colors, fonts, spacing, radius} from '../theme';
import Screen from './Screen';


export default function LeituraScreen({navigation, route}) {
  const {tradicao, versaoId} = useTradition();
  const {livroId, capitulo: capituloInicial} = route.params;
  const livro = livrosDaTradicao(tradicao).find((item) => item.id === livroId);
  const versao = VERSOES.find((item) => item.id === versaoId);
  const [capitulos, setCapitulos] = useState([]);
  const [capitulo, setCapitulo] = useState(capituloInicial);
  const [versiculos, setVersiculos] = useState(undefined);

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

  useEffect(() => {
    let ativo = true;

    async function carregarCapitulo() {
      const resultado = await getCapitulo(versaoId, livroId, capitulo);
      if (ativo) {
        setVersiculos(resultado);
      }
    }

    carregarCapitulo();
    return () => {
      ativo = false;
    };
  }, [capitulo, livroId, versaoId]);

  const idx = capitulos.indexOf(capitulo);
  const anterior = idx > 0 ? capitulos[idx - 1] : null;
  const proximo =
    idx >= 0 && idx < capitulos.length - 1 ? capitulos[idx + 1] : null;

  return (
    <Screen
      titulo={`${livro?.nome ?? 'Livro não encontrado'} ${capitulo}`}
      subtitulo={versao ? `${versao.nome} (${versao.sigla})` : ''}
      onBack={() => navigation.goBack()}
    >
      {versiculos === undefined ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : versiculos === null ? (
        <Text style={styles.aviso}>Capítulo indisponível nesta versão.</Text>
      ) : (
        versiculos.map((v) => (
          <Text key={v.numero} style={styles.verso}>
            <Text style={styles.numero}>{v.numero} </Text>
            {v.texto}
          </Text>
        ))
      )}
      <View style={styles.navegacao}>
        <TouchableOpacity
          style={[styles.botao, anterior === null && styles.botaoDesabilitado]}
          disabled={anterior === null}
          accessibilityRole="button"
          accessibilityLabel="Capítulo anterior"
          onPress={() => {
            setVersiculos(undefined);
            setCapitulo(anterior);
          }}
        >
          <Text style={styles.textoBotao}>‹ Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, proximo === null && styles.botaoDesabilitado]}
          disabled={proximo === null}
          accessibilityRole="button"
          accessibilityLabel="Próximo capítulo"
          onPress={() => {
            setVersiculos(undefined);
            setCapitulo(proximo);
          }}
        >
          <Text style={styles.textoBotao}>Próximo ›</Text>
        </TouchableOpacity>
      </View>
      {versao ? <Text style={styles.copyright}>{versao.copyright}</Text> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  aviso: {
    color: colors.textMuted,
    fontSize: 15,
    marginBottom: spacing.medium,
  },
  verso: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 32,
    fontFamily: fonts.verse,
    marginBottom: spacing.small,
  },
  numero: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  navegacao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.medium,
  },
  botao: {
    backgroundColor: colors.primary,
    borderRadius: radius.small,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  botaoDesabilitado: {
    opacity: 0.35,
  },
  textoBotao: {
    color: colors.onPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  copyright: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.large,
  },
});