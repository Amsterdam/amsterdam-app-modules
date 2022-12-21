import TextField from '../ui/forms/TextField'

type Props = {
  defaultValue: string | undefined
}

const ModuleTitleField = ({defaultValue}: Props) => (
  <TextField
    defaultValue={defaultValue}
    label="Naam"
    name="title"
    rules={{
      required: 'Geef de module een naam.',
    }}
  />
)

export default ModuleTitleField