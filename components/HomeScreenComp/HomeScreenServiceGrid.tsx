import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
interface ServiceItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const services: ServiceItem[] = [
  { id: '1', title: 'Account', icon: 'person-outline' },
  { id: '2', title: 'Investments', icon: 'trending-up-outline' },
  { id: '3', title: 'Loans', icon: 'hand-left-outline' },
  { id: '4', title: 'Yono Cash', icon: 'cash-outline' },
  { id: '5', title: 'Bill Pay', icon: 'receipt-outline' },
  { id: '6', title: 'Insurance', icon: 'shield-checkmark-outline' },
  { id: '7', title: 'Deposits', icon: 'wallet-outline' },
  { id: '8', title: 'Yono Pay', icon: 'card-outline' },
  { id: '9', title: 'Shop & Order', icon: 'bag-outline' },
  { id: '10', title: 'Train Ticket', icon: 'train-outline' },
];
const HomeScreenServiceGrid: React.FC=()=>{
 const renderServiceItem = (item: ServiceItem) => (
    <TouchableOpacity key={item.id} className="w-[18%] items-center mb-5">
      <View className="w-12 h-12 rounded-full bg-gray-100 justify-center items-center mb-2 border border-gray-200">
        <Ionicons name={item.icon} size={24} color="#000000" />
      </View>
      <Text className="text-xs text-center text-gray-800 font-medium">{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="px-5 mb-8">
      <Text className="text-lg font-semibold text-black mb-5">Banking And Systems</Text>
      <View className="flex-row flex-wrap justify-between">
        {services.map(renderServiceItem)}
      </View>
    </View>
  );
};
export default HomeScreenServiceGrid;