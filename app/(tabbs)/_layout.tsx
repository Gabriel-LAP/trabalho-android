import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack >
      <Stack.Screen name="dashboard" options={{ headerShown: false }}/>
      <Stack.Screen name="dashboardEmploee" options={{ headerShown: false }}/>
      <Stack.Screen name="dashboardAdm" options={{ headerShown: false }}/>
    </Stack>
  );
}