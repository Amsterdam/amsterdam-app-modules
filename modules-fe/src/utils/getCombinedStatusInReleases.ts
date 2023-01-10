import {ModuleStatusInRelease} from 'types/module'

export const getCombinedStatusInReleases = (
  releasesByStatus: ModuleStatusInRelease[],
): string[] =>
  releasesByStatus
    .map(r => r.releases)
    .reduce((acc, s) => [...acc, ...s], [])
    .sort()
