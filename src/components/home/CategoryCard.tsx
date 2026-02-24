import { Image, ImageSource } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CategoryCardProps {
    title: string;
    image: ImageSource;
    onPress?: () => void;
}

const CategoryCard = ({ title, image, onPress }: CategoryCardProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            className="flex-1 bg-white rounded-xl overflow-hidden mx-1.5 mb-3 shadow-sm"
            style={{ elevation: 2 }}
        >
            <Image
                source={image}
                style={{ width: '100%', height: 90 }}
                contentFit="cover"
            />
            <View className="items-center py-2">
                <Text className="text-xs font-bold text-gray-800 mb-1.5">{title}</Text>
                <View className="bg-emerald-500 rounded px-3 py-1">
                    <Text className="text-white text-[10px] font-bold">İNCELE</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CategoryCard;
