import {baseApi} from 'services/baseApi'
import {
  ReleaseBase,
  ReleaseBaseWithModulesInRelease,
  ReleaseBaseWithModulesWithStatusInRelease,
  ReleaseWithModuleVersions,
  ReleaseWithModuleVersionsWithStatus,
} from 'types/release'

type ReleaseQueryArg = {
  version: ReleaseBase['version']
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    editReleaseVersion: builder.mutation<
      ReleaseWithModuleVersions,
      Partial<ReleaseBaseWithModulesInRelease> & {pathVersion: string}
    >({
      query: ({pathVersion, ...release}) => ({
        url: `/api/v1/release/${pathVersion}`,
        method: 'PATCH',
        body: {
          ...release,
        },
      }),
      invalidatesTags: ['Module', 'Release'],
    }),
    createRelease: builder.mutation<
      ReleaseWithModuleVersions,
      ReleaseBaseWithModulesWithStatusInRelease
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
      invalidatesTags: ['Module', 'Release'],
    }),
    getLatestRelease: builder.query<ReleaseWithModuleVersions, void>({
      query: () => '/api/v1/release/latest',
      providesTags: ['Release'],
    }),
    getRelease: builder.query<
      ReleaseWithModuleVersionsWithStatus,
      ReleaseQueryArg
    >({
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
  useEditReleaseVersionMutation,
  useGetReleaseQuery,
  useGetReleasesQuery,
  useGetLatestReleaseQuery,
  useCreateReleaseMutation,
} = modulesApi
