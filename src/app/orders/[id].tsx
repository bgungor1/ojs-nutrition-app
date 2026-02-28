import { OrderDetailItem, OrderSummaryBox } from '@/components/orders';
import { mockOrders } from '@/data/orders';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const order = mockOrders.find(o => o.id === id);

    if (!order) {
        return (
            <SafeAreaView className="flex-1 bg-white justify-center items-center">
                <Text>Sipariş bulunamadı.</Text>
                <Pressable onPress={() => router.back()} className="mt-4 p-2 bg-gray-200 rounded">
                    <Text>Geri Dön</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row items-center px-4 py-4 border-b border-transparent">
                <Pressable onPress={() => router.back()} className="mr-2 p-1">
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </Pressable>
                <Text className="text-xl font-extrabold text-black">
                    Sipariş Detayı
                </Text>
            </View>

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                {/* Tarih ve Sipariş No */}
                <Text className="text-[14px] text-gray-800 mb-4 tracking-wide font-medium">
                    {order.created_at} - {order.order_no} numaralı sipariş
                </Text>

                {/* Ürünler Listesi */}
                <View className="border-t border-gray-300">
                    {order.cart_detail?.map((item) => (
                        <OrderDetailItem key={item.id} item={item} />
                    ))}
                </View>

                {/* Kargo Bilgileri (Eğer Varsa) */}
                {order.shipping_info && (
                    <View className="flex-row items-center py-4 border-b border-gray-300">
                        <Text className="text-[13px] text-black mr-2 font-medium">
                            {order.shipping_info.company}
                        </Text>
                        <Text className="text-[13px] text-black">
                            Takip Numarası: {order.shipping_info.tracking_number}
                        </Text>
                    </View>
                )}

                {/* Adres */}
                {order.address && (
                    <View className="py-5 border-b border-gray-300">
                        <Text className="text-sm font-extrabold text-black mb-3">{order.address.title || 'Adres'}</Text>
                        <Text className="text-sm text-gray-800 mb-1">
                            {order.address.first_name} {order.address.last_name}
                        </Text>
                        <Text className="text-sm text-gray-800 leading-5 pr-4 underline decoration-gray-300">
                            {order.address.full_address}
                        </Text>
                    </View>
                )}

                {order.price_summary && (
                    <View className="py-5 border-b border-gray-300">
                        <Text className="text-sm font-extrabold text-black mb-4">Özet</Text>
                        <OrderSummaryBox summary={order.price_summary} />
                    </View>
                )}

                <View className="py-6 mb-10">
                    <Text className="text-[15px] font-extrabold text-black mb-4">Yardıma mı ihtiyacın var?</Text>
                    <Pressable onPress={() => router.push('/faq' as any)} className="mb-4">
                        <Text className="text-[14px] font-medium text-gray-800">Sıkça Sorulan Sorular</Text>
                    </Pressable>
                    <Pressable onPress={() => { }}>
                        <Text className="text-[14px] font-medium text-gray-800">Satış Sözleşmesi</Text>
                    </Pressable>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
