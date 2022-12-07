import {Module, ModuleSlug} from '../../types/module'

export const modules: Omit<Module, 'status'>[] = [
  {
    description: 'Bekijk waar afval naartoe kan en wat de ophaaldagen zijn.',
    icon: 'trash-bin',
    slug: ModuleSlug.WasteGuide,
    title: 'Afvalwijzer',
    version: '1.0.0',
  },
  {
    description: 'Heeft u een vraag of wilt u iets weten?',
    icon: 'chatting',
    slug: ModuleSlug.Contact,
    title: 'Contact',
    version: '1.0.0',
  },
  {
    description:
      'Op de website vindt u alle informatie die nog niet in de app zit.',
    icon: 'checkmark',
    slug: ModuleSlug.Redirects,
    title: 'Direct regelen',
    version: '1.0.0',
  },
  {
    description: 'Open een container met de app in plaats van een plastic pas.',
    icon: 'organic-waste-container',
    slug: ModuleSlug.OpenWasteContainer,
    title: 'Gft-container openen',
    version: '1.0.0',
  },
  {
    description: 'Ziet u iets wat stuk is of opgeruimd moet worden?',
    icon: 'alert',
    slug: ModuleSlug.ReportProblem,
    title: 'Melding doen',
    version: '1.0.0',
  },
  {
    description: 'Lees meer over deze app en help ons de app verbeteren.',
    icon: 'info',
    slug: ModuleSlug.About,
    title: 'Over deze app',
    version: '1.0.0',
  },
  {
    description:
      'Hier kun je als omgevingsmanager berichten plaatsen bij werkzaamheden',
    icon: 'announcement',
    slug: ModuleSlug.ConstructionWorkEditor,
    title: 'Plaats berichten',
    version: '1.0.0',
  },
  {
    description: 'Bekijk een mooi Amsterdams beeld bij het starten van de app',
    icon: 'facade',
    slug: ModuleSlug.Welcome,
    title: 'Welkomstscherm',
    version: '1.0.1',
  },
  {
    description: 'Blijf op de hoogte van werkzaamheden in uw buurt.',
    icon: 'projects',
    slug: ModuleSlug.ConstructionWork,
    title: 'Werkzaamheden',
    version: '1.0.0',
  },
]
