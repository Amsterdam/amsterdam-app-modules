import {ModuleVersion} from 'types/module'

export type ReleaseBase = {
  published: string | null
  releaseNotes: string
  unpublished: string | null
  version: string
}

export type Release = {
  created: string
  modified: string
} & ReleaseBase

export type ReleaseBaseWithModuleVersions = ReleaseBase & {
  modules: ModuleVersion[]
}

export type ReleaseWithModuleVersions = Release & {
  modules: ModuleVersion[]
}
