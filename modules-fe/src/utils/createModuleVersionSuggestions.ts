export const createModuleVersionSuggestions = (
  baseVersion: string,
  defaultValue?: string,
) => {
  const [major, minor, patch] = baseVersion.split('.').map(Number)

  return [
    defaultValue ?? `${major}.${minor}.${patch + 1}`,
    `${major}.${minor + 1}.0`,
    `${major + 1}.0.0`,
  ]
}
