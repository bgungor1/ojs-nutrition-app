import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface AddressHeaderProps {
    title: string;
    showBack?: boolean;
}

export function AddressHeader({ title, showBack = true }: AddressHeaderProps) {
    const router = useRouter();

    return (
        <View className="px-5 pt-12 pb-4 bg-white border-b border-gray-100 flex-row items-center justify-center relative">
            {showBack && (
                <Pressable
                    onPress={() => router.back()}
                    className="absolute left-5 top-12 p-1"
                >
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </Pressable>
            )}
            <Text className="text-xl font-bold text-black">{title}</Text>
        </View>
    );
}
