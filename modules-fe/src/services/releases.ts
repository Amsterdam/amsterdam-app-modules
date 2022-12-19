import {ModuleInRelease} from '../types/module'
import {Release} from '../types/release'
import {baseApi} from './baseApi'

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getModulesInRelease: builder.query<ModuleInRelease[], string>({
      query: version => `/api/v1/modules_by_app?appVersion=${version}`,
      transformResponse: (response: {result: ModuleInRelease[]}) =>
        response.result,
      providesTags: ['Release'],
    }),
    getReleases: builder.query<Release[], void>({
      query: () => `/api/v1/modules_app_versions`,
      transformResponse: (response: {result: Release[]}) => response.result,
      providesTags: ['Release'],
    }),
  }),
  overrideExisting: true,
})

export const {useGetModulesInReleaseQuery, useGetReleasesQuery} = modulesApi
