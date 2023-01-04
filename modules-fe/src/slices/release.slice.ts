import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'store/store'
import {Module} from 'types/module'
import {Release} from 'types/release'

const initialState: Release = {
  version: '',
  modules: [],
}

export const releaseSlice = createSlice({
  name: 'release',
  initialState,
  reducers: {
    setReleaseVersion: (
      state,
      {payload: version}: PayloadAction<Release['version']>,
    ) => {
      state.version = version
    },
    setModules: (
      state,
      {payload: modules}: PayloadAction<Release['modules']>,
    ) => {
      state.modules = modules
    },
    addModule: (state, {payload: module}: PayloadAction<Module>) => {
      state.modules.push(module)
    },
    deleteModule: (state, {payload: moduleSlug}: PayloadAction<string>) => {
      state.modules = state.modules.filter(module => module.slug !== moduleSlug)
    },
  },
})

export const {addModule, deleteModule, setModules, setReleaseVersion} =
  releaseSlice.actions

export const selectReleaseModules = (state: RootState) => state.release.modules
