import capitalize from 'lodash.capitalize'
import {useCallback} from 'react'
import {useForm, FormProvider, SubmitHandler} from 'react-hook-form'
import {useParams} from 'react-router-dom'
import Input from 'components/ui/forms/Input'
import Box from '../components/ui/layout/Box'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import Title from '../components/ui/text/Title'

const CreateModuleVersionScreen = () => {
  const {slug} = useParams()
  const form = useForm<FormData>()

  const {handleSubmit} = form

  const onSubmitForm: SubmitHandler<FormData> = useCallback(data => {
    console.log(data)
  }, [])

  return (
    <Screen>
      <Column>
        <Box>
          <Title>Nieuwe versie module: {capitalize(slug)}</Title>
        </Box>
        <Box>
          <FormProvider {...form}>
            <Column gutter="md">
              <Input
                label="Naam"
                name="title"
                rules={{
                  required: 'Vul een titel in',
                }}
              />
              <button onClick={handleSubmit(onSubmitForm)} type="submit">
                Opslaan
              </button>
            </Column>
          </FormProvider>
        </Box>
      </Column>
    </Screen>
  )
}

export default CreateModuleVersionScreen
