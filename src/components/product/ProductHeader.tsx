import OjsLogo from '@/components/icons/OjsLogo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface ProductHeaderProps {
    onShare?: () => void;
    onFavorite?: () => void;
    isFavorite?: boolean;
}


export function ProductHeader({ onShare, onFavorite, isFavorite = false }: ProductHeaderProps) {
    const router = useRouter();

    return (
        <View className="bg-white z-10 w-full pt-2">
            <View className="px-4 mb-2">
                <OjsLogo width={100} height={24} />
            </View>
            <View className="flex-row items-center justify-between px-4">
                <Pressable
                    onPress={() => router.back()}
                    className="flex-row items-center py-2"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="chevron-back" size={20} color="#1f2937" />
                    <Text className="text-sm font-semibold text-gray-800 ml-1">
                        Geri Dön
                    </Text>
                </Pressable>

                <View className="flex-row items-center gap-x-3">
                    <Pressable
                        onPress={onShare}
                        className="w-10 h-10 items-center justify-center rounded-full bg-gray-100/50"
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons name="share-outline" size={24} color="#1f2937" />
                    </Pressable>

                    <Pressable
                        onPress={onFavorite}
                        className="w-10 h-10 items-center justify-center rounded-full bg-gray-100/50"
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons
                            name={isFavorite ? "heart" : "heart-outline"}
                            size={24}
                            color={isFavorite ? "#ef4444" : "#1f2937"}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
