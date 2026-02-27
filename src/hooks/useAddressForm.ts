import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import { addressSchema, type AddressFormData } from '@/schemas/address';
import { useCreateAddressMutation, useGetAddressByIdQuery, useUpdateAddressMutation } from '@/services/addressApi';
import { useGetCountriesQuery, useGetRegionsQuery, useGetSubregionsQuery } from '@/services/worldApi';
import { formatPhoneNumberForApi, stripPhonePrefix } from '@/utils/phoneUtils';

export function useAddressForm(addressId?: string) {
    const router = useRouter();
    const isEditing = !!addressId;

    const { data: addressData, isLoading: isFetchingAddress } = useGetAddressByIdQuery(addressId as string, {
        skip: !isEditing
    });

    const [createAddress, { isLoading: isCreating }] = useCreateAddressMutation();
    const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();

    const { control, handleSubmit, reset, watch, setValue } = useForm<AddressFormData>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            title: '',
            first_name: '',
            last_name: '',
            country_id: 0,
            region_id: 0,
            subregion_id: 0,
            full_address: '',
            phone_number: ''
        }
    });

    const selectedCountryId = watch('country_id');
    const selectedRegionId = watch('region_id');

    const { data: countriesData } = useGetCountriesQuery({});
    const selectedCountry = countriesData?.results?.find((c) => c.id === selectedCountryId);

    const { data: regionsData, isFetching: isFetchingRegions } = useGetRegionsQuery(
        { countryName: selectedCountry?.name },
        { skip: !selectedCountry }
    );
    const selectedRegion = regionsData?.results?.find((r) => r.id === selectedRegionId);

    const { data: subregionsData, isFetching: isFetchingSubregions } = useGetSubregionsQuery(
        { regionName: selectedRegion?.name },
        { skip: !selectedRegion }
    );

    // 5. Edit Moduysa Formu Doldurma
    useEffect(() => {
        if (isEditing && addressData) {
            reset({
                title: addressData.title || '',
                first_name: addressData.first_name || '',
                last_name: addressData.last_name || '',
                country_id: addressData.country?.id || 0,
                region_id: addressData.region?.id || 0,
                subregion_id: addressData.subregion?.id || 0,
                full_address: addressData.full_address || '',
                phone_number: stripPhonePrefix(addressData.phone_number || '')
            });
        }
    }, [isEditing, addressData, reset]);

    // 6. Submit (Kaydet) İşlemi
    const onSubmit = async (data: AddressFormData) => {
        try {
            const formattedPhone = formatPhoneNumberForApi(data.phone_number);
            const payload = { ...data, phone_number: formattedPhone };

            if (isEditing) {
                await updateAddress({ id: addressId as string, data: payload }).unwrap();
                Toast.show({ type: 'success', text1: 'Başarılı', text2: 'Adres başarıyla güncellendi.' });
            } else {
                await createAddress(payload).unwrap();
                Toast.show({ type: 'success', text1: 'Başarılı', text2: 'Yeni adres başarıyla eklendi.' });
            }
            router.back();
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Hata', text2: 'Adres kaydedilirken bir sorun oluştu.' });
        }
    };

    return {
        isEditing,
        isFetchingAddress,
        isSubmitting: isCreating || isUpdating,
        control,
        handleSubmit,
        onSubmit,
        setValue,
        selectedCountryId,
        selectedRegionId,
        countriesData: countriesData?.results || [],
        regionsData: regionsData?.results || [],
        subregionsData: subregionsData?.results || [],
        isFetchingRegions,
        isFetchingSubregions
    };
}
