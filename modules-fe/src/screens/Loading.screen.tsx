import Screen from 'components/ui/layout/Screen'
import Row from '../components/ui/layout/Row'
import Icon from '../components/ui/media/Icon'
import Phrase from '../components/ui/text/Phrase'

const LoadingScreen = () => (
  <Screen>
    <Row gutter="sm" valign="center">
      <Icon name="spinner" />
      <Phrase>Laden...</Phrase>
    </Row>
  </Screen>
)

export default LoadingScreen
