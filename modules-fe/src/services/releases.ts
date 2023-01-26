import {baseApi} from 'services/baseApi'
import {ModuleInRelease} from 'types/module'
import {
  ReleaseBase,
  ReleaseBaseWithModuleVersions,
  ReleaseWithModuleVersions,
} from 'types/release'

type ReleaseQueryArg = {
  version: ReleaseBase['version']
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createRelease: builder.mutation<
      ReleaseWithModuleVersions,
      ReleaseBaseWithModuleVersions
    >({
      query: ({published, unpublished, ...release}) => ({
        url: '/api/v1/release',
        method: 'POST',
        body: {
          published: published || null,
          unpublished: unpublished || null,
          ...release,
        },
      }),
      invalidatesTags: ['Release'],
    }),
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
    getRelease: builder.query<ReleaseWithModuleVersions, ReleaseQueryArg>({
      query: ({version}) => `/api/v1/release/${version}`,
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
  useGetReleaseQuery,
  useGetReleasesQuery,
  useGetLatestReleaseQuery,
  useCreateReleaseMutation,
} = modulesApi
