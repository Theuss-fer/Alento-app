import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, spacing, radius} from '../theme';

export default function Card({titulo, sub, onPress}) {
	return (
		<TouchableOpacity
			style={styles.card}
			onPress={onPress}
			activeOpacity={0.8}
			accessibilityRole="button"
		>
			<Text style={styles.titulo}>{titulo}</Text>
			{sub ? <Text style={styles.sub}>{sub}</Text> : null}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: radius.medium,
		padding: spacing.medium,
		marginBottom: spacing.small,
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
});