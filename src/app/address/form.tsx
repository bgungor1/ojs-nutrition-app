import { AccountInput } from '@/components/account/AccountInput';
import { AddressHeader } from '@/components/address/AddressHeader';
import { AddressSelect } from '@/components/address/AddressSelect';
import { useAddressForm } from '@/hooks/useAddressForm';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddressFormScreen() {
    const { id } = useLocalSearchParams();

    const {
        isEditing,
        isFetchingAddress,
        isSubmitting,
        control,
        handleSubmit,
        onSubmit,
        setValue,
        selectedCountryId,
        selectedRegionId,
        countriesData,
        regionsData,
        subregionsData,
        isFetchingRegions,
        isFetchingSubregions
    } = useAddressForm(id as string);

    if (isEditing && isFetchingAddress) {
        return (
            <View className="flex-1 bg-white justify-center items-center">
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    const PhonePrefix = () => (
        <View className="flex-row items-center">
            <Text className="text-xl mr-1">🇹🇷</Text>
            <Text className="text-gray-400 ml-1 font-medium">˅</Text>
            <Text className="text-black font-semibold ml-3">+90</Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <Stack.Screen options={{ headerShown: false }} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <AddressHeader title={isEditing ? 'Adres Düzenle' : 'Adres Oluştur'} />

                <ScrollView
                    className="flex-1 px-5 py-4"
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {!isEditing && (
                        <View className="bg-blue-50 border border-blue-100 p-4 rounded-md mb-6">
                            <Text className="text-blue-800 text-sm">
                                Kayıtlı bir adresiniz yok veya yeni bir tane ekliyorsunuz.
                                Lütfen aşağıdaki kısımdan adres oluşturunuz.
                            </Text>
                        </View>
                    )}

                    <AccountInput control={control} name="title" label="*Adres Başlığı" placeholder="ev, iş vb..." />

                    <View className="flex-row justify-between mb-0">
                        <View className="flex-1 mr-2">
                            <AccountInput control={control} name="first_name" label="*Ad" />
                        </View>
                        <View className="flex-1 ml-2">
                            <AccountInput control={control} name="last_name" label="*Soyad" />
                        </View>
                    </View>

                    <AddressSelect
                        control={control}
                        name="country_id"
                        label="*Ülke"
                        options={countriesData}
                        placeholder="Ülke Seçiniz"
                        onValueChange={() => {
                            setValue('region_id', 0);
                            setValue('subregion_id', 0);
                        }}
                    />

                    <AddressSelect
                        control={control}
                        name="region_id"
                        label={isFetchingRegions ? '*Şehir Yükleniyor...' : '*Şehir'}
                        options={regionsData}
                        placeholder="Şehir Seçiniz"
                        disabled={!selectedCountryId || isFetchingRegions}
                        onValueChange={() => {
                            setValue('subregion_id', 0);
                        }}
                    />

                    <AddressSelect
                        control={control}
                        name="subregion_id"
                        label={isFetchingSubregions ? '*İlçe Yükleniyor...' : '*İlçe'}
                        options={subregionsData}
                        placeholder="İlçe Seçiniz"
                        disabled={!selectedRegionId || isFetchingSubregions}
                    />

                    <AccountInput
                        control={control}
                        name="full_address"
                        label="*Açık Adres"
                        placeholder="Mahalle, sokak, no..."
                        multiline
                    />

                    <AccountInput
                        control={control}
                        name="phone_number"
                        label="*Telefon"
                        keyboardType="phone-pad"
                        leftComponent={<PhonePrefix />}
                        regexPattern={/[^0-9]/g}
                    />

                    <View className="items-end mt-4 mb-10">
                        <Pressable
                            onPress={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            className={`bg-black px-10 py-[14px] rounded-md flex-row justify-center items-center ${isSubmitting ? 'opacity-80' : ''
                                }`}
                        >
                            {isSubmitting && (
                                <ActivityIndicator color="#fff" size="small" className="mr-2" />
                            )}
                            <Text className="text-white font-bold text-base">Kaydet</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
