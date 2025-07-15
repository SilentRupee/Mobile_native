import { StyleSheet, Text, View , TextInput} from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons"

interface DashboardHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const DashboardHeader = ({searchQuery,setSearchQuery}:DashboardHeaderProps) => {
  return (
     <View className="p-6 bg-white border-b border-gray-200 shadow-sm">
      <Text className="text-3xl font-bold text-gray-900 mb-6">Payment Analytics Dashboard</Text>
      <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-1">
        <Ionicons name="search" size={22} color="#6b7280" />
        <TextInput
          className="flex-1 py-4 px-3 text-base text-gray-900"
          placeholder="Search by payment method, card, customer, or bill number..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9ca3af"
        />
      </View>
    </View>
  )
}

export default DashboardHeader

