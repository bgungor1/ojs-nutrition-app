import { getImageUrl } from '@/utils/imageUrl';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

interface CartItemCardProps {
    item: any;
    onIncrement: (item: any) => void;
    onDecrement: (item: any) => void;
}

export function CartItemCard({ item, onIncrement, onDecrement }: CartItemCardProps) {
    return (
        <View className="flex-row py-4 border-b border-gray-100 items-start">
            <View className="w-20 h-24 bg-gray-100 items-center justify-center">
                {item.image ? (
                    <Image
                        source={{ uri: getImageUrl(item.image) }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="w-full h-full items-center justify-center">
                        <Text className="text-[10px] text-gray-400">Görsel Yok</Text>
                    </View>
                )}
            </View>

            <View className="flex-1 ml-4 flex-row justify-between">
                {/* Texts */}
                <View className="flex-1 justify-start">
                    <Text className="font-bold text-base text-gray-900 uppercase leading-tight mb-1">
                        {item.name}
                    </Text>
                    {item.flavor && <Text className="font-bold text-gray-400 text-sm">{item.flavor}</Text>}
                    {item.size && <Text className="font-bold text-gray-400 text-sm">{item.size}</Text>}
                </View>

                <View className="items-end justify-between">
                    <Text className="font-bold text-base text-gray-900 mb-6 tracking-wide">
                        {item.price} TL
                    </Text>

                    <View className="flex-row items-center border border-gray-100 rounded-sm">
                        <Pressable onPress={() => onDecrement(item)} className="p-[10px]">
                            {item.quantity === 1 ? (
                                <Ionicons name="trash-outline" size={16} color="#1f2937" />
                            ) : (
                                <Ionicons name="remove" size={16} color="#1f2937" />
                            )}
                        </Pressable>
                        <Text className="px-[12px] font-semibold text-sm text-black">
                            {item.quantity}
                        </Text>
                        <Pressable onPress={() => onIncrement(item)} className="p-[10px]">
                            <Ionicons name="add" size={16} color="#1f2937" />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}
