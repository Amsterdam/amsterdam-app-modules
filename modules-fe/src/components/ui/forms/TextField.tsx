import {Controller, UseControllerProps} from 'react-hook-form'
import './TextField.css'
import Column from '../layout/Column'
import Phrase from '../text/Phrase'

type Props = {
  label: string
} & UseControllerProps

const TextField = ({defaultValue, label, name, rules}: Props) => (
  <Controller
    defaultValue={defaultValue as string}
    name={name}
    render={({field: {onChange, value}, fieldState: {error}}) => (
      <Column gutter="sm">
        <label htmlFor={`Input-${name}`}>
          <Column gutter="sm">
            <Phrase color="muted">{label}</Phrase>
            <input
              className="Input"
              id={`Input-${name}`}
              data-font="body"
              data-has-error={!!error}
              onChange={onChange}
              value={value}
            />
          </Column>
        </label>
        {!!error && <Phrase color="error">{error.message}</Phrase>}
      </Column>
    )}
    rules={rules}
  />
)

export default TextField
