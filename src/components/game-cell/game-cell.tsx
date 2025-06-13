import React from "react";
import { View } from "react-native";
import { useGameCell } from "./hook";
import { GameCellProps } from "./props";

export const GameCell = (props: GameCellProps) => {
  const color = useGameCell(props);

  return (
    <View className="w-12 h-12 m-1 bg-blue-900 rounded-full items-center justify-center">
      <View className={`w-8 h-8 rounded-full ${color}`} />
    </View>
  );
};
