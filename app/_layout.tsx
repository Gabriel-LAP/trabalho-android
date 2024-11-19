import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(signIn-Up)" options={{ headerShown: false }}/>
      <Stack.Screen name="(tabbs)" options={{ headerShown: false }}/>

    </Stack>
  );
}
