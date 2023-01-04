import TextField from '../ui/forms/TextField'

type Props = {
  defaultValue: string | undefined
}

const ModuleSlugField = ({defaultValue}: Props) => (
  <TextField
    defaultValue={defaultValue}
    label="Slug"
    name="slug"
    rules={{
      required: 'Geef de module een slug.',
      validate: (value: string) =>
        value.match(/ /) ? 'Slug mag geen spaties bevatten' : true,
    }}
  />
)

export default ModuleSlugField
