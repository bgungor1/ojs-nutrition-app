import { CheckoutInlineAddressForm } from '@/components/checkout/CheckoutInlineAddressForm';
import { Address } from '@/types/address';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface CheckoutAddressStepProps {
    addresses?: Address[];
    selectedAddressId?: string;
    onSelectAddress: (id: string) => void;
    error?: string;
}

export function CheckoutAddressStep({
    addresses = [],
    selectedAddressId,
    onSelectAddress,
    error
}: CheckoutAddressStepProps) {

    return (
        <View className="mb-6">
            <View className="flex-row items-center border-b border-gray-100 pb-3 mb-4">
                <View className="w-6 h-6 rounded-full bg-black items-center justify-center mr-3">
                    <Text className="text-white text-xs font-bold">1</Text>
                </View>
                <Text className="text-[17px] font-extrabold text-black">Adres</Text>
            </View>

            <Text className="text-[14px] text-gray-800 font-medium mb-3">Teslimat Adresi</Text>

            <View className="border border-indigo-900 rounded-lg p-4 bg-white">

                <Pressable
                    className={`flex-row items-center mb-4 p-3 rounded-lg border ${selectedAddressId === 'new' ? 'bg-indigo-50 border-indigo-900' : 'bg-white border-transparent'
                        }`}
                    onPress={() => onSelectAddress('new')}
                >
                    <View className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${selectedAddressId === 'new' ? 'border-indigo-900 bg-white' : 'border-gray-300'
                        }`}>
                        {selectedAddressId === 'new' && <View className="w-2.5 h-2.5 rounded-full bg-indigo-900" />}
                    </View>
                    <Text className={`text-[14px] ${selectedAddressId === 'new' ? 'font-bold text-indigo-900' : 'text-gray-700'}`}>
                        Yeni Adres Ekle
                    </Text>
                </Pressable>

                {selectedAddressId === 'new' && (
                    <CheckoutInlineAddressForm
                        onAddressCreated={(newAddressId) => {
                            onSelectAddress(newAddressId);
                        }}
                    />
                )}

                {addresses.map((address) => {
                    const isSelected = selectedAddressId === address.id;

                    return (
                        <Pressable
                            key={address.id}
                            className={`flex-row items-start mb-3 p-3 rounded-lg border ${isSelected ? 'bg-indigo-50 border-indigo-900' : 'bg-gray-50 border-transparent'
                                }`}
                            onPress={() => onSelectAddress(address.id)}
                        >
                            <View className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 mt-1 ${isSelected ? 'border-indigo-900 bg-white' : 'border-gray-300'
                                }`}>
                                {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-indigo-900" />}
                            </View>
                            <View className="flex-1">
                                <Text className={`text-[14px] ${isSelected ? 'font-bold text-indigo-900' : 'text-gray-800'}`}>
                                    {address.title || 'Hesap Adresi'}
                                </Text>
                                <Text className="text-[13px] text-gray-500 mt-0.5 leading-5">
                                    {address.first_name} {address.last_name}
                                    {'\n'}{address.full_address}
                                </Text>
                            </View>
                        </Pressable>
                    );
                })}

            </View>

            {error && (
                <Text className="text-red-500 text-xs mt-2 font-medium ml-1">
                    {error}
                </Text>
            )}

        </View>
    );
}
