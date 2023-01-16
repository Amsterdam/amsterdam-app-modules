import {UseControllerProps, useFormState} from 'react-hook-form'
import RadioField from 'components/ui/forms/RadioField'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'

type RadioGroupProps = {
  label: string
  options: string[]
} & UseControllerProps

const RadioFieldSet = ({
  defaultValue,
  label,
  name,
  options,
  rules,
}: RadioGroupProps) => {
  const {errors} = useFormState({name})
  const error = errors[name]

  return (
    <Column gutter="sm">
      <Phrase color="muted">{label}</Phrase>
      <Column>
        {options.map(option => (
          <RadioField key={option} {...{defaultValue, name, option, rules}} />
        ))}
        {!!error && <Phrase color="error">{error.message as string}</Phrase>}
      </Column>
    </Column>
  )
}

export default RadioFieldSet
