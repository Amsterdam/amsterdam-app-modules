import {baseApi} from 'services/baseApi'
import {ModuleInRelease} from 'types/module'
import {ReleaseBase, ReleaseWithModuleVersions} from 'types/release'

type ReleaseQueryArg = {
  version: ReleaseBase['version']
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getModulesInRelease: builder.query<ModuleInRelease[], ReleaseQueryArg>({
      query: ({version}) => `/api/v1/modules_by_app?appVersion=${version}`,
      transformResponse: (response: {result: ModuleInRelease[]}) =>
        response.result,
      providesTags: ['Release'],
    }),
    getLatestRelease: builder.query<ReleaseWithModuleVersions, void>({
      query: () => '/api/v1/release/latest',
      providesTags: ['Release'],
    }),
    getReleases: builder.query<ReleaseWithModuleVersions[], void>({
      query: () => '/api/v1/releases',
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
