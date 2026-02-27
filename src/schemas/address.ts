import { z } from 'zod';

export const addressSchema = z.object({
    title: z.string().min(1, 'Adres başlığı zorunludur').max(50, 'En fazla 50 karakter olabilir'),
    first_name: z.string().min(2, 'Ad en az 2 karakter olmalıdır').max(50, 'Ad en fazla 50 karakter olabilir'),
    last_name: z.string().min(2, 'Soyad en az 2 karakter olmalıdır').max(50, 'Soyad en fazla 50 karakter olabilir'),
    country_id: z.number().positive('Geçerli bir ülke seçiniz'),
    region_id: z.number().positive('Geçerli bir il seçiniz'),
    subregion_id: z.number().positive('Geçerli bir ilçe seçiniz'),
    full_address: z.string().min(10, 'Açık adres detaylı girilmelidir (En az 10 karakter)').max(250, 'Adres çok uzun'),
    phone_number: z.string()
        .min(10, 'Telefon numarası en az 10 haneli olmalıdır')
        .max(15, 'Telefon numarası en fazla 15 haneli olabilir')
        .regex(/^[0-9]+$/, 'Sadece rakam giriniz')
});

export type AddressFormData = z.infer<typeof addressSchema>;
