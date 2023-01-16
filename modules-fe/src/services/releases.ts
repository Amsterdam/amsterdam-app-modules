import LatestReleaseMock from 'assets/mocks/latestRelease.json'
import {baseApi} from 'services/baseApi'
import {ModuleInRelease} from 'types/module'
import {Release} from 'types/release'

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
    getLatestRelease: builder.query<Release, void>({
      query: () => '/api/v1/modules/latest',
      transformResponse: (response: {result: Release}) =>
        LatestReleaseMock.result as Release,
      providesTags: ['Release'],
    }),
    getReleases: builder.query<Release['version'][], void>({
      query: () => '/api/v1/modules_app_versions',
      transformResponse: (response: {result: Release['version'][]}) =>
        response.result,
      providesTags: ['Release'],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetModulesInReleaseQuery,
  useGetReleasesQuery,
  useGetLatestReleaseQuery,
} = modulesApi
