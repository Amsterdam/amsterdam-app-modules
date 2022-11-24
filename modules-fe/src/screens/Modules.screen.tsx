import Row from '../components/ui/layout/Row';
import List from '../components/ui/text/List';
import ListItem from '../components/ui/text/ListItem';
import Phrase from '../components/ui/text/Phrase';
import Title from '../components/ui/text/Title';
import { Module } from '../types/module';

const modules: Pick<Module, 'slug' | 'title'>[] = [
    {
        slug: 'construction-work',
        title: 'Werkzaamheden'
    },
    {
        slug: 'report-problem',
        title: 'Melding doen'
    },
    {
        slug: 'contact',
        title: 'Contact'
    },
    {
        slug: 'redirects',
        title: 'Direct regelen'
    },
    {
        slug: 'about',
        title: 'Over deze app'
    },
    {
        slug: 'welcome',
        title: 'Welkomstscherm'
    },
    {
        slug: 'waste-guide',
        title: 'Afvalwijzer'
    },
    {
        slug: 'construction-work-editor',
        title: 'Plaats berichten'
    },
    {
        slug: 'open-waste-container',
        title: 'Gft-container openen'
    }
];

const ModulesScreen = () => {
    // const { data: modules, isLoading } = useGetModulesQuery(undefined);

    // if (isLoading) {
    //     return <p>loading...</p>;
    // }

    if (!modules) {
        return <p>Helaas</p>;
    }

    return (
        <div>
            <Title>Modules</Title>
            <List>
                {modules.map(module => (
                    <ListItem key={module.slug}>
                        <Row gutter="md">
                            <Phrase>{module.title}</Phrase>
                        </Row>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ModulesScreen;
