import React from 'react';
import { Text, View } from 'react-native';

interface DiscountBadgeProps {
    percentage: number;
    size?: 'sm' | 'md';
}

const DiscountBadge = ({ percentage, size = 'md' }: DiscountBadgeProps) => {
    if (!percentage || percentage <= 0) return null;

    const isSmall = size === 'sm';

    return (
        <View
            className={`
                absolute top-2 left-2 z-10 rounded-md bg-red-600
                ${isSmall ? 'px-1.5 py-0.5' : 'px-2 py-1'}
            `}
        >
            <Text
                className={`
                    text-white font-bold
                    ${isSmall ? 'text-[10px]' : 'text-xs'}
                `}
            >
                %{Math.round(percentage)}
            </Text>
        </View>
    );
};

export default DiscountBadge;