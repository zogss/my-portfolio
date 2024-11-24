import 'firebase/firestore';

import MainLayout from '@/layouts/MainLayout';

import '@/styles/global.css';

import type {GatsbyBrowser} from 'gatsby';

export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  const htmlElement = document.getElementsByTagName('html')[0];
  if (htmlElement) {
    htmlElement.style.overflow = 'hidden';
    htmlElement.style.marginRight = '.9375rem';
  }
  const element = document.getElementById('loader-wrapper');
  if (element) {
    element.style.display = 'flex';
  }
};

export const onInitialClientRender: GatsbyBrowser['onInitialClientRender'] =
  () => {
    const htmlElement = document.getElementsByTagName('html')[0];
    if (htmlElement) {
      htmlElement.style.overflow = 'hidden';
      htmlElement.style.marginRight = '.9375rem';
    }
    const element = document.getElementById('loader-wrapper');
    if (element) {
      element.style.display = 'flex';
    }
  };

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = () => {
  setTimeout(() => {
    const htmlElement = document.getElementsByTagName('html')[0];
    if (htmlElement) {
      htmlElement.style.overflow = 'unset';
      htmlElement.style.marginRight = '0rem';
    }
    const element = document.getElementById('loader-wrapper');
    if (element) {
      element.classList.add('opacity-0');

      setTimeout(() => {
        element.style.display = 'none';
      }, 500);
    }
  }, 500);
};

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = MainLayout;
