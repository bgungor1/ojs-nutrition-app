import { ShipmentFee } from '@/types';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface CheckoutShippingStepProps {
    shipments: ShipmentFee[];
    selectedShippingId?: string;
    onSelectShipping: (id: string) => void;
    error?: string;
    isActive?: boolean;
}

export function CheckoutShippingStep({
    shipments = [],
    selectedShippingId,
    onSelectShipping,
    error,
    isActive = false
}: CheckoutShippingStepProps) {

    return (
        <View className={`mb-6 ${!isActive ? 'opacity-50' : ''}`}>
            <View className="flex-row items-center border-b border-gray-100 pb-3 mb-4">
                <View className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${isActive ? 'bg-black' : 'bg-gray-300'}`}>
                    <Text className="text-white text-xs font-bold">2</Text>
                </View>
                <Text className="text-[17px] font-extrabold text-black">Kargo</Text>
            </View>

            {isActive && (
                <View className="bg-white">
                    {!shipments || shipments.length === 0 ? (
                        <View className="mb-3 px-1">
                            <Text className="text-sm font-medium text-gray-500 mb-1">Kargo bilgisi bekleniyor...</Text>
                        </View>
                    ) : (
                        shipments.map((ship, index) => {
                            const shipId = (ship as any).id || `shipping-${index}`;
                            const isSelected = selectedShippingId === shipId;
                            const currentFee = (ship as any)?.data?.fee !== undefined ? (ship as any).data.fee : ship.fee;
                            const currentCurrency = (ship as any)?.data?.currency || ship.currency || 'TL';

                            return (
                                <Pressable
                                    key={shipId}
                                    className={`flex-row items-center border p-3 rounded-lg mb-3 last:mb-0 ${isSelected ? 'bg-indigo-50 border-indigo-900' : 'bg-gray-50 border-transparent'
                                        }`}
                                    onPress={() => onSelectShipping(shipId)}
                                >
                                    <View className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${isSelected ? 'border-indigo-900 bg-white' : 'border-gray-300'
                                        }`}>
                                        {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-indigo-900" />}
                                    </View>
                                    <View className="flex-row justify-between items-center flex-1">
                                        <Text className={`text-[14px] ${isSelected ? 'font-bold text-indigo-900' : 'text-gray-800'}`}>
                                            Kargo (Standart Gönderim vb.)
                                        </Text>
                                        <Text className={`text-[14px] font-bold ${currentFee === 0 ? 'text-[#73e04e]' : 'text-black'}`}>
                                            {currentFee === 0 ? 'Ücretsiz' : `${currentFee} ${currentCurrency}`}
                                        </Text>
                                    </View>
                                </Pressable>
                            );
                        })
                    )}
                </View>
            )}

            {error && isActive && (
                <Text className="text-red-500 text-xs mt-2 font-medium ml-1">
                    {error}
                </Text>
            )}
        </View>
    );
}
