import Input from '../ui/forms/Input'

type Props = {
  defaultValue: string | undefined
}

const ModuleDescriptionField = ({defaultValue}: Props) => (
  <Input
    defaultValue={defaultValue}
    label="Omschrijving"
    name="description"
    rules={{
      required: 'Omschrijf de module in een paar woorden.',
    }}
  />
)

export default ModuleDescriptionField
