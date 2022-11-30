import {moduleVersions} from '../assets/mocks/module-versions'
import Header from '../components/features/Header'
import BlockLink from '../components/ui/button/BlockLink'
import Box from '../components/ui/layout/Box'
import Screen from '../components/ui/layout/Screen'
import List from '../components/ui/text/List'
import ListItem from '../components/ui/text/ListItem'
import Phrase from '../components/ui/text/Phrase'
import Title from '../components/ui/text/Title'

const slug = 'construction-work'

const sortedVersions = [...moduleVersions[slug]].sort((a, b) =>
  b.version.localeCompare(a.version, 'nl'),
)

const latestVersionTitle = sortedVersions[0].title

console.log(sortedVersions)

const ModuleScreen = () => (
  <Screen>
    <Header />
    <Box>
      <Title>Module: {latestVersionTitle}</Title>
    </Box>
    <List>
      {sortedVersions.map(({title, version}) => (
        <ListItem key={version}>
          <BlockLink to={`/module/${slug}/edit`}>
            <Box>
              <Phrase>
                {title} {version}
              </Phrase>
            </Box>
          </BlockLink>
        </ListItem>
      ))}
    </List>
  </Screen>
)

export default ModuleScreen
