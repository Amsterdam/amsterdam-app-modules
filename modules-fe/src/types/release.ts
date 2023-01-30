import {
  ModuleWithStatusInRelease,
  ModuleVersion,
  ModuleInRelease,
  ModuleVersionWithStatus,
} from 'types/module'

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

export type ReleaseBaseWithModulesWithStatusInRelease = ReleaseBase & {
  modules: ModuleWithStatusInRelease[]
}

export type ReleaseBaseWithModulesInRelease = ReleaseBase & {
  modules: ModuleInRelease[]
}

export type ReleaseWithModuleVersions = Release & {
  modules: ModuleVersion[]
}

export type ReleaseWithModuleVersionsWithStatus = Release & {
  modules: ModuleVersionWithStatus[]
}
