import {IconName} from '../components/ui/media/iconPath'

export type Module = {
  slug: string
  status: ModuleStatus
  versions: ModuleVersionWithRelease[]
}

export type ModuleVersion = {
  description: string
  icon: IconName
  moduleSlug: string
  title: string
  version: string
}

export type ModuleVersionWithRelease = ModuleVersion & {
  statusInReleases?: ModuleStatus[]
}

export type ModuleInRelease = {
  appVersion: string
  moduleSlug: string
  moduleVersion: string
  status: ModuleStatus
}

export type ModuleStatusInRelease = {
  status: ModuleStatus
  releases: string[]
}

export enum ModuleStatus {
  'uit',
  'aan',
}
