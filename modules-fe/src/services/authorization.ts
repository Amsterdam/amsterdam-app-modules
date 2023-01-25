import {AuthorizationResponse, Login} from 'types/authorization'
import {baseApi} from './baseApi'

export const authorization = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthorizationResponse, Login>({
      query: ({username, password}) => ({
        url: '/api/v1/token/access',
        method: 'POST',
        body: {username, password},
      }),
    }),
    getRefreshToken: builder.mutation<AuthorizationResponse, string>({
      query: refreshToken => ({
        url: '/api/v1/token/refresh',
        method: 'POST',
        body: {refresh: refreshToken},
      }),
    }),
  }),
})

export const {useGetRefreshTokenMutation, useLoginMutation} = authorization
