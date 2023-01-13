import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const authorizedEndpoints = ['createModule', 'createModuleVersion']

const mockAuthorizationKey = 'mock-authorization-id'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, {endpoint}) => {
      if (authorizedEndpoints.includes(endpoint)) {
        headers.set('Authorization', mockAuthorizationKey)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Module', 'Release'],
})
