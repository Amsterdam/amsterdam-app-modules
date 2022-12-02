import {moduleVersions} from '../assets/mocks/module-versions'
import BlockLink from '../components/ui/button/BlockLink'
import Box from '../components/ui/layout/Box'
import List from '../components/ui/text/List'
import ListItem from '../components/ui/text/ListItem'
import Phrase from '../components/ui/text/Phrase'
import Title from '../components/ui/text/Title'
import {ModuleSlug} from '../types/module'

const moduleSlug = ModuleSlug.ConstructionWork

const sortedVersions = [...moduleVersions[moduleSlug]].sort((a, b) =>
  b.version.localeCompare(a.version, 'nl'),
)

const latestVersionTitle = sortedVersions[0].title

const ModuleScreen = () => (
  <>
    <Box>
      <Title>Module: {latestVersionTitle}</Title>
    </Box>
    <List>
      {sortedVersions.map(({title, version}) => (
        <ListItem key={version}>
          <BlockLink to={`/module/${moduleSlug}/edit`}>
            <Box>
              <Phrase>
                {version} {title}
              </Phrase>
            </Box>
          </BlockLink>
        </ListItem>
      ))}
    </List>
  </>
)

export default ModuleScreen
