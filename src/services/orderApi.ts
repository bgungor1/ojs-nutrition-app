import type {
    CompleteShoppingRequest,
    CompleteShoppingResponse,
    OrderDetailResponse,
    OrderListResponse,
    PaymentSettingsResponse,
    ShipmentFeeResponse
} from '@/types/order'
import { baseApi } from './baseApi'

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<OrderListResponse, void>({
            query: () => 'users/orders',
            providesTags: ['Order']
        }),
        getOrderDetails: builder.query<OrderDetailResponse, string>({
            query: (orderId) => `users/orders/${orderId}`,
            providesTags: ['Order']
        }),
        getPaymentSettings: builder.query<PaymentSettingsResponse, void>({
            query: () => 'users/orders/payment-settings',
            providesTags: ['Order']
        }),
        getShipmentFee: builder.query<ShipmentFeeResponse, void>({
            query: () => 'users/orders/shipment-fee',
            providesTags: ['Order']
        }),
        completeShopping: builder.mutation<CompleteShoppingResponse, CompleteShoppingRequest>({
            query: (data) => ({
                url: 'users/orders/complete-shopping',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Order']
        })

    })
})