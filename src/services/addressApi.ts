import { type Address, type AddressListResponse, type CreateAddressRequest, type UpdateAddressRequest } from '@/types';
import { baseApi } from './baseApi';

interface ApiWrapper<T> {
    status: string;
    data: T;
}

export const addressApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAddresses: builder.query<AddressListResponse, { limit?: number; offset?: number } | void>({
            query: (params) => {
                const limit = params?.limit ?? 10
                const offset = params?.offset ?? 0
                return `/users/addresses?limit=${limit}&offset=${offset}`
            },
            transformResponse: (response: ApiWrapper<AddressListResponse>) => response.data,
            providesTags: ['Address'],
        }),
        getAddressById: builder.query<Address, string>({
            query: (id) => `/users/addresses/${id}`,
            transformResponse: (response: ApiWrapper<Address>) => response.data,
            providesTags: (result, error, id) => [{ type: 'Address', id }],
        }),
        createAddress: builder.mutation<Address, CreateAddressRequest>({
            query: (data) => ({
                url: '/users/addresses',
                method: 'POST',
                body: data
            }),
            transformResponse: (response: ApiWrapper<Address>) => response.data,
            invalidatesTags: ['Address'],
        }),
        updateAddress: builder.mutation<Address, { id: string; data: UpdateAddressRequest }>({
            query: ({ id, data }) => ({
                url: `/users/addresses/${id}`,
                method: 'PUT',
                body: data
            }),
            transformResponse: (response: ApiWrapper<Address>) => response.data,
            invalidatesTags: ['Address'],
        }),
        deleteAddress: builder.mutation<void, string>({
            query: (id) => ({
                url: `/users/addresses/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Address'],
        }),
    })
})

export const { useGetAddressesQuery, useGetAddressByIdQuery, useCreateAddressMutation, useUpdateAddressMutation, useDeleteAddressMutation } = addressApi