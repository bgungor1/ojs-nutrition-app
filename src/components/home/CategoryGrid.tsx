import React from 'react';
import { Text, View } from 'react-native';
import CategoryCard from './CategoryCard';

const CATEGORIES = [
    { id: '1', title: 'PROTEİN', image: require('@/assets/images/categories/protein.png') },
    { id: '2', title: 'VİTA-\nMİNLER', image: require('@/assets/images/categories/vitamins.png') },
    { id: '3', title: 'SPOR\nGIDALARI', image: require('@/assets/images/categories/sports-nutrition.png') },
    { id: '4', title: 'GIDA', image: require('@/assets/images/categories/food.png') },
    { id: '5', title: 'SAĞLIK', image: require('@/assets/images/categories/health.png') },
    { id: '6', title: 'TÜM\nÜRÜNLER', image: require('@/assets/images/categories/all-products.png') },
];

const CategoryGrid = () => {
    return (
        <View className="px-2.5 mt-4">
            <Text className="text-base font-bold text-gray-800 ml-1.5 mb-2">Kategoriler</Text>

            <View className="flex-row flex-wrap">
                {CATEGORIES.map((cat) => (
                    <View key={cat.id} className="w-1/2">
                        <CategoryCard
                            title={cat.title}
                            image={cat.image}
                            onPress={() => { }}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default CategoryGrid;
