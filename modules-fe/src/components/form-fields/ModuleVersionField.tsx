import RadioFieldSet from '../ui/forms/RadioFieldSet'

type Props = {
  baseVersion: string
  defaultValue?: string
}

const createVersionSuggestions = (
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

const ModuleVersionField = ({baseVersion, defaultValue}: Props) => (
  <RadioFieldSet
    defaultValue={defaultValue}
    label="Versie"
    name="version"
    options={createVersionSuggestions(baseVersion, defaultValue)}
    rules={{required: 'Selecteer één van de mogelijke versies.'}}
  />
)

export default ModuleVersionField
