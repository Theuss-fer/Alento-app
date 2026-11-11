import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTradition} from '../context/TraditionContext';
import {colors} from '../theme';
import HomeScreen from '../screens/HomeScreen';
import TradicaoScreen from '../screens/TradicaoScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const {carregando, tradicao} = useTradition();

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!tradicao ? (
        <Stack.Screen name="Tradicao" component={TradicaoScreen} />
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  carregando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
