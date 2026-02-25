import SearchBar from '@/components/home/SearchBar';
import { useProductSearch } from '@/hooks/useProductSearch';
import type { ApiProduct } from '@/types/api';
import { getImageUrl } from '@/utils/imageUrl';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchResultItem = React.memo(({
  product,
  onPress,
}: {
  product: ApiProduct
  onPress: () => void
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className="flex-row items-center px-4 py-3 border-b border-gray-100"
  >
    <Image
      source={{ uri: getImageUrl(product.photo_src) }}
      style={{ width: 80, height: 80 }}
      contentFit="contain"
      className="rounded-lg bg-gray-50"
      transition={200}
    />

    <View className="flex-1 ml-3">
      <Text className="text-sm font-bold text-gray-800" numberOfLines={2}>
        {product.name}
      </Text>
      <Text className="text-sm text-gray-600 mt-1">
        {product.price_info.total_price} TL
      </Text>
      <Text className="text-xs text-gray-400 mt-0.5" numberOfLines={1}>
        {product.short_explanation}
      </Text>
    </View>

    <Text className="text-gray-300 text-lg ml-2">›</Text>
  </TouchableOpacity>
));

export default function ExploreScreen() {
  const router = useRouter();

  const {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    isLoading,
    hasSearched,
  } = useProductSearch();

  const renderEmptyState = () => {
    if (isLoading) {
      return (
        <View className="items-center justify-center py-20">
          <ActivityIndicator size="large" color="#10b981" />
        </View>
      );
    }

    if (hasSearched) {
      return (
        <View className="items-center justify-center py-20">
          <Text className="text-gray-400 text-base">
            Aradığınız ürün bulunamadı.
          </Text>
        </View>
      );
    }

    return (
      <View className="items-center justify-center py-20">
        <Text className="text-gray-400 text-base">
          Ürün aramak için yazmaya başlayın...
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoFocus={true}
        showCancel={true}
        onClear={() => setSearchQuery('')}
        onCancel={() => router.back()}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SearchResultItem
            product={item}
            onPress={() => {
              // router.push(`/product/${item.slug}`)
            }}
          />
        )}
        ListEmptyComponent={renderEmptyState}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
