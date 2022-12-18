import uniqueId from 'lodash.uniqueid'
import {Controller, UseControllerProps} from 'react-hook-form'
import Column from '../layout/Column'
import Row from '../layout/Row'
import Phrase from '../text/Phrase'
import RadioIndicator from './RadioIndicator'
import './RadioField.css'

type RadioProps = {
  option: string
} & UseControllerProps

const RadioField = ({defaultValue, name, option, rules}: RadioProps) => {
  const inputId = uniqueId('RadioField-')

  return (
    <Controller
      defaultValue={defaultValue}
      key={option}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <Column gutter="sm" halign="start">
          <label className="RadioField" htmlFor={inputId}>
            <Row gutter="sm" valign="center">
              <input
                hidden
                id={inputId}
                name={name}
                onChange={onChange}
                type="radio"
                value={option}
              />
              <RadioIndicator
                hasError={!!error}
                isSelected={value === option}
              />
              <Phrase>{option}</Phrase>
            </Row>
          </label>
        </Column>
      )}
      rules={rules}
    />
  )
}

export default RadioField
