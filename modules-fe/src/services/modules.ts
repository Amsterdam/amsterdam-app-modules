import {baseApi} from 'services/baseApi'
import {
  Module,
  ModuleVersion,
  ModuleVersionWithRelease,
  ModuleWithVersions,
} from 'types/module'

type ModuleQueryArg = {
  slug: string
}

type ModuleVersionQueryArg = {
  slug: string
  version: string
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createModule: builder.mutation<Module, Module>({
      query: module => ({
        url: `/api/v1/module`,
        method: 'POST',
        body: {...module},
      }),
      invalidatesTags: ['Module'],
    }),
    createModuleVersion: builder.mutation<ModuleVersion, ModuleVersion>({
      query: module => ({
        url: `/api/v1/module/${module.moduleSlug}/version`,
        method: 'POST',
        body: {...module},
      }),
      transformResponse: (response: {result: ModuleVersion}) => response.result,
      invalidatesTags: ['Module'],
    }),
    editModule: builder.mutation<ModuleVersion, ModuleVersion>({
      query: module => ({
        url: `/api/v1/modules`,
        method: 'POST',
        body: {...module},
      }),
      transformResponse: (response: {result: ModuleVersion}) => response.result,
      invalidatesTags: ['Module'],
    }),
    editModuleVersion: builder.mutation<
      ModuleVersion,
      Partial<ModuleVersion> & {pathVersion: string}
    >({
      query: ({moduleSlug, pathVersion, ...rest}) => ({
        url: `/api/v1/module/${moduleSlug}/version/${pathVersion}`,
        method: 'PATCH',
        body: {...rest},
      }),
      invalidatesTags: ['Module'],
    }),
    getModule: builder.query<ModuleWithVersions, ModuleQueryArg>({
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
  useCreateModuleVersionMutation,
  useEditModuleMutation,
  useEditModuleVersionMutation,
  useGetModuleQuery,
  useGetModuleVersionQuery,
  useGetModulesQuery,
} = modulesApi
