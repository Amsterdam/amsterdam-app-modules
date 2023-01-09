import {Module} from '../types/module'
import {baseApi} from './baseApi'

type ModuleQueryArg = {
  slug: string
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createModule: builder.mutation<Module, Module>({
      query: module => ({
        url: `/api/v1/modules`,
        method: 'POST',
        body: {...module},
      }),
      transformResponse: (response: {result: Module}) => response.result,
      invalidatesTags: ['Module'],
    }),
    editModule: builder.mutation<Module, Module>({
      query: module => ({
        url: `/api/v1/modules`,
        method: 'PATCH',
        body: {...module},
      }),
      transformResponse: (response: {result: Module}) => response.result,
      invalidatesTags: ['Module'],
    }),
    getModule: builder.query<Module[], ModuleQueryArg>({
      query: ({slug}) => `/api/v1/modules?slug=${slug}`,
      transformResponse: (response: {result: Module[]}) => response.result,
      providesTags: ['Module'],
    }),
    getModules: builder.query<Module[], void>({
      query: () => `/api/v1/modules/latest`,
      transformResponse: (response: {result: Module[]}) => response.result,
      providesTags: ['Module'],
    }),
  }),
  overrideExisting: true,
})

export const {
  useCreateModuleMutation,
  useEditModuleMutation,
  useGetModulesQuery,
  useGetModuleQuery,
} = modulesApi
