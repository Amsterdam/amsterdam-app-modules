import {IconName} from '../components/ui/media/iconPath'

export type Slug = string

export type Module = {
  title: string
  slug: Slug
  status: number
  version: string
  icon: IconName
  description: string
}

export type ModuleVersion = {
  version: string
  title: string
}
