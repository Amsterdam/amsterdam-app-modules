import {useNavigate} from 'react-router-dom'
import Button from '../components/ui/button/Button'
import Column from '../components/ui/layout/Column'
import Row from '../components/ui/layout/Row'
import Screen from '../components/ui/layout/Screen'
import Phrase from '../components/ui/text/Phrase'
import Title from '../components/ui/text/Title'

const HomeScreen = () => {
  const navigate = useNavigate()

  return (
    <Screen>
      <Column gutter="lg">
        <Title>Amsterdam App Modulebeheersysteem</Title>
        <Phrase>Wat wil je beheren?</Phrase>
        <Row gutter="md">
          <Button flex label="Modules" onClick={() => navigate('/modules')} />
          <Button flex label="Releases" onClick={() => navigate('/releases')} />
        </Row>
      </Column>
    </Screen>
  )
}

export default HomeScreen
