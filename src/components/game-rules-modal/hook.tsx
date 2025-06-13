import { GAME } from "@/src/conts/game";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { GameRulesModalProps } from "./props";
import { GameRulesModalUtils } from "./utilst";

export const useGameRulesModal = ({ forceShow, onClose }: GameRulesModalProps) => {
  const [hideNextTime, setHideNextTime] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const shouldShow = await GameRulesModalUtils.shouldShowRulesModal();

      setVisible(shouldShow);
    })();
  }, []);

  const handleStart = async () => {
    if (hideNextTime) {
      await AsyncStorage.setItem(GAME.HIDE_RULES_STORAGE_KEY, 'true');
    }

    setVisible(false);

    if (onClose) {
      onClose()
    }
  };

  function handleHideNextTime(value: boolean): void {
    setHideNextTime(value);
  }

  return {
    visible: forceShow ?? visible,
    handleStart,
    handleHideNextTime,
    hideNextTime
  }
}