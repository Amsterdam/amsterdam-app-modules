import {Controller, UseControllerProps, useFormState} from 'react-hook-form'
import Column from '../layout/Column'
import Row from '../layout/Row'
import Phrase from '../text/Phrase'
import Label from './Label'

type RadioIndicatorProps = {
  hasError: boolean
  isSelected: boolean
}

const RadioIndicator = ({hasError, isSelected}: RadioIndicatorProps) => (
  <svg viewBox="0 0 24 24" width={24} height={24}>
    <circle
      cx="12"
      cy="12"
      fill="white"
      r="11"
      stroke={hasError ? '#ec0000' : '#004699'}
      strokeWidth="2"
    />
    {isSelected && (
      <circle cx="12" cy="12" fill={hasError ? '#ec0000' : '#004699'} r="8" />
    )}
  </svg>
)

type RadioProps = {
  hasError: boolean
  option: string
} & UseControllerProps

const Radio = ({hasError, name, option, rules}: RadioProps) => (
  <Controller
    key={option}
    name={name}
    render={({field: {onChange, value}}) => {
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
              <RadioIndicator
                hasError={hasError}
                isSelected={value === option}
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
          <Radio hasError={!!error} key={option} {...{name, option, rules}} />
        ))}
        {!!error && <Phrase color="error">{error.message as string}</Phrase>}
      </Column>
    </Column>
  )
}

export default RadioGroup
