import { OjsLogo } from '@/components/icons';
import { selectTotalItems } from '@/store/cartSlice';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const HomeHeader = () => {
    const totalItems = useSelector(selectTotalItems);
    const router = useRouter();

    return (
        <View className="flex-row items-center justify-between px-4 py-3 shadow-xl bg-white" style={{ elevation: 4 }}>
            <OjsLogo width={120} height={28} />

            <TouchableOpacity
                className="relative"
                onPress={() => router.push('/cart' as any)}
            >
                <MaterialIcons name="shopping-cart" size={26} color="#1a1a2e" />
                {totalItems > 0 && (
                    <View className="absolute -top-1.5 -right-2 bg-red-600 rounded-full w-5 h-5 items-center justify-center">
                        <Text className="text-white text-[10px] font-bold">
                            {totalItems > 99 ? '99+' : totalItems}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default HomeHeader;
