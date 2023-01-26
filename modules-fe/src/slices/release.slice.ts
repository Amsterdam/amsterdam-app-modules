import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'store/store'
import {ModuleVersion} from 'types/module'
import {ReleaseWithModuleVersions} from 'types/release'

type State = {
  modules: ModuleVersion[]
}

const initialState: State = {
  modules: [],
}

export const releaseSlice = createSlice({
  name: 'release',
  initialState,
  reducers: {
    setModules: (
      state,
      {payload: modules}: PayloadAction<ReleaseWithModuleVersions['modules']>,
    ) => {
      state.modules = modules
    },
    addModule: (state, {payload: module}: PayloadAction<ModuleVersion>) => {
      state.modules.push(module)
    },
    deleteModule: (state, {payload: moduleSlug}: PayloadAction<string>) => {
      state.modules = state.modules.filter(
        module => module.moduleSlug !== moduleSlug,
      )
    },
  },
})

export const {addModule, deleteModule, setModules} = releaseSlice.actions

export const selectReleaseModules = (state: RootState) => state.release.modules
