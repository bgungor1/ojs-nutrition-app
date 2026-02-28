import { CartEmptyState, CartHeader, CartItemCard, CartSummaryFooter } from '@/components/cart';
import { useAddToCartMutation, useGetCartQuery, useRemoveCartMutation } from '@/services';
import { removeItem, selectCartItems, selectTotalPrice, updateQuantity } from '@/store/cartSlice';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

export default function CartScreen() {
    const router = useRouter();
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const dispatch = useDispatch();

    const [addToApiCart] = useAddToCartMutation();
    const [removeApiCart] = useRemoveCartMutation();

    const { isLoading } = useGetCartQuery();

    const handleIncrement = async (item: any) => {
        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));

        try {
            await addToApiCart({
                product_id: item.product_id?.toString() || '',
                product_variant_id: item.product_variant_id || '',
                pieces: 1
            }).unwrap();
        } catch (error) {
            dispatch(updateQuantity({ id: item.id, quantity: item.quantity }));
            Toast.show({ type: 'error', text1: 'Hata', text2: 'Miktar artırılamadı.', position: 'top' });
        }
    };

    const handleDecrement = async (item: any) => {
        if (item.quantity <= 1) {
            handleRemove(item);
            return;
        }

        dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));

        try {
            await removeApiCart({
                product_id: item.product_id?.toString() || '',
                product_variant_id: item.product_variant_id || '',
                pieces: 1
            }).unwrap();
        } catch (error) {
            dispatch(updateQuantity({ id: item.id, quantity: item.quantity }));
            Toast.show({ type: 'error', text1: 'Hata', text2: 'Miktar azaltılamadı.', position: 'top' });
        }
    };

    const handleRemove = async (item: any) => {
        dispatch(removeItem(item.id));
        try {
            await removeApiCart({
                product_id: item.product_id?.toString() || '',
                product_variant_id: item.product_variant_id || '',
                pieces: item.quantity
            }).unwrap();
            Toast.show({ type: 'success', text1: 'Başarılı', text2: 'Ürün sepetten çıkarıldı', position: 'top' });
        } catch (error) {
            dispatch({ type: 'cart/addItem', payload: item });
            Toast.show({ type: 'error', text1: 'Hata', text2: 'Ürün silinemedi.', position: 'top' });
        }
    };

    const isEmpty = cartItems.length === 0;

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <Stack.Screen options={{ headerShown: false }} />

            <CartHeader />

            {isEmpty ? (
                <CartEmptyState />
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id}
                    className="flex-1"
                    contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 100 }}
                    renderItem={({ item }) => (
                        <CartItemCard
                            item={item}
                            onIncrement={handleIncrement}
                            onDecrement={handleDecrement}
                        />
                    )}
                />
            )}

            <CartSummaryFooter
                totalPrice={totalPrice}
                isEmpty={isEmpty}
                onCheckout={() => router.push('/checkout' as any)}
            />
        </SafeAreaView>
    );
}
