import {ModuleVersion} from './module'

export type Release = {
  version: string
  modules: ModuleVersion[]
}
