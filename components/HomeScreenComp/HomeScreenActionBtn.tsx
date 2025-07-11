import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
const HomeScreenActionBtn:React.FC = () => {
return (
    <View className="flex-row px-5 mb-8 gap-3">
      <TouchableOpacity className="flex-1 bg-gray-100 py-3 px-4 rounded-full items-center border border-gray-200">
        <Text className="text-sm font-medium text-gray-800">My Deposits History</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 bg-gray-100 py-3 px-4 rounded-full items-center border border-gray-200">
        <Text className="text-sm font-medium text-gray-800">Transaction History</Text>
      </TouchableOpacity>
    </View>
);
};
export default HomeScreenActionBtn;