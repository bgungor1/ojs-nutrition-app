import ProductCard from '@/components/home/ProductCard';
import { ApiProduct } from '@/types/api';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

interface RelatedProductsProps {
    title?: string;
    products: ApiProduct[];
}

export function RelatedProducts({ title = "Sizin İçin Seçtiklerimiz", products }: RelatedProductsProps) {
    const router = useRouter();

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <View className="py-4 bg-white mt-2">
            <View className="px-4 mb-3 flex-row justify-between items-center">
                <Text className="text-lg font-bold text-gray-900">{title}</Text>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
                renderItem={({ item }) => (
                    <View style={{ width: 160 }}>
                        <ProductCard
                            product={item}
                            onPress={() => {
                                router.push(`/product/${item.slug}` as any);
                            }}
                        />
                    </View>
                )}
            />
        </View>
    );
}
