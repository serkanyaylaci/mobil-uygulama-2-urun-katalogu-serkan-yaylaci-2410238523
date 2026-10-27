import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#0f172a',
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
          headerBackTitle: 'Geri',
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'Teknoloji Mağazası Kataloğu', headerShown: true }}
        />
        <Stack.Screen
          name="urun/[id]"
          options={{ title: 'Ürün İnceleme', headerShown: true }}
        />
      </Stack>
    </>
  );
}
