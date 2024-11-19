import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const useLogout = async () => {
  try {
    await AsyncStorage.clear();
    router.replace('/(signIn-Up)');
  } catch (error) {
    console.error(error);
  }
};
