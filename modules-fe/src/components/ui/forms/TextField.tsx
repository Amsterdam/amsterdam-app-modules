import uniqueId from 'lodash.uniqueid'
import {Controller, UseControllerProps} from 'react-hook-form'
import Input from 'components/ui/forms/Input'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'
import './TextField.css'

enum FieldWidth {
  half = 'half',
}

type Props = {
  label: string
  width?: keyof typeof FieldWidth
} & UseControllerProps &
  React.HTMLProps<HTMLInputElement>

const TextField = ({defaultValue, label, name, rules, type, width}: Props) => {
  const id = uniqueId('TextField-')

  return (
    <Controller
      defaultValue={defaultValue || ''}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <Column gutter="sm">
          <label className="TextFieldLabel" data-width={width} htmlFor={id}>
            <Column gutter="sm">
              <Phrase color="muted">{label}</Phrase>
              <Input
                {...{id, name, onChange, type, value}}
                hasError={!!error}
              />
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
