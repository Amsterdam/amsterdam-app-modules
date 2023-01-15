import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {ModuleStatus} from 'types/module'
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
import ScreenTitle from '../components/ui/text/ScreenTitle'
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
  const [moduleStatus, setModuleStatus] = useState<ModuleStatus | undefined>(
    module?.status,
  )

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
      setModuleStatus(
        moduleStatus === ModuleStatus.active
          ? ModuleStatus.inactive
          : ModuleStatus.active,
      )
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
        <ScreenTitle subtitle="Module" title={latestVersion?.title} />
        <Button
          label="Moduleversie toevoegen"
          onClick={() => {
            navigate(`/module/${slug}/create`)
          }}
        />
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
        <Button
          variant="secondary"
          label={
            moduleStatus === ModuleStatus.active ? 'Uitzetten' : 'Aanzetten'
          }
          onClick={handleModuleStatusChange}
        />
      </Column>
    </Screen>
  )
}

export default ModuleScreen
