import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { GameCell } from "../game-cell/game-cell";
import { useGameBoard } from "./hook";
import { GameBoardProps } from "./props";

export const GameBoard: React.FC<GameBoardProps> = (props) => {
  const {
    currentPlayer,
    moveCount,
    board,
    dropPiece
  } = useGameBoard(props);

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Topo */}
      <View className="flex-row items-center justify-between px-8 py-3 border-b border-neutral-700">
        <View
          className={`w-10 h-10 rounded-md ${
            currentPlayer === 1 ? "opacity-100 scale-110" : "opacity-40"
          } bg-red-600`}
        />
        <Text className="text-white text-xl font-bold">
          Jogada: {moveCount}
        </Text>
        <View
          className={`w-10 h-10 rounded-md ${
            currentPlayer === 2 ? "opacity-100 scale-110" : "opacity-40"
          } bg-yellow-400`}
        />
      </View>

      {/* Tabuleiro */}
      <View className="flex-1 items-center justify-center">
        <View className="flex-row items-end justify-center">
          <View className="w-4 h-52 bg-orange-500 rounded-t-md mr-1" />

          <View className="bg-blue-800 p-2 rounded-xl shadow-lg shadow-blue-900">
            {board.map((row, rowIndex) => (
              <View key={rowIndex} className="flex-row">
                {row.map((cell, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    onPress={async () => await dropPiece(colIndex)}
                    activeOpacity={0.8}
                  >
                    <GameCell value={cell} />
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <View className="w-4 h-52 bg-orange-500 rounded-t-md ml-1" />
        </View>
      </View>

      {/* Botão voltar */}
      <TouchableOpacity onPress={() => router.back()} className="p-1 opacity-80">
        <Entypo name="arrow-with-circle-left" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
