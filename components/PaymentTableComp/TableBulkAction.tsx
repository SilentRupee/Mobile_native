import { StyleSheet, Text, View, TouchableOpacity, Alert  } from 'react-native'
import React from 'react'

interface BulkActionsProps {
  selectedCount: number
}
const TableBulkAction = ({selectedCount}:BulkActionsProps) => {

    const handleBulkAction = () => {
    Alert.alert("Bulk Action", `Generate bills for ${selectedCount} selected items?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Generate All", onPress: () => Alert.alert("Success", `${selectedCount} bills generated successfully!`) },
    ])
  }
  return (
   <View className="flex-row justify-between items-center bg-blue-500 px-6 py-4 mx-6 mb-6 rounded-xl shadow-lg">
      <Text className="text-white text-base font-semibold">
        {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
      </Text>
      <TouchableOpacity
        className="bg-white px-6 py-3 rounded-lg shadow-sm active:bg-gray-50"
        onPress={handleBulkAction}
      >
        <Text className="text-blue-600 text-sm font-bold">Generate Bills</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TableBulkAction
