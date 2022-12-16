import {useParams} from 'react-router-dom'
import Column from '../components/ui/layout/Column'
import Row from '../components/ui/layout/Row'
import Screen from '../components/ui/layout/Screen'
import Phrase from '../components/ui/text/Phrase'
import Title from '../components/ui/text/Title'

const EditModuleScreen = () => {
  const {slug, version} = useParams()

  return (
    <Screen>
      <Column gutter="xl">
        <Title>Module bewerken</Title>
        <Column gutter="md">
          <Row>
            <Phrase>Slug: {slug}</Phrase>
          </Row>
          <Row>
            <Phrase>Versie: {version}</Phrase>
          </Row>
        </Column>
      </Column>
    </Screen>
  )
}

export default EditModuleScreen
