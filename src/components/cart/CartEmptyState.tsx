import React from 'react';
import { Text, View } from 'react-native';

export function CartEmptyState() {
    return (
        <View className="flex-1 items-center pt-12">
            <Text className="text-sm font-medium text-gray-800">
                Sepetinizde Ürün Bulunmamaktadır
            </Text>
        </View>
    );
}
