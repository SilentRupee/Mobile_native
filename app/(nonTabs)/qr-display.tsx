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
  const { qrData, billId, totalAmount, paymentData } = params;
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
    <SafeAreaView className="flex-1 bg-white pt-8">
      <VStack className="flex-1 p-6" space="lg">
        {/* Header */}
        <HStack className="justify-between items-center">
          <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        <Heading className='font-bold text-4xl'>Payment QR Code</Heading>
          <View style={{ width: 24 }} />
        </HStack>

        {/* Bill Details */}
        <VStack className="bg-gray-400 p-6 mt-6 rounded-lg " space="sm">
        <Text className="font-bold text-2xl">BILL DETAILS</Text>
          <HStack className="justify-between">
        <Text className="text-white text-lg">BILL ID :</Text>
        <Text className="font-medium text-white">{billId}</Text>
          </HStack>
          <HStack className="justify-between">
        <Text className="text-white">TOTAL AMOUNT :</Text>
        <Text className="font-semibold text-white text-lg">₹ {totalAmount}</Text>
          </HStack>
        </VStack>

        {/* QR Code Display */}
        <VStack className="flex-1 items-center justify-center" space="lg">
          <Text className="text-lg font-bold text-center">
        SCAN THE QR CODE
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

        <Text className="text-sm text-gray-500 text-center italic">
        Customer should scan this QR code with their payment app
        </Text>
        </VStack>

        {/* Action Buttons side by side */}
        <HStack space="md" className="w-full mb-6">
          <Button 
        className="flex-1 h-[52px] rounded-lg bg-black"
        onPress={handlePaymentSuccess}
        action="positive"
          >
        <ButtonText className='text-white'>PAYMENT SUCCESSFULL</ButtonText>
          </Button>
          
          <Button 
        className="flex-1 h-[52px] rounded-lg bg-black"
        onPress={handlePaymentFailure}
        action="negative"
        variant="outline"
          >
        <ButtonText className='text-white'>PAYMENT FAILED</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </SafeAreaView>
  );
};

export default QRDisplayScreen; 