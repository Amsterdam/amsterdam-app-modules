import { Module } from '../types/module';
import { baseApi } from './baseApi';

export const modulesApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getModules: builder.query<Module[], undefined>({
            query: () => `${window.location.origin}/api/v1/modules`
        })
    }),
    overrideExisting: true
});

export const { useGetModulesQuery } = modulesApi;
