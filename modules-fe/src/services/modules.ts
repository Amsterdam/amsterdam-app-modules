import {Module, ModuleSlug} from '../types/module'
import {baseApi} from './baseApi'

type ModuleQueryArg = {
  slug: ModuleSlug
}

// TODO: Make `slug` a url part instead of a query param (BE)
// TODO: Remove the `undefined` in the `getModules` query
// TODO: Extract the `window.location.origin`
// TODO: Sort module versions descending (BE)
export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getModule: builder.query<Module[], ModuleQueryArg>({
      query: ({slug}) =>
        `${window.location.origin}/api/v1/modules?slug=${slug}`,
      transformResponse: (response: {result: Module[]}) => response.result,
    }),
    getModules: builder.query<Module[], undefined>({
      query: () => `${window.location.origin}/api/v1/modules`,
      transformResponse: (response: {result: Module[]}) => response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetModulesQuery, useGetModuleQuery} = modulesApi
