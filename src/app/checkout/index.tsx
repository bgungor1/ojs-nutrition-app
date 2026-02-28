import { CheckoutAddressStep } from '@/components/checkout/CheckoutAddressStep';
import { CheckoutPaymentStep } from '@/components/checkout/CheckoutPaymentStep';
import { CheckoutShippingStep } from '@/components/checkout/CheckoutShippingStep';
import { CheckoutSummaryDropdown } from '@/components/checkout/CheckoutSummaryDropdown';
import { useCheckoutFlow } from '@/hooks/useCheckoutFlow';
import { useGetAddressesQuery } from '@/services/addressApi';
import { useGetShipmentFeeQuery } from '@/services/orderApi';
import { selectCartItems, selectTotalItems, selectTotalPrice } from '@/store/cartSlice';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export default function CheckoutScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const totalPrice = useSelector(selectTotalPrice);
    const totalItems = useSelector(selectTotalItems);
    const cartItems = useSelector(selectCartItems);

    const { data: addressData } = useGetAddressesQuery();
    const { data: shipmentData } = useGetShipmentFeeQuery();
    const shipmentsList = shipmentData && (shipmentData as any).fee !== undefined
        ? [shipmentData]
        : [{ fee: 39.90, currency: 'TL' }];
    const { methods, onSubmit, isCompleting } = useCheckoutFlow();
    const { control, handleSubmit, watch, setValue, formState: { errors } } = methods;

    const watchAddressId = watch('addressId');
    const watchShippingId = watch('shippingId');
    const watchPaymentMethod = watch('paymentMethod');
    const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

    const handleFormSubmit = handleSubmit((data: any) => {
        onSubmit(data);
    });

    return (
        <View className="flex-1 bg-white">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row items-center px-5 py-4 border-b border-gray-100 bg-white shadow-sm z-10 relative">
                <Pressable onPress={() => router.back()} className="absolute left-5 p-2 z-20">
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </Pressable>
                <Text className="flex-1 text-center text-lg font-bold text-black" numberOfLines={1}>
                    Siparişi Tamamla
                </Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
            >
                <ScrollView
                    className="flex-1 bg-white"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    <CheckoutSummaryDropdown totalPrice={totalPrice} totalItems={totalItems}>
                        {cartItems.map((item) => (
                            <View key={item.id} className="flex-row justify-between items-center mb-2">
                                <Text className="text-gray-600 flex-1" numberOfLines={1}>
                                    {item.quantity}x {item.name}
                                </Text>
                                <Text className="text-black font-bold ml-4">
                                    {(item.price * item.quantity).toLocaleString('tr-TR')} TL
                                </Text>
                            </View>
                        ))}
                    </CheckoutSummaryDropdown>
                    <View className="p-5">
                        <CheckoutAddressStep
                            addresses={addressData?.results || []}
                            selectedAddressId={watchAddressId}
                            onSelectAddress={(id) => {
                                setValue('addressId', id, { shouldValidate: true });
                                setActiveStep(2);
                            }}
                            error={errors.addressId?.message}
                        />

                        <CheckoutShippingStep
                            shipments={shipmentsList as any}
                            selectedShippingId={watchShippingId}
                            isActive={activeStep >= 2 || !!watchAddressId}
                            onSelectShipping={(id) => {
                                setValue('shippingId', id, { shouldValidate: true });
                                setActiveStep(3);
                            }}
                            error={errors.shippingId?.message}
                        />

                        <CheckoutPaymentStep
                            control={control as any}
                            isActive={activeStep >= 3 || !!watchShippingId}
                            errors={errors}
                            watchPaymentMethod={watchPaymentMethod}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View className="bg-white border-t border-gray-100 p-5 pb-8 shadow-md" style={{ paddingBottom: insets.bottom + 10 }}>
                <Pressable
                    onPress={handleFormSubmit}
                    disabled={isCompleting}
                    className={`bg-black py-4 rounded-xl items-center justify-center w-full flex-row ${isCompleting ? 'opacity-80' : ''}`}
                >
                    {isCompleting && <Text className="text-white mr-2">⏳</Text>}
                    <Text className="text-white font-bold text-lg">
                        {isCompleting ? 'İşleniyor...' : 'Siparişi Tamamla'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
