import {useParams} from 'react-router-dom'
import ErrorBox from '../components/ui/feedback/ErrorBox'
import Box from '../components/ui/layout/Box'
import Column from '../components/ui/layout/Column'
import Row from '../components/ui/layout/Row'
import Phrase from '../components/ui/text/Phrase'
import Title from '../components/ui/text/Title'
import {getModuleVersion} from '../services/modules.mock'
import {ModuleSlug} from '../types/module'

const EditModuleScreen = () => {
  const {slug, version} = useParams()
  const moduleVersion = getModuleVersion(slug as ModuleSlug, version)

  if (!moduleVersion) {
    return <ErrorBox message="Geen moduleversie." />
  }

  return (
    <Box>
      <Column gutter="xl">
        <Title>
          Module bewerken: {moduleVersion.title} {moduleVersion.version}
        </Title>
        <div>
          <Row>
            <Phrase>Naam: {moduleVersion.title}</Phrase>
          </Row>
          <Row>
            <Phrase>Versie: {moduleVersion.version}</Phrase>
          </Row>
        </div>
      </Column>
    </Box>
  )
}

export default EditModuleScreen
