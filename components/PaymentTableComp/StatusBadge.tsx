"use client"

import { View, Text } from "react-native"

interface StatusBadgeProps {
  status: string
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 border-green-200"
      case "Pending":
        return "bg-yellow-100 border-yellow-200"
      case "Failed":
        return "bg-red-100 border-red-200"
      default:
        return "bg-gray-100 border-gray-200"
    }
  }

  const getTextStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-800"
      case "Pending":
        return "text-yellow-800"
      case "Failed":
        return "text-red-800"
      default:
        return "text-gray-800"
    }
  }

  return (
    <View className={`px-3 py-1 rounded-full border ${getStatusStyle(status)} self-center`}>
      <Text className={`text-xs font-semibold ${getTextStyle(status)}`}>{status}</Text>
    </View>
  )
}

export default StatusBadge
