import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { OnboardingProvider } from './src/context/OnboardingContext';
import { RootNavigator } from './src/navigation/RootNavigator';

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <OnboardingProvider>
        <StatusBar style="light" />
        <RootNavigator />
      </OnboardingProvider>
    </SafeAreaProvider>
  );
}
