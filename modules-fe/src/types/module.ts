import {ModuleIconName} from 'components/ui/media/iconPath'

export type Module = {
  slug: string
  status: ModuleStatus
}

export type ModuleWithVersions = Module & {
  versions: ModuleVersionWithRelease[]
}

export type ModuleVersion = {
  description: string
  icon: ModuleIconName
  moduleSlug: string
  title: string
  version: string
}

export type ModuleVersionWithRelease = ModuleVersion & {
  statusInReleases?: ModuleStatusInRelease[]
}

export type ModuleInRelease = {
  moduleSlug: string
  version: string
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
