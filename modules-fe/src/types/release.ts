import {ModuleVersion} from 'types/module'

export type ReleaseBase = {
  published: string
  releaseNotes: string
  unpublished: string
  version: string
}

export type Release = {
  created: string
  modified: string
} & ReleaseBase

export type ReleaseWithModuleVersions = Release & {
  modules: ModuleVersion[]
}
