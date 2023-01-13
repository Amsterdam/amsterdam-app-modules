import TextField from '../ui/forms/TextField'
import {moduleIconNames} from '../ui/media/iconPath'

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
      validate: value =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        moduleIconNames.includes(value) ||
        'Geef de naam van een bestaand pictogram.',
    }}
  />
)

export default ModuleIconField
