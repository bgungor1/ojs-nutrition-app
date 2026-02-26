import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export function ProductTrustFeatures() {
    const FeatureItem = ({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
        <View className="flex-1 items-center justify-center p-2">
            <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mb-2">
                <Ionicons name={icon} size={22} color="#3b82f6" />
            </View>
            <Text className="text-[11px] font-bold text-gray-800 text-center mb-0.5">{title}</Text>
            <Text className="text-[10px] text-gray-500 text-center leading-tight">{subtitle}</Text>
        </View>
    );

    return (
        <View className="flex-row justify-between bg-white px-2 py-4 border-b border-gray-100 mt-2">
            <FeatureItem
                icon="cube-outline"
                title="Aynı Gün"
                subtitle="Ücretsiz Kargo"
            />
            <FeatureItem
                icon="checkmark-done-circle-outline"
                title="%100"
                subtitle="Orijinal Ürün"
            />
            <FeatureItem
                icon="shield-checkmark-outline"
                title="Kolay İade"
                subtitle="Garantisi"
            />
        </View>
    );
}
