import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  Dimensions, 
  ScrollView,
  Image,
  Animated,
  StyleSheet
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const slides = [
    {
      id: 1,
      title: "Welcome to SilentRupee",
      subtitle: "The Future of Digital Payments",
      description: "Experience seamless, secure, and instant payments with our cutting-edge digital payment platform.",
      icon: "wallet-outline",
      color: "#4F46E5"
    },
    {
      id: 2,
      title: "For Merchants",
      subtitle: "Grow Your Business",
      description: "Accept payments instantly, manage your inventory, and track your sales with our merchant dashboard.",
      icon: "storefront-outline",
      color: "#059669"
    },
    {
      id: 3,
      title: "For Customers",
      subtitle: "Pay with Ease",
      description: "Scan QR codes, make instant payments, and enjoy a hassle-free shopping experience.",
      icon: "phone-portrait-outline",
      color: "#DC2626"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else {
        setCurrentSlide(0);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: currentSlide * width,
        animated: true
      });
    }
  }, [currentSlide]);

  const handleSlideChange = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const checkAuthAndRedirect = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        // User is logged in, redirect to appropriate dashboard
        router.replace("/(tabs)/(customer)");
      } else {
        // User is not logged in, show the home page
        return;
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    }
  };

  useEffect(() => {
    checkAuthAndRedirect();
  }, []);

  const handleMerchantPress = () => {
    router.push('/(auth)/login');
  };

  const handleCustomerPress = () => {
    router.push('/(auth)/customerlogin');
  };

  const handleSignUpPress = () => {
    router.push('/(auth)/signUp');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-indigo-600 rounded-full justify-center items-center mr-3">
            <Text className="text-white text-lg font-bold">S</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800">SilentRupee</Text>
        </View>
        <TouchableOpacity 
          onPress={handleSignUpPress}
          className="bg-gray-100 px-4 py-2 rounded-full"
        >
          <Text className="text-gray-700 font-medium">Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <View className="flex-1">
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleSlideChange}
          scrollEventThrottle={16}
          className="flex-1"
        >
          {slides.map((slide, index) => (
            <View key={slide.id} className="flex-1 justify-center items-center px-8" style={{ width }}>
              <Animated.View 
                className="items-center"
                style={{
                  opacity: fadeAnim,
                  transform: [{ scale: fadeAnim }]
                }}
              >
                <View 
                  className="w-32 h-32 rounded-full justify-center items-center mb-8"
                  style={{ backgroundColor: slide.color + '20' }}
                >
                  <Ionicons name={slide.icon as any} size={60} color={slide.color} />
                </View>
                
                <Text className="text-3xl font-bold text-gray-800 text-center mb-4">
                  {slide.title}
                </Text>
                
                <Text className="text-xl font-semibold text-gray-600 text-center mb-6">
                  {slide.subtitle}
                </Text>
                
                <Text className="text-base text-gray-500 text-center leading-6 px-4">
                  {slide.description}
                </Text>
              </Animated.View>
            </View>
          ))}
        </ScrollView>

        {/* Pagination Dots */}
        <View className="flex-row justify-center items-center py-6">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentSlide ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View className="px-6 pb-8">
        <TouchableOpacity
          onPress={handleMerchantPress}
          className="bg-indigo-600 rounded-xl py-4 px-8 mb-4 w-full h-14 justify-center items-center shadow-lg"
          activeOpacity={0.8}
        >
          <View className="flex-row items-center">
            <Ionicons name="storefront" size={24} color="white" />
            <Text className="text-white text-lg font-semibold text-center ml-3">
              Get Started as Merchant
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCustomerPress}
          className="bg-white border-2 border-indigo-600 rounded-xl py-4 px-8 mb-4 w-full h-14 justify-center items-center shadow-md"
          activeOpacity={0.8}
        >
          <View className="flex-row items-center">
            <Ionicons name="person" size={24} color="#4F46E5" />
            <Text className="text-indigo-600 text-lg font-semibold text-center ml-3">
              Get Started as Customer
            </Text>
          </View>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center mt-4">
          <Text className="text-gray-500 text-sm">Already have an account? </Text>
          <TouchableOpacity onPress={handleCustomerPress}>
            <Text className="text-indigo-600 font-semibold text-sm">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

