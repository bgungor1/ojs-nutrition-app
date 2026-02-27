import { z } from 'zod';

export const accountSchema = z.object({
    firstName: z
        .string()
        .min(1, 'Ad alanı zorunludur')
        .min(2, 'Ad en az 2 karakter olmalıdır')
        .max(50, 'Ad en fazla 50 karakter olabilir'),
    lastName: z
        .string()
        .min(1, 'Soyad alanı zorunludur')
        .min(2, 'Soyad en az 2 karakter olmalıdır')
        .max(50, 'Soyad en fazla 50 karakter olabilir'),
    email: z
        .string()
        .min(1, 'E-posta adresi zorunludur')
        .email('Geçerli bir e-posta adresi giriniz'),
    phoneNumber: z
        .string()
        .min(10, 'Telefon numarası en az 10 haneli olmalıdır')
        .max(15, 'Telefon numarası en fazla 15 haneli olabilir')
        .regex(/^[0-9]+$/, 'Sadece rakam giriniz'),
    marketingConsent: z.boolean().optional(),
});

export type AccountFormData = z.infer<typeof accountSchema>;
