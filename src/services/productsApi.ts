import type { ApiProductDetailResponse, ApiProductsResponse } from '@/types/api';
import { baseApi } from './baseApi';




export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ApiProductsResponse, { page?: number; limit?: number } | void>({
            query: (params) => {
                const page = params?.page ?? 1
                const limit = params?.limit ?? 12
                const offset = (page - 1) * limit
                return `/products?limit=${limit}&offset=${offset}`
            },
            providesTags: ['Product'],
        }),
        getProductBySlug: builder.query<ApiProductDetailResponse, string>({
            query: (slug) => `/products/${slug}`,
            providesTags: (result, error, slug) => [{ type: 'Product', id: slug }],
        }),
    })
})

export const { useGetProductsQuery, useGetProductBySlugQuery } = productsApi