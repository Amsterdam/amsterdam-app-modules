import ReleaseMock from '../assets/mocks/release.json'
import {Module} from '../types/module'
import {Release} from '../types/release'
import {baseApi} from './baseApi'

type ReleaseQueryArg = {
  version: Release['version']
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getModulesInRelease: builder.query<Module[], ReleaseQueryArg>({
      query: ({version}) => `/api/v1/modules_by_app?appVersion=${version}`,
      transformResponse: (response: {result: Module[]}) =>
        ReleaseMock.result as Module[],
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
