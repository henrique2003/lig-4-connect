import { logo } from "@/src/assets"
import { router } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"

export const Home: React.FC = () => {
  return (
    <View className="flex-1 bg-blue-primary justify-center items-center px-8">
      <Image source={logo} width={100} height={20} className="w-[300px] h-32 mb-20" />

      <TouchableOpacity
        className="border border-blue-600 py-4 px-8 w-full mb-6 rounded-md"
        onPress={() => router.push("/game-singleplayer")}
        
      >
        <Text className="text-center text-lg text-blue-600 font-semibold">Single Player</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="border py-4 px-8 w-full mb-6 rounded-md border-orange-500"
        onPress={() => router.push("/game-2-players")}
      >
        <Text className="text-center text-lg text-orange-500 font-semibold">2 players</Text>
      </TouchableOpacity>
    </View>
  )
}
