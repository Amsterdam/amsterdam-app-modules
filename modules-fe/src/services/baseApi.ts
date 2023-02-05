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

const authorizedEndpoints = [
  'createModule',
  'createRelease',
  'createModuleVersion',
  'deleteModuleVersion',
  'editModule',
  'editModuleVersion',
  'editModuleVersionStatus',
  'editReleaseVersion',
]

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, {getState, endpoint}) => {
    const token = selectAuthorizationAccessToken(getState() as RootState)
    if (authorizedEndpoints.includes(endpoint)) {
      headers.set('Authorization', token)
    }

    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQueryWithArgs = baseQuery(args, api, extraOptions)

  let result = await baseQueryWithArgs
  const {error} = result

  if (error?.status === 'PARSING_ERROR' && error.originalStatus === 401) {
    const {dispatch, getState} = api

    // try to get a new token
    const refreshToken = selectAuthorizationRefreshToken(
      getState() as RootState,
    )
    const refreshTokenResponse = await fetchBaseQuery({
      baseUrl: '/',
    })(
      {
        url: '/api/v1/token/refresh',
        method: 'POST',
        body: {
          refresh: refreshToken,
        },
      },
      api,
      {},
    )

    if (refreshTokenResponse.data) {
      // store the new token
      dispatch(setTokens(refreshTokenResponse.data as AuthorizationResponse))
      // retry the initial query
      result = await baseQueryWithArgs
    } else {
      dispatch(logout())
    }
  }

  return result
}

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['Module', 'Release'],
})
