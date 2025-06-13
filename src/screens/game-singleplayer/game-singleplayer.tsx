import { GameBoard } from '@/src/components/game-board/game-board';
import React from 'react';
import { View } from 'react-native';

export const GameSingleplayer: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center bg-black px-4">
      <GameBoard singlePlayer />
    </View>
  )
}
