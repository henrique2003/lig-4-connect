import { GameBoard } from '@/src/components/game-board/game-board';
import { GameRulesModal } from '@/src/components/game-rules-modal/game-rules-modal';
import React from 'react';
import { View } from 'react-native';

export const GameSingleplayer: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center bg-default-primary px-4">
      <GameBoard singlePlayer />
      <GameRulesModal />
    </View>
  )
}
