import {IconName} from '../components/ui/media/iconPath'

export type ModuleVersion = {
  description: string
  icon: IconName
  slug: string
  title: string
  version: string
}

export type ModuleInRelease = {
  appVersion: string
  moduleSlug: string
  moduleVersion: string
  status: ModuleInReleaseStatus
}

export enum ModuleInReleaseStatus {
  'uit',
  'aan',
}
