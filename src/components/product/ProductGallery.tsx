import { getImageUrl } from '@/utils/imageUrl';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, View } from 'react-native';

interface ProductGalleryProps {
    images: string[];
}

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = width * 1.1;

export function ProductGallery({ images }: ProductGalleryProps) {
    const mainImage = images && images.length > 0 ? images[0] : null;

    if (!mainImage) {
        return (
            <View
                style={{ width, height: IMAGE_HEIGHT }}
                className="bg-gray-100 items-center justify-center"
            >
                <Image source={{ uri: 'https://via.placeholder.com/400?text=Resim+Yok' }} style={{ width: 100, height: 100, opacity: 0.3 }} />
            </View>
        );
    }

    return (
        <View style={{ width, height: IMAGE_HEIGHT }} className="bg-gray-50/50 items-center justify-center overflow-hidden">
            <Image
                source={{ uri: getImageUrl(mainImage) }}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
                transition={200}
                cachePolicy="memory-disk"
            />
        </View>
    );
}
