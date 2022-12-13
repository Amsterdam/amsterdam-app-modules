import {Controller, UseControllerProps, useFormState} from 'react-hook-form'
import Column from '../layout/Column'
import Row from '../layout/Row'
import Phrase from '../text/Phrase'
import Label from './Label'

type RadioProps = {
  option: string
} & UseControllerProps

const Radio = ({name, option, rules}: RadioProps) => (
  <Controller
    key={option}
    name={name}
    render={({field: {onChange}}) => {
      return (
        <Column gutter="sm" halign="start">
          <label htmlFor={`version-${option}`}>
            <Row gutter="sm" valign="center">
              <input
                id={`version-${option}`}
                name="version"
                onChange={onChange}
                type="radio"
                value={option}
              />
              <Phrase>{option}</Phrase>
            </Row>
          </label>
        </Column>
      )
    }}
    rules={rules}
  />
)

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
          <Radio key={option} {...{name, option, rules}} />
        ))}
        {!!error && <Phrase color="error">{error.message as string}</Phrase>}
      </Column>
    </Column>
  )
}

export default RadioGroup
