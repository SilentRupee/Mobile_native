import { View, Text, TouchableOpacity, StatusBar, SafeAreaView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const OnboardingScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#87CEEB", "#4169E1", "#1E3A8A"]} className="flex-1 px-6 pt-20">
        {/* Overlapping Cards */}
        <View className="relative h-48 mb-16">
          {/* Bitcoin Card */}
          <View className="absolute top-0 left-4 w-44 h-28 bg-white/90 rounded-2xl p-4 shadow-lg">
            <View className="flex-row items-center mb-2">
              <View className="w-6 h-6 bg-orange-500 rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">₿</Text>
              </View>
            </View>
            <Text className="text-gray-600 text-xs mb-1">Crypto wallet</Text>
            <Text className="text-black text-xl font-bold">80.052</Text>
            <Text className="text-gray-400 text-xs mt-2">**** 4829</Text>
          </View>

          {/* Visa Card */}
          <View className="absolute top-8 right-4 w-44 h-28 bg-white/90 rounded-2xl p-4 shadow-lg">
            <View className="flex-row justify-end mb-2">
              <Text className="text-blue-600 font-bold text-sm">VISA</Text>
            </View>
            <Text className="text-gray-600 text-xs mb-1">Salary</Text>
            <Text className="text-black text-xl font-bold">$2,230</Text>
            <Text className="text-gray-400 text-xs mt-2">** 4829</Text>
            <Text className="text-gray-400 text-xs">Olivia</Text>
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1 items-center">
          <Text className="text-white text-2xl font-light text-center mb-12 leading-8">
            Manage both crypto{"\n"}and fiat currencies
          </Text>

          {/* Create Account Button */}
          <TouchableOpacity className="w-full bg-white/90 rounded-2xl py-4 mb-6">
            <Text className="text-center text-gray-800 font-semibold text-base">Create new account</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity className="mb-12">
            <Text className="text-white/80 text-sm">
              Already have an account? <Text className="text-white font-semibold">Log in</Text>
            </Text>
          </TouchableOpacity>

          {/* Social Login Icons */}
          <View className="flex-row justify-center space-x-8">
            {/* Google */}
            <TouchableOpacity className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
              <Text className="text-white text-lg font-bold">G</Text>
            </TouchableOpacity>

            {/* Telegram */}
            <TouchableOpacity className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
              <Text className="text-white text-lg">✈</Text>
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
              <Text className="text-white text-lg"></Text>
            </TouchableOpacity>

            {/* Another Platform */}
            <TouchableOpacity className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
              <Text className="text-white text-lg">•</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default OnboardingScreen
