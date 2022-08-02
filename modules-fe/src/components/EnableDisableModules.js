import styled from 'styled-components';
import Toggle from './Toggle';

const Container = styled.div`
    margin: 15px;
`;

const ModuleList = styled.div`
    padding: 8px;
`;

const Module = (props) => {
    return (
        <div
            style={{
                marginTop: 15,
                width: 324,
                display: 'flex',
                justifyContent: 'space-between'
            }}>
            {props.title}
            <div>
                <Toggle
                    key={props.identifier}
                    checked={props.checked}
                    onSwitch={props.onSwitch}
                    identifier={props.identifier} />
            </div>
        </div>
    )
}

const EnableDisableModules = (props) => {
    return (
        <Container>
            <ModuleList>
                {props.modules.map((module, index) => (
                    <Module
                        index={index}
                        key={module.slug}
                        title={module.title}
                        checked={module.status}
                        onSwitch={props.onSwitch}
                        identifier={module.slug} />
                ))}
            </ModuleList>
        </Container>
    )
}

export default EnableDisableModules