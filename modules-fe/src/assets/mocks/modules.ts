import {Module} from '../../types/module'

export const modules: Pick<Module, 'icon' | 'slug' | 'title'>[] = [
  {
    icon: 'construction-work',
    slug: 'construction-work',
    title: 'Werkzaamheden',
  },
  {
    icon: 'alert',
    slug: 'report-problem',
    title: 'Melding doen',
  },
  {
    icon: 'chatting',
    slug: 'contact',
    title: 'Contact',
  },
  {
    icon: 'checkmark',
    slug: 'redirects',
    title: 'Direct regelen',
  },
  {
    icon: 'info',
    slug: 'about',
    title: 'Over deze app',
  },
  {
    icon: 'housing',
    slug: 'welcome',
    title: 'Welkomstscherm',
  },
  {
    icon: 'trash-bin',
    slug: 'waste-guide',
    title: 'Afvalwijzer',
  },
  {
    icon: 'announcement',
    slug: 'construction-work-editor',
    title: 'Plaats berichten',
  },
  {
    icon: 'organic-waste-container',
    slug: 'open-waste-container',
    title: 'Gft-container openen',
  },
]
