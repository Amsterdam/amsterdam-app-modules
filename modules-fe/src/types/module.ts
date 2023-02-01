import {ModuleIconName} from 'components/ui/media/iconPath'

export type Module = {
  slug: string
  status: ModuleStatus
}

export type ModuleWithVersions = Module & {
  versions: ModuleVersionWithStatusInReleases[]
}

export type ModuleVersion = {
  description: string
  icon: ModuleIconName
  moduleSlug: string
  title: string
  version: string
}

export type ModuleVersionWithStatus = ModuleVersion & {
  status: ModuleStatus
}

export type ModuleVersionWithStatusInReleases = ModuleVersion & {
  statusInReleases?: ModuleStatusInRelease[]
}

export type ModuleInRelease = {
  moduleSlug: string
  version: string
}

export type ModuleWithStatusInRelease = ModuleInRelease & {
  status: ModuleStatus
}

export type ModuleStatusInRelease = {
  status: ModuleStatus
  releases: string[]
}

export enum ModuleStatus {
  'active' = 1,
  'inactive' = 0,
}
