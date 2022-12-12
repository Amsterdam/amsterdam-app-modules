import {Controller, UseControllerProps} from 'react-hook-form'
import Column from '../layout/Column'
import Row from '../layout/Row'
import Phrase from '../text/Phrase'
import Label from './Label'

type Props = {
  label: string
  options: string[]
} & UseControllerProps

const Radio = ({label, name, options, rules}: Props) => {
  return (
    <Column gutter="sm">
      <Label text={label} />
      <Column>
        {options.map((option, index) => (
          <Controller
            key={option}
            name={name}
            render={({field: {onChange}, fieldState: {error}}) => {
              return (
                <>
                  <label htmlFor={`version-${option}`}>
                    <Row gutter="sm">
                      <input
                        id={`version-${option}`}
                        type="radio"
                        name="version"
                        onChange={onChange}
                        value={option}
                      />
                      <Phrase>{option}</Phrase>
                    </Row>
                  </label>
                  {!!error && index === options.length - 1 && (
                    <Phrase color="error">{error.message}</Phrase>
                  )}
                </>
              )
            }}
            rules={rules}
          />
        ))}
      </Column>
    </Column>
  )
}

export default Radio
