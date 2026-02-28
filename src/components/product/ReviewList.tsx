import { ApiComment } from '@/types';
import { StarRating } from '@/components/common';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface ReviewListProps {
    reviews: ApiComment[];
}


const ReviewItem = ({ review }: { review: ApiComment }) => {
    const ratingValue = parseInt(review.stars, 10) || 0;
    const authorName = `${review.first_name} ${review.last_name}`;
    const formattedDate = review.created_at ? new Date(review.created_at).toLocaleDateString('tr-TR') : '';

    return (
        <View className="py-4 border-b border-gray-100">
            <View className="flex-row justify-between items-start mb-2">
                <View>
                    <StarRating rating={ratingValue} />
                    <View className="flex-row items-center mt-1">
                        <Text className="text-sm font-bold text-gray-800 mr-2">{authorName}</Text>
                        <View className="flex-row items-center bg-green-50 px-2 py-0.5 rounded">
                            <Ionicons name="checkmark-circle" size={12} color="#10b981" />
                            <Text className="text-[10px] text-green-600 ml-1 font-medium">Satın Alındı</Text>
                        </View>
                    </View>
                    <Text className="text-xs text-gray-400 mt-0.5">{formattedDate}</Text>
                </View>
            </View>
            <Text className="text-sm font-semibold text-gray-800 mb-1">{review.title}</Text>
            <Text className="text-sm text-gray-600 leading-relaxed">{review.comment}</Text>
        </View>
    );
};
export function ReviewList({ reviews }: ReviewListProps) {
    if (!reviews || reviews.length === 0) {
        return (
            <View className="px-4 py-8 items-center justify-center bg-white border-b border-gray-100">
                <Text className="text-gray-500 text-sm">Henüz yorum yapılmamış. İlk yorumu sen yap!</Text>
            </View>
        );
    }

    return (
        <View className="px-4 bg-white">
            {reviews.map((review, index) => (
                <ReviewItem key={index} review={review} />
            ))}
            <View className="py-4 items-center">
                <Text className="text-blue-600 font-medium text-sm">Tüm {reviews.length} Yorumu Gör</Text>
            </View>
        </View>
    );
}
