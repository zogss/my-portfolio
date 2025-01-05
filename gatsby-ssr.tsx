import type {GatsbyBrowser} from 'gatsby';

import MainLayout from '@/layouts/MainLayout';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = MainLayout;
