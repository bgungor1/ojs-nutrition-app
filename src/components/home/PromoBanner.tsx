import { Image } from 'expo-image';
import React, { useRef, useState } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = 180;

const bannerImage = require('@/assets/images/ojs-nutrition-banner.jpg');

const BANNER_IMAGES = [
    bannerImage,
];

const PromoBanner = () => {
    const scrollRef = useRef<ScrollView>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
        setActiveIndex(index);
    };

    return (
        <View className="mt-2">
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
            >
                {BANNER_IMAGES.map((image, index) => (
                    <Image
                        key={index}
                        source={image}
                        style={{ width: SCREEN_WIDTH, height: BANNER_HEIGHT }}
                        contentFit="cover"
                    />
                ))}
            </ScrollView>

            {/* Pagination Dots */}
            <View className="flex-row items-center justify-center gap-1.5 mt-2">
                {BANNER_IMAGES.map((_, index) => (
                    <View
                        key={index}
                        className={`rounded-full ${index === activeIndex
                            ? 'w-2.5 h-2.5 bg-emerald-500'
                            : 'w-2 h-2 bg-gray-300'
                            }`}
                    />
                ))}
            </View>
        </View>
    );
};

export default PromoBanner;
