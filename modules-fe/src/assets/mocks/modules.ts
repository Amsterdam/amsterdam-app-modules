import {Module, ModuleSlug} from '../../types/module'

export const modules: Pick<Module, 'icon' | 'slug' | 'title'>[] = [
  {
    icon: 'construction-work',
    slug: ModuleSlug.ConstructionWork,
    title: 'Werkzaamheden',
  },
  {
    icon: 'alert',
    slug: ModuleSlug.ReportProblem,
    title: 'Melding doen',
  },
  {
    icon: 'chatting',
    slug: ModuleSlug.Contact,
    title: 'Contact',
  },
  {
    icon: 'checkmark',
    slug: ModuleSlug.Redirects,
    title: 'Direct regelen',
  },
  {
    icon: 'info',
    slug: ModuleSlug.About,
    title: 'Over deze app',
  },
  {
    icon: 'housing',
    slug: ModuleSlug.Welcome,
    title: 'Welkomstscherm',
  },
  {
    icon: 'trash-bin',
    slug: ModuleSlug.WasteGuide,
    title: 'Afvalwijzer',
  },
  {
    icon: 'announcement',
    slug: ModuleSlug.ConstructionWorkEditor,
    title: 'Plaats berichten',
  },
  {
    icon: 'organic-waste-container',
    slug: ModuleSlug.OpenWasteContainer,
    title: 'Gft-container openen',
  },
]
