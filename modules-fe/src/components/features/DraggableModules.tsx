import Draggable from 'components/drag-n-drop/Draggable'
import Droppable from 'components/drag-n-drop/Droppable'
import Module from 'components/ui/containers/Module'
import Box from 'components/ui/layout/Box'
import Column from 'components/ui/layout/Column'
import List from 'components/ui/text/List'
import ListItem from 'components/ui/text/ListItem'
import Phrase from 'components/ui/text/Phrase'
import {ModuleVersion} from 'types/module'

type DraggableModulesProps = {
  droppableId: string
  modules: ModuleVersion[]
  variant?: 'active' | 'inactive'
}

const DraggableModules = ({
  droppableId,
  modules,
  variant = 'active',
}: DraggableModulesProps) => {
  const isActive = variant === 'active'
  const phraseColor = isActive ? undefined : 'muted'

  return (
    <Column gutter="md">
      <Phrase color="muted">
        Modules {variant !== 'active' ? 'niet' : undefined} in deze release
      </Phrase>
      <Droppable droppableId={droppableId}>
        <List>
          {modules.map(({icon, moduleSlug, title, version}, index) => (
            <Draggable
              key={moduleSlug + version}
              draggableId={moduleSlug + version}
              index={index}>
              <ListItem>
                <Box>
                  <Module color={phraseColor} {...{icon, title, version}} />
                </Box>
              </ListItem>
            </Draggable>
          ))}
        </List>
      </Droppable>
    </Column>
  )
}

export default DraggableModules
