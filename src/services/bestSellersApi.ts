import type { ApiBestSellerResponse } from '@/types/api'
import { baseApi } from './baseApi'



export const bestSellersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBestSellers: builder.query<ApiBestSellerResponse, void>({
            query: () => '/products/best-sellers',
            providesTags: ['Product'],
        }),
    })
})
export const { useGetBestSellersQuery } = bestSellersApi