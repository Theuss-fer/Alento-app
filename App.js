import { StatusBar } from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TraditionProvider} from './src/context/TraditionContext';
import {NavigationContainer} from '@react-navigation/native';
import {colors} from './src/theme';
import RootNavigator from './src/navigation/RootNavigator';
   import AsyncStorage from '@react-native-async-storage/async-storage';
   AsyncStorage.removeItem('@alento/preferencias');
import {livrosDaTradicao} from './src/data/livros';

const ev = livrosDaTradicao('evangelica');
const ca = livrosDaTradicao('catolica');
console.log(ev.length, ca.length); // esperado: 66 73
console.log(
  ev.filter((l) => l.testamento === 'AT').length, // 39
  ca.filter((l) => l.testamento === 'AT').length, // 46
  ca.filter((l) => l.testamento === 'NT').length, // 27
);

export default function App() {
  return (
    <SafeAreaProvider>
      <TraditionProvider>
        <NavigationContainer>
          <StatusBar style="auto" backgroundColor={colors.background} />
          <RootNavigator />
        </NavigationContainer>
      </TraditionProvider>
    </SafeAreaProvider>
  );
}
