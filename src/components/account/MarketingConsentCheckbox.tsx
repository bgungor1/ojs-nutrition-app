import React from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

interface MarketingConsentProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
}

export function MarketingConsentCheckbox<T extends FieldValues>({ name, control }: MarketingConsentProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <Pressable
                    onPress={() => onChange(!value)}
                    className="flex-row items-start mt-4 mb-8"
                >
                    <View className={`w-5 h-5 border mr-3 mt-1 rounded-sm items-center justify-center ${value ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'
                        }`}>
                        {value && <Text className="text-blue-600 text-xs font-bold leading-none">✓</Text>}
                    </View>
                    <Text className="flex-1 text-xs text-gray-500 leading-5">
                        Kampanyalardan haberdar olmak için{' '}
                        <Text className="text-black font-extrabold underline">Ticari Elektronik İleti Onayı</Text> metnini okudum,
                        onaylıyorum. Tarafınızdan gönderilecek ticari elektronik iletileri almak istiyorum.
                    </Text>
                </Pressable>
            )}
        />
    );
}
