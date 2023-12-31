import React from 'react'
import {UseControllerProps, useFormContext} from 'react-hook-form'
import Column from 'components/ui/layout/Column'
import Row from 'components/ui/layout/Row'
import Phrase from 'components/ui/text/Phrase'
import './CheckboxField.css'

export type CheckboxValue = true | 'indeterminate' | false

type IndicatorProps = {
  checked: CheckboxValue
}

const Indicator = ({checked}: IndicatorProps) => (
  <svg
    className="Indicator"
    data-checked={checked}
    height="24"
    viewBox="0 0 24 24"
    width="24">
    <rect width="24" height="24" />
    {checked === 'indeterminate' ? (
      <line x1="5" y1="12" x2="19" y2="12" />
    ) : (
      <path d="M10.1079 17.5082L4 11.0841L5.45546 9.69887L10.128 14.6173L18.5646 6L20 7.40025L10.1079 17.5082Z" />
    )}
  </svg>
)

type Props = {
  isGroupFormField?: boolean
  label: string
} & UseControllerProps

const CheckboxField = ({isGroupFormField, label, name}: Props) => {
  const {register, setValue, watch} = useFormContext()
  const value = isGroupFormField
    ? [...(watch(name) ?? [])].includes(label)
    : watch(name)
  const {onChange: onChangeRHF, ...rest} = register(name)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (value === 'indeterminate') {
      setValue(name, true)
    } else {
      onChangeRHF(event)
    }
  }

  return (
    <Column gutter="sm" halign="start">
      <label className="CheckboxField" htmlFor={label}>
        <Row gutter="sm" valign="center">
          <input
            {...rest}
            id={label}
            hidden
            onChange={onChange}
            type="checkbox"
            value={isGroupFormField ? label : undefined}
          />
          <Indicator checked={value} />
          <Phrase>{label}</Phrase>
        </Row>
      </label>
    </Column>
  )
}

export default CheckboxField
