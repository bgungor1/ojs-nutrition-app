import {
    type LoginRequest,
    type LoginSuccessResponse,
    type RegisterRequest,
    type RegisterSuccessResponse
} from '@/types/auth';
import { baseApi } from "./baseApi";

const AUTH_API_KEY = process.env.EXPO_PUBLIC_AUTH_API_KEY || ''

export const authApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        login: builder.mutation<LoginSuccessResponse, { email: string; password: string }>({
            query: ({ email, password }) => ({

                url: '/auth/login',
                method: 'POST',
                body: {
                    username: email,
                    password,
                    api_key: AUTH_API_KEY
                } as LoginRequest
            })
        }),
        register: builder.mutation<RegisterSuccessResponse, {
            email: string
            password: string
            confirmPassword: string
            firstName: string
            lastName: string
        }>({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: {
                    email: data.email,
                    password: data.password,
                    password2: data.confirmPassword,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    api_key: AUTH_API_KEY
                } as RegisterRequest
            })
        }),
        refreshToken: builder.mutation<{ access: string }, string>({
            query: (refreshToken) => ({
                url: '/auth/refresh',
                method: 'POST',
                body: { refresh: refreshToken }
            })
        }),
        getProfile: builder.query<{ user: { id: string; email: string; first_name: string; last_name: string } }, void>({
            query: () => '/auth/user'
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation, useGetProfileQuery } = authApi