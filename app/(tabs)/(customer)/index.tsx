import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '../../../components/Screens/HomeScreen';
import { View ,Text} from 'lucide-react-native';

const Index: React.FC = () => {
  console.log("Dasdas");
    return (
    <SafeAreaProvider>  
      <View><Text>asdasdas</Text></View>
    </SafeAreaProvider>
  );
};

export default Index;