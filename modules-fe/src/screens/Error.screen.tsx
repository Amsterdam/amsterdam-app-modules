import Screen from 'components/ui/layout/Screen'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'

type Props = {
  message: string
}

const ErrorScreen = ({message}: Props) => (
  <Screen>
    <Column>
      <Phrase emphasis="strong">Fout</Phrase>
      <Phrase>{message}</Phrase>
    </Column>
  </Screen>
)

export default ErrorScreen
