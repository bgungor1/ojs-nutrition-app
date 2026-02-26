import StarRating from '@/components/common/StarRating';
import React from 'react';
import { Text, View } from 'react-native';

export interface ReviewDistribution {
    rating: number;
    count: number;
    percentage: number;
}

interface ReviewOverviewProps {
    averageRating: number;
    totalReviews: number;
    distribution: ReviewDistribution[];
}


export function ReviewOverview({ averageRating, totalReviews, distribution }: ReviewOverviewProps) {
    const ProgressBar = ({ rating, percentage }: { rating: number, percentage: number }) => (
        <View className="flex-row items-center mb-1.5 w-full">
            <Text className="text-xs text-gray-500 w-4">{rating}</Text>
            <View className="flex-1 h-2 bg-gray-200 rounded-full mx-2 overflow-hidden">
                <View
                    className="h-full bg-blue-800 rounded-full"
                    style={{ width: `${percentage}%` }}
                />
            </View>
            <Text className="text-[10px] text-gray-400 w-8 text-right">%{Math.round(percentage)}</Text>
        </View>
    );

    const sortedDistribution = [...distribution].sort((a, b) => b.rating - a.rating);

    return (
        <View className="px-4 py-6 bg-white border-b border-gray-100 mt-2">
            <Text className="text-xl font-bold text-gray-900 mb-4 text-center">Yorumlar</Text>

            <View className="items-center mb-6">
                <Text className="text-3xl font-bold text-gray-900 mb-1">{averageRating.toFixed(1)}</Text>

                <StarRating rating={averageRating} />
                <Text className="text-sm text-gray-500 mt-2">{totalReviews.toLocaleString('tr-TR')} Değerlendirme</Text>
            </View>

            <View className="w-full px-4">
                {sortedDistribution.map((item) => (
                    <ProgressBar
                        key={item.rating.toString()}
                        rating={item.rating}
                        percentage={item.percentage}
                    />
                ))}
            </View>
        </View>
    );
}
