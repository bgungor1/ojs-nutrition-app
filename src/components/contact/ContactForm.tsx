import { ContactInput } from '@/components/contact';
import { contactSchema, type ContactFormData } from '@/schemas/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export function ContactForm() {
    const [isSending, setIsSending] = useState(false);

    const { control, handleSubmit, reset } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            message: ''
        }
    });

    const onSubmit = (data: ContactFormData) => {
        setIsSending(true);
        console.log('Mesaj gönderilecek veri:', data);
        setTimeout(() => {
            setIsSending(false);
            Toast.show({
                type: 'success',
                text1: 'Mesajınız İletildi',
                text2: 'En kısa sürede e-posta adresinizden dönüş yapacağız.',
            });
            reset();
        }, 1200);
    };

    return (
        <View className="px-5 py-6 bg-white">
            <Text className="text-[13px] font-bold text-center text-black mb-8 leading-5">
                Bize aşağıdaki iletişim formundan veya{'\n'}
                info@ojsnutrition.com e-posta adresinden{'\n'}
                ulaşabilirsiniz.
            </Text>

            <ContactInput
                control={control}
                name="firstName"
                placeholder="İsim *"
            />

            <ContactInput
                control={control}
                name="lastName"
                placeholder="Soyad"
            />

            <ContactInput
                control={control}
                name="email"
                placeholder="E-Posta *"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <ContactInput
                control={control}
                name="message"
                placeholder="Mesaj *"
                multiline
            />

            <Pressable
                onPress={handleSubmit(onSubmit)}
                disabled={isSending}
                className={`w-full bg-black py-[14px] rounded-md mt-2 flex-row justify-center items-center ${isSending ? 'opacity-80' : ''}`}
            >
                {isSending ? (
                    <ActivityIndicator color="#fff" size="small" className="mr-2" />
                ) : null}
                <Text className="text-white font-bold text-base">
                    {isSending ? 'Gönderiliyor...' : 'Gönder'}
                </Text>
            </Pressable>

            <View className="mt-8">
                <Text className="text-[11px] text-[#111] font-bold leading-5 mb-4">
                    *Aynı gün kargo hafta içi 16:00, Cumartesi ise 11:00' a kadar verilen siparişler için geçerlidir.{'\n'}
                    Siparişler kargoya verilince e-posta ve sms ile bilgilendirme yapılır.
                </Text>

                <Text className="text-[11px] text-[#111] font-bold leading-5">
                    Telefon ile <Text className="font-extrabold text-[12px]">0850 303 29 89</Text> numarasını arayarak da bizlere sesli mesaj bırakabilirsiniz. Sesli mesajlarınıza hafta içi saat <Text className="font-extrabold text-[12px]">09:00-17:00</Text> arasında dönüş sağlanmaktadır.
                </Text>
            </View>
        </View>
    );
}
