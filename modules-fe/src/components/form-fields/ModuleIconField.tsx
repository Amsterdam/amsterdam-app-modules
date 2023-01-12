import TextField from '../ui/forms/TextField'
import {iconNames} from '../ui/media/iconPath'

type Props = {
  defaultValue: string | undefined
}

const ModuleIconField = ({defaultValue}: Props) => (
  <TextField
    defaultValue={defaultValue}
    label="Pictogram"
    name="icon"
    rules={{
      required: 'Geef aan welk pictogram de module illustreert.',
      validate: (value: string) =>
        iconNames.includes(value) || 'Geef de naam van een bestaand pictogram.',
    }}
  />
)

export default ModuleIconField
