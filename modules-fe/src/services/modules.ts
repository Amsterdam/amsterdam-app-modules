import {Module, ModuleVersion, ModuleVersionWithRelease} from '../types/module'
import {baseApi} from './baseApi'

type ModuleQueryArg = {
  slug: string
}

type ModuleVersionQueryArg = {
  slug: string
  version: string
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
    getModule: builder.query<Module, ModuleQueryArg>({
      query: ({slug}) => `/api/v1/module/${slug}`,
      providesTags: ['Module'],
    }),
    getModuleVersion: builder.query<
      ModuleVersionWithRelease,
      ModuleVersionQueryArg
    >({
      query: ({slug, version}) => `/api/v1/module/${slug}/version/${version}`,
      providesTags: ['Module'],
    }),
    getModules: builder.query<ModuleVersion[], void>({
      query: () => `/api/v1/modules/latest`,
      providesTags: ['Module'],
    }),
  }),
  overrideExisting: true,
})

export const {
  useCreateModuleMutation,
  useEditModuleMutation,
  useGetModulesQuery,
  useGetModuleVersionQuery,
  useGetModuleQuery,
} = modulesApi
