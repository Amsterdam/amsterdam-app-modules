import Column from '../components/ui/layout/Column';
import Row from '../components/ui/layout/Row';
import Icon from '../components/ui/media/Icon';
import List from '../components/ui/text/List';
import ListItem from '../components/ui/text/ListItem';
import Phrase from '../components/ui/text/Phrase';
import Title from '../components/ui/text/Title';
import { Module } from '../types/module';

const modules: Pick<Module, 'icon' | 'slug' | 'title'>[] = [
    {
        icon: 'construction-work',
        slug: 'construction-work',
        title: 'Werkzaamheden'
    },
    {
        icon: 'alert',
        slug: 'report-problem',
        title: 'Melding doen'
    },
    {
        icon: 'chatting',
        slug: 'contact',
        title: 'Contact'
    },
    {
        icon: 'checkmark',
        slug: 'redirects',
        title: 'Direct regelen'
    },
    {
        icon: 'info',
        slug: 'about',
        title: 'Over deze app'
    },
    {
        icon: 'housing',
        slug: 'welcome',
        title: 'Welkomstscherm'
    },
    {
        icon: 'trash-bin',
        slug: 'waste-guide',
        title: 'Afvalwijzer'
    },
    {
        icon: 'announcement',
        slug: 'construction-work-editor',
        title: 'Plaats berichten'
    },
    {
        icon: 'organic-waste-container',
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
        <Column gutter="md">
            <Title>Modules</Title>
            <List>
                {modules.map(({ icon, slug, title }) => (
                    <ListItem key={slug}>
                        <Row gutter="md" valign="baseline">
                            <Icon name={icon} />
                            <Phrase>{title}</Phrase>
                        </Row>
                    </ListItem>
                ))}
            </List>
        </Column>
    );
};

export default ModulesScreen;
