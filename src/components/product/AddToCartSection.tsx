import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

interface AddToCartSectionProps {
    onAddToCart: (quantity: number) => void;
    price: number;
    inStock: boolean;
    isLoading?: boolean;
}


export function AddToCartSection({ onAddToCart, price, inStock, isLoading }: AddToCartSectionProps) {
    const [quantity, setQuantity] = useState(1);

    const increase = () => setQuantity(prev => prev + 1);
    const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <View className="px-4 py-4 bg-white border-t border-gray-100 flex-row items-center justify-between">
            <View className="flex-row items-center border border-gray-200 rounded-xl h-14 bg-gray-50 w-32 justify-between">
                <Pressable
                    onPress={decrease}
                    className="w-10 h-full items-center justify-center"
                    hitSlop={10}
                >
                    <Ionicons name="remove" size={20} color={quantity === 1 ? "#d1d5db" : "#1f2937"} />
                </Pressable>

                <Text className="text-base font-bold text-gray-900">{quantity}</Text>
                <Pressable
                    onPress={increase}
                    className="w-10 h-full items-center justify-center"
                    hitSlop={10}
                >
                    <Ionicons name="add" size={20} color="#1f2937" />
                </Pressable>
            </View>
            <Pressable
                onPress={() => inStock && !isLoading && onAddToCart(quantity)}
                disabled={!inStock || isLoading}
                className={`flex-1 ml-3 h-14 rounded-xl flex-row items-center justify-center ${inStock ? "bg-black" : "bg-gray-300"
                    }`}
            >
                {isLoading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <>
                        <Ionicons name="cart-outline" size={22} color="white" style={{ marginRight: 8 }} />
                        <Text className="text-white font-bold text-base">
                            {inStock ? `Sepete Ekle • ${price * quantity} TL` : 'Stokta Yok'}
                        </Text>
                    </>
                )}
            </Pressable>
        </View>
    );
}
