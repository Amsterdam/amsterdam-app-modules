import {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import DragDropModules from 'components/features/DragDropModules'
import VersionField from 'components/form-fields/VersionField'
import Button from 'components/ui/button/Button'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import {setModules} from 'slices/release.slice'
import {ReleaseBase, ReleaseWithModuleVersions} from 'types/release'

type Props = {
  onSubmit: (data: ReleaseBase) => void
  release: ReleaseWithModuleVersions
  versionDefaultValue?: string
}

const ReleaseForm = ({onSubmit, release, versionDefaultValue}: Props) => {
  const dispatch = useDispatch()
  const form = useFormContext<ReleaseBase>()
  const {handleSubmit} = form

  useEffect(() => {
    if (release) {
      dispatch(setModules(release.modules))
    }
  }, [dispatch, release])

  return (
    <Column gutter="lg">
      <VersionField
        baseVersion={release.version}
        defaultValue={versionDefaultValue}
      />
      <DragDropModules releaseVersion={release.version} />
      <TextField
        label="Gepubliceerd"
        name="published"
        type="date"
        width="half"
      />
      <TextField
        label="Ongepubliceerd"
        name="unpublished"
        type="date"
        width="half"
      />
      <TextField label="Release notes" name="releaseNotes" />
      <Button label="Opslaan" onClick={handleSubmit(onSubmit)} />
    </Column>
  )
}

export default ReleaseForm
