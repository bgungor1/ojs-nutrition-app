import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
    value?: string
    onChangeText?: (text: string) => void
    onFocus?: () => void
    onPress?: () => void
    onClear?: () => void
    onCancel?: () => void
    editable?: boolean
    autoFocus?: boolean
    showCancel?: boolean
    placeholder?: string
}

const SearchBar = ({
    value = '',
    onChangeText,
    onFocus,
    onPress,
    onClear,
    onCancel,
    editable = true,
    autoFocus = false,
    showCancel = false,
    placeholder = 'Aradığınız ürünü yazınız...',
}: SearchBarProps) => {

    const showClearButton = value.length > 0

    return (
        <View className="flex-row items-center px-4 py-2">

            <TouchableOpacity
                activeOpacity={editable ? 1 : 0.8}
                onPress={onPress}
                className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-4"
                disabled={editable}
            >
                <MaterialIcons name="search" size={20} color="#9ca3af" />

                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    placeholderTextColor="#9ca3af"
                    editable={editable}
                    autoFocus={autoFocus}
                    className="flex-1 ml-2 text-sm text-gray-700 py-2.5"
                    returnKeyType="search"
                />
                {showClearButton && (
                    <TouchableOpacity onPress={onClear} hitSlop={8}>
                        <MaterialIcons name="close" size={18} color="#9ca3af" />
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
            {showCancel && (
                <TouchableOpacity onPress={onCancel} className="ml-3">
                    <Text className="text-blue-500 text-sm font-semibold">Vazgeç</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default SearchBar;
