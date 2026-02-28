import { AddressHeader } from '@/components/address';
import { useGetAddressesQuery } from '@/services';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddressListScreen() {
    const router = useRouter();
    const { data: addressesData, isLoading, refetch, isFetching } = useGetAddressesQuery();

    const addresses = addressesData?.results || [];

    const renderHeader = () => (
        <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Kayıtlı Adreslerim</Text>
            <Pressable
                onPress={() => router.push('/address/form')}
                className="bg-black px-4 py-2 rounded-md flex-row items-center"
            >
                <Ionicons name="add" size={18} color="#fff" />
                <Text className="text-white font-bold text-sm ml-1">Yeni Ekle</Text>
            </Pressable>
        </View>
    );

    const renderEmpty = () => {
        if (isLoading) return null;
        return (
            <View className="flex-1 justify-center items-center py-20 mt-10 p-5 border border-dashed border-gray-300 rounded-lg">
                <Ionicons name="map-outline" size={60} color="#cbd5e1" className="mb-4" />
                <Text className="text-lg font-bold text-gray-700 text-center mb-2">Adres Bulunamadı</Text>
                <Text className="text-sm text-gray-500 text-center mb-6">
                    Henüz kayıtlanmış bir teslimat adresiniz bulunmuyor, sepetinize geçmeden önce adres ekleyebilirsiniz.
                </Text>

                <Pressable
                    onPress={() => router.push('/address/form')}
                    className="bg-black px-6 py-3 rounded-md shadow-sm"
                >
                    <Text className="text-white font-bold text-base">Adres Oluştur</Text>
                </Pressable>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <Stack.Screen options={{ headerShown: false }} />
            <AddressHeader title="Adreslerim" />

            {isLoading && addresses.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : (
                <FlatList
                    data={addresses}
                    keyExtractor={(item) => item.id}
                    className="px-5 py-4"
                    ListHeaderComponent={addresses.length > 0 ? renderHeader : null}
                    ListEmptyComponent={renderEmpty}
                    refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
                    renderItem={({ item }) => (
                        <View className="bg-gray-50 border border-gray-100 p-4 rounded-lg mb-4 shadow-sm">
                            <View className="flex-row justify-between items-start mb-2">
                                <View className="flex-row items-center flex-1 pr-4">
                                    <View className="w-8 h-8 rounded-full bg-blue-100 justify-center items-center mr-3">
                                        <Ionicons name="location" size={16} color="#2563eb" />
                                    </View>
                                    <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
                                        {item.title}
                                    </Text>
                                </View>
                                <Pressable
                                    className="p-2 -mr-2 -mt-2"
                                    onPress={() => router.push(`/address/form?id=${item.id}`)}
                                >
                                    <Ionicons name="pencil-outline" size={20} color="#64748b" />
                                </Pressable>
                            </View>

                            <View className="ml-11">
                                <Text className="text-gray-700 text-sm font-medium mb-1">
                                    {item.first_name} {item.last_name}
                                </Text>
                                <Text className="text-gray-500 text-sm mb-2" numberOfLines={2}>
                                    {item.full_address}
                                </Text>
                                <Text className="text-gray-500 text-sm mb-1 font-semibold">
                                    {item.region?.name}, {item.subregion?.name} / {item.country?.name}
                                </Text>
                                <View className="flex-row items-center mt-1">
                                    <Ionicons name="call-outline" size={14} color="#64748b" />
                                    <Text className="text-gray-500 text-xs ml-1 tracking-wider">
                                        {item.phone_number}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}
