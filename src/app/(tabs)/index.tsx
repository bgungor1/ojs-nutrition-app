import { CategoryGrid, HeroBanner, HomeHeader, ProductGrid, PromoBanner, SearchBar } from '@/components/home';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <HomeHeader />
        <SearchBar
          editable={false}
          onPress={() => router.push('/(tabs)/explore')}
        />
        <PromoBanner />
        <CategoryGrid />
        <ProductGrid />
        <HeroBanner />
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
