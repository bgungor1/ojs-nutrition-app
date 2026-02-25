import ProductCard from '@/components/home/ProductCard';
import { useGetProductsQuery } from '@/services/productsApi';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AllProductsScreen() {
    const { data, isLoading, error } = useGetProductsQuery({ page: 1, limit: 100 });
    const products = data?.data?.results || [];

    const totalCount = data?.data?.count || 0;
    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-white" edges={['top']}>
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#10b981" />
                </View>
            </SafeAreaView>
        );
    }


    if (error) {
        return (
            <SafeAreaView className="flex-1 bg-white" edges={['top']}>
                <View className="flex-1 items-center justify-center">
                    <Text className="text-gray-400 text-sm">Ürünler yüklenemedi</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                numColumns={2}

                renderItem={({ item }) => (
                    <View className="w-1/2">
                        <ProductCard
                            product={item}
                            onPress={() => {
                                // router.push(`/product/${item.slug}`)
                            }}
                        />
                    </View>
                )}

                ListHeaderComponent={
                    <View className="px-4 py-4">
                        <Text className="text-xl font-bold text-gray-900 text-center">
                            TÜM ÜRÜNLER
                        </Text>
                    </View>
                }

                ListFooterComponent={
                    products.length > 0 ? (
                        <View className="items-center py-4 mb-4">
                            <Text className="text-xs text-gray-400">
                                Toplam {totalCount} ürün gösteriliyor
                            </Text>
                        </View>
                    ) : null
                }

                ListEmptyComponent={
                    <View className="items-center justify-center py-20">
                        <Text className="text-gray-400 text-sm">Henüz ürün bulunmuyor</Text>
                    </View>
                }
                contentContainerStyle={{ paddingHorizontal: 4 }}

                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}
