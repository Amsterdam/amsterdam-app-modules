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
            <h1>Modules</h1>
            <ul>
                {modules.map(module => (
                    <li key={module.slug}>{module.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ModulesScreen;
