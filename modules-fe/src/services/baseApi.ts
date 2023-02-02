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
  let result = await baseQuery(args, api, extraOptions)
  if (
    result.error &&
    result.error.status === 'PARSING_ERROR' &&
    result.error.originalStatus === 401
  ) {
    const {dispatch, getState} = api
    // try to get a new token
    const refresh = selectAuthorizationRefreshToken(getState() as RootState)
    const refreshResult = await fetchBaseQuery({
      baseUrl: '/',
    })(
      {
        url: '/api/v1/token/refresh',
        method: 'POST',
        body: {refresh},
      },
      api,
      {},
    )
    if (refreshResult.data) {
      // store the new token
      dispatch(setTokens(refreshResult.data as AuthorizationResponse))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
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
