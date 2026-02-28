import { OrderItem } from '@/components/orders';
import { mockOrders } from '@/data/orders';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrdersScreen() {
    const router = useRouter();
    const orders = mockOrders;

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <Stack.Screen options={{ headerShown: false }} />
            <View className="flex-row items-center px-4 py-4 border-b border-transparent">
                <Pressable onPress={() => router.back()} className="mr-3 p-1">
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </Pressable>
                <Text className="text-xl font-extrabold text-black">
                    Siparişlerim ({orders.length})
                </Text>
            </View>

            <FlatList
                data={orders}
                keyExtractor={(item, index) => item.id || index.toString()}
                className="px-5"
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <OrderItem
                        order={item}
                        onPressDetail={() => router.push(`/orders/${item.id}` as any)}
                    />
                )}
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center py-20 mt-10">
                        <Ionicons name="cube-outline" size={60} color="#cbd5e1" className="mb-4" />
                        <Text className="text-lg font-bold text-gray-700 text-center mb-2">Henüz Siparişiniz Yok</Text>
                        <Text className="text-sm text-gray-500 text-center">
                            Size lezzet ve enerji katacak ürünlerimizi inceleyebilirsiniz.
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
