import {Controller, UseControllerProps} from 'react-hook-form'
import Column from '../layout/Column'
import Label from './Label'

type Props = {
  label: string
} & UseControllerProps

const Input = ({defaultValue = '', label, name, rules}: Props) => {
  return (
    <Controller
      defaultValue={defaultValue as string}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <Column gutter="sm">
          <Label text={label} />
          <input onChange={onChange} value={value} />
        </Column>
      )}
      rules={rules}
    />
  )
}

export default Input
