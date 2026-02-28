import { checkoutFormSchema, CheckoutFormValues } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

export function useCheckoutFlow() {
    const router = useRouter();
    const [isCompleting, setIsCompleting] = useState(false);

    const methods = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            isPrivacyPolicyAccepted: false,
            isSameBillingAddress: true,
            paymentMethod: 'credit_card',
        }
    });

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setIsCompleting(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            router.push('/checkout/success' as any);

        } catch (error: any) {

            Toast.show({
                type: 'error',
                text1: 'Sipariş Tamamlanamadı',
                text2: error?.message || 'Bir hata oluştu.',
            });
        } finally {
            setIsCompleting(false);
        }
    };

    return {
        methods,
        onSubmit,
        isCompleting
    };
}
