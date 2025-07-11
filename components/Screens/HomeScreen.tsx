import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import HomeScreenHeader from "../HomeScreenComp/HomeScreenHeader";
import HomeScreenCreditCard from "../HomeScreenComp/HomeScreenCreditCard";
import HomeScreenActionBtn from "../HomeScreenComp/HomeScreenActionBtn";
import HomeScreenServiceGrid from "../HomeScreenComp/HomeScreenServiceGrid";
import HomeScreenPromoBN from "../HomeScreenComp/HomeScreenPromoBN";


const HomeScreen: React.FC = () => {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                <HomeScreenHeader/>
                <HomeScreenCreditCard/>
                <HomeScreenActionBtn/>
                <HomeScreenServiceGrid/>
                <HomeScreenPromoBN/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;