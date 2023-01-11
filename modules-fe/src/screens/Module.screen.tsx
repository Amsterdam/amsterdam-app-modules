import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Icon from 'components/ui/media/Icon'
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

type Params = {
  slug: string
}

const ModuleScreen = () => {
  const navigate = useNavigate()

  const {slug} = useParams<Params>()
  const {data: module, isLoading} = useGetModuleQuery(
    slug
      ? {
          slug,
        }
      : skipToken,
  )
  const latestVersion = module?.versions[0]
  const [moduleStatus, setModuleStatus] = useState(module?.status)

  useEffect(() => {
    if (moduleStatus === undefined) {
      return
    }
    // eslint-disable-next-line no-console
    console.log("API call to update module's status") // TODO: implement API call once ready
  }, [moduleStatus])

  const handleModuleStatusChange = () => {
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        `Weet je zeker dat je alle versies van de module ${
          moduleStatus ? 'uit' : 'aan'
        } wilt zetten?`,
      )
    ) {
      setModuleStatus(moduleStatus ? 0 : 1)
    }
  }

  if (isLoading) {
    return <LoadingBox />
  }

  if (!module?.versions.length) {
    return <ErrorBox message={`Geen versies van module ‘${slug}’ gevonden.`} />
  }

  return (
    <Screen>
      <Column gutter="lg">
        <Title>Module: {latestVersion?.title}</Title>
        <Button
          label="Voeg versie toe"
          onClick={() => {
            navigate(`/module/${slug}/create`)
          }}
        />
        <Box inset="no" negativeInsetHorizontal="md">
          <List>
            {module.versions.map(({title, version}) => (
              <ListItem key={version}>
                <BlockLink to={`/module/${slug}/${version}`}>
                  <Box>
                    <Phrase>
                      {version} – {title}
                    </Phrase>
                  </Box>
                </BlockLink>
              </ListItem>
            ))}
          </List>
        </Box>
        <Button
          icon={<Icon name="spinner" size="lg" />}
          variant="secondary"
          label={moduleStatus === 1 ? 'Uitzetten' : 'Aanzetten'}
          onClick={handleModuleStatusChange}
        />
      </Column>
    </Screen>
  )
}

export default ModuleScreen
