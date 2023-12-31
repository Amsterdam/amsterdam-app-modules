import {useEffect} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import LoadingButton from 'components/features/LoadingButton'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import Phrase from 'components/ui/text/Phrase'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {useAuthorization} from 'hooks/useAuthorization'
import {Login} from 'types/authorization'

const LoginScreen = () => {
  const {isAccessTokenValid, isLoggingIn, logIn} = useAuthorization()
  const navigate = useNavigate()

  const form = useForm<Login>()
  const {handleSubmit} = form

  const onSubmit = (data: Login) => {
    logIn(data)
  }

  useEffect(() => {
    if (isAccessTokenValid) {
      navigate('/')
    }
  }, [isAccessTokenValid, navigate])

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle subtitle="Amsterdam App" title="Modulebeheersysteem" />
        <Phrase>Je moet inloggen om deze applicatie te gebruiken.</Phrase>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Column gutter="lg">
              <TextField
                label="E-mailadres"
                name="username"
                rules={{
                  required: 'Voer een e-mailadres in.',
                }}
                width="half"
              />
              <TextField
                label="Wachtwoord"
                name="password"
                rules={{
                  required: 'Voer een wachtwoord in.',
                }}
                type="password"
                width="half"
              />
              <LoadingButton
                label="Inloggen"
                loading={isLoggingIn}
                onClick={handleSubmit(onSubmit)}
                type="submit"
              />
            </Column>
          </form>
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default LoginScreen
