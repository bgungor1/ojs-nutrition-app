import { z } from 'zod';

export const contactSchema = z.object({
    firstName: z.string().min(1, 'İsim alanı zorunludur').max(50, 'İsim en fazla 50 karakter olabilir'),
    lastName: z.string().optional(),
    email: z
        .string()
        .min(1, 'E-posta adresi zorunludur')
        .email('Geçerli bir e-posta adresi giriniz'),
    message: z
        .string()
        .min(10, 'Mesajınız en az 10 karakter olmalıdır')
        .max(1000, 'Mesajınız çok uzun'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
