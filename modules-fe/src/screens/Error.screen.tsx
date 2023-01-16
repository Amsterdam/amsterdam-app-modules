import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import Phrase from '../components/ui/text/Phrase'

const ErrorScreen = () => (
  <Screen>
    <Column>
      <Phrase emphasis="strong">Fout 404</Phrase>
      <Phrase>Pagina niet gevonden.</Phrase>
    </Column>
  </Screen>
)

export default ErrorScreen
