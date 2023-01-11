import {UseControllerProps, useFormContext} from 'react-hook-form'
import Column from '../layout/Column'
import Row from '../layout/Row'
import Phrase from '../text/Phrase'
import './CheckboxField.css'

type IndicatorProps = {
  isSelected: boolean
}

const Indicator = ({isSelected}: IndicatorProps) => (
  <svg
    className="Indicator"
    data-is-selected={isSelected}
    width="24"
    height="24"
    viewBox="0 0 24 24">
    <rect width="24" height="24" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.1079 17.5082L4 11.0841L5.45546 9.69887L10.128 14.6173L18.5646 6L20 7.40025L10.1079 17.5082Z"
    />
  </svg>
)

type Props = {
  isGroupFormField?: boolean
  label: string
} & UseControllerProps

const CheckboxField = ({isGroupFormField, label, name}: Props) => {
  const {register, watch} = useFormContext()
  const value = isGroupFormField ? watch(name)?.includes(label) : watch(name)

  return (
    <Column gutter="sm" halign="start">
      <label className="CheckboxField" htmlFor={label}>
        <Row gutter="sm" valign="center">
          <input
            id={label}
            hidden
            {...register(name)}
            type="checkbox"
            value={isGroupFormField ? label : undefined}
          />
          <Indicator isSelected={value} />
          <Phrase>{label}</Phrase>
        </Row>
      </label>
    </Column>
  )
}

export default CheckboxField
