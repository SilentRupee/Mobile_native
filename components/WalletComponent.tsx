import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { BACKEND_URL } from '@/BackendUrl';

interface Transaction {
  type: 'Sender' | 'Receiver';
  amount: number;
  amountInr: number;
  currency: string;
  counterparty: string;
  timestamp: number;
  signature: string;
}

interface WalletData {
  user: {
    id: string;
    username: string;
    walletAddress: string;
    pda: string;
  };
  exchangeRate: {
    usdc_inr: number;
  };
  transactionHistory: Transaction[];
}

interface WalletComponentProps {
  userType: 'merchant' | 'customer';
}

const WalletComponent: React.FC<WalletComponentProps> = ({ userType }) => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("Please login to view wallet");
        return;
      }

      const decoded: any = jwtDecode(token);
      const userId = userType === 'merchant' ? decoded.merchantId : decoded.customerId;
      
      const response = await axios.get(`${BACKEND_URL}/api/wallet/${userType}/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setWalletData(response.data);
    } catch (error: any) {
      console.error("Error fetching wallet data:", error);
      setError(error.response?.data?.message || "Failed to load wallet data");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchWalletData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchWalletData();
  }, [userType]);

  const calculateTotalBalance = () => {
    if (!walletData) return 0;
    
    let balance = 0;
    walletData.transactionHistory.forEach(transaction => {
      if (transaction.type === 'Receiver') {
        balance += transaction.amountInr;
      } else {
        balance -= transaction.amountInr;
      }
    });
    
    return balance;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getTransactionIcon = (type: string) => {
    return type === 'Receiver' ? 'arrow-down' : 'arrow-up';
  };

  const getTransactionColor = (type: string) => {
    return type === 'Receiver' ? '#059669' : '#DC2626';
  };

  const getExternalWalletTransactions = () => {
    if (!walletData?.transactionHistory) return [];
    return walletData.transactionHistory.filter(tx => 
      tx.counterparty === 'External Wallet'
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text className="text-gray-600 mt-4">Loading wallet...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
        <View className="flex-1 justify-center items-center p-6">
          <Ionicons name="alert-circle" size={64} color="#ef4444" />
          <Text className="text-lg text-gray-600 mt-4 text-center">{error}</Text>
          <TouchableOpacity 
            className="mt-6 bg-indigo-600 px-6 py-3 rounded-full"
            onPress={fetchWalletData}
          >
            <Text className="text-white font-semibold">Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const totalBalance = calculateTotalBalance();
  const externalWalletTransactions = getExternalWalletTransactions();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />
      
      

      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Balance Card */}
        <View className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 mx-4 mt-4 rounded-2xl p-6 shadow-lg">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-black text-lg font-medium">Total Balance</Text>
            <View className="bg-white bg-opacity-20 p-2 rounded-full">
              <Ionicons name="wallet" size={24} color="Black" />
            </View>
          </View>
          <Text className="text-black text-4xl font-bold mb-2">
            {formatAmount(totalBalance)}
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-black-100 text-sm">
              Exchange Rate: 1 USDC = ₹{walletData?.exchangeRate?.usdc_inr || 0}
            </Text>
            <View className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              <Text className="text-green text-xs font-medium">Live</Text>
            </View>
          </View>
        </View>

        {/* External Wallet Section */}
       
        {/* Transaction History */}
        <View className="bg-white mx-4 mt-4 rounded-xl p-4 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-gray-800">Transaction History</Text>
            <Text className="text-gray-500 text-sm">
              {walletData?.transactionHistory?.length || 0} transactions
            </Text>
          </View>

          {walletData?.transactionHistory && walletData.transactionHistory.length > 0 ? (
            <View>
              {walletData.transactionHistory.map((transaction, index) => (
                <View 
                  key={index} 
                  className={`flex-row items-center justify-between p-3 rounded-lg mb-3 ${
                    transaction.type === 'Receiver' ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <View className="flex-row items-center flex-1">
                    <View 
                      className={`w-10 h-10 rounded-full justify-center items-center mr-3 ${
                        transaction.type === 'Receiver' ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      <Ionicons 
                        name={getTransactionIcon(transaction.type) as any} 
                        size={20} 
                        color={getTransactionColor(transaction.type)} 
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="font-semibold text-gray-800">
                        {transaction.type === 'Receiver' ? 'Received' : 'Sent'}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {transaction.counterparty}
                      </Text>
                      <Text className="text-xs text-gray-400">
                        {formatDate(transaction.timestamp)}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text 
                      className={`font-bold text-lg ${
                        transaction.type === 'Receiver' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'Receiver' ? '+' : '-'}
                      {formatAmount(transaction.amountInr)}
                    </Text>
                    <Text className="text-xs text-gray-400">
                      {transaction.amount.toFixed(6)} {transaction.currency}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className="py-8 items-center">
              <Ionicons name="receipt-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 mt-2 text-center">No transactions yet</Text>
              <Text className="text-gray-400 text-sm text-center mt-1">
                Your transaction history will appear here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletComponent; 