import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts
} from '@expo-google-fonts/inter';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import "@/src/styles/global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_300Light,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!loaded) {
    return <></>;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="game-singleplayer" />
        <Stack.Screen name="game-2-players" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
