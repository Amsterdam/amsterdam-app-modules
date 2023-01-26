import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import MockModules from 'assets/mocks/modules.json'
import DragDropModules from 'components/features/DragDropModules'
import Button from 'components/ui/button/Button'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import ErrorScreen from 'screens/Error.screen'
import LoadingScreen from 'screens/Loading.screen'
import {useGetModulesInReleaseQuery} from 'services/releases'
import {
  selectRelease,
  setModules,
  setReleaseVersion,
} from 'slices/release.slice'
import {ModuleVersion} from 'types/module'
import {ReleaseBase} from 'types/release'

type Params = {
  version: ReleaseBase['version']
}

const ReleaseScreen = () => {
  const dispatch = useDispatch()
  const release = useSelector(selectRelease)
  const {version} = useParams<Params>()
  const {data: modulesInRelease, isLoading} = useGetModulesInReleaseQuery(
    version ? {version} : skipToken,
  )
  const modules = useMemo(() => {
    return modulesInRelease
      ? modulesInRelease.map(module =>
          MockModules.find(m => m.moduleSlug === module.moduleSlug),
        )
      : []
  }, [modulesInRelease])

  useEffect(() => {
    if (version) dispatch(setReleaseVersion(version))
  }, [dispatch, version])

  useEffect(() => {
    if (modules) dispatch(setModules(modules as ModuleVersion[]))
  }, [dispatch, modules])

  const onSave = () => {
    // eslint-disable-next-line no-console
    console.log(release) // TODO: PATCH release to API
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!modules || !modules.length) {
    return (
      <ErrorScreen message={`Geen modules gevonden voor release ${version}.`} />
    )
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle subtitle="Release" title={`Amsterdam App ${version}`} />
        <DragDropModules />
        <Button label="Opslaan" onClick={onSave} />
      </Column>
    </Screen>
  )
}

export default ReleaseScreen
