import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function CheckoutSuccessScreen() {
    const router = useRouter();

    const handleGoToOrders = () => {
        router.push('/orders' as any);
    };

    const handleGoToHome = () => {
        router.push('/(tabs)/menu' as any);
    };

    return (
        <View className="flex-1 bg-white">
            <Stack.Screen options={{ headerShown: false }} />
            <View className="flex-row items-center justify-center px-4 py-3 border-b border-gray-100">
                <Text className="text-[16px] font-bold text-black" numberOfLines={1}>
                    Anasayfa
                </Text>
            </View>

            <View className="flex-1 items-center justify-center px-6">

                <View className="w-32 h-32 bg-[#2D2CB8] rounded-full items-center justify-center mb-6">
                    <Ionicons name="clipboard-outline" size={54} color="#fff" style={{ marginBottom: -10 }} />
                    <View className="bg-white rounded w-10 h-10 absolute items-center justify-center" style={{ top: 40 }}>
                        <Ionicons name="checkmark" size={28} color="#2D2CB8" />
                    </View>
                </View>

                <Text className="text-2xl font-extrabold text-black mb-3 text-center">
                    Siparişiniz Alındı
                </Text>

                <Text className="text-[14px] text-gray-500 text-center leading-6 mb-12">
                    Siparişiniz başarılı bir şekilde alınmıştır. Siparişiniz ile ilgili güncel bilgileri menü
                    siparişlerim alanından öğrenebilirsiniz.
                </Text>

                <Pressable
                    onPress={handleGoToOrders}
                    className="bg-black py-4 rounded-xl items-center justify-center w-full mb-3"
                >
                    <Text className="text-white font-bold text-[16px]">Siparişe Git</Text>
                </Pressable>

                <Pressable
                    onPress={handleGoToHome}
                    className="bg-white py-4 rounded-xl items-center justify-center w-full border border-gray-300"
                >
                    <Text className="text-black font-bold text-[16px]">Anasayfaya Dön</Text>
                </Pressable>

            </View>
        </View>
    );
}
