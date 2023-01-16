import Screen from 'components/ui/layout/Screen'
import Row from '../layout/Row'
import Icon from '../media/Icon'
import Phrase from '../text/Phrase'

const LoadingScreen = () => (
  <Screen>
    <Row gutter="sm" valign="center">
      <Icon name="spinner" />
      <Phrase>Laden...</Phrase>
    </Row>
  </Screen>
)

export default LoadingScreen
