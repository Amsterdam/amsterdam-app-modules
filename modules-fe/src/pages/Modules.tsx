import { Module } from '../types/module';

const modules: Module[] = [
    {
        description: 'Blijf op de hoogte van werkzaamheden in uw buurt.',
        icon: 'projects',
        slug: 'construction-work',
        status: 1,
        title: 'Werkzaamheden',
        version: '1.0.0'
    },
    {
        description: 'Ziet u iets wat stuk is of opgeruimd moet worden?',
        icon: 'alert',
        slug: 'report-problem',
        status: 1,
        title: 'Melding doen',
        version: '1.0.0'
    },
    {
        description: 'Heeft u een vraag of wilt u iets weten?',
        icon: 'chatting',
        slug: 'contact',
        status: 1,
        title: 'Contact',
        version: '1.0.0'
    },
    {
        description: 'Op de website vindt u alle informatie die nog niet in de app zit.',
        icon: 'checkmark',
        slug: 'redirects',
        status: 1,
        title: 'Direct regelen',
        version: '1.0.0'
    },
    {
        description: 'Lees meer over deze app en help ons de app verbeteren.',
        icon: 'info',
        slug: 'about',
        status: 1,
        title: 'Over deze app',
        version: '1.0.0'
    },
    {
        description: 'Bekijk een mooi Amsterdams beeld bij het starten van de app',
        icon: 'housing',
        slug: 'welcome',
        status: 1,
        title: 'Welkomstscherm',
        version: '1.0.0'
    },
    {
        description: 'Bekijk waar afval naartoe kan en wat de ophaaldagen zijn.',
        icon: 'trash-bin',
        slug: 'waste-guide',
        status: 1,
        title: 'Afvalwijzer',
        version: '1.0.0'
    },
    {
        description: 'Hier kun je als omgevingsmanager berichten plaatsen bij werkzaamheden',
        icon: 'announcement',
        slug: 'construction-work-editor',
        status: 1,
        title: 'Plaats berichten',
        version: '1.0.0'
    },
    {
        description: 'Open een container met de app in plaats van een plastic pas.',
        icon: 'organic-waste-container',
        slug: 'open-waste-container',
        status: 1,
        title: 'Gft-container openen',
        version: '1.0.0'
    }
];

const ModulesPage = () => {
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

export default ModulesPage;
