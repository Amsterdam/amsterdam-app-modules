import {ModuleStatus, ModuleStatusInRelease} from 'types/module'

export const getCombinedStatusInReleases = (
  releasesByStatus: ModuleStatusInRelease[],
): string[] =>
  releasesByStatus
    .map(r => r.releases)
    .reduce((acc, s) => [...acc, ...s], [])
    .sort()
    .reverse()

export const getActiveReleases = (
  releasesByStatus: ModuleStatusInRelease[],
): string[] =>
  getCombinedStatusInReleases(
    releasesByStatus.filter(r => r.status === ModuleStatus.active),
  )
