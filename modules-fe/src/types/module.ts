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
  description: string
  icon: IconName
  slug: ModuleSlug
  status: number
  title: string
  version: string
}
