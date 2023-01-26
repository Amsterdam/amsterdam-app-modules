import {baseApi} from 'services/baseApi'
import {
  ReleaseBase,
  ReleaseBaseWithModulesInRelease,
  ReleaseWithModuleVersions,
} from 'types/release'

type ReleaseQueryArg = {
  version: ReleaseBase['version']
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createRelease: builder.mutation<
      ReleaseWithModuleVersions,
      ReleaseBaseWithModulesInRelease
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
  useGetReleaseQuery,
  useGetReleasesQuery,
  useGetLatestReleaseQuery,
  useCreateReleaseMutation,
} = modulesApi
