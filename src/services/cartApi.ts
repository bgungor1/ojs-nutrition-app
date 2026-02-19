import type {
    AddToCartRequest,
    CartResponse,
    RemoveFromCartRequest
} from '@/types/cart'
import { baseApi } from './baseApi'

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getCart: builder.query<CartResponse, void>({
            query: () => 'users/cart',
            providesTags: ['Cart']
        }),
        addToCart: builder.mutation<CartResponse, AddToCartRequest>({
            query: (data) => ({
                url: 'users/cart',
                method: 'POST',
                body: data

            }),
            invalidatesTags: ['Cart']
        }),
        removeCart: builder.mutation<CartResponse, RemoveFromCartRequest>({
            query: (data) => ({
                url: 'users/cart',
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: ['Cart']
        })

    })
})

export const { useGetCartQuery, useAddToCartMutation, useRemoveCartMutation } = cartApi