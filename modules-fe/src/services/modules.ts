import {ModuleVersion} from '../types/module'
import {baseApi} from './baseApi'

type ModuleQueryArg = {
  slug: string
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createModule: builder.mutation<ModuleVersion, ModuleVersion>({
      query: module => ({
        url: `/api/v1/modules`,
        method: 'POST',
        body: {...module},
      }),
      transformResponse: (response: {result: ModuleVersion}) => response.result,
      invalidatesTags: ['Module'],
    }),
    editModule: builder.mutation<ModuleVersion, ModuleVersion>({
      query: module => ({
        url: `/api/v1/modules`,
        method: 'PATCH',
        body: {...module},
      }),
      transformResponse: (response: {result: ModuleVersion}) => response.result,
      invalidatesTags: ['Module'],
    }),
    getModule: builder.query<ModuleVersion[], ModuleQueryArg>({
      query: ({slug}) => `/api/v1/modules?slug=${slug}`,
      transformResponse: (response: {result: ModuleVersion[]}) =>
        response.result,
      providesTags: ['Module'],
    }),
    getModules: builder.query<ModuleVersion[], void>({
      query: () => `/api/v1/modules/latest`,
      transformResponse: (response: {result: ModuleVersion[]}) =>
        response.result,
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
