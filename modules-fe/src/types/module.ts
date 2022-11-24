import { IconName } from '../components/ui/media/iconPath';

export type Module = {
    title: string;
    slug: string;
    status: number;
    version: string;
    icon: IconName;
    description: string;
};
