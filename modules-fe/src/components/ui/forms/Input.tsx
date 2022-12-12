import {Controller, UseControllerProps} from 'react-hook-form'
import './Input.css'
import Column from '../layout/Column'
import Phrase from '../text/Phrase'
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
          <input
            className="Input"
            data-has-error={!!error}
            onChange={onChange}
            value={value}
          />
          {!!error && <Phrase color="error">{error.message}</Phrase>}
        </Column>
      )}
      rules={rules}
    />
  )
}

export default Input
