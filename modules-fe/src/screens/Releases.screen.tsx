import {useNavigate} from 'react-router-dom'
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
import {useGetReleasesQuery} from '../services/releases'

const ReleasesScreen = () => {
  const navigate = useNavigate()

  const {data: releases, isLoading} = useGetReleasesQuery()

  if (isLoading) {
    return <LoadingBox />
  }

  if (!releases || !releases.length) {
    return <ErrorBox message="Geen releases gevonden." />
  }

  return (
    <Screen>
      <Column gutter="lg">
        <Title>Releases</Title>
        <Button
          label="Nieuwe release"
          onClick={() => navigate('/release/create')}
        />
        <Box inset="no" negativeInsetHorizontal="md">
          <List>
            {releases.map(version => (
              <ListItem key={version}>
                <BlockLink to={`/release/${version}`}>
                  <Box>
                    <Phrase>Versie {version}</Phrase>
                  </Box>
                </BlockLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Column>
    </Screen>
  )
}

export default ReleasesScreen
