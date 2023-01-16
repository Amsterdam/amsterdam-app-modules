import CheckboxField from 'components/ui/forms/CheckboxField'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'

type Props = {
  releases: string[]
}

export const selectAllLabel = 'Alle releases'

const ModuleStatusField = ({releases}: Props) => (
  <Column gutter="sm">
    <Phrase color="muted">Zet aan of uit voor de volgende releases:</Phrase>
    <Column gutter="sm">
      <Column>
        {releases.map(release => (
          <CheckboxField
            key={release}
            isGroupFormField
            label={release}
            name="releases"
          />
        ))}
      </Column>
      <CheckboxField
        key="allSelected"
        label={selectAllLabel}
        name="allSelected"
      />
    </Column>
  </Column>
)

export default ModuleStatusField
