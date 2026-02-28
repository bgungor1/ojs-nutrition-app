import { AccountInput, MarketingConsentCheckbox } from '@/components/account';
import { useGetMyAccountQuery, useUpdateProfileMutation } from '@/services';
import { accountSchema, type AccountFormData } from '@/schemas/account';
import { formatPhoneNumberForApi, stripPhonePrefix } from '@/utils/phoneUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export function AccountForm() {
    const { data: userData, isLoading: isFetching } = useGetMyAccountQuery();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

    const { control, handleSubmit, reset } = useForm<AccountFormData>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            marketingConsent: false
        }
    });
    useEffect(() => {
        if (userData?.data) {
            reset({
                firstName: userData.data.first_name || '',
                lastName: userData.data.last_name || '',
                email: userData.data.email || '',
                phoneNumber: stripPhonePrefix(userData.data.phone_number || ''),
                marketingConsent: false
            });
        }
    }, [userData, reset]);

    const onSubmit = async (formData: AccountFormData) => {
        try {
            const formattedPhone = formatPhoneNumberForApi(formData.phoneNumber);

            await updateProfile({
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone_number: formattedPhone
            }).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Başarılı',
                text2: 'Hesap bilgileriniz güncellendi.',
            });
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Hata Değişiklikler Kaydedilemedi',
                text2: 'Lütfen bilgilerinizi kontrol edip tekrar deneyin.',
            });
        }
    };

    if (isFetching) {
        return (
            <View className="flex-1 justify-center items-center py-20 bg-white">
                <ActivityIndicator size="large" color="#000" />
                <Text className="mt-4 text-gray-500">Bilgileriniz yükleniyor...</Text>
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
        <View className="px-5 py-6 bg-white">
            <View className="flex-row justify-between mb-2">
                <View className="flex-1 mr-2">
                    <AccountInput
                        control={control}
                        name="firstName"
                        label="*Ad"
                    />
                </View>
                <View className="flex-1 ml-2">
                    <AccountInput
                        control={control}
                        name="lastName"
                        label="*Soyad"
                    />
                </View>
            </View>

            <AccountInput
                control={control}
                name="phoneNumber"
                label="Telefon"
                keyboardType="phone-pad"
                leftComponent={<PhonePrefix />}
                regexPattern={/[^0-9]/g}
            />

            <AccountInput
                control={control}
                name="email"
                label="*Email"
                editable={false}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <MarketingConsentCheckbox
                control={control}
                name="marketingConsent"
            />

            <View className="items-end">
                <Pressable
                    onPress={handleSubmit(onSubmit)}
                    disabled={isUpdating}
                    className={`bg-black px-10 py-[14px] rounded-md flex-row justify-center items-center ${isUpdating ? 'opacity-80' : ''
                        }`}
                >
                    {isUpdating ? (
                        <ActivityIndicator color="#fff" size="small" className="mr-2" />
                    ) : null}
                    <Text className="text-white font-bold text-base">Kaydet</Text>
                </Pressable>
            </View>
        </View>
    );
}