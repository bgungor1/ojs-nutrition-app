import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    initiallyExpanded?: boolean;
}


function AccordionItem({ title, children, initiallyExpanded = false }: AccordionItemProps) {
    const [expanded, setExpanded] = useState(initiallyExpanded);
    const heightValue = useSharedValue(initiallyExpanded ? 1 : 0);

    const toggleAccordion = () => {
        setExpanded(!expanded);
        heightValue.value = withTiming(expanded ? 0 : 1, { duration: 300 });
    };

    const iconStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${heightValue.value * 180}deg` }]
        };
    });

    const contentStyle = useAnimatedStyle(() => {
        return {
            opacity: heightValue.value,
        };
    });

    return (
        <View className="border-b border-gray-100 overflow-hidden bg-white">
            <Pressable
                onPress={toggleAccordion}
                className="flex-row items-center justify-between py-4 px-4 bg-white"
            >
                <Text className="text-base font-bold text-gray-900">{title}</Text>
                <Animated.View style={iconStyle}>
                    <Ionicons name="chevron-down" size={20} color="#6b7280" />
                </Animated.View>
            </Pressable>

            <Animated.View style={contentStyle} className={expanded ? 'min-h-[50px]' : 'h-0'}>
                {expanded && (
                    <View className="px-4 pb-4 bg-white">
                        {children}
                    </View>
                )}
            </Animated.View>
        </View>
    );
}

interface ProductAccordionProps {
    description: string;
    usageInstructions: string;
}
export function ProductAccordion({ description, usageInstructions }: ProductAccordionProps) {
    return (
        <View className="mt-2 bg-white">
            <AccordionItem title="Ürün Özellikleri" initiallyExpanded={true}>
                <Text className="text-sm text-gray-600 leading-relaxed font-normal">
                    {description}
                </Text>
            </AccordionItem>

            <AccordionItem title="Kullanım Bilgisi">
                <Text className="text-sm text-gray-600 leading-relaxed font-normal">
                    {usageInstructions}
                </Text>
            </AccordionItem>

            <AccordionItem title="İçerik ve Besin Değerleri">
                <Text className="text-sm text-gray-600 leading-relaxed font-normal">
                    Bu alan tasarımda "Besin Değerleri Tablosu" olarak çizilebilir.
                    API'dan gelen NutritionalInfo (calories, protein vb.) burada gösterilecek.
                </Text>
            </AccordionItem>
        </View>
    );
}
