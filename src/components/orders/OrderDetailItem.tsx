import { OrderItem as OrderItemType } from '@/types/order';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface OrderDetailItemProps {
    item: OrderItemType;
}

export function OrderDetailItem({ item }: OrderDetailItemProps) {
    return (
        <View className="flex-row items-center py-4 border-b border-gray-100">
            {/* Ürün Görseli */}
            <View className="w-20 h-20 bg-gray-50 rounded-md mr-4 overflow-hidden border border-gray-100">
                {item.photo ? (
                    <Image
                        source={{ uri: item.photo }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="flex-1 bg-gray-200" />
                )}
            </View>
            <View className="flex-1 justify-center">
                <Text className="text-sm font-extrabold text-black tracking-wide mb-1">
                    {item.product_name}
                </Text>
                <Text className="text-sm text-gray-800 mb-1">{item.unit_price} TL</Text>

                {item.variant_name && (
                    <Text className="text-sm text-gray-600">
                        {item.variant_name}
                    </Text>
                )}
            </View>
        </View>
    );
}
