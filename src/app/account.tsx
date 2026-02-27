import { AccountForm } from '@/components/account/AccountForm';
import { AccountHeader } from '@/components/account/AccountHeader';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <Stack.Screen options={{ headerShown: false }} />

            <AccountHeader />

            <ScrollView
                className="flex-1 bg-white"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 60 }}
            >
                <AccountForm />
            </ScrollView>
        </SafeAreaView>
    );
}
