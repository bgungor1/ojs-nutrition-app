import { CheckoutFormValues } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Control, Controller, Path } from 'react-hook-form';
import { Pressable, Text, TextInput, View } from 'react-native';

interface CheckoutPaymentStepProps {
    control: Control<CheckoutFormValues>;
    isActive?: boolean;
    errors?: any;
    watchPaymentMethod: string;
}
export function CheckoutPaymentStep({
    control,
    isActive = false,
    errors,
    watchPaymentMethod
}: CheckoutPaymentStepProps) {

    const renderInput = (
        name: Path<CheckoutFormValues>,
        placeholder: string,
        keyboardType: any = 'default',
        maxLength?: number
    ) => (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <View className="mb-4">
                    <TextInput
                        className={`w-full border rounded-md py-3 px-4 bg-white text-sm text-black ${errors[name] ? 'border-red-400' : 'border-gray-200'
                            }`}
                        placeholder={placeholder}
                        placeholderTextColor="#a1a1aa"
                        keyboardType={keyboardType}
                        maxLength={maxLength}
                        value={value as string}
                        onChangeText={onChange}
                    />
                    {errors[name] && (
                        <Text className="text-red-500 text-xs mt-1 ml-1 font-medium">
                            {(errors[name] as any).message}
                        </Text>
                    )}
                </View>
            )}
        />
    );
    return (
        <View className={`mb-8 ${!isActive ? 'opacity-50' : ''}`}>
            <View className="flex-row items-center border-b border-gray-100 pb-3 mb-4">
                <View className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${isActive ? 'bg-black' : 'bg-gray-300'}`}>
                    <Text className="text-white text-xs font-bold">3</Text>
                </View>
                <Text className="text-[17px] font-extrabold text-black">Ödeme</Text>
            </View>
            {isActive && (
                <View>
                    <View className={`border rounded-lg p-4 mb-4 ${watchPaymentMethod === 'credit_card' ? 'border-indigo-900 bg-indigo-50' : 'border-gray-200 bg-white'}`}>
                        <Controller
                            control={control}
                            name={'paymentMethod' as Path<CheckoutFormValues>}
                            render={({ field: { onChange } }) => (
                                <Pressable
                                    className="flex-row items-center mb-4"
                                    onPress={() => onChange('credit_card')}
                                >
                                    <View className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${watchPaymentMethod === 'credit_card' ? 'border-indigo-900 bg-white' : 'border-gray-300'
                                        }`}>
                                        {watchPaymentMethod === 'credit_card' && <View className="w-2.5 h-2.5 rounded-full bg-indigo-900" />}
                                    </View>
                                    <Text className={`text-[14px] ${watchPaymentMethod === 'credit_card' ? 'font-bold text-indigo-900' : 'text-gray-800'}`}>
                                        Kredi Kartı
                                    </Text>
                                </Pressable>
                            )}
                        />
                        {watchPaymentMethod === 'credit_card' && (
                            <View className="mt-1">
                                {renderInput('cardNumber', 'Kart Numarası', 'number-pad', 16)}

                                <View className="flex-row justify-between">
                                    <View className="flex-1 mr-2">
                                        {renderInput('cardExpiry', 'Ay / Yıl', 'number-pad', 5)}
                                    </View>
                                    <View className="flex-1 ml-2 relative">
                                        {renderInput('cardCvc', 'CVC', 'number-pad', 3)}
                                        <Ionicons name="help-circle" size={18} color="#a1a1aa" className="absolute right-3 top-3.5" />
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                    <View className={`border rounded-lg p-4 mb-6 ${watchPaymentMethod === 'cash_on_delivery' ? 'border-indigo-900 bg-indigo-50' : 'border-gray-200 bg-white'}`}>
                        <Controller
                            control={control}
                            name={'paymentMethod' as Path<CheckoutFormValues>}
                            render={({ field: { onChange } }) => (
                                <Pressable
                                    className="flex-row justify-between items-center"
                                    onPress={() => onChange('cash_on_delivery')}
                                >
                                    <View className="flex-row items-center">
                                        <View className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${watchPaymentMethod === 'cash_on_delivery' ? 'border-indigo-900 bg-white' : 'border-gray-300'
                                            }`}>
                                            {watchPaymentMethod === 'cash_on_delivery' && <View className="w-2.5 h-2.5 rounded-full bg-indigo-900" />}
                                        </View>
                                        <Text className={`text-[14px] ${watchPaymentMethod === 'cash_on_delivery' ? 'font-bold text-indigo-900' : 'text-gray-800'}`}>
                                            Kapıda Ödeme (Nakit)
                                        </Text>
                                    </View>
                                    <Text className={`text-[13px] font-bold ${watchPaymentMethod === 'cash_on_delivery' ? 'text-indigo-900' : 'text-black'}`}>39 TL İşlem Bedeli</Text>
                                </Pressable>
                            )}
                        />
                    </View>
                    <Controller
                        control={control}
                        name={'isSameBillingAddress' as Path<CheckoutFormValues>}
                        render={({ field: { onChange, value } }) => (
                            <Pressable className="flex-row items-center mb-4" onPress={() => onChange(!value)}>
                                <View className={`w-5 h-5 rounded mr-3 items-center justify-center border-2 ${value ? 'bg-black border-black' : 'border-gray-400 bg-white'}`}>
                                    {value && <Ionicons name="checkmark" size={14} color="#fff" />}
                                </View>
                                <Text className="text-[13px] text-gray-600">Fatura adresim teslimat adresimle aynı</Text>
                            </Pressable>
                        )}
                    />

                    <Controller
                        control={control}
                        name={'isPrivacyPolicyAccepted' as Path<CheckoutFormValues>}
                        render={({ field: { onChange, value } }) => (
                            <View className="mb-2">
                                <Pressable className="flex-row items-start" onPress={() => onChange(!value)}>
                                    <View className={`w-5 h-5 rounded mr-3 mt-0.5 items-center justify-center border-2 ${value ? 'bg-black border-black' : 'border-gray-400 bg-white'}`}>
                                        {value && <Ionicons name="checkmark" size={14} color="#fff" />}
                                    </View>
                                    <Text className="text-[13px] text-gray-600 flex-1 leading-5">
                                        <Text className="font-bold text-black">Gizlilik Sözleşmesini</Text> ve{' '}
                                        <Text className="font-bold text-black">Satış Sözleşmesini</Text> okudum, onaylıyorum.
                                    </Text>
                                </Pressable>
                                {errors.isPrivacyPolicyAccepted && (
                                    <Text className="text-red-500 text-xs mt-1 ml-8 font-medium">
                                        {errors.isPrivacyPolicyAccepted.message}
                                    </Text>
                                )}
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
}