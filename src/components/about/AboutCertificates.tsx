import React from 'react';
import { Image, Text, View } from 'react-native';

export function AboutCertificates() {
    const badges = [
        require('@/assets/images/quality-badge.png'),
        require('@/assets/images/halal-badge.png'),
        require('@/assets/images/international-quality-badge.png'),
        require('@/assets/images/manufacturing-badge.png'),
        require('@/assets/images/iso-badge.png'),
        require('@/assets/images/food-safety-badge.png')
    ];

    return (
        <View className="px-5 py-4 bg-white">
            <Text className="text-[17px] font-bold text-black mb-3">Sertifikalarımız</Text>

            <Text className="text-[12px] text-gray-600 mb-6 font-medium leading-5">
                Kalite politikamıza ulaşmak için tıklayın.{'\n\n'}
                Firmamızın sahip olduğu sertifikalara görsele tıklayarak
                ulaşabilirsiniz.
            </Text>

            <View className="flex-row flex-wrap justify-between pr-4">
                {badges.map((badge, index) => (
                    <View key={index} className="w-[30%] mb-4 items-center">
                        <Image
                            source={badge}
                            style={{ width: 85, height: 85, resizeMode: 'contain' }}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
}
