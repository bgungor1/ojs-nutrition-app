import { OrderPriceSummary } from '@/types/order';
import React from 'react';
import { Text, View } from 'react-native';

interface OrderSummaryBoxProps {
    summary: OrderPriceSummary;
}

export function OrderSummaryBox({ summary }: OrderSummaryBoxProps) {
    const renderRow = (label: string, value: string | number, isTotal = false) => (
        <View className={`flex-row justify-between items-center ${isTotal ? 'mt-4 pt-4 border-t border-gray-200' : 'mb-3'}`}>
            <Text className={`text-sm ${isTotal ? 'font-bold text-black' : 'text-gray-700'}`}>
                {label}
            </Text>
            <Text className={`text-sm ${isTotal ? 'font-bold text-black' : 'text-gray-900'}`}>
                {value}
            </Text>
        </View>
    );

    return (
        <View className="mt-2 mb-6">
            {renderRow('Ara Toplam', `${summary.subtotal} TL`)}
            {renderRow('Kargo', `${summary.shipping} TL`)}
            {renderRow('Toplam Vergi', `${summary.tax} TL`)}

            {summary.discount > 0 && (
                renderRow('Yüzde 10 indirim!', `- ${summary.discount} TL`)
            )}

            {renderRow('Toplam', `${summary.total} TL`, true)}
        </View>
    );
}
