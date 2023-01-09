import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import DragDropModules from 'components/features/DragDropModules'
import Button from 'components/ui/button/Button'
import {
  setReleaseVersion,
  setModules,
  selectRelease,
} from 'slices/release.slice'
import {Module} from 'types/module'
import MockModules from '../assets/mocks/modules.json'
import ErrorBox from '../components/ui/feedback/ErrorBox'
import LoadingBox from '../components/ui/feedback/LoadingBox'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import Title from '../components/ui/text/Title'
import {useGetModulesInReleaseQuery} from '../services/releases'
import {Release} from '../types/release'

type Params = {
  version: Release['version']
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
          MockModules.find(m => m.slug === module.moduleSlug),
        )
      : []
  }, [modulesInRelease])

  useEffect(() => {
    if (version) dispatch(setReleaseVersion(version))
  }, [dispatch, version])

  useEffect(() => {
    if (modules) dispatch(setModules(modules as Module[]))
  }, [dispatch, modules])

  const onSave = () => {
    console.log(release) // TODO: PATCH release to API
  }

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
        <DragDropModules />
        <Button label="Opslaan" onClick={onSave} />
      </Column>
    </Screen>
  )
}

export default ReleaseScreen
