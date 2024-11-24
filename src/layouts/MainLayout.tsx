import React from 'react';
import {GatsbyBrowser} from 'gatsby';
import {Toaster} from 'react-hot-toast';

import Loader from '@/components/Loader';

// eslint-disable-next-line react/prop-types
const MainLayout: GatsbyBrowser['wrapPageElement'] = ({element}) => (
  <>
    {element}
    <Loader />
    <Toaster
      position="bottom-right"
      containerClassName="react-hot-toast__container"
      toastOptions={{
        duration: 5000,
        className: 'react-hot-toast__toast',
      }}
    />
  </>
);

export default MainLayout;
