import TextField from 'components/ui/forms/TextField'

type Props = {
  defaultValue: string | undefined
}

const ModuleSlugField = ({defaultValue}: Props) => (
  <TextField
    defaultValue={defaultValue}
    label="Slug"
    name="moduleSlug"
    rules={{
      required: 'Geef de module een slug.',
      validate: (value: string) =>
        value.match(/ /) ? 'Slug mag geen spaties bevatten' : true,
    }}
    width="half"
  />
)

export default ModuleSlugField
