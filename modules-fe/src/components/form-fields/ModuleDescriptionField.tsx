import TextField from 'components/ui/forms/TextField'

type Props = {
  defaultValue: string | undefined
}

const ModuleDescriptionField = ({defaultValue}: Props) => (
  <TextField
    defaultValue={defaultValue}
    label="Omschrijving"
    name="description"
    rules={{
      required: 'Omschrijf de module in een paar woorden.',
    }}
  />
)

export default ModuleDescriptionField
