import React from 'react';
import { Modal, Pressable, Switch, Text, View } from 'react-native';
import { useGameRulesModal } from './hook';
import { GameRulesModalProps } from './props';

export const GameRulesModal: React.FC<GameRulesModalProps> = (props) => {
  const {
    handleHideNextTime,
    hideNextTime,
    handleStart,
    visible
  } = useGameRulesModal(props)

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/80 justify-center items-center px-5">
        <View className="bg-transparent border border-white p-6 w-full max-w-md shadow-lg">
          <Text className="text-xl font-bold text-center text-white mb-4">
            Como jogar?
          </Text>

          <Text className="text-base text-white leading-relaxed mb-6">
            ▸ Você e seu oponente se revezam soltando peças em colunas.{"\n\n"}
            ▸ O objetivo é alinhar 4 peças da mesma cor, seja na horizontal, vertical ou diagonal.{"\n\n"}
            ▸ A cada <Text className='text-orange-500 font-semibold'>10</Text> jogadas, a linha inferior desaparece!{"\n\n"}
            ▸ Vence quem alinhar 4 peças primeiro.
          </Text>

          {!props.forceShow && (
            <View className="flex-row gap-2 items-center space-x-3 mb-6">
              <Switch value={hideNextTime} onValueChange={handleHideNextTime} />
              <Text className="text-white font-semibold text-base">Não mostrar novamente!</Text>
            </View>
          )}

          <Pressable
            onPress={handleStart}
            className="bg-transparent border border-blue-600 py-3 items-center"
          >
            <Text className="text-base font-semibold text-blue-600">Jogar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

