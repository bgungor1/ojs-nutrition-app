import { StarRating } from '@/components/common';
import React from 'react';
import { Text, View } from 'react-native';

interface ProductInfoProps {
    title: string;
    category: string;
    rating: number;
    reviewCount: number;
}


export function ProductInfo({ title, category, rating, reviewCount }: ProductInfoProps) {
    return (
        <View className="px-4 pt-4 pb-2 bg-white">
            <Text
                className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1"
                numberOfLines={1}
            >
                {category}
            </Text>
            <Text
                className="text-2xl font-bold text-gray-900 mb-2 leading-tight"
                numberOfLines={2}
            >
                {title}
            </Text>

            <View className="flex-row items-center">

                <StarRating rating={rating} />

                {reviewCount > 0 && (
                    <Text className="text-sm text-gray-500 ml-2 font-medium">
                        {reviewCount} Yorum
                    </Text>
                )}
            </View>
        </View>
    );
}
