import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

export default function Screen({titulo, subtitulo, children, onBack}) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.back}>‹ Voltar</Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.titulo}>{titulo}</Text>
        {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.medium,
  },
  back: {
    color: colors.primary,
    fontSize: 16,
    marginBottom: spacing.small,
  },
  titulo: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '700',
  },
  subtitulo: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 4,
  },
  content: {
    paddingHorizontal: spacing.large,
    paddingBottom: spacing.xLarge,
  },
});