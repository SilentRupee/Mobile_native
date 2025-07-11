import React, { useState, useEffect, useRef } from 'react';
import { 
    Text, 
    View, 
    Image, 
    ScrollView, 
    Dimensions, 
    TouchableOpacity,
    Animated 
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth - 40; 
interface PromoCard {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    backgroundColor: string;
}

const promoCards: PromoCard[] = [
    {
        id: '1',
        title: 'OPEN A NEW SBI',
        subtitle: 'ACCOUNT ON YONO',
        description: 'And Submit Any Of These Acceptable Documents For KYC Verification',
        imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        backgroundColor: 'bg-black'
    },
    {
        id: '2',
        title: 'INSTANT LOAN',
        subtitle: 'APPROVAL IN 24 HRS',
        description: 'Get pre-approved personal loans with minimal documentation required',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        backgroundColor: 'bg-gray-900'
    },
    {
        id: '3',
        title: 'INVESTMENT PLANS',
        subtitle: 'START FROM ₹500',
        description: 'Explore mutual funds, SIP and fixed deposits with high returns',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        backgroundColor: 'bg-gray-800'
    },
    {
        id: '4',
        title: 'DIGITAL WALLET',
        subtitle: 'CASHLESS PAYMENTS',
        description: 'Pay bills, recharge mobile and transfer money instantly',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        backgroundColor: 'bg-black'
    }
];

const HomeScreenPromoBN: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    // Auto-scroll functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % promoCards.length;
                
                // Animate fade out and in
                Animated.sequence([
                    Animated.timing(fadeAnim, {
                        toValue: 0.7,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start();

                // Scroll to next card
                scrollViewRef.current?.scrollTo({
                    x: nextIndex * cardWidth,
                    animated: true,
                });
                
                return nextIndex;
            });
        }, 3000); // Change card every 3 seconds

        return () => clearInterval(interval);
    }, [fadeAnim]);

    const handleScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / cardWidth);
        setCurrentIndex(index);
    };

    const renderCard = (card: PromoCard, index: number) => (
        <Animated.View
            key={card.id}
            className={`${card.backgroundColor} rounded-2xl overflow-hidden mx-1`}
            style={{
                opacity: fadeAnim,
                width: cardWidth - 8, 
                aspectRatio: 1.6, 
            }}
        >
            <View className="flex-row p-6 h-full">
                <View className="flex-1 pr-4 justify-between">
                    <View>
                        <Text className="text-lg font-bold text-white leading-6">{card.title}</Text>
                        <Text className="text-lg font-bold text-white leading-6">{card.subtitle}</Text>
                    </View>
                    
                    <View>
                        <Text className="text-sm text-gray-300 leading-5">
                            {card.description}
                        </Text>
                        <Text className="text-xs text-gray-400 mt-2">
                            For Proof of Identity & Proof of Address
                        </Text>
                    </View>
                    
                    {/* Card number style decoration */}
                    <View className="flex-row space-x-2 mt-3">
                        <View className="w-8 h-2 bg-white opacity-60 rounded-full" />
                        <View className="w-8 h-2 bg-white opacity-40 rounded-full" />
                        <View className="w-8 h-2 bg-white opacity-30 rounded-full" />
                        <View className="w-8 h-2 bg-white opacity-20 rounded-full" />
                    </View>
                </View>
                
                <View className="justify-center items-center">
                    <Image
                        source={{ uri: card.imageUrl }}
                        className="w-24 h-24 rounded-full border-2 border-white border-opacity-20"
                    />
                    
                    {/* Chip-like decoration */}
                    <View className="w-8 h-6 bg-white opacity-80 rounded-md mt-3" />
                </View>
            </View>
        </Animated.View>
    );

    return (
        <View className="mb-6">
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                decelerationRate="fast"
                snapToInterval={cardWidth}
                snapToAlignment="start"
            >
                {promoCards.map((card, index) => renderCard(card, index))}
            </ScrollView>
            
            {/* Pagination Dots */}
            <View className="flex-row justify-center mt-4 space-x-2">
                {promoCards.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setCurrentIndex(index);
                            scrollViewRef.current?.scrollTo({
                                x: index * cardWidth,
                                animated: true,
                            });
                        }}
                    >
                        <View
                            className={`w-2 h-2 rounded-full ${
                                index === currentIndex ? 'bg-black' : 'bg-gray-300'
                            }`}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default HomeScreenPromoBN;