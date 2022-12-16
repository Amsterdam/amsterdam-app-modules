import Input from '../ui/forms/Input'
import {iconNames} from '../ui/media/iconPath'

type Props = {
  defaultValue: string | undefined
}

const ModuleIconField = ({defaultValue}: Props) => (
  <Input
    defaultValue={defaultValue}
    label="Pictogram"
    name="icon"
    rules={{
      required: 'Geef aan welk pictogram de module illustreert.',
      validate: value =>
        iconNames.includes(value) || 'Geef de naam van een bestaand pictogram.',
    }}
  />
)

export default ModuleIconField
