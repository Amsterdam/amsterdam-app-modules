import uniqueId from 'lodash.uniqueid'
import {Controller, UseControllerProps} from 'react-hook-form'
import RadioIndicator from 'components/ui/forms/RadioIndicator'
import Column from 'components/ui/layout/Column'
import Row from 'components/ui/layout/Row'
import Phrase from 'components/ui/text/Phrase'
import './RadioField.css'

type RadioProps = {
  option: string
} & UseControllerProps

const RadioField = ({defaultValue, name, option, rules}: RadioProps) => {
  const id = uniqueId('RadioField-')

  return (
    <Controller
      defaultValue={defaultValue}
      key={option}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <Column gutter="sm" halign="start">
          <label className="RadioField" htmlFor={id}>
            <Row gutter="sm" valign="center">
              <input
                {...{id, name, onChange}}
                hidden
                type="radio"
                value={option}
              />
              <RadioIndicator hasError={!!error} checked={value === option} />
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
