import {Controller, UseControllerProps} from 'react-hook-form'
import Column from '../layout/Column'
import Row from '../layout/Row'
import Phrase from '../text/Phrase'
import RadioIndicator from './RadioIndicator'
import './Radio.css'

type RadioProps = {
  hasError: boolean
  option: string
} & UseControllerProps

const Radio = ({hasError, name, option, rules}: RadioProps) => (
  <Controller
    key={option}
    name={name}
    render={({field: {onChange, value}}) => {
      return (
        <Column gutter="sm" halign="start">
          <label className="Radio" htmlFor={`version-${option}`}>
            <Row gutter="sm" valign="center">
              <input
                hidden
                id={`version-${option}`}
                name="version"
                onChange={onChange}
                type="radio"
                value={option}
              />
              <RadioIndicator
                hasError={hasError}
                isSelected={value === option}
              />
              <Phrase>{option}</Phrase>
            </Row>
          </label>
        </Column>
      )
    }}
    rules={rules}
  />
)

export default Radio
