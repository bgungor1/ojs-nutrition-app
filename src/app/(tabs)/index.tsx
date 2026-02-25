import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CategoryGrid from '@/components/home/CategoryGrid';
import HeroBanner from '@/components/home/HeroBanner';
import HomeHeader from '@/components/home/HomeHeader';
import ProductGrid from '@/components/home/ProductGrid';
import PromoBanner from '@/components/home/PromoBanner';
import SearchBar from '@/components/home/SearchBar';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >

        <HomeHeader />

        <SearchBar />

        <PromoBanner />

        <CategoryGrid />

        <ProductGrid />

        <HeroBanner />

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
