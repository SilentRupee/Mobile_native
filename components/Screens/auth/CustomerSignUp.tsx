import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSignUp = () => {
    console.log('Sign up pressed');
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up pressed');
  };

  const handleLogin = () => {
    console.log('Login pressed');
  };

  const handleGoBack = () => {
    console.log('Go back pressed');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header with Back Arrow */}
      <View className="px-5 pt-2 pb-4">
        <TouchableOpacity onPress={handleGoBack} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Main Content Container */}
      <View className="flex-1 px-5" style={{ minHeight: screenHeight * 0.85 }}>
        
        {/* Title Section */}
        <View className="mb-8 pt-16">
          <Text className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
            Sign up
          </Text>
          <Text className="text-base text-gray-600 leading-6">
            Sign up for the Customer
          </Text>
        </View>

        {/* Form Container */}
        <View className="flex-1">
          
          {/* Email Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-800 mb-3">
              Email
            </Text>
            <TextInput
              className="w-full px-4 border border-gray-300 rounded-lg text-base text-gray-900"
              style={{ height: 52 }}
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-800 mb-3">
              Password
            </Text>
            <View className="relative">
              <TextInput
                className="w-full px-4 pr-12 border border-gray-300 rounded-lg text-base text-gray-900"
                style={{ height: 52 }}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                className="absolute right-4 justify-center"
                style={{ height: 52 }}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-800 mb-3">
              Confirm Password
            </Text>
            <View className="relative">
              <TextInput
                className="w-full px-4 pr-12 border border-gray-300 rounded-lg text-base text-gray-900"
                style={{ height: 52 }}
                placeholder="Confirm Password"
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                className="absolute right-4 justify-center"
                style={{ height: 52 }}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms Checkbox */}
          <View className="flex-row items-start mb-8" style={{ paddingRight: 8 }}>
            <TouchableOpacity
              className={`border-2 rounded items-center justify-center mr-3 mt-0.5 ${
                acceptTerms
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-400 bg-white'
              }`}
              style={{ width: 18, height: 18 }}
              onPress={() => setAcceptTerms(!acceptTerms)}
            >
              {acceptTerms && (
                <Ionicons name="checkmark" size={12} color="white" />
              )}
            </TouchableOpacity>
            <Text className="text-sm text-gray-700 flex-1 leading-5">
              I accept the{' '}
              <Text className="text-blue-600">Terms of Use</Text>
              {' & '}
              <Text className="text-blue-600">Privacy Policy</Text>
            </Text>
          </View>

          {/* Spacer to push buttons to bottom */}
          <View className="flex-1" />

          {/* Buttons Section */}
          <View className="mb-6">
            {/* Sign Up Button */}
            <TouchableOpacity
              className="w-full bg-gray-800 rounded-lg mb-4 justify-center items-center"
              style={{ height: 52 }}
              onPress={handleSignUp}
            >
              <Text className="text-white text-base font-semibold">
                Sign up
              </Text>
            </TouchableOpacity>

            {/* Google Sign Up Button */}
            <TouchableOpacity
              className="w-full border border-gray-300 rounded-lg justify-center items-center flex-row"
              style={{ height: 52 }}
              onPress={handleGoogleSignUp}
            >
              <Text className="text-base font-medium text-gray-700 mr-2">
                Continue with Google
              </Text>
              <View className="w-5 h-5 bg-blue-500 rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">G</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center items-center pb-6">
            <Text className="text-gray-600 text-base">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text className="text-gray-900 text-base font-semibold">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}