"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { PaymentData } from "@/types/PaymentData"
import TableHeader from "./TableHeader"
import TableRow from "./TableRow"


interface PaymentTableProps {
  data: PaymentData[]
  selectedRows: string[]
  onToggleRowSelection: (id: string) => void
}

const PaymentTable = ({ data, selectedRows, onToggleRowSelection }: PaymentTableProps) => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = data.filter(
    (item) =>
      item.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creditCard.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.billNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const generateBill = (item: PaymentData) => {
    Alert.alert(
      "Generate Bill",
      `Generate bill for ${item.customerName}?\nBill Number: ${item.billNumber}\nAmount: $${item.grossPayments.toFixed(2)}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Generate", onPress: () => Alert.alert("Success", "Bill generated successfully!") },
      ],
    )
  }

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="p-5  bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Payment Analytics</Text>
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3">
          <Ionicons name="search" size={20} color="#6b7280" />
          <TextInput
            className="flex-1 py-3 px-2 text-base text-gray-900"
            placeholder="Search payments..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Summary Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-5 py-4"
        contentContainerStyle={{ gap: 12 }}
      >
        <View className="bg-white p-4 rounded-lg shadow-sm min-w-[140px]">
          <Text className="text-xs text-gray-500 mb-1">Total Transactions</Text>
          <Text className="text-lg font-bold text-gray-900">
            {filteredData.reduce((sum, item) => sum + item.transactions, 0)}
          </Text>
        </View>
        <View className="bg-white p-4 rounded-lg shadow-sm min-w-[140px]">
          <Text className="text-xs text-gray-500 mb-1">Gross Revenue</Text>
          <Text className="text-lg font-bold text-gray-900">
            ${filteredData.reduce((sum, item) => sum + item.grossPayments, 0).toFixed(2)}
          </Text>
        </View>
        <View className="bg-white p-4 rounded-lg shadow-sm min-w-[140px]">
          <Text className="text-xs text-gray-500 mb-1">Net Revenue</Text>
          <Text className="text-lg font-bold text-gray-900">
            ${filteredData.reduce((sum, item) => sum + item.netAmount, 0).toFixed(2)}
          </Text>
        </View>
        <View className="bg-white p-4 rounded-lg shadow-sm min-w-[140px]">
          <Text className="text-xs text-gray-500 mb-1">Total Commission</Text>
          <Text className="text-lg font-bold text-gray-900">
            ${filteredData.reduce((sum, item) => sum + item.commission, 0).toFixed(2)}
          </Text>
        </View>
      </ScrollView>

      {/* Table */}
      <View className="flex-1 bg-white mx-5 mb-5 rounded-lg shadow-sm">
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={{ minWidth: 1400 }} className="p-2">
            <TableHeader />
            <ScrollView showsVerticalScrollIndicator={true} className="flex-1">
              {filteredData.map((item, index) => (
                <TableRow
                  key={item.id}
                  item={item}
                  index={index}
                  isSelected={selectedRows.includes(item.id)}
                  onToggleSelection={() => onToggleRowSelection(item.id)}
                />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>

      {/* Bulk Actions */}
      {selectedRows.length > 0 && (
        <View className="flex-row justify-between items-center bg-blue-500 px-5 py-3">
          <Text className="text-white text-sm font-medium">{selectedRows.length} item(s) selected</Text>
          <TouchableOpacity
            className="bg-white px-4 py-2 rounded"
            onPress={() => Alert.alert("Bulk Action", "Generate bills for selected items?")}
          >
            <Text className="text-blue-600 text-sm font-semibold">Generate Bills</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default PaymentTable
