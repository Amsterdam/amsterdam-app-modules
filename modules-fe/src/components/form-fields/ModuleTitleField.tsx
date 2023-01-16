import TextField from 'components/ui/forms/TextField'

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
    width="half"
  />
)

export default ModuleTitleField
