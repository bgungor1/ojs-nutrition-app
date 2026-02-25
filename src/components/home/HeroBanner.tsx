import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const HeroBanner = () => {
    return (
        <TouchableOpacity activeOpacity={0.9} className="mt-4">
            <Image
                source={require('@/assets/images/hero-banner.png')}
                style={{ width: SCREEN_WIDTH, height: 300 }}
                contentFit="fill"
            />
        </TouchableOpacity>
    );
};

export default HeroBanner;
