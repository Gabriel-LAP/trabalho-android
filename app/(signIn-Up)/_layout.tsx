import { Stack } from 'expo-router';
import { ReactNode } from 'react';

const CustomLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Stack>
      {children}
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <CustomLayout>
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: false,
          navigationBarHidden: true
          }}
      />
      <Stack.Screen 
        name="Register" 
        options={{ 
          headerTransparent: true, 
          headerTitle: '', 
          headerShown: true,
          navigationBarHidden: true
        }} 
      />
    </CustomLayout>
  );
}