import { AboutCertificates, AboutContent, AboutHeader } from '@/components/about';
import { ReviewList, ReviewOverview } from '@/components/product';
import { aboutPageDistribution, aboutPageReviews } from '@/data/mockReviews';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <Stack.Screen options={{ headerShown: false }} />

            <AboutHeader />

            <ScrollView
                className="flex-1 bg-white"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60 }}
            >
                <AboutContent />

                <AboutCertificates />

                <View className="mt-2 bg-white">
                    <ReviewOverview
                        averageRating={4.8}
                        totalReviews={10853}
                        distribution={aboutPageDistribution}
                    />

                    <ReviewList reviews={aboutPageReviews} />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
