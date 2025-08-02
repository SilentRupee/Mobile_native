import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Checkbox, CheckboxIndicator, CheckboxIcon } from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { BACKEND_URL } from '@/BackendUrl';

interface ProductData {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  subcategory?: string;
  stock: number;
  isAvailable: boolean;
  isVeg?: boolean;
  brand?: string;
  unit?: string;
}

interface SelectedProduct {
  product: ProductData;
  quantity: number;
}

const BillPaymentScreen = () => {
  const params = useLocalSearchParams();
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  
    if (params.selectedProducts) {
      try {
        const products: ProductData[] = JSON.parse(params.selectedProducts as string);
     
        const initialSelected = products.map(product => ({
          product,
          quantity: 1
        }));
        setSelectedProducts(initialSelected);
      } catch (error) {
        console.error("Error parsing selected products:", error);
      }
    }
  }, [params.selectedProducts]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Remove product if quantity is 0 or less
      setSelectedProducts(prev => prev.filter(sp => sp.product.id !== productId));
    } else {
      setSelectedProducts(prev => 
        prev.map(sp => 
          sp.product.id === productId 
            ? { ...sp, quantity: newQuantity }
            : sp
        )
      );
    }
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, sp) => total + (sp.product.price * sp.quantity), 0);
  };

  const generateQRCode = async () => {
    if (selectedProducts.length === 0) {
      Alert.alert("No Products", "Please select at least one product.");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decoded: any = jwtDecode(token);
        const merchantId = decoded.merchantId;
        
        const billData = {
          merchantId,
          items: selectedProducts.map(sp => ({
            productId: sp.product.id,
            name: sp.product.name,
            price: sp.product.price,
            quantity: sp.quantity,
            total: sp.product.price * sp.quantity
          })),
          totalAmount: calculateTotal(),
          timestamp: new Date().toISOString()
        };
        const response = await axios.post(`${BACKEND_URL}/api/merchants/${merchantId}/qr-code`, billData);
        
        const paymentData = {
          type: "payment",
          merchantId: merchantId,
          billId: response.data.billId || Math.random().toString(),
          amount: calculateTotal(),
          items: selectedProducts.map(sp => ({
            productId:sp.product.id,
            name: sp.product.name,
            quantity: sp.quantity,
            price: sp.product.price
          })),
          timestamp: new Date().toISOString()
        };
      
        const qrData = JSON.stringify(paymentData);
     
        router.push({
          pathname: "/(nonTabs)/qr-display",
          params: { 
            qrData: qrData, 
            billId: paymentData.billId,
            totalAmount: calculateTotal(),
            paymentData: JSON.stringify(paymentData)
          }
        });
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      Alert.alert("Error", "Failed to generate QR code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <VStack className="p-4" space="lg">
          {/* Header */}
          <VStack space="sm">
            <Heading size="2xl">Create Bill</Heading>
            <Text className="text-gray-600">Adjust quantities and generate QR code for payment</Text>
          </VStack>

          {/* Selected Products Summary */}
          {selectedProducts.length > 0 && (
            <VStack className="bg-white p-4 rounded-lg" space="md">
              <Text className="font-semibold text-lg">Selected Products</Text>
              <VStack space="sm">
                {selectedProducts.map((sp, index) => (
                  <HStack key={sp.product.id} className="justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <VStack className="flex-1">
                      <Text className="font-medium">{sp.product.name}</Text>
                      <Text className="text-sm text-gray-500">{sp.product.description}</Text>
                      <Text className="text-sm text-gray-600">{sp.product.category}</Text>
                    </VStack>
                    <VStack className="items-end">
                      <Text className="font-semibold">₹{sp.product.price}</Text>
                      <HStack className="items-center space-x-2 mt-2">
                        <TouchableOpacity
                          onPress={() => updateQuantity(sp.product.id, sp.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
                        >
                          <Text className="text-lg font-bold">-</Text>
                        </TouchableOpacity>
                        <Text className="font-medium w-8 text-center">{sp.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => updateQuantity(sp.product.id, sp.quantity + 1)}
                          className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center"
                        >
                          <Text className="text-lg font-bold text-white">+</Text>
                        </TouchableOpacity>
                      </HStack>
                      <Text className="text-sm text-gray-500 mt-1">
                        Total: ₹{sp.product.price * sp.quantity}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
              
              {/* Total */}
              <View className="border-t border-gray-200 pt-3">
                <HStack className="justify-between">
                  <Text className="font-semibold text-lg">Total Amount</Text>
                  <Text className="font-semibold text-lg">₹{calculateTotal()}</Text>
                </HStack>
              </View>
            </VStack>
          )}

          {/* Generate QR Button */}
          {selectedProducts.length > 0 && (
            <Button 
              className="w-full" 
              onPress={generateQRCode}
              isDisabled={loading}
            >
              <ButtonText>
                {loading ? "Generating QR Code..." : `Generate QR Code - ₹${calculateTotal()}`}
              </ButtonText>
            </Button>
          )}

          {selectedProducts.length === 0 && (
            <VStack className="items-center justify-center py-8" space="md">
              <Text className="text-gray-500 text-center">No products selected</Text>
              <Text className="text-sm text-gray-400 text-center">
                Go back to the products table and select products to create a bill
              </Text>
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillPaymentScreen; 