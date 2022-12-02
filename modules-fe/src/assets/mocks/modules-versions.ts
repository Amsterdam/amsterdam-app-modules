import {ModuleSlug, ModuleVersion} from '../../types/module'

export const modulesVersions: Record<ModuleSlug, ModuleVersion[]> = {
  about: [
    {
      version: '1.0.0',
      title: 'Over deze app',
    },
  ],
  'construction-work': [
    {
      version: '1.0.0',
      title: 'Werk in uitvoering',
    },
    {
      version: '1.1.0',
      title: 'Bouwwerkzaamheden',
    },
    {
      version: '1.2.0',
      title: 'Projecten',
    },
    {
      version: '1.2.1',
      title: 'Gedoe in de buurt',
    },
    {
      version: '1.2.2',
      title: 'Werk in uitvoering',
    },
    {
      version: '1.2.3',
      title: 'Werkzaamheden',
    },
  ],
  'construction-work-editor': [
    {
      version: '1.0.0',
      title: 'Plaats berichten',
    },
  ],
  contact: [
    {
      version: '1.0.0',
      title: 'Contact',
    },
  ],
  'open-waste-container': [
    {
      version: '1.0.0',
      title: 'Gft-container openen',
    },
  ],
  redirects: [
    {
      version: '1.0.0',
      title: 'Direct regelen',
    },
  ],
  'report-problem': [
    {
      version: '1.0.0',
      title: 'Melding doen',
    },
  ],
  'waste-guide': [
    {
      version: '1.0.0',
      title: 'Afvalwijzer',
    },
  ],
  welcome: [
    {
      version: '1.0.0',
      title: 'Welkomstscherm',
    },
  ],
}
