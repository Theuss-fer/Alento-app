import { StatusBar } from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { colors, spacing } from './src/theme';
import TradicaoScreen from './src/screens/TradicaoScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" backgroundColor={colors.background} />
      <TradicaoScreen />
    </SafeAreaProvider>
  );
}

  
