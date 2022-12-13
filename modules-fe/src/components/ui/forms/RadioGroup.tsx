import {UseControllerProps, useFormState} from 'react-hook-form'
import Column from '../layout/Column'
import Phrase from '../text/Phrase'
import Label from './Label'
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
      <Label text={label} />
      <Column>
        {options.map(option => (
          <Radio hasError={!!error} key={option} {...{name, option, rules}} />
        ))}
        {!!error && <Phrase color="error">{error.message as string}</Phrase>}
      </Column>
    </Column>
  )
}

export default RadioGroup
