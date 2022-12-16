import Input from '../ui/forms/Input'

type Props = {
  defaultValue: string | undefined
}

const ModuleTitleField = ({defaultValue}: Props) => (
  <Input
    defaultValue={defaultValue}
    label="Naam"
    name="title"
    rules={{
      required: 'Geef de module een naam.',
    }}
  />
)

export default ModuleTitleField
