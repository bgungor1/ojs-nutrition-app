import React from 'react';
import { Text, View } from 'react-native';

interface ProductPriceProps {
    price: number;
    originalPrice?: number | null;
    pricePerServing?: number | null;
}

export function ProductPrice({ price, originalPrice, pricePerServing }: ProductPriceProps) {
    return (
        <View className="px-4 py-3 bg-white flex-row items-end justify-between border-b border-gray-100">
            <View>
                <Text className="text-sm text-gray-500 font-medium mb-1">
                    Fiyat
                </Text>

                <View className="flex-row items-center gap-x-2">
                    <Text className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        {price} TL
                    </Text>

                    {originalPrice && originalPrice > price && (
                        <Text className="text-sm font-medium text-gray-400 line-through">
                            {originalPrice} TL
                        </Text>
                    )}
                </View>
            </View>
            {pricePerServing && (
                <View className="items-end">
                    <Text className="text-xs text-gray-400 font-medium mb-1">
                        Servis Başı
                    </Text>
                    <Text className="text-base font-bold text-green-600">
                        {pricePerServing} TL
                    </Text>
                </View>
            )}
        </View>
    );
}
