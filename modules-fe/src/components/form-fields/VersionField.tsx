import RadioFieldSet from 'components/ui/forms/RadioFieldSet'
import {createVersionSuggestions} from 'utils/createVersionSuggestions'

type Props = {
  baseVersion: string
  defaultValue?: string
}

const VersionField = ({baseVersion, defaultValue}: Props) => (
  <RadioFieldSet
    defaultValue={defaultValue}
    label="Versie"
    name="version"
    options={createVersionSuggestions(baseVersion, defaultValue)}
    rules={{required: 'Selecteer één van de mogelijke versies.'}}
  />
)

export default VersionField
