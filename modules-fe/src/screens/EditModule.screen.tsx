import {useParams} from 'react-router-dom'
import ErrorBox from '../components/ui/feedback/ErrorBox'
import Column from '../components/ui/layout/Column'
import Row from '../components/ui/layout/Row'
import Screen from '../components/ui/layout/Screen'
import Phrase from '../components/ui/text/Phrase'
import Title from '../components/ui/text/Title'
import {getModuleVersion} from '../services/modules.mock'
import {ModuleSlug} from '../types/module'

const EditModuleScreen = () => {
  const {slug, version} = useParams()
  const module = getModuleVersion(slug as ModuleSlug, version)

  if (!module) {
    return <ErrorBox message="Geen moduleversie." />
  }

  return (
    <Screen>
      <Column gutter="xl">
        <Title>
          Module bewerken: {module.title} {module.version}
        </Title>
        <Column gutter="md">
          <Row>
            <Phrase>Naam: {module.title}</Phrase>
          </Row>
          <Row>
            <Phrase>Versie: {module.version}</Phrase>
          </Row>
        </Column>
      </Column>
    </Screen>
  )
}

export default EditModuleScreen
