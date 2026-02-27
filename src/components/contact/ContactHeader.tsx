import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export function ContactHeader() {
    const router = useRouter();

    return (
        <View className="flex-row items-center py-4 border-b border-gray-100 px-4">
            <Pressable
                onPress={() => router.back()}
                className="flex-row items-center p-2 -ml-2 rounded-full absolute left-4 z-10"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Ionicons name="chevron-back" size={24} color="#1f2937" />
            </Pressable>

            <View className="flex-1 ml-8">
                <Text className="text-lg font-bold text-black uppercase tracking-wide">Bize Ulaşın</Text>
            </View>
        </View>
    );
}
