import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface MenuItemProps {
    title: string;
    iconName: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    hideBorder?: boolean;
}

export function MenuItem({ title, iconName, onPress, hideBorder = false }: MenuItemProps) {
    return (
        <Pressable
            onPress={onPress}
            className={`flex-row items-center justify-between py-5 ${!hideBorder ? 'border-b border-gray-200' : ''}`}
        >
            <View className="flex-row items-center">
                <View className="w-8">
                    <Ionicons name={iconName} size={22} color="#1f2937" />
                </View>
                <Text className="text-sm font-medium text-gray-800 ml-2">{title}</Text>
            </View>
        </Pressable>
    );
}
