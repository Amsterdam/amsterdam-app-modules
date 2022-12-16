import RadioGroup from '../ui/forms/RadioGroup'

type Props = {
  latestVersion: string
}

const createVersionSuggestions = (version: string) => {
  const [major, minor, patch] = version.split('.').map(Number)

  return [
    `${major}.${minor}.${patch + 1}`,
    `${major}.${minor + 1}.0`,
    `${major + 1}.0.0`,
  ]
}

const ModuleVersionField = ({latestVersion}: Props) => (
  <RadioGroup
    label="Versie"
    name="version"
    options={createVersionSuggestions(latestVersion)}
    rules={{required: 'Selecteer één van de mogelijke versies.'}}
  />
)

export default ModuleVersionField
