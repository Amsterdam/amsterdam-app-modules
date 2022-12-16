import {UseControllerProps, useFormState} from 'react-hook-form'
import Column from '../layout/Column'
import Phrase from '../text/Phrase'
import Radio from './Radio'

type RadioGroupProps = {
  label: string
  options: string[]
} & UseControllerProps

const RadioGroup = ({label, name, options, rules}: RadioGroupProps) => {
  const {errors} = useFormState({name})
  const error = errors[name]

  return (
    <Column gutter="sm">
      <Phrase color="muted">{label}</Phrase>
      <Column>
        {options.map(option => (
          <Radio key={option} {...{name, option, rules}} />
        ))}
        {!!error && <Phrase color="error">{error.message as string}</Phrase>}
      </Column>
    </Column>
  )
}

export default RadioGroup
