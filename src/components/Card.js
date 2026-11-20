import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, spacing, radius} from '../theme';

export default function Card({
	titulo,
	sub,
	onPress,
	selecionado = false,
	desabilitado = false,
}) {
	return (
		<TouchableOpacity
			style={[
				styles.card,
				selecionado && styles.cardSelecionado,
				desabilitado && styles.cardDesabilitado,
			]}
			onPress={desabilitado ? undefined : onPress}
			disabled={desabilitado}
			activeOpacity={0.8}
			accessibilityRole="button"
			accessibilityLabel={titulo}
			accessibilityState={{selected: selecionado}}
		>
			<View style={styles.textos}>
				<Text style={styles.titulo}>{titulo}</Text>
				{sub ? <Text style={styles.sub}>{sub}</Text> : null}
			</View>
			{selecionado ? <Text style={styles.selecionado}>✓</Text> : null}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: radius.medium,
		padding: spacing.medium,
		marginBottom: spacing.small,
	},
	cardSelecionado: {
		backgroundColor: colors.primarySoft,
		borderColor: colors.primary,
	},
	cardDesabilitado: {
		opacity: 0.7,
	},
	textos: {
		flex: 1,
	},
	titulo: {
		color: colors.text,
		fontSize: 17,
		fontWeight: '600',
	},
	sub: {
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 2,
	},
	selecionado: {
		color: colors.primary,
		fontSize: 20,
		fontWeight: '700',
		marginLeft: spacing.medium,
	},
});