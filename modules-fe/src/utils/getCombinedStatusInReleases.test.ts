import {getCombinedStatusInReleases} from './getCombinedStatusInReleases'

describe('getAllReleases', () => {
  it('should return all the releases in an array', () => {
    const releasesByStatus = [
      {
        status: 0,
        releases: ['Release 1', 'Release 3'],
      },
      {
        status: 1,
        releases: ['Release 2', 'Release 4'],
      },
    ]
    const expected = ['Release 1', 'Release 2', 'Release 3', 'Release 4']
    expect(getCombinedStatusInReleases(releasesByStatus)).toEqual(expected)
  })

  it('should return empty array when there are no releases', () => {
    const releasesByStatus = [
      {
        status: 0,
        releases: [],
      },
      {
        status: 1,
        releases: [],
      },
    ]
    const expected: unknown[] = []
    expect(getCombinedStatusInReleases(releasesByStatus)).toEqual(expected)
  })
})
