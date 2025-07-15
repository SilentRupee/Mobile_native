import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons"

interface ActionButtonProps {
  onPress: () => void
}

const TableActionBtn = ({onPress}:ActionButtonProps) => {
  return (
   <TouchableOpacity
      className="flex-row items-center justify-center bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg shadow-sm active:bg-blue-100"
      onPress={onPress}
    >
      <Ionicons name="receipt-outline" size={14} color="#3b82f6" />
      <Text className="text-xs text-blue-600 ml-1 font-semibold">Bill</Text>
    </TouchableOpacity>
  )
}

export default TableActionBtn
