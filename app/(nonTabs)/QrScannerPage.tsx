"use client"
import React, { useState, useRef, useEffect } from "react"
import {View,Text,TouchableOpacity,StatusBar,SafeAreaView,Animated,Easing, BackHandler, PermissionsAndroid, Alert,} from "react-native"
import { Camera, CameraView } from "expo-camera"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

type QRScannerScreenProps = {}

export default function QRScannerScreen({}: QRScannerScreenProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState(false)
  const [torchOn, setTorchOn] = useState(false)
  const scanAnimation = useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    }
    getCameraPermissions()
  }, [])

  useEffect(()=>{
    const backActionBtn=()=>{
      router.push('/(tabs)/(merchant)')
      return true
    }
    const backHandler =BackHandler.addEventListener('hardwareBackPress',backActionBtn)
    return () => backHandler.remove()
  },[])

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnimation, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnimation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ).start()
    }

    startAnimation()
  }, [])

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true)
    
    console.log("QR Code Scanned:", { type, data });
    
    processQRData(type, data);
  }

  const processQRData = (type: string, data: string) => {
    try {
      // Check if it's a UPI payment string
      if (data.startsWith('upi://')) {
        console.log("UPI payment detected:", data);
        
        // Parse UPI string to extract payment information
        const upiUrl = new URL(data);
        const params = upiUrl.searchParams;
        
        const paymentInfo = {
          type: "payment",
          merchantId: params.get('pa')?.split('@')[1] || 'silentrupee',
          billId: params.get('tn') || 'Unknown',
          amount: parseFloat(params.get('am') || '0'),
          items: [
            {
              name: params.get('pn') || 'Payment',
              quantity: 1,
              price: parseFloat(params.get('am') || '0')
            }
          ],
          timestamp: new Date().toISOString(),
          upiString: data,
          currency: params.get('cu') || 'INR'
        };
        
        console.log("Parsed UPI payment info:", paymentInfo);
        
        Alert.alert(
          "UPI Payment Detected",
          `Amount: ₹${paymentInfo.amount}\nMerchant: ${paymentInfo.merchantId}\nBill ID: ${paymentInfo.billId}`,
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => setScanned(false)
            },
            {
              text: "Process Payment",
              onPress: () => {
                // Navigate to payment details with parsed UPI data
                router.push({
                  pathname: "/(nonTabs)/payment-details",
                  params: { 
                    qrData: JSON.stringify(paymentInfo)
                  }
                });
              }
            }
          ]
        );
        return;
      }

      // Check if it's a custom payment URL
      if (data.startsWith('silentrupee://')) {
        console.log("SilentRupee payment detected:", data);
        const url = new URL(data);
        const paymentData = url.searchParams.get('data');
        
        if (paymentData) {
          const decodedData = decodeURIComponent(paymentData);
          const parsedData = JSON.parse(decodedData);
          
          // Navigate to payment details page
          router.push({
            pathname: "/(nonTabs)/payment-details",
            params: { 
              qrData: JSON.stringify(parsedData)
            }
          });
          return;
        }
      }
      // Try to parse as JSON (for direct payment data)
      try {
        const parsedData = JSON.parse(data);
        console.log("JSON payment data detected:", parsedData);
        
        // Check if it's a payment data structure
        if (parsedData.type === "payment" || parsedData.merchantId || parsedData.billId) {
          console.log("Valid payment data found:", parsedData);
          
          // Navigate to payment details page
          router.push({
            pathname: "/(nonTabs)/payment-details",
            params: { 
              qrData: JSON.stringify(parsedData)
            }
          });
          return;
        }
      } catch (jsonError) {
        console.log("Not a JSON format:", jsonError);
      }

      // Check if it's a URL
      if (data.startsWith('http://') || data.startsWith('https://')) {
        console.log("URL detected:", data);
        Alert.alert(
          "URL Detected",
          `URL: ${data}`,
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => setScanned(false)
            },
            {
              text: "Open URL",
              onPress: () => {
                // Handle URL opening if needed
                console.log("Opening URL:", data);
              }
            }
          ]
        );
        return;
      }

      // Check if it's plain text
      if (data.length > 0) {
        console.log("Plain text detected:", data);
        Alert.alert(
          "Text Detected",
          `Content: ${data}`,
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => setScanned(false)
            },
            {
              text: "Copy Text",
              onPress: () => {
                // Handle text copying if needed
                console.log("Copying text:", data);
              }
            }
          ]
        );
        return;
      }

      // If none of the above, show generic alert
      Alert.alert(
        "QR Code Scanned",
        `Type: ${type}\nData: ${data}`,
        [
          {
            text: "Scan Again",
            onPress: () => setScanned(false)
          }
        ]
      );

    } catch (error) {
      console.error("Error processing QR code:", error);
      Alert.alert(
        "QR Code Error",
        `Error processing QR code: ${error instanceof Error ? error.message : String(error)}\n\nRaw data: ${data}`,
        [
          {
            text: "Scan Again",
            onPress: () => setScanned(false)
          }
        ]
      );
    }
  }

  if (hasPermission === null) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <Text className="text-white text-lg">Requesting camera permission...</Text>
      </SafeAreaView>
    )
  }
  
  if (hasPermission === false) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <Text className="text-white text-lg">No access to camera</Text>
        <TouchableOpacity 
          className="mt-4 bg-white px-6 py-3 rounded-full"
          onPress={() => router.replace('/(tabs)/')}
        >
          <Text className="text-black font-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Camera View */}
      <View className="flex-1 relative">
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          enableTorch={torchOn}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'code128', 'code39', 'ean13', 'ean8', 'upc_a', 'upc_e'],
          }}
        />

        {/* Header */}
        <View className="absolute top-6 left-0 right-0 flex-row items-center justify-between px-4 z-10">
          <View className="flex-1" />
          <Text className="text-white text-lg font-black">Scan QR Code</Text>
          <TouchableOpacity className="p-2"
           onPress={() => router.replace('/(tabs)/')} >
            <Ionicons name="close" size={24} color="#B0B0B0" />
          </TouchableOpacity>
        </View>

        {/* Scanner Frame with Animation */}
        <View className="absolute inset-0 items-center justify-center z-10">
          <View className="w-44 h-44 relative">
            {/* Scanner Frame */}
            <View className="w-full h-full border-2 border-white/30 rounded-2xl" />

            <View className="absolute inset-0">
              <Animated.View
                className="absolute w-full h-1 bg-green-400"
                style={{
                  transform: [
                    {
                      translateY: scanAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 176], 
                      }),
                    },
                  ],
                }}
              />
            </View>
          </View>
        </View>

        {/* Torch Button */}
        <View className="absolute right-5 top-32 z-10">
          <View className="items-center">
            <TouchableOpacity
              className="w-9 h-9 bg-gray-600/70 rounded-full items-center justify-center"
              onPress={() => setTorchOn(!torchOn)}
            >
              <Ionicons name={torchOn ? "flash" : "flash-outline"} size={18} color="white" />
            </TouchableOpacity>
            <View className="mt-1 bg-black/70 rounded px-2 py-1">
              <Text className="text-white text-xs">
                Flash
              </Text>
            </View>
          </View>
        </View>

        {/* Scan Again Button */}
        {scanned && (
          <View className="absolute bottom-20 left-0 right-0 items-center z-10">
            <TouchableOpacity
              className="bg-white px-6 py-3 rounded-full"
              onPress={() => setScanned(false)}
            >
              <Text className="text-black font-semibold">Scan Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}
