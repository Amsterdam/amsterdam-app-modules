import {Controller, UseControllerProps} from 'react-hook-form'
import Box from '../layout/Box'
import Column from '../layout/Column'
import Row from '../layout/Row'
import Phrase from '../text/Phrase'
import RadioIndicator from './RadioIndicator'

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
          <label htmlFor={`version-${option}`}>
            <Box insetVertical="xs">
              <Row gutter="sm" valign="center">
                <input
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
            </Box>
          </label>
        </Column>
      )
    }}
    rules={rules}
  />
)

export default Radio
