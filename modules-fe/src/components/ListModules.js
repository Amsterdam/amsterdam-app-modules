import styled from 'styled-components';

const Container = styled.div`
    margin: 15px;
`;

const ModuleList = styled.div`
    padding: 8px;
`;

const ListModules = (props) => {
    return (
        <Container>
            <ModuleList>
                {props.modules.map((module, index) => (
                    <div
                        key={module.slug}
                        style={{
                            color: 'black',
                            marginTop: 15,
                            width: 324
                        }}>
                        {module.title}
                    </div>
                ))}
            </ModuleList>
        </Container>
    )
}

export default ListModules