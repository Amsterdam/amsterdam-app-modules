import uniqueId from 'lodash.uniqueid'
import {Controller, UseControllerProps} from 'react-hook-form'
import Column from '../layout/Column'
import Row from '../layout/Row'
import Phrase from '../text/Phrase'
import RadioIndicator from './RadioIndicator'
import './Radio.css'

type RadioProps = {
  option: string
} & UseControllerProps

const Radio = ({name, option, rules}: RadioProps) => {
  const inputId = uniqueId('Radio-')

  return (
    <Controller
      key={option}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <Column gutter="sm" halign="start">
          <label className="Radio" htmlFor={inputId}>
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

export default Radio
