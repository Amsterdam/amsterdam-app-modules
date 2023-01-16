import uniqueId from 'lodash.uniqueid'
import {Controller, UseControllerProps} from 'react-hook-form'
import Column from '../layout/Column'
import Phrase from '../text/Phrase'
import Input from './Input'
import './TextField.css'

enum FieldWidth {
  half = 'half',
}

type Props = {
  label: string
  width?: keyof typeof FieldWidth
} & UseControllerProps

const TextField = ({defaultValue, label, name, rules, width}: Props) => {
  const id = uniqueId('TextField-')

  return (
    <Controller
      defaultValue={defaultValue as string}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <Column gutter="sm">
          <label className="TextFieldLabel" data-width={width} htmlFor={id}>
            <Column gutter="sm">
              <Phrase color="muted">{label}</Phrase>
              <Input {...{id, name, onChange, value}} hasError={!!error} />
            </Column>
          </label>
          {!!error && <Phrase color="error">{error.message}</Phrase>}
        </Column>
      )}
      rules={rules}
    />
  )
}

export default TextField
