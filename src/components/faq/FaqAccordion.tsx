import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

interface FaqAccordionProps {
    items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        const newSet = new Set(expandedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setExpandedIds(newSet);
    };

    return (
        <View className="border border-gray-100 bg-white">
            {items.map((item, index) => {
                const isExpanded = expandedIds.has(item.id);
                const isLast = index === items.length - 1;

                return (
                    <View key={item.id} className={`${!isLast ? 'border-b border-gray-100' : ''}`}>
                        <Pressable
                            onPress={() => toggleItem(item.id)}
                            className="flex-row items-center justify-between p-4 bg-white"
                        >
                            <Text className="flex-1 text-sm font-bold text-gray-900 pr-4 leading-5">
                                {item.question}
                            </Text>
                            <View className="w-5 h-5 items-center justify-center border border-gray-300">
                                <Ionicons
                                    name={isExpanded ? 'remove' : 'add'}
                                    size={14}
                                    color="#374151"
                                />
                            </View>
                        </Pressable>

                        {isExpanded && (
                            <View className="px-4 pb-4 bg-white">
                                <Text className="text-sm text-gray-600 leading-6">
                                    {item.answer}
                                </Text>
                            </View>
                        )}
                    </View>
                );
            })}
        </View>
    );
}