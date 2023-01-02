import {ModuleInRelease} from '../types/module'
import {Release} from '../types/release'
import {baseApi} from './baseApi'

type ReleaseQueryArg = {
  version: Release['version']
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getModulesInRelease: builder.query<ModuleInRelease[], ReleaseQueryArg>({
      query: ({version}) => `/api/v1/modules_by_app?appVersion=${version}`,
      transformResponse: (response: {result: ModuleInRelease[]}) =>
        response.result,
      providesTags: ['Release'],
    }),
    getReleases: builder.query<Release['version'][], void>({
      query: () => `/api/v1/modules_app_versions`,
      transformResponse: (response: {result: Release['version'][]}) =>
        response.result,
      providesTags: ['Release'],
    }),
  }),
  overrideExisting: true,
})

export const {useGetModulesInReleaseQuery, useGetReleasesQuery} = modulesApi
