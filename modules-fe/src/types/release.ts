import {ModuleVersion} from 'types/module'

export type Release = {
  version: string
  modules: ModuleVersion[]
}

export type ReleaseBase = {
  created: string
  modified: string
  published: string
  releaseNotes: string
  unpublished: string
  version: string
}

export type ReleaseWithModuleVersions = ReleaseBase & {
  modules: ModuleVersion[]
}
