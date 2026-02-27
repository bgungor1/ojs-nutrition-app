import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Phase 1 Components
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductHeader } from '@/components/product/ProductHeader';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductPrice } from '@/components/product/ProductPrice';

// Phase 2 Components
import { AddToCartSection } from '@/components/product/AddToCartSection';
import { ProductAccordion } from '@/components/product/ProductAccordion';
import { ProductTrustFeatures } from '@/components/product/ProductTrustFeatures';
import { ProductVariants } from '@/components/product/ProductVariants';

// Phase 3 Components
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { ReviewList } from '@/components/product/ReviewList';
import { ReviewDistribution, ReviewOverview } from '@/components/product/ReviewOverview';

// Types and Services
import { useAddToCartMutation } from '@/services/cartApi';
import { useGetProductBySlugQuery, useGetProductCommentsQuery, useGetProductsQuery } from '@/services/productsApi';
import { addItem } from '@/store/cartSlice';
import { ApiComment, ApiProduct } from '@/types/api';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

export default function ProductDetailScreen() {
    const { slug } = useLocalSearchParams<{ slug: string }>();
    const { data: productData, isLoading: isProductLoading, isError: isProductError } = useGetProductBySlugQuery(slug as string, {
        skip: !slug,
    });

    const { data: commentsResponse, isLoading: isCommentsLoading } = useGetProductCommentsQuery(
        { slug: slug as string, limit: 10, page: 1 },
        { skip: !slug }
    );
    const { data: relatedProductsData } = useGetProductsQuery({ limit: 4 }, { skip: !slug });
    const product = productData?.data;
    const [selectedVariantId, setSelectedVariantId] = React.useState<string | null>(null);
    const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (product?.variants?.length && !selectedVariantId) {
            setSelectedVariantId(product.variants[0].id);
        }
    }, [product, selectedVariantId]);
    const selectedVariant = product?.variants?.find(v => v.id === selectedVariantId) || product?.variants?.[0];
    const uniqueAromas = Array.from(new Set(product?.variants?.map(v => v.aroma) || []));
    const mappedFlavors = uniqueAromas.map(aroma => ({
        id: aroma,
        name: aroma,
        color: '#F4A460',
        isAvailable: product?.variants?.some(v => v.aroma === aroma && v.is_available) || false
    }));
    const currentAroma = selectedVariant?.aroma;
    const sizesForAroma = product?.variants?.filter(v => v.aroma === currentAroma) || [];
    const mappedSizes = sizesForAroma.map(v => ({
        id: v.id,
        name: `${v.size.gram}g`,
        weight: `${v.size.gram}g, ${v.size.pieces} Adet`,
        servings: v.size.total_services,
        price: v.price.discounted_price ?? v.price.total_price,
        originalPrice: v.price.discounted_price ? v.price.total_price : undefined,
        discountPercentage: v.price.discount_percentage || undefined,
        isAvailable: v.is_available
    }));

    const handleFlavorChange = (aromaId: string) => {
        const firstVariantOfAroma = product?.variants?.find(v => v.aroma === aromaId && v.is_available)
            || product?.variants?.find(v => v.aroma === aromaId);
        if (firstVariantOfAroma) {
            setSelectedVariantId(firstVariantOfAroma.id);
        }
    };

    const handleSizeChange = (variantId: string) => {
        setSelectedVariantId(variantId);
    };

    const handleAddToCart = async (quantity: number) => {
        if (!product || !selectedVariantId) return;

        try {
            await addToCart({
                product_id: product.id.toString(),
                product_variant_id: selectedVariantId,
                pieces: quantity
            }).unwrap();

            dispatch(addItem({
                id: `${product.id}-${selectedVariantId}`,
                product_id: Number(product.id),
                product_variant_id: selectedVariantId,
                name: product.name,
                price: currentPrice,
                quantity: quantity,
                image: selectedVariant ? selectedVariant.photo_src : '',
                flavor: currentAroma,
                size: mappedSizes.find(s => s.id === selectedVariantId)?.name
            }));

            Toast.show({
                type: 'success',
                text1: 'Başarılı',
                text2: 'Ürün sepetinize eklendi 🛒',
                position: 'top',
                visibilityTime: 3000,
            });
        } catch (error) {
            console.error('Sepete ekleme hatası:', error);
            Toast.show({
                type: 'error',
                text1: 'Hata',
                text2: 'Ürün sepete eklenirken bir sorun oluştu.',
                position: 'top',
                visibilityTime: 3000,
            });
        }
    };

    const currentPrice = selectedVariant ? (selectedVariant.price.discounted_price ?? selectedVariant.price.total_price) : 0;
    const availability = selectedVariant?.is_available ? 'in_stock' : 'out_of_stock';
    const relatedProducts: ApiProduct[] = relatedProductsData?.data?.results || [];
    const reviews: ApiComment[] = commentsResponse?.data?.results || [];
    const distribution: ReviewDistribution[] = [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(r => parseInt(r.stars, 10) === star).length;
        const total = reviews.length;
        return {
            rating: star,
            count: count,
            percentage: total > 0 ? (count / total) * 100 : 0
        };
    });

    const averageRating = product?.average_star || 0;
    const totalReviewsCount = product?.comment_count || 0;

    if (isProductLoading) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator size="large" color="#1f4b8e" />
            </SafeAreaView>
        );
    }

    if (isProductError || !product) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <Text className="text-gray-500 font-medium">Ürün bulunamadı veya bir hata oluştu.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'bottom']}>
            <Stack.Screen options={{ headerShown: false }} />
            <ProductHeader
                onShare={() => console.log('Share')}
                onFavorite={() => console.log('Favorite')}
            />
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <ProductGallery images={selectedVariant ? [selectedVariant.photo_src] : []} />
                <ProductInfo
                    title={product.name}
                    category={product.short_explanation || 'SPORCU GIDASI'}
                    rating={averageRating}
                    reviewCount={totalReviewsCount}
                />
                <ProductPrice
                    price={currentPrice}
                    originalPrice={null}
                    pricePerServing={18.30}
                />
                <ProductVariants
                    flavors={mappedFlavors}
                    selectedFlavorId={currentAroma || ''}
                    onFlavorSelect={handleFlavorChange}
                    sizes={mappedSizes}
                    selectedSizeId={selectedVariantId || ''}
                    onSizeSelect={handleSizeChange}
                />
                <ProductTrustFeatures />
                <ProductAccordion
                    description={product.short_explanation || 'Ürün detayı bulunamadı.'}
                    usageInstructions="1 Ölçek (30g) ürünü 300ml su veya süt ile karıştırıp içiniz."
                />
                <RelatedProducts products={relatedProducts} />
                <ReviewOverview
                    averageRating={averageRating}
                    totalReviews={totalReviewsCount}
                    distribution={distribution}
                />

                {isCommentsLoading ? (
                    <View className="py-8 items-center justify-center">
                        <ActivityIndicator size="small" color="#1f4b8e" />
                        <Text className="text-gray-500 mt-2">Yorumlar yükleniyor...</Text>
                    </View>
                ) : (
                    <ReviewList reviews={reviews} />
                )}
            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-md elevation-10">
                <AddToCartSection
                    price={currentPrice}
                    onAddToCart={handleAddToCart}
                    inStock={availability === 'in_stock'}
                    isLoading={isAddingToCart}
                />
            </View>
        </SafeAreaView>
    );
}
