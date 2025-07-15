"use client"

import { View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface SummaryCardProps {
  title: string
  value: string
  icon: keyof typeof Ionicons.glyphMap
  color: string
  width: string
}

const SummaryCard = ({ title, value, icon, color, width }: SummaryCardProps) => {
  return (
    <View className={`${width} bg-white rounded-xl shadow-md border border-gray-100`}>
      <View className="p-5">
        <View className="flex-row items-center justify-between mb-3">
          <View className={`${color} p-2 rounded-lg`}>
            <Ionicons name={icon} size={24} color="#fff" />
          </View>
        </View>
        <Text className="text-sm text-gray-600 mb-2 font-medium">{title}</Text>
        <Text className="text-2xl font-bold text-gray-900" numberOfLines={1} adjustsFontSizeToFit>
          {value}
        </Text>
      </View>
    </View>
  )
}

export default SummaryCard
