import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

const SearchBar = () => {
    return (
        <TouchableOpacity activeOpacity={0.8} className="px-4 py-2">
            <View className="flex-row items-center bg-gray-100 rounded-xl px-4 ">
                <MaterialIcons name="search" size={20} color="#9ca3af" />
                <TextInput
                    placeholder="Aradığınız Ürünü yazınız..."
                    placeholderTextColor="#9ca3af"
                    editable={false}
                    className="flex-1 ml-2 text-sm text-gray-700"
                />
            </View>
        </TouchableOpacity>
    );
};

export default SearchBar;
