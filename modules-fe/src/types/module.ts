import {IconName} from '../components/ui/media/iconPath'

export enum ModuleSlug {
  About = 'about',
  ConstructionWork = 'construction-work',
  ConstructionWorkEditor = 'construction-work-editor',
  Contact = 'contact',
  OpenWasteContainer = 'open-waste-container',
  Redirects = 'redirects',
  ReportProblem = 'report-problem',
  WasteGuide = 'waste-guide',
  Welcome = 'welcome',
}

export type Module = {
  title: string
  slug: ModuleSlug
  status: number
  version: string
  icon: IconName
  description: string
}

export type ModuleVersion = {
  title: string
  version: string
}
