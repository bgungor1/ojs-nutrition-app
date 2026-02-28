import { z } from 'zod';

export const checkoutFormSchema = z.object({
    addressId: z.string({ message: 'Lütfen bir teslimat adresi seçin.' }).min(1, { message: 'Lütfen bir teslimat adresi seçin.' }),
    shippingId: z.string().optional(),
    paymentMethod: z.enum(['credit_card', 'cash_on_delivery'], {
        message: 'Lütfen bir ödeme yöntemi seçin.',
    }),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvc: z.string().optional(),
    isPrivacyPolicyAccepted: z.boolean().refine((val) => val === true, {
        message: 'Gizlilik ve Satış Sözleşmesini onaylamalısınız.',
    }),
    isSameBillingAddress: z.boolean(),

}).superRefine((data, ctx) => {
    if (data.paymentMethod === 'credit_card') {
        if (!data.cardNumber || data.cardNumber.length < 16) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Geçerli bir kart numarası giriniz.',
                path: ['cardNumber'],
            });
        }
        if (!data.cardExpiry || data.cardExpiry.length !== 5) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Ay/Yıl formatında son kullanma tarihi giriniz.',
                path: ['cardExpiry'],
            });
        }
        if (!data.cardCvc || data.cardCvc.length < 3) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'CVC kodunu giriniz.',
                path: ['cardCvc'],
            });
        }
    }
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
