import {Module, ModuleSlug} from '../types/module'
import {baseApi} from './baseApi'

type ModuleQueryArg = {
  slug: ModuleSlug
}

// TODO: Extract the `window.location.origin`
export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createModule: builder.mutation<Module, Module>({
      query: module => ({
        url: `${window.location.origin}/api/v1/modules`,
        method: 'POST',
        body: module,
      }),
      transformResponse: (response: {result: Module}) => response.result,
      invalidatesTags: ['Module'],
    }),
    getModule: builder.query<Module[], ModuleQueryArg>({
      query: ({slug}) =>
        `${window.location.origin}/api/v1/modules?slug=${slug}`,
      transformResponse: (response: {result: Module[]}) => response.result,
      providesTags: ['Module'],
    }),
    getModules: builder.query<Module[], void>({
      query: () => `${window.location.origin}/api/v1/modules`,
      transformResponse: (response: {result: Module[]}) => response.result,
      providesTags: ['Module'],
    }),
  }),
  overrideExisting: true,
})

export const {useCreateModuleMutation, useGetModulesQuery, useGetModuleQuery} =
  modulesApi
