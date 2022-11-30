import Header from '../components/features/Header'
import BlockLink from '../components/ui/button/BlockLink'
import Box from '../components/ui/layout/Box'
import Screen from '../components/ui/layout/Screen'
import List from '../components/ui/text/List'
import ListItem from '../components/ui/text/ListItem'
import Phrase from '../components/ui/text/Phrase'
import Title from '../components/ui/text/Title'
import {ModuleVersion} from '../types/module'

const versions: ModuleVersion[] = [
  {
    version: '1.0.0',
    title: 'Werk in uitvoering',
  },
  {
    version: '1.1.0',
    title: 'Bouwwerkzaamheden',
  },
  {
    version: '1.2.0',
    title: 'Projecten',
  },
  {
    version: '1.2.1',
    title: 'Gedoe in de buurt',
  },
  {
    version: '1.2.2',
    title: 'Werk in uitvoering',
  },
  {
    version: '1.2.3',
    title: 'Werkzaamheden',
  },
]

const sortedVersions = [...versions].sort((a, b) =>
  b.version.localeCompare(a.version, 'nl'),
)

const latestVersionTitle = sortedVersions[sortedVersions.length - 1].title

const ModuleScreen = () => {
  const slug = 'construction-work'

  return (
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
}

export default ModuleScreen
