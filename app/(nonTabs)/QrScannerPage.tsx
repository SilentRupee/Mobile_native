"use client"
import React, { useState, useRef, useEffect } from "react"
import {View,Text,TouchableOpacity,StatusBar,SafeAreaView,Animated,Easing, BackHandler, PermissionsAndroid,} from "react-native"
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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`)
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
