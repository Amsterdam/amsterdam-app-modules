import CheckboxField from 'components/ui/forms/CheckboxField'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'

type Props = {
  releases: string[]
}

const ModuleStatusField = ({releases}: Props) => {
  return (
    <Column gutter="sm">
      <Phrase color="muted">Zet aan of uit voor de volgende releases:</Phrase>
      <Column>
        {releases.map(release => (
          <CheckboxField key={release} label={release} name="releases" />
        ))}
      </Column>
    </Column>
  )
}

export default ModuleStatusField
