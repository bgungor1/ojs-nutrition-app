import type { AccountApiResponse, UpdateProfileRequest } from '@/types/account'
import { baseApi } from './baseApi'

export const accountApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyAccount: builder.query<AccountApiResponse, void>({
            query: () => '/users/my-account',
            providesTags: ['Profile'],
        }),
        updateProfile: builder.mutation<AccountApiResponse, UpdateProfileRequest>({
            query: (data) => ({
                url: '/users/my-account',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Profile'],
        }),
    })
})

export const { useGetMyAccountQuery, useUpdateProfileMutation } = accountApi