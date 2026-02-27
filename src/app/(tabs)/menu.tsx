import { MenuItem } from '@/components/menu/MenuItem';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MenuScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <ScrollView
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
            >
                <View className="mb-6">
                    <Text className="text-4xl font-extrabold text-black tracking-tight">Menü</Text>
                </View>

                <MenuItem
                    iconName="person-outline"
                    title="Hesap Bilgilerim"
                    onPress={() => console.log('Hesap Bilgilerim')}
                />
                <MenuItem
                    iconName="cube-outline"
                    title="Siparişlerim"
                    onPress={() => console.log('Siparişlerim')}
                />
                <MenuItem
                    iconName="location-outline"
                    title="Adresim"
                    onPress={() => console.log('Adresim')}
                />
                <MenuItem
                    iconName="information-circle-outline"
                    title="Hakkımızda"
                    onPress={() => router.push('/about' as any)}
                />
                <MenuItem
                    iconName="headset-outline"
                    title="Bize Ulaşın"
                    onPress={() => console.log('Bize Ulaşın')}
                />
                <MenuItem
                    iconName="help-outline"
                    title="S.S.S."
                    onPress={() => router.push('/faq' as any)}
                    hideBorder
                />
            </ScrollView>
        </SafeAreaView>
    );
}
