import { FaqAccordion, FaqItem } from '@/components/faq/FaqAccordion';
import { FaqCategory, FaqCategoryTabs } from '@/components/faq/FaqCategoryTabs';
import { FaqHeader } from '@/components/faq/FaqHeader';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const faqData: { [key in FaqCategory]: FaqItem[] } = {
    Genel: [
        { id: '1', question: 'OJS Nutrition ürünlerinin menşei neresi?', answer: 'Ürünlerimiz Türkiye\'de en yüksek kalite standartlarında üretilmektedir.' },
        { id: '2', question: 'Hangi sertifikalarınız var?', answer: 'ISO 22000, Helal Sertifikası ve GMP belgelerine sahibiz.' },
        { id: '3', question: 'Satılan ürünler garantili midir? Değişim var mı?', answer: 'Tüm ürünlerimiz garantilidir. Açılmamış ambalajlı ürünlerde 14 gün içinde değişim ve iade hakkınız bulunmaktadır.' },
        { id: '4', question: 'Sipariş verirken sorun yaşıyorum, ne yapmam gerekir?', answer: 'Destek hattımızdan veya info@ojsnutrition.com adresinden bizimle iletişime geçebilirsiniz.' },
        { id: '5', question: 'OJS Nutrition ürünleri nerede satılıyor?', answer: 'Sadece yetkili web sitemiz ve anlaşmalı online pazaryerlerinde satılmaktadır.' },
        { id: '6', question: 'Yüksek proteinli ürünleri kimler kullanabilir?', answer: 'Sağlıklı bireyler, sporcular ve aktif yaşam süren herkes kullanabilir.' },
        { id: '7', question: 'Taksit seçeneği neden yok?', answer: 'Gıda ürünlerinde taksitlendirme yasal olarak bulunmamaktadır.' },
        { id: '8', question: 'Siparişimi nasıl iptal edebilirim?', answer: 'Hesabım > Siparişlerim sekmesinden iptal edebilirsiniz.' },
    ],
    Ürünler: [
        { id: '9', question: 'Kapağın altındaki folyo açılmış veya tam yapışmamış gibi duruyor?', answer: 'Taşıma sırasındaki hava basıncından dolayı oluşabilen normal bir durumdur.' },
        { id: '10', question: 'Sattığınız ürünler ilaç mıdır?', answer: 'Hayır, ürünlerimiz sporcu gıdası ve takviye edici gıda statüsündedir.' },
    ],
    Kargo: [
        { id: '11', question: 'Siparişim kaç günde gelir?', answer: 'Siparişiniz 1-3 iş günü içerisinde teslim edilmektedir.' },
        { id: '12', question: 'Siparişi teslim alırken nelere dikkat etmeliyim?', answer: 'Kargo paketinin hasarlı olup olmadığını kontrol etmeli, hasarlıysa kuryeye tutanak tutturmalısınız.' },
        { id: '13', question: 'Kapıda ödeme hizmetiniz var mı?', answer: 'Evet, belli tutarlar altında kapıda nakit ödeme seçeneğimiz bulunmaktadır.' },
        { id: '14', question: 'Sipariş takibimi nasıl yapabilirim?', answer: 'Siparişiniz kargoya verildiğinde size SMS ile takip numarası iletilmektedir.' },
    ]
};

export default function FaqScreen() {
    const [activeCategory, setActiveCategory] = useState<FaqCategory>('Genel');

    const currentFaqItems = faqData[activeCategory] || [];

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <Stack.Screen options={{ headerShown: false }} />

            <FaqHeader />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <FaqCategoryTabs
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />

                <View className="flex-row items-center mb-4">
                    <View className="w-5" />
                    <Text className="text-sm font-extrabold text-[#111] uppercase tracking-wider ml-1">
                        {activeCategory}
                    </Text>
                </View>

                <FaqAccordion items={currentFaqItems} />
            </ScrollView>
        </SafeAreaView>
    );
}
