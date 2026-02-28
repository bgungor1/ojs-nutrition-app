import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

interface CheckoutSummaryDropdownProps {
    totalPrice: number;
    totalItems: number;
    children?: React.ReactNode;
}

export function CheckoutSummaryDropdown({ totalPrice, totalItems, children }: CheckoutSummaryDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const toggleDropdown = () => {
        const toValue = isOpen ? 0 : 1;
        Animated.timing(animation, {
            toValue,
            duration: 200,
            useNativeDriver: true,
        }).start();
        setIsOpen(!isOpen);
    };

    const rotateChevron = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    return (
        <View className="bg-white border-b border-gray-100 mt-2">
            <Pressable
                onPress={toggleDropdown}
                className="flex-row justify-between items-center px-5 py-4"
            >
                <Text className="text-[15px] font-extrabold text-black">Özet</Text>

                <View className="flex-row items-center">
                    <Text className="text-[14px] font-bold text-black mr-2">
                        {totalPrice.toLocaleString('tr-TR')} TL ({totalItems} ürün)
                    </Text>
                    <Animated.View style={{ transform: [{ rotate: rotateChevron }] }}>
                        <Ionicons name="chevron-down" size={20} color="#000" />
                    </Animated.View>
                </View>
            </Pressable>

            {/* İçerik */}
            {isOpen && children && (
                <View className="px-5 py-4 border-t border-gray-100 bg-gray-50">
                    {children}
                </View>
            )}
        </View>
    );
}
