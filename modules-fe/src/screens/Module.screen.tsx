import {useNavigate, useParams} from 'react-router-dom'
import BlockLink from '../components/ui/button/BlockLink'
import Button from '../components/ui/button/Button'
import ErrorBox from '../components/ui/feedback/ErrorBox'
import LoadingBox from '../components/ui/feedback/LoadingBox'
import Box from '../components/ui/layout/Box'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import List from '../components/ui/text/List'
import ListItem from '../components/ui/text/ListItem'
import Phrase from '../components/ui/text/Phrase'
import Title from '../components/ui/text/Title'
import {useGetModuleQuery} from '../services/modules'
import {ModuleSlug} from '../types/module'

const ModuleScreen = () => {
  const {slug} = useParams()
  const {data: moduleVersions, isLoading} = useGetModuleQuery({
    slug: slug as ModuleSlug,
  })
  const mostRecentVersion = moduleVersions?.[0]
  const navigate = useNavigate()

  if (!slug) {
    return <ErrorBox message="Geen slug." />
  }

  if (isLoading) {
    return <LoadingBox />
  }

  if (!moduleVersions?.length) {
    return <ErrorBox message="Geen versies." />
  }

  return (
    <Screen>
      <Column>
        <Box>
          <Title>Module: {mostRecentVersion?.title}</Title>
        </Box>
        <Button
          label="Maak nieuwe versie"
          onClick={() => {
            navigate(`/modules/${slug}/create`, {
              state: {mostRecentVersion},
            })
          }}
        />
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
    </Screen>
  )
}

export default ModuleScreen
