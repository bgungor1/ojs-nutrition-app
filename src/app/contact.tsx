import { ContactForm, ContactHeader } from '@/components/contact';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContactScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <Stack.Screen options={{ headerShown: false }} />

            <ContactHeader />

            <ScrollView
                className="flex-1 bg-white"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 60 }}
            >
                <ContactForm />
            </ScrollView>
        </SafeAreaView>
    );
}
