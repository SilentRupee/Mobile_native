import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

const QRDisplayScreen = () => {
  const params = useLocalSearchParams();
  const { qrData, billId, totalAmount } = params;
  const [qrCode, setQrCode] = useState<string>('');

  useEffect(() => {
    if (qrData) {
      setQrCode(qrData as string);
    }
  }, [qrData]);

  const handlePaymentSuccess = () => {
    Alert.alert(
      "Payment Successful",
      "The payment has been processed successfully!",
      [
        {
          text: "OK",
          onPress: () => router.back()
        }
      ]
    );
  };

  const handlePaymentFailure = () => {
    Alert.alert(
      "Payment Failed",
      "The payment could not be processed. Please try again.",
      [
        {
          text: "OK",
          onPress: () => router.back()
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <VStack className="flex-1 p-4" space="lg">
        {/* Header */}
        <HStack className="justify-between items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Heading size="lg">Payment QR Code</Heading>
          <View style={{ width: 24 }} />
        </HStack>

        {/* Bill Details */}
        <VStack className="bg-gray-50 p-4 rounded-lg" space="sm">
          <Text className="font-semibold text-lg">Bill Details</Text>
          <HStack className="justify-between">
            <Text className="text-gray-600">Bill ID:</Text>
            <Text className="font-medium">{billId}</Text>
          </HStack>
          <HStack className="justify-between">
            <Text className="text-gray-600">Total Amount:</Text>
            <Text className="font-semibold text-lg">₹{totalAmount}</Text>
          </HStack>
        </VStack>

        {/* QR Code Display */}
        <VStack className="flex-1 items-center justify-center" space="lg">
          <Text className="text-lg font-medium text-center">
            Scan this QR code to pay
          </Text>
          
          {/* Real QR Code */}
          <View className="w-64 h-64 bg-white rounded-lg items-center justify-center p-4 shadow-lg">
            {qrCode ? (
              <QRCode
                value={qrCode}
                size={240}
                color="black"
                backgroundColor="white"
                logoSize={40}
                logoBackgroundColor="white"
                logoBorderRadius={8}
                enableLinearGradient={false}
                getRef={(c) => {
                  // QR code reference if needed
                }}
              />
            ) : (
              <View className="w-64 h-64 bg-gray-200 rounded-lg items-center justify-center">
                <Ionicons name="qr-code" size={120} color="#666" />
                <Text className="text-sm text-gray-500 mt-2">Loading QR Code...</Text>
              </View>
            )}
          </View>

          <Text className="text-sm text-gray-500 text-center">
            Customer should scan this QR code with their payment app
          </Text>
        </VStack>

        {/* Action Buttons */}
        <VStack space="md">
          <Button 
            className="w-full" 
            onPress={handlePaymentSuccess}
            action="positive"
          >
            <ButtonText>Payment Successful</ButtonText>
          </Button>
          
          <Button 
            className="w-full" 
            onPress={handlePaymentFailure}
            action="negative"
            variant="outline"
          >
            <ButtonText>Payment Failed</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default QRDisplayScreen; 