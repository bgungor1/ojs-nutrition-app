import { AccountInput } from '@/components/account/AccountInput';
import { AddressSelect } from '@/components/address/AddressSelect';
import { useAddressForm } from '@/hooks/useAddressForm';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

interface CheckoutInlineAddressFormProps {
    onAddressCreated: (newAddressId: string) => void;
}

export function CheckoutInlineAddressForm({ onAddressCreated }: CheckoutInlineAddressFormProps) {
    const {
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
    } = useAddressForm(null as any);

    const PhonePrefix = () => (
        <View className="flex-row items-center">
            <Text className="text-xl mr-1">🇹🇷</Text>
            <Text className="text-gray-400 ml-1 font-medium">˅</Text>
            <Text className="text-black font-semibold ml-3">+90</Text>
        </View>
    );

    const handleInlineSubmit = async (data: any) => {
        try {
            await onSubmit(data);
            await onSubmit(data);
            onAddressCreated('temp-id');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View className="bg-gray-50 border border-gray-100 p-4 rounded-md mb-4 mt-2">

            <View className="mb-4 text-center">
                <Text className="text-sm font-bold text-black mb-1">Yeni Adres Bilgileri</Text>
                <Text className="text-xs text-gray-500">Bu adres bilgileri hesabınıza kaydedilecektir.</Text>
            </View>

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

            <Pressable
                onPress={handleSubmit(handleInlineSubmit)}
                disabled={isSubmitting}
                className={`bg-indigo-900 mt-2 p-4 rounded-xl items-center justify-center flex-row ${isSubmitting ? 'opacity-80' : ''}`}
            >
                {isSubmitting && <ActivityIndicator color="#fff" size="small" className="mr-2" />}
                <Text className="text-white font-bold text-sm">Adresi Kaydet & Seç</Text>
            </Pressable>

        </View>
    );
}
