import { useGetBestSellersQuery } from '@/services/bestSellersApi';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import ProductCard from './ProductCard';

const ProductGrid = () => {
    const { data, isLoading, error } = useGetBestSellersQuery();

    if (isLoading) {
        return (
            <View className="items-center justify-center py-8">
                <ActivityIndicator size="large" color="#10b981" />
            </View>
        );
    }

    if (error || !data?.data) {
        return (
            <View className="items-center justify-center py-8">
                <Text className="text-gray-400 text-sm">Ürünler yüklenemedi</Text>
            </View>
        );
    }

    const products = data.data.slice(0, 6);

    return (
        <View className="px-2.5 mt-4">
            <View className="flex-row flex-wrap">
                {products.map((product, index) => (
                    <View key={product.slug || index} className="w-1/2">
                        <ProductCard
                            product={product}
                            onPress={() => { }}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default ProductGrid;
