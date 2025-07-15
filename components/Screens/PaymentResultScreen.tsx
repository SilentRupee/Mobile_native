
import type { ReactNode } from "react"
import { View, Text, TouchableOpacity, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"

// Shimmer component using animated gradient
const ShimmerView = ({ children }: { children: ReactNode }) => {
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

// Success checkmark animation component (placeholder for Lottie)
const VerifiedIcon = () => {
  return (
    <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center ml-2">
      <Text className="text-white text-xs">✓</Text>
    </View>
  )
}

export default function PaymentResultScreen() {
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success">("pending")

  // Simulate payment completion after 3 seconds
  const React = require("react")
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPaymentStatus("success")
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const renderPendingCard = () => (
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
  )

  const renderSuccessCard = () => (
    <View className="bg-blue-100/15 rounded-3xl overflow-hidden relative">
      {/* Decorative bottom bars */}
      <View className="absolute bottom-0 left-0 right-0">
        <View className="h-2 bg-blue-600" />
        <View className="h-2 bg-blue-500" />
      </View>

      <View className="px-6 py-6 pb-10">
        {/* User Info Section */}
        <View className="flex-row items-start mb-7">
          {/* Avatar */}
          <View className="w-11 h-11 bg-purple-400 rounded-full items-center justify-center ml-5">
            <Text className="text-white text-sm font-medium">PU</Text>
          </View>

          {/* User Details */}
          <View className="flex-1 ml-4">
            <Text className="text-black text-lg font-medium mb-1">PaytmUser</Text>
            <Text className="text-gray-800 text-base mt-1.5" numberOfLines={1} ellipsizeMode="tail">
              UPI ID: paytmuser@paytm
            </Text>
          </View>
        </View>

        {/* Amount Section with Verified Icon */}
        <View className="items-center mb-6">
          <View className="flex-row items-center justify-center">
            <Text className="text-gray-800 text-4xl font-black">₹50</Text>
            <VerifiedIcon />
          </View>
        </View>

        {/* Timestamp */}
        <View className="items-center mb-2">
          <Text className="text-gray-800 text-sm">01 Jan, 12:59 pm</Text>
        </View>

        {/* Reference Number */}
        <View className="items-center mb-8">
          <View className="flex-row items-center">
            <Text className="text-blue-500 text-sm">Ref No. XXXX 4455</Text>
            <View className="ml-1">
              <Text className="text-blue-500 text-xs">▼</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-center space-x-1 mb-6">
          <TouchableOpacity className="bg-white rounded-full px-4 py-2.5 shadow-sm mr-1">
            <Text className="text-gray-700 text-xs">Check Balance</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-full px-4 py-2.5 shadow-sm mx-1">
            <Text className="text-gray-700 text-xs">Share</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-full px-4 py-2.5 shadow-sm ml-1">
            <Text className="text-gray-700 text-xs">Pay Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header Section */}
      <View className="relative">
        {/* Back Arrow */}
        <TouchableOpacity className="absolute left-4 top-5 z-10">
          <View className="w-6 h-6 items-center justify-center">
            <Text className="text-black text-lg">←</Text>
          </View>
        </TouchableOpacity>

        {/* Paytm Logo */}
        <View className="items-center pt-0 pb-2">
          <View className="w-full h-16 items-center justify-center">
            <Text className="text-2xl font-bold text-blue-600">Paytm</Text>
          </View>
        </View>

        {/* Help Text (hidden by default) */}
        <TouchableOpacity className="absolute right-4 top-5 opacity-0">
          <Text className="text-sm text-blue-500">Help</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Card - switches between pending and success */}
      <View className="mx-4 mt-2">{paymentStatus === "pending" ? renderPendingCard() : renderSuccessCard()}</View>

      {/* Bottom result image (hidden) */}
      <View className="flex-1 justify-end opacity-0">
        <View className="h-20 bg-gray-100" />
      </View>
    </View>
  )
}
