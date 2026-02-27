import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

export interface SelectOption {
    id: number;
    name: string;
}

interface AddressSelectProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    label: string;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    onValueChange?: (value: number) => void;
}

export function AddressSelect<T extends FieldValues>({
    name,
    control,
    label,
    options,
    placeholder = 'Seçiniz',
    disabled = false,
    onValueChange
}: AddressSelectProps<T>) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['50%', '90%'], []);

    const handlePresentModalPress = useCallback(() => {
        if (!disabled) {
            bottomSheetModalRef.current?.present();
        }
    }, [disabled]);

    const handleCloseModalPress = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
                opacity={0.5}
            />
        ),
        []
    );

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                const selectedOption = options.find((opt) => opt.id === value);

                return (
                    <View className="mb-4">
                        <Text className="text-sm text-gray-800 font-semibold mb-1.5 ml-1">
                            {label}
                        </Text>

                        <Pressable
                            onPress={handlePresentModalPress}
                            className={`w-full flex-row justify-between items-center border rounded-md py-3 px-4 bg-[#fafafa] ${error ? 'border-red-400' : 'border-gray-200'
                                } ${disabled ? 'opacity-60' : ''}`}
                        >
                            <Text
                                className={`text-sm font-medium ${selectedOption ? 'text-black' : 'text-[#a1a1aa]'}`}
                            >
                                {selectedOption ? selectedOption.name : placeholder}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#a1a1aa" />
                        </Pressable>

                        {error && (
                            <Text className="text-red-500 text-xs mt-1 ml-1 font-medium">
                                {error.message}
                            </Text>
                        )}

                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            index={0}
                            snapPoints={snapPoints}
                            backdropComponent={renderBackdrop}
                            enablePanDownToClose={true}
                        >
                            <View className="flex-row justify-between items-center px-5 py-4 border-b border-gray-100">
                                <Text className="text-lg font-bold text-black">{label} Seç</Text>
                                <Pressable onPress={handleCloseModalPress}>
                                    <Ionicons name="close" size={24} color="#a1a1aa" />
                                </Pressable>
                            </View>

                            {options.length === 0 ? (
                                <Text className="text-gray-500 text-center mt-5 font-medium">Seçenek bulunamadı.</Text>
                            ) : (
                                <BottomSheetFlatList
                                    data={options}
                                    keyExtractor={(item: any) => item.id.toString()}
                                    contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                                    renderItem={({ item }: { item: any }) => (
                                        <Pressable
                                            className={`py-4 border-b border-gray-100 flex-row justify-between items-center ${value === item.id ? 'bg-gray-50 px-3 rounded-xl border-b-0' : 'px-1'
                                                }`}
                                            onPress={() => {
                                                onChange(item.id);
                                                if (onValueChange) {
                                                    onValueChange(item.id);
                                                }
                                                handleCloseModalPress();
                                            }}
                                        >
                                            <Text className={`text-base ${value === item.id ? 'font-bold text-black' : 'text-gray-700'}`}>
                                                {item.name}
                                            </Text>
                                            {value === item.id && (
                                                <Ionicons name="checkmark-circle" size={20} color="#000" />
                                            )}
                                        </Pressable>
                                    )}
                                    showsVerticalScrollIndicator={false}
                                />
                            )}
                        </BottomSheetModal>
                    </View>
                );
            }}
        />
    );
}
