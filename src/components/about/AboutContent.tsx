import React from 'react';
import { Text, View } from 'react-native';

export function AboutContent() {
    return (
        <View className="px-5 py-6 bg-white">
            <Text className="text-[22px] font-extrabold text-black mb-6 leading-8 tracking-tight">
                Sağlıklı ve Fit Yaşamayı{'\n'}
                Zevkli ve Kolay Hale{'\n'}
                Getirmek İçin Varız
            </Text>

            <Text className="text-[13px] text-gray-700 leading-6 mb-5 font-semibold">
                2015 yılından beri sporcu gıdaları, takviye edici
                gıdalar ve fonksiyonel gıdalar üreten bir firma olarak,
                müşterilerimize en kaliteli, lezzetli, tüketilmesi kolay
                ürünleri sunuyoruz. Müşteri memnuniyeti ve sağlığı
                her zaman önceliğimiz olmuştur. Tesislerimizde,
                yüksek kalite standartlarına bağlı olarak, sporcuların
                ve sağlıklı yaşam tutkunlarının ihtiyaçlarına yönelik
                yenilikçi çözümler üretiyoruz. Ürün yelpazemizdeki
                protein tozları, aminoasitler, vitamin ve mineral
                takviyeleri ile spor performansınızı desteklemek için
                ideal besin değerlerini sunuyoruz. Sizin için sadece
                en iyisinin yeterli olduğunu biliyoruz. Bu nedenle,
                inovasyon, kalite, sağlık ve güvenlik ilkelerimizi
                korurken, sürekli olarak ürünlerimizi geliştirmeye ve
                yenilikçi beslenme çözümleri sunmaya devam
                ediyoruz.
            </Text>

            <Text className="text-[13px] text-gray-700 leading-6 mb-5 font-semibold">
                Sporcu gıdaları konusunda lider bir marka olarak,
                sizin sağlığınıza ve performansınıza değer veriyoruz.
                Siz de spor performansınızı en üst seviyeye çıkarmak
                ve sağlıklı yaşam tarzınızı desteklemek istiyorsanız,
                taze, kaliteli ve en üst düzey çözümlerimizle tanışın.
                Sağlıklı ve aktif bir yaşam için sizi her zaman
                yanınızdayız.
            </Text>

            <Text className="text-[13px] text-gray-700 leading-6 font-semibold">
                Sürekli artan profesyonel sporculara, doktordan
                öğrencilere hayata her alanında sağlıklı yaşam ve
                beslenmeyi hedefleyen 1.000.000'dan fazla kişiye ulaştık.
            </Text>
        </View>
    );
}
