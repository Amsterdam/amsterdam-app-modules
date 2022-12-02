import {useParams} from 'react-router-dom'
import BlockLink from '../components/ui/button/BlockLink'
import ErrorBox from '../components/ui/feedback/ErrorBox'
import Box from '../components/ui/layout/Box'
import Column from '../components/ui/layout/Column'
import List from '../components/ui/text/List'
import ListItem from '../components/ui/text/ListItem'
import Phrase from '../components/ui/text/Phrase'
import Title from '../components/ui/text/Title'
import {
  getModuleVersions,
  getMostRecentModuleVersion,
} from '../services/modules.mock'
import {ModuleSlug} from '../types/module'

const ModuleScreen = () => {
  const {slug} = useParams()
  const moduleVersions = getModuleVersions(slug as ModuleSlug)
  const mostRecentVersion = getMostRecentModuleVersion(slug as ModuleSlug)

  if (!slug) {
    return <ErrorBox message="Geen slug." />
  }

  if (!moduleVersions?.length) {
    return <ErrorBox message="Geen versies." />
  }

  return (
    <Column>
      <Box>
        <Title>Module: {mostRecentVersion?.title}</Title>
      </Box>
      <List>
        {moduleVersions.map(({title, version}) => (
          <ListItem key={version}>
            <BlockLink to={`/modules/${slug}/${version}/edit`}>
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
