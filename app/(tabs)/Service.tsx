import React from 'react';
import {Link} from 'expo-router'
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native';

const Service: React.FC = () => {
  return (
    <SafeAreaView>
      <Text>Service</Text>
      <Link href={"PaymentResultSC"}>
            <Text>hi there</Text></Link>
    </SafeAreaView>
  );
};

export default Service;