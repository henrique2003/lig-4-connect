import { GAME } from "@/src/conts/game";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class GameRulesModalUtils {
  static shouldShowRulesModal = async (): Promise<boolean> => {
    const value = await AsyncStorage.getItem(GAME.HIDE_RULES_STORAGE_KEY);
    return value !== 'true';
  };
} 