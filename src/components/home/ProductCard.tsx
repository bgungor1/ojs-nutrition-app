import DiscountBadge from '@/components/common/DiscountBadge';
import StarRating from '@/components/common/StarRating';
import type { ApiBestSellerProduct } from '@/types/api';
import { getImageUrl } from '@/utils/imageUrl';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
    product: ApiBestSellerProduct;
    onPress?: () => void;
}

const ProductCard = ({ product, onPress }: ProductCardProps) => {
    const hasDiscount = product.price_info.discount_percentage !== null && product.price_info.discount_percentage > 0;
    const displayPrice = product.price_info.discounted_price ?? product.price_info.total_price;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            className="flex-1 bg-white rounded-xl overflow-hidden mx-1.5 mb-3 shadow-sm"
            style={{ elevation: 2 }}
        >
            <View className="relative">
                {hasDiscount && (
                    <DiscountBadge percentage={product.price_info.discount_percentage!} />
                )}
                <Image
                    source={{ uri: getImageUrl(product.photo_src) }}
                    style={{ width: '100%', height: 140 }}
                    contentFit="contain"
                    className="bg-gray-50"
                    transition={300}
                />
            </View>
            <View className="px-2.5 py-2">
                <Text className="text-xs font-bold text-gray-800" numberOfLines={2}>
                    {product.name}
                </Text>
                <Text className="text-[10px] text-gray-500 mt-0.5" numberOfLines={1}>
                    {product.short_explanation}
                </Text>

                <View className="flex-row items-center mt-1.5">
                    <StarRating rating={product.average_star} size="sm" />
                    <Text className="text-[10px] text-gray-400 ml-1">
                        {product.comment_count} Yorum
                    </Text>
                </View>
                <View className="flex-row items-center mt-1.5">
                    <Text className="text-sm font-bold text-gray-900">
                        {displayPrice} TL
                    </Text>
                    {hasDiscount && (
                        <Text className="text-[10px] text-gray-400 line-through ml-1.5">
                            {product.price_info.total_price} TL
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;
