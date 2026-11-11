import { StatusBar } from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TraditionProvider} from './src/context/TraditionContext';
import {NavigationContainer} from '@react-navigation/native';
import {colors} from './src/theme';
import RootNavigator from './src/navigation/RootNavigator';
   import AsyncStorage from '@react-native-async-storage/async-storage';
   AsyncStorage.removeItem('@alento/preferencias');

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
