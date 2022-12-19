import {skipToken} from '@reduxjs/toolkit/query'
import {useParams} from 'react-router-dom'
import ErrorBox from '../components/ui/feedback/ErrorBox'
import LoadingBox from '../components/ui/feedback/LoadingBox'
import Box from '../components/ui/layout/Box'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import List from '../components/ui/text/List'
import ListItem from '../components/ui/text/ListItem'
import Phrase from '../components/ui/text/Phrase'
import Title from '../components/ui/text/Title'
import {useGetModulesInReleaseQuery} from '../services/releases'
import {ModuleInReleaseStatus} from '../types/module'
import {Release} from '../types/release'

type Params = {
  version?: Release
}

const ReleaseScreen = () => {
  const {version}: Partial<Params> = useParams()
  const {data: modules, isLoading} = useGetModulesInReleaseQuery(
    version ?? skipToken,
  )

  if (isLoading) {
    return <LoadingBox />
  }

  if (!modules || !modules.length) {
    return (
      <ErrorBox message={`Geen modules gevonden voor release ${version}.`} />
    )
  }

  return (
    <Screen>
      <Column gutter="lg">
        <Title>Release: {version}</Title>
        <Box inset="no" negativeInsetHorizontal="md">
          <List>
            {modules.map(({moduleSlug, moduleVersion, status}) => (
              <ListItem key={moduleSlug}>
                <Box>
                  <Phrase>
                    {moduleSlug} – {moduleVersion} (
                    {ModuleInReleaseStatus[status]})
                  </Phrase>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Column>
    </Screen>
  )
}

export default ReleaseScreen
