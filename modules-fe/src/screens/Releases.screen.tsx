import BlockLink from '../components/ui/button/BlockLink'
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
  const {data: releases, isLoading} = useGetReleasesQuery()

  if (isLoading) {
    return <LoadingBox />
  }

  if (!releases || releases.length === 0) {
    return <ErrorBox message="Geen releases gevonden." />
  }

  return (
    <Screen>
      <Column gutter="lg">
        <Title>Releases</Title>
        <Box inset="no" negativeInsetHorizontal="md">
          <List>
            {releases.map(version => (
              <ListItem key={version}>
                <BlockLink to={`/releases/${version}`}>
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
