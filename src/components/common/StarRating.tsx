import React from 'react';
import { Image, View } from 'react-native';

const starFull = require('@/assets/images/star-full.png');
const starHalf = require('@/assets/images/star-half.png');
const starEmpty = require('@/assets/images/star-empty.png');

type StarSize = 'sm' | 'md' | 'lg';

interface StarRatingProps {
    rating: number;
    size?: StarSize;
}

const starSizes: Record<StarSize, number> = {
    sm: 12,
    md: 14,
    lg: 20,
};


const StarRating = ({ rating, size = 'md' }: StarRatingProps) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const starSize = starSizes[size];

    return (
        <View className="flex-row items-center gap-0.5">
            {Array.from({ length: fullStars }).map((_, i) => (
                <Image
                    key={`full-${i}`}
                    source={starFull}
                    style={{ width: starSize, height: starSize }}
                    resizeMode="contain"
                />
            ))}
            {hasHalfStar && (
                <Image
                    key="half"
                    source={starHalf}
                    style={{ width: starSize, height: starSize }}
                    resizeMode="contain"
                />
            )}
            {Array.from({ length: emptyStars }).map((_, i) => (
                <Image
                    key={`empty-${i}`}
                    source={starEmpty}
                    style={{ width: starSize, height: starSize }}
                    resizeMode="contain"
                />
            ))}
        </View>
    );
};

export default StarRating;