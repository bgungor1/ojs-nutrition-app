import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface CartSummaryFooterProps {
    totalPrice: number;
    isEmpty: boolean;
    onCheckout?: () => void;
}

export function CartSummaryFooter({ totalPrice, isEmpty, onCheckout }: CartSummaryFooterProps) {
    return (
        <View className="px-4 py-4 bg-white pb-8">
            <View className="flex-row justify-end mb-4">
                <Text className="text-base font-bold text-black tracking-wide">
                    TOPLAM {totalPrice} TL
                </Text>
            </View>

            <Pressable
                disabled={isEmpty}
                onPress={onCheckout}
                className={`flex-row items-center justify-center py-4 rounded-md ${isEmpty ? 'bg-gray-500' : 'bg-black'}`}
            >
                <Text className="text-white font-bold tracking-widest mr-2 uppercase">DEVAM ET</Text>
                <Ionicons name="play" size={10} color="white" />
            </Pressable>
        </View>
    );
}
