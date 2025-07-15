import { View, Text, TouchableOpacity, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import React from 'react'

// Shimmer component using animated gradient
const ShimmerView = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="relative overflow-hidden">
      <LinearGradient
        colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="absolute inset-0 z-10"
      />
      {children}
    </View>
  )
}
const PaymentResultScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header Section */}
      <View className="relative">
        {/* Back Arrow */}
        <TouchableOpacity className="absolute left-4 top-5 z-10">
          <View className="w-6 h-6 items-center justify-center">
            {/* Back arrow icon using Expo Vector Icons */}
            <Text>
              {/* @ts-ignore */}
              {React.createElement(require('@expo/vector-icons').Ionicons, {
            name: "arrow-back",
            size: 24,
            color: "black"
              })}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Paytm Logo */}
        <View className="items-center pt-0 pb-2">
          <View className="w-full h-16 items-center justify-center">
            {/* Replace with actual Paytm logo */}
            <Text className="text-2xl font-bold text-blue-600">Paytm</Text>
          </View>
        </View>

        {/* Help Text (hidden by default) */}
        <TouchableOpacity className="absolute right-4 top-5 opacity-0">
          <Text className="text-sm text-blue-500">Help</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Card */}
      <View className="mx-4 mt-2">
        <View className="bg-yellow-100/30 rounded-3xl overflow-hidden">
          <ShimmerView>
            <View className="px-6 py-6">
              {/* User Info Section */}
              <View className="flex-row items-start mb-7">
                {/* Avatar */}
                <View className="w-11 h-11 bg-purple-400 rounded-full items-center justify-center ml-5">
                  <Text className="text-white text-sm font-medium">PU</Text>
                </View>

                {/* User Details */}
                <View className="flex-1 ml-4">
                  <Text className="text-black text-lg font-medium mb-1">PaytmUser</Text>
                <Text className="text-gray-800 text-base" numberOfLines={1} ellipsizeMode="tail">
                    UPI ID: paytmuser@paytm
                </Text>
                </View>
              </View>

              {/* Amount Section */}
              <View className="items-center mb-6">
                <Text className="text-gray-800 text-4xl font-black mb-6">₹50</Text>
              </View>

              {/* Status Section */}
              <View className="items-center pb-2">
                <Text className="text-gray-800 text-xs font-medium tracking-wide">PROCESSING PAYMENT</Text>
              </View>
            </View>
          </ShimmerView>
        </View>
      </View>
    </View>
  )
}

export default PaymentResultScreen
