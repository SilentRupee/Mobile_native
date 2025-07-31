"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Switch } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface ProductData {
  id: string
  name: string
  description?: string
  price: number
  category: string
  subcategory?: string
  stock: number
  isAvailable: boolean
  isVeg?: boolean
  brand?: string
  unit?: string
}

interface ProductTableProps {
  data: ProductData[]
  selectedRows: string[]
  onToggleRowSelection: (id: string) => void
}

const ProductTable = ({ data, selectedRows, onToggleRowSelection }: ProductTableProps) => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const editProduct = (item: ProductData) => {
    Alert.alert(
      "Edit Product",
      `Edit product: ${item.name}?\nPrice: ₹${item.price}\nStock: ${item.stock}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Edit", onPress: () => Alert.alert("Success", "Product updated successfully!") },
      ],
    )
  }

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="p-5 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Product Management</Text>
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3">
          <Ionicons name="search" size={20} color="#6b7280" />
          <TextInput
            className="flex-1 py-3 px-2 text-base text-gray-900"
            placeholder="Search products..."
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
          <Text className="text-xs text-gray-500 mb-1">Total Products</Text>
          <Text className="text-lg font-bold text-gray-900">
            {filteredData.length}
          </Text>
        </View>
        <View className="bg-white p-4 rounded-lg shadow-sm min-w-[140px]">
          <Text className="text-xs text-gray-500 mb-1">Available Products</Text>
          <Text className="text-lg font-bold text-green-600">
            {filteredData.filter(item => item.isAvailable).length}
          </Text>
        </View>
        <View className="bg-white p-4 rounded-lg shadow-sm min-w-[140px]">
          <Text className="text-xs text-gray-500 mb-1">Low Stock Items</Text>
          <Text className="text-lg font-bold text-orange-600">
            {filteredData.filter(item => item.stock < 10).length}
          </Text>
        </View>
        <View className="bg-white p-4 rounded-lg shadow-sm min-w-[140px]">
          <Text className="text-xs text-gray-500 mb-1">Categories</Text>
          <Text className="text-lg font-bold text-blue-600">
            {new Set(filteredData.map(item => item.category)).size}
          </Text>
        </View>
      </ScrollView>

      {/* Table */}
      <View className="flex-1 bg-white mx-5 mb-5 rounded-lg shadow-sm">
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={{ minWidth: 1000 }} className="p-2">
            {/* Table Header */}
            <View className="flex-row bg-gray-50 p-3 border-b border-gray-200">
              <View className="w-8">
                <Text className="text-xs font-semibold text-gray-600">#</Text>
              </View>
              <View className="w-40">
                <Text className="text-xs font-semibold text-gray-600">Name</Text>
              </View>
              <View className="w-24">
                <Text className="text-xs font-semibold text-gray-600">Price</Text>
              </View>
              <View className="w-20">
                <Text className="text-xs font-semibold text-gray-600">Stock</Text>
              </View>
              <View className="w-28">
                <Text className="text-xs font-semibold text-gray-600">Category</Text>
              </View>
              <View className="w-20">
                <Text className="text-xs font-semibold text-gray-600">Brand</Text>
              </View>
              <View className="w-16">
                <Text className="text-xs font-semibold text-gray-600">Unit</Text>
              </View>
              <View className="w-16">
                <Text className="text-xs font-semibold text-gray-600">Veg</Text>
              </View>
              <View className="w-24">
                <Text className="text-xs font-semibold text-gray-600">Status</Text>
              </View>
            </View>

            {/* Table Rows */}
            <ScrollView showsVerticalScrollIndicator={true} className="flex-1">
              {filteredData.map((item, index) => (
                <View key={item.id} className="flex-row items-center p-3 border-b border-gray-100">
                  <View className="w-8">
                    <TouchableOpacity
                      onPress={() => onToggleRowSelection(item.id)}
                      className="w-4 h-4 border border-gray-300 rounded items-center justify-center"
                    >
                      {selectedRows.includes(item.id) && (
                        <Ionicons name="checkmark" size={12} color="#3b82f6" />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View className="w-40">
                    <Text className="text-sm font-medium text-gray-900">{item.name}</Text>
                    {item.description && (
                      <Text className="text-xs text-gray-500" numberOfLines={1}>
                        {item.description}
                      </Text>
                    )}
                  </View>
                  <View className="w-24">
                    <Text className="text-sm font-medium text-gray-900">₹{item.price}</Text>
                  </View>
                  <View className="w-20">
                    <Text className={`text-sm font-medium ${item.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                      {item.stock}
                    </Text>
                  </View>
                  <View className="w-28">
                    <Text className="text-sm text-gray-700">{item.category}</Text>
                    {item.subcategory && (
                      <Text className="text-xs text-gray-500">{item.subcategory}</Text>
                    )}
                  </View>
                  <View className="w-20">
                    <Text className="text-sm text-gray-700">{item.brand || '-'}</Text>
                  </View>
                  <View className="w-16">
                    <Text className="text-sm text-gray-700">{item.unit || '-'}</Text>
                  </View>
                  <View className="w-16">
                    <Text className={`text-sm ${item.isVeg ? 'text-green-600' : 'text-red-600'}`}>
                      {item.isVeg ? 'Yes' : 'No'}
                    </Text>
                  </View>
                  <View className="w-24">
                    <View className={`px-2 py-1 rounded-full ${item.isAvailable ? 'bg-green-100' : 'bg-red-100'}`}>
                      <Text className={`text-xs font-medium ${item.isAvailable ? 'text-green-800' : 'text-red-800'}`}>
                        {item.isAvailable ? 'Available' : 'Unavailable'}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>

      {/* Bulk Actions */}
      {selectedRows.length > 0 && (
        <View className="flex-row justify-between items-center bg-blue-500 px-5 py-3">
          <Text className="text-white text-sm font-medium">{selectedRows.length} product(s) selected</Text>
          <TouchableOpacity
            className="bg-white px-4 py-2 rounded"
            onPress={() => Alert.alert("Bulk Action", "Update selected products?")}
          >
            <Text className="text-blue-600 text-sm font-semibold">Update Products</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default ProductTable
