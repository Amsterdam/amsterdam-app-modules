import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'store/store'
import {AuthorizationResponse, AuthorizationToken} from 'types/authorization'

const initialState: AuthorizationToken = {
  accessToken: '',
  refreshToken: '',
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setTokens: (
      state,
      {payload: {access, refresh}}: PayloadAction<AuthorizationResponse>,
    ) => {
      if (refresh !== undefined) {
        state.refreshToken = refresh
      }
      state.accessToken = access
    },
    logout: () => initialState,
  },
})

export const {logout, setTokens} = authorizationSlice.actions

export const selectAuthorizationAccessToken = (state: RootState) =>
  state.authorization.accessToken
export const selectAuthorizationRefreshToken = (state: RootState) =>
  state.authorization.refreshToken
