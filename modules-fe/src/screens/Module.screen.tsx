import {useParams} from 'react-router-dom'
import {modulesVersions} from '../assets/mocks/modules-versions'
import BlockLink from '../components/ui/button/BlockLink'
import ErrorBox from '../components/ui/feedback/ErrorBox'
import Box from '../components/ui/layout/Box'
import Column from '../components/ui/layout/Column'
import List from '../components/ui/text/List'
import ListItem from '../components/ui/text/ListItem'
import Phrase from '../components/ui/text/Phrase'
import Title from '../components/ui/text/Title'
import {ModuleSlug} from '../types/module'

const getModuleVersions = (moduleSlug: ModuleSlug | undefined) => {
  if (moduleSlug === undefined) {
    return undefined
  }

  return [...modulesVersions[moduleSlug]].sort((a, b) =>
    b.version.localeCompare(a.version, 'nl'),
  )
}

const ModuleScreen = () => {
  const {slug} = useParams()
  const moduleVersions = getModuleVersions(slug as ModuleSlug)

  if (!slug) {
    return <ErrorBox message="Geen slug." />
  }

  if (!moduleVersions?.length) {
    return <ErrorBox message="Geen versies." />
  }

  return (
    <Column gutter="md">
      <Box>
        <Title>Module: {moduleVersions[0].title}</Title>
      </Box>
      <List>
        {moduleVersions.map(({title, version}) => (
          <ListItem key={version}>
            <BlockLink to={`/module/${slug}/edit`}>
              <Box>
                <Phrase>
                  {version} – {title}
                </Phrase>
              </Box>
            </BlockLink>
          </ListItem>
        ))}
      </List>
    </Column>
  )
}

export default ModuleScreen
