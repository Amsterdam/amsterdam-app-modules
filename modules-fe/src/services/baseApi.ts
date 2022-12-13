import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const authorizedEndpoints = ['']

const mockUniqueId = 'mock-unique-id'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, {endpoint}) => {
      if (authorizedEndpoints.includes(endpoint)) {
        headers.set('Authorization', mockUniqueId)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Module'],
})
