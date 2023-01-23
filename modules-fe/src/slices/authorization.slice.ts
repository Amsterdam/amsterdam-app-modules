// eslint-disable-file no-use-before-define
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
      state.accessToken = access
      state.refreshToken = refresh
    },
  },
})

export const {setTokens} = authorizationSlice.actions

export const selectAuthorizationAccesstoken = (state: RootState) =>
  state.authorization.accessToken
export const selectAuthorizationRefreshtoken = (state: RootState) =>
  state.authorization.refreshToken
