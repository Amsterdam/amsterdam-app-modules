import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import {
  logout,
  selectAuthorizationAccessToken,
  selectAuthorizationRefreshToken,
  setTokens,
} from 'slices/authorization.slice'
import {RootState} from 'store/store'
import {AuthorizationResponse} from 'types/authorization'
import {getTokenValidity} from 'utils/authorization'

const authorizedEndpoints = [
  'createModule',
  'createModuleVersion',
  'editModuleVersion',
  'editModuleVersionStatus',
]

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) => {
  const {dispatch, getState} = baseQueryApi
  const getNewAccessToken = async () => {
    const token = selectAuthorizationAccessToken(getState() as RootState)
    if (!getTokenValidity(token)) {
      const refresh = selectAuthorizationRefreshToken(getState() as RootState)
      const refreshResult = await fetchBaseQuery({
        baseUrl: '/',
      })(
        {
          url: '/api/v1/token/refresh',
          method: 'POST',
          body: {refresh},
        },
        baseQueryApi,
        {},
      )
      if (refreshResult.data) {
        dispatch(setTokens(refreshResult.data as AuthorizationResponse))
      } else {
        dispatch(logout())
      }
    }
  }

  if (typeof args === 'object' && authorizedEndpoints.includes(args.url)) {
    await getNewAccessToken()
  }

  return fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, {endpoint}) => {
      const token = selectAuthorizationAccessToken(getState() as RootState)
      if (authorizedEndpoints.includes(endpoint)) {
        headers.set('Authorization', token)
      }
      return headers
    },
  })(args, baseQueryApi, extraOptions)
}

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Module', 'Release'],
})
