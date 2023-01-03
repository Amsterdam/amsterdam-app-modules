import {Module} from './module'

export type Release = {
  version: string
  modules: Module[]
}
