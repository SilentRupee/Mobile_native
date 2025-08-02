import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { BACKEND_URL } from '@/BackendUrl';

interface PaymentData {
  type: string;
  merchantId: string;
  billId: string;
  amount: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    productId?: string;
  }>;
  timestamp: string;
}

const PaymentDetailsScreen = () => {
  const params = useLocalSearchParams();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [merchantInfo, setMerchantInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.qrData) {
      try {
        // Parse the QR data    
        const data = JSON.parse(params.qrData as string);
        
        // Validate the data structure
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid data structure');
        }
        
        // Ensure items array exists
        if (!data.items || !Array.isArray(data.items)) {
          data.items = [];
        }
        
        // Ensure required fields exist
        if (!data.merchantId) {
          data.merchantId = 'Unknown';
        }
        if (!data.billId) {
          data.billId = 'Unknown';
        }
        if (!data.amount) {
          data.amount = 0;
        }
        if (!data.timestamp) {
          data.timestamp = new Date().toISOString();
        }
        
        setPaymentData(data);
        
        // Fetch merchant information
        if (data.merchantId && data.merchantId !== 'Unknown') {
          fetchMerchantInfo(data.merchantId);
        } else {
          // Set basic merchant info if no merchant ID
          setMerchantInfo({
            name: 'SilentRupee Merchant',
            id: 'unknown',
            type: 'merchant'
          });
        }
      } catch (error) {
        console.error("Error parsing QR data:", error);
        setError("Invalid QR code data");
        Alert.alert("Error", "Invalid QR code data");
      }
    } else {
      setError("No QR data provided");
    }
  }, [params.qrData]);

  const fetchMerchantInfo = async (merchantId: string) => {
    try {
      const response = await axios.get(`http://192.168.29.157:3003/api/auth/name/${merchantId}`);
      if (response.data && response.data.merchant) {
        setMerchantInfo(response.data.merchant);
        return;
      }
    } catch (error) {
      console.error("Error fetching merchant info from auth endpoint:", error);
    }
    setMerchantInfo({
      name: 'SilentRupee Merchant',
      id: merchantId,
      type: 'merchant'
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Please login to make payment");
        return;
      }
    
      const decoded: any = jwtDecode(token);
      const customerId = decoded.customerId;

      if (!paymentData) {
        Alert.alert("Error", "Payment data not found");
        return;
      }
      const products = paymentData.items.map(item => ({
        productId: item.productId ,
        quantity: item.quantity
      }));
      console.log(products);

      const responses = await axios.post(`${BACKEND_URL}/api/purchase`, {
        Product: products
      },{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      });
      console.log(responses.data);

      const paymentPayload = {
        customerId,
        merchantId: paymentData.merchantId,
        billId: paymentData.billId,
        amount: paymentData.amount,
        items: paymentData.items || [],
        timestamp: new Date().toISOString()
      };


      Alert.alert(
        "Payment Successful",
        `Payment of ₹${paymentData.amount} has been processed successfully!`,
        [
          {
            text: "OK",
            onPress: () => router.replace('/(tabs)/(customer)')
          }
        ]
      );
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Payment Failed", "Could not process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!paymentData || !paymentData.items) return 0;
    return paymentData.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center p-4">
          <Ionicons name="alert-circle" size={64} color="#ef4444" />
          <Text className="text-lg text-gray-600 mt-4 text-center">{error}</Text>
          <TouchableOpacity 
            className="mt-4 bg-blue-500 px-6 py-3 rounded-full"
            onPress={() => router.back()}
          >
            <Text className="text-white font-semibold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!paymentData) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-600">Loading payment details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <VStack className="p-4" space="lg">
          {/* Header */}
          <HStack className="justify-between items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Heading size="lg">Payment Details</Heading>
            <View style={{ width: 24 }} />
          </HStack>

          {/* Merchant Info */}
          {merchantInfo && (
            <VStack className="bg-white p-4 rounded-lg" space="sm">
              <Text className="font-semibold text-lg">Merchant Information</Text>
              <HStack className="justify-between">
                <Text className="text-gray-600">Merchant Name:</Text>
                <Text className="font-medium">{merchantInfo.name || merchantInfo.merchantName || 'SilentRupee Merchant'}</Text>
              </HStack>
              {merchantInfo.email && (
                <HStack className="justify-between">
                  <Text className="text-gray-600">Email:</Text>
                  <Text className="font-medium">{merchantInfo.email}</Text>
                </HStack>
              )}
            </VStack>
          )}

          {/* Bill Details */}
          <VStack className="bg-white p-4 rounded-lg" space="sm">
            <Text className="font-semibold text-lg">Bill Details</Text>
            <HStack className="justify-between">
              <Text className="text-gray-600">Bill ID:</Text>
              <Text className="font-medium">{paymentData.billId}</Text>
            </HStack>
            <HStack className="justify-between">
              <Text className="text-gray-600">Date:</Text>
              <Text className="font-medium">
                {new Date(paymentData.timestamp).toLocaleDateString()}
              </Text>
            </HStack>
          </VStack>

          {/* Items List */}
          <VStack className="bg-white p-4 rounded-lg" space="md">
            <Text className="font-semibold text-lg">Items</Text>
            {paymentData.items && paymentData.items.length > 0 ? (
              <VStack space="sm">
                {paymentData.items.map((item, index) => (
                  <HStack key={index} className="justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <VStack className="flex-1">
                      <Text className="font-medium">{item.name || 'Unknown Item'}</Text>
                      <Text className="text-sm text-gray-500">
                        Quantity: {item.quantity || 0} × ₹{item.price || 0}
                      </Text>
                    </VStack>
                    <VStack className="items-end">
                      <Text className="font-semibold">₹{(item.price || 0) * (item.quantity || 0)}</Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            ) : (
              <View className="py-4">
                <Text className="text-gray-500 text-center">No items found</Text>
              </View>
            )}
            
            {/* Total */}
            <View className="border-t border-gray-200 pt-3">
              <HStack className="justify-between">
                <Text className="font-semibold text-lg">Total Amount</Text>
                <Text className="font-semibold text-lg">₹{calculateTotal()}</Text>
              </HStack>
            </View>
          </VStack>

          {/* Payment Button */}
          <Button 
            className="w-full" 
            onPress={handlePayment}
            isDisabled={loading}
          >
            <ButtonText>
              {loading ? "Processing Payment..." : `Pay ₹${calculateTotal()}`}
            </ButtonText>
          </Button>

          {/* Cancel Button */}
          <Button 
            className="w-full" 
            onPress={() => router.back()}
            variant="outline"
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentDetailsScreen; 