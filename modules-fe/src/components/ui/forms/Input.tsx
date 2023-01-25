import {FieldPath, FieldPathValue, FieldValues} from 'react-hook-form'
import './Input.css'

type Props = {
  hasError: boolean
  id: string
  name: FieldPath<FieldValues>
  onChange: (...event: unknown[]) => void
  type?: string
  value: FieldPathValue<FieldValues, FieldPath<FieldValues>>
}

const Input = ({hasError, id, name, onChange, type, value}: Props) => (
  <input
    className="Input"
    data-font="body"
    data-has-error={hasError}
    id={id}
    onChange={onChange}
    type={type}
    value={value}
  />
)

export default Input
