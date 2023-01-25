import {useCallback, useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {
  useGetRefreshTokenMutation,
  useLoginMutation,
} from 'services/authorization'
import {
  selectAuthorizationAccessToken,
  selectAuthorizationRefreshToken,
  setTokens,
} from 'slices/authorization.slice'
import {Login} from 'types/authorization'
import {getTokenValidity} from 'utils/authorization'

export const useAuthorization = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(selectAuthorizationAccessToken)
  const refreshToken = useSelector(selectAuthorizationRefreshToken)
  const [
    loginMutation,
    {
      data: loginData,
      error: loginError,
      isLoading: isLoggingIn,
      isSuccess: loginSucceeded,
    },
  ] = useLoginMutation()
  const [refreshTokens] = useGetRefreshTokenMutation()
  const navigate = useNavigate()

  const isAccessTokenValid = useMemo(
    () => getTokenValidity(accessToken),
    [accessToken],
  )

  const isRefreshTokenValid = useMemo(
    () => getTokenValidity(refreshToken),
    [refreshToken],
  )

  const getAccessTokenWithRefreshToken = useCallback(() => {
    refreshTokens(refreshToken).then(response => {
      if ('data' in response) {
        dispatch(setTokens(response.data))
      }
    })
  }, [dispatch, refreshToken, refreshTokens])

  const logIn = useCallback(
    (credentials: Login) => {
      loginMutation(credentials).then(response => {
        if ('data' in response) {
          dispatch(setTokens(response.data))
        }
      })
    },
    [dispatch, loginMutation],
  )

  useEffect(() => {
    // check if valid access token, if so, do nothing
    if (isAccessTokenValid) {
      return
    }
    // if not, check if valid refresh token, if so, get new access token
    if (isRefreshTokenValid) {
      getAccessTokenWithRefreshToken()
      return
    }
    // if not, navigate to login page and from there call login
    navigate('/login')
  }, [
    getAccessTokenWithRefreshToken,
    isAccessTokenValid,
    isRefreshTokenValid,
    navigate,
  ])

  return {
    isAccessTokenValid,
    logIn,
    loginData,
    loginError,
    isLoggingIn,
    loginSucceeded,
  }
}
