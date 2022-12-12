import {Controller, UseControllerProps} from 'react-hook-form'
import Column from '../layout/Column'
import Row from '../layout/Row'
import Phrase from '../text/Phrase'
import Label from './Label'

type Props = {
  label: string
  options: string[]
} & UseControllerProps

const RadioGroup = ({label, name, options, rules}: Props) => (
  <Column gutter="sm">
    <Label text={label} />
    <Column>
      {options.map((option, index) => (
        <Controller
          key={option}
          name={name}
          render={({field: {onChange}, fieldState: {error}}) => {
            return (
              <Column gutter="sm" halign="start">
                <label htmlFor={`version-${option}`}>
                  <Row gutter="sm" valign="center">
                    <input
                      id={`version-${option}`}
                      name="version"
                      onChange={onChange}
                      type="radio"
                      value={option}
                    />
                    <Phrase>{option}</Phrase>
                  </Row>
                </label>
                {!!error && index === options.length - 1 && (
                  <Phrase color="error">{error.message}</Phrase>
                )}
              </Column>
            )
          }}
          rules={rules}
        />
      ))}
    </Column>
  </Column>
)

export default RadioGroup
