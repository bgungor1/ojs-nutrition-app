import React from 'react';
import { Pressable, Text, View } from 'react-native';

export type FaqCategory = 'Genel' | 'Ürünler' | 'Kargo';

interface FaqCategoryTabsProps {
    activeCategory: FaqCategory;
    onCategoryChange: (category: FaqCategory) => void;
}

export function FaqCategoryTabs({ activeCategory, onCategoryChange }: FaqCategoryTabsProps) {
    const categories: FaqCategory[] = ['Genel', 'Ürünler', 'Kargo'];

    return (
        <View className="flex-row items-center mb-6 pl-4 border-b border-gray-100 pb-4">
            {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                    <Pressable
                        key={cat}
                        onPress={() => onCategoryChange(cat)}
                        className={`mr-3 px-4 py-2 ${isActive ? 'bg-[#222]' : 'bg-gray-200'}`}
                    >
                        <Text className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>
                            {cat}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
