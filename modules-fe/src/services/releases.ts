import {Release} from '../types/release'
import {baseApi} from './baseApi'

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getReleases: builder.query<Release[], void>({
      query: () => `/api/v1/modules_app_versions`,
      transformResponse: (response: {result: Release[]}) => response.result,
      providesTags: ['Release'],
    }),
  }),
  overrideExisting: true,
})

export const {useGetReleasesQuery} = modulesApi
