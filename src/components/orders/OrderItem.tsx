import { Order } from '@/types';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface OrderItemProps {
    order: Order;
    onPressDetail?: () => void;
}

export function OrderItem({ order, onPressDetail }: OrderItemProps) {
    const getStatusText = (status: string) => {
        switch (status) {
            case 'delivered': return 'Teslim Edildi';
            case 'shipped': return 'Kargoya Verildi';
            case 'processing': return 'Hazırlanıyor';
            case 'pending': return 'Bekliyor';
            case 'cancelled': return 'İptal Edildi';
            case 'returned': return 'İade Edildi';
            default: return status;
        }
    };

    const getStatusColor = (status: string) => {
        if (status === 'delivered') return 'text-[#73e04e]';
        if (status === 'cancelled' || status === 'returned') return 'text-red-500';
        return 'text-orange-500';
    };

    const productNames = order.cart_detail
        ? order.cart_detail.map((item) => item.product_name).join(', ')
        : '';

    return (
        <View className="py-5 border-b border-gray-200">
            <Text className={`text-xs font-bold mb-1.5 ${getStatusColor(order.order_status)}`}>
                {getStatusText(order.order_status)}
            </Text>
            <Text className="text-sm font-extrabold text-black mb-1.5 tracking-wide">
                {productNames}
            </Text>

            <Text className="text-[13px] text-gray-700 mb-1">
                {order.created_at}
            </Text>
            <Text className="text-[13px] text-gray-700 mb-4">
                {order.order_no} numaralı sipariş
            </Text>

            <Pressable
                onPress={onPressDetail}
                className="border border-gray-400 self-start px-4 py-2 rounded-[4px] bg-white active:bg-gray-50"
            >
                <Text className="text-[13px] font-medium text-gray-800">
                    Detayı Görüntüle
                </Text>
            </Pressable>
        </View>
    );
}
