import { useState } from 'react';
import { useLoginWithEmail, usePrivy } from '@privy-io/expo';
import { TextInput, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';

export default function LoginWithEmail() {
const [email, setEmail] = useState("youvalsingh40@gmail.com");
const [code, setCode] = useState("123456");
const [isLoading, setIsLoading] = useState(false);
const privy = usePrivy();
const { sendCode, loginWithCode } = useLoginWithEmail();

if (!privy.isReady) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
}

const handleSendCode = async () => {
  try {
    setIsLoading(true);
    await sendCode({ email });
  } catch (error) {
    console.error('Error sending code:', error);
  } finally {
    setIsLoading(false);
  }
};

const handleLogin = async () => {
  try {
    setIsLoading(true);
    await loginWithCode({ code, email });
  } catch (error) {
    console.error('Error logging in:', error);
  } finally {
    setIsLoading(false);
  }
};

return (
    <View className="flex-1 items-center justify-center p-4">
    <TextInput 
        value={email} 
        onChangeText={setEmail} 
        placeholder="Email"
        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
    />
    <TouchableOpacity 
        onPress={handleSendCode}
        className="bg-blue-500 px-6 py-3 rounded-lg mb-4 w-full"
        disabled={isLoading}
    >
        <Text className="text-white text-center font-semibold">
            {isLoading ? 'Sending...' : 'Send Code'}
        </Text>
    </TouchableOpacity>
    
    <TextInput 
        value={code} 
        onChangeText={setCode} 
        placeholder="Code"
        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        keyboardType="number-pad"
        editable={!isLoading}
    />
    <TouchableOpacity 
        onPress={handleLogin}
        className="bg-blue-500 px-6 py-3 rounded-lg w-full"
        disabled={isLoading}
    >
        <Text className="text-white text-center font-semibold">
            {isLoading ? 'Logging in...' : 'Login'}
        </Text>
    </TouchableOpacity>
    </View>
);
}