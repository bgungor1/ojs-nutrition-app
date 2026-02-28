import { type Country, type Region, type Subregion, type WorldListResponse } from '@/types';
import { baseApi } from './baseApi';

interface ApiWrapper<T> {
    status: string;
    data: T;
}

export const worldApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCountries: builder.query<WorldListResponse<Country>, { limit?: number }>({
            query: (params) => {
                const limit = params?.limit ?? 252;
                return `/world/countries?limit=${limit}`;
            },
            transformResponse: (response: ApiWrapper<WorldListResponse<Country>>) => response.data,
            providesTags: ['World'],
        }),

        getRegions: builder.query<
            WorldListResponse<Region>,
            { limit?: number; offset?: number; name?: string; countryName?: string }
        >({
            query: (params) => {
                const limit = params?.limit ?? 100;
                const offset = params?.offset ?? 0;
                let url = `/world/region?limit=${limit}&offset=${offset}`;

                if (params?.name) url += `&name=${encodeURIComponent(params.name)}`;
                if (params?.countryName) url += `&country-name=${encodeURIComponent(params.countryName)}`;

                return url;
            },
            transformResponse: (response: ApiWrapper<WorldListResponse<Region>>) => response.data,
            providesTags: ['World'],
        }),

        getSubregions: builder.query<
            WorldListResponse<Subregion>,
            { limit?: number; offset?: number; regionName?: string }
        >({
            query: (params) => {
                const limit = params?.limit ?? 100;
                const offset = params?.offset ?? 0;
                let url = `/world/subregion?limit=${limit}&offset=${offset}`;

                if (params?.regionName) url += `&region-name=${encodeURIComponent(params.regionName)}`;

                return url;
            },
            transformResponse: (response: ApiWrapper<WorldListResponse<Subregion>>) => response.data,
            providesTags: ['World'],
        }),
    }),
});

export const {
    useGetCountriesQuery,
    useGetRegionsQuery,
    useGetSubregionsQuery,
} = worldApi;
