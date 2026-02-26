import { FlavorOption, SizeOption } from '@/types/product';
import { clsx } from 'clsx';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ProductVariantsProps {
    flavors: FlavorOption[];
    sizes: SizeOption[];
    selectedFlavorId: string;
    selectedSizeId: string;
    onFlavorSelect: (id: string) => void;
    onSizeSelect: (id: string) => void;
}

export function ProductVariants({
    flavors,
    sizes,
    selectedFlavorId,
    selectedSizeId,
    onFlavorSelect,
    onSizeSelect
}: ProductVariantsProps) {
    const cn = (...inputs: (string | undefined | null | false)[]) => twMerge(clsx(inputs));

    return (
        <View className="px-4 py-4 bg-white border-b border-gray-100">
            <View className="mb-6">
                <View className="flex-row items-center justify-between mb-3">
                    <Text className="text-sm font-bold text-gray-900">Aroma Seçiniz</Text>
                    <Text className="text-xs text-green-600 font-medium">
                        {flavors.find(f => f.id === selectedFlavorId)?.name || 'Seçilmedi'}
                    </Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                    {flavors.map((flavor) => {
                        const isSelected = flavor.id === selectedFlavorId;
                        return (
                            <Pressable
                                key={flavor.id}
                                onPress={() => flavor.isAvailable && onFlavorSelect(flavor.id)}
                                className={cn(
                                    "px-4 py-2 rounded-xl border mr-3 flex-row items-center",
                                    isSelected ? "border-green-500 bg-green-50" : "border-gray-200 bg-white",
                                    !flavor.isAvailable && "opacity-50"
                                )}
                            >
                                <View
                                    style={{ backgroundColor: flavor.color }}
                                    className="w-3 h-3 rounded-full mr-2"
                                />
                                <Text className={cn(
                                    "text-sm font-medium",
                                    isSelected ? "text-green-700 font-bold" : "text-gray-700"
                                )}>
                                    {flavor.name}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            </View>

            <View>
                <Text className="text-sm font-bold text-gray-900 mb-3">Boyut Seçiniz</Text>
                <View className="flex-col gap-y-3">
                    {sizes.map((size) => {
                        const isSelected = size.id === selectedSizeId;
                        return (
                            <Pressable
                                key={size.id}
                                onPress={() => size.isAvailable && onSizeSelect(size.id)}
                                className={cn(
                                    "flex-row items-center justify-between p-3 rounded-xl border",
                                    isSelected ? "border-green-500 bg-green-50" : "border-gray-200 bg-white",
                                    !size.isAvailable && "opacity-50"
                                )}
                            >
                                <View>
                                    <Text className={cn(
                                        "text-sm font-bold",
                                        isSelected ? "text-green-800" : "text-gray-900"
                                    )}>
                                        {size.name} ({size.weight})
                                    </Text>
                                    <Text className="text-xs text-gray-500 mt-1">
                                        {size.servings} Servis
                                    </Text>
                                </View>
                                <Text className={cn(
                                    "text-sm font-bold",
                                    isSelected ? "text-green-700" : "text-gray-900"
                                )}>
                                    + {size.price} TL
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}
