import {modulesVersions} from '../assets/mocks/modules-versions'
import {ModuleSlug} from '../types/module'

export const getModuleVersions = (moduleSlug: ModuleSlug | undefined) => {
  if (moduleSlug === undefined) {
    return undefined
  }

  return [...modulesVersions[moduleSlug]].sort((a, b) =>
    b.version.localeCompare(a.version, 'nl'),
  )
}

export const getMostRecentModuleVersion = (
  moduleSlug: ModuleSlug | undefined,
) => {
  const versions = getModuleVersions(moduleSlug)
  return versions ? versions[0] : undefined
}

export const getModuleVersion = (
  moduleSlug: ModuleSlug | undefined,
  version: string | undefined,
) => {
  const versions = getModuleVersions(moduleSlug)
  return versions ? versions.find(v => v.version === version) : undefined
}
