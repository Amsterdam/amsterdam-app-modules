import {createVersionSuggestions} from './createVersionSuggestions'

describe('createVersionSuggestions', () => {
  it('should create version suggestions based on base version', () => {
    const baseVersion = '1.2.3'
    const expected = ['1.2.4', '1.3.0', '2.0.0']

    expect(createVersionSuggestions(baseVersion)).toEqual(expected)
  })

  it('should use default value when provided', () => {
    const baseVersion = '1.2.3'
    const defaultValue = '2.0.0'
    const expected = [defaultValue, '1.3.0', '2.0.0']

    expect(createVersionSuggestions(baseVersion, defaultValue)).toEqual(
      expected,
    )
  })

  it('should handle base version with non-numeric characters', () => {
    const baseVersion = '1.a.b'
    const expected = ['1.NaN.NaN', '1.NaN.0', '2.0.0']

    expect(createVersionSuggestions(baseVersion)).toEqual(expected)
  })
})
