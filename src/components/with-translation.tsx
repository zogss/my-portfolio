import React from 'react';

import { WithLanguageParams } from '@/@types/i18n.types';
import { languageCtx } from '@/lib/server-ctx';

/**
 * HOC to set the language for the component
 *
 * @param WrappedComponent - The component to wrap
 * @returns The wrapped component
 *
 * @example
 *
 * ```tsx
 * import React from 'react';
 * import { useTranslation } from '@/i18n';
 *
 * import withTranslation from '@/components/withTranslation';
 *
 * const MyComponent: React.FC = async () => {
 *  const { t } = await useTranslation();
 *
 * return <div>{t('hello')}</div>;
 * };
 *
 * export default withTranslation(MyComponent);
 *
 * ```
 */
const withTranslation = <T,>(WrappedComponent: React.FC<T>) => {
  const WithTranslations: React.FC<
    WithLanguageParams<T & React.Attributes>
  > = async (props) => {
    const { lng } = await props.params;
    if (!lng) {
      throw new Error(
        'Language not found! language is required to load translations.',
      );
    }
    try {
      languageCtx.set({ lng });
    } catch (error) {
      throw new Error(
        'An error occurred while setting language to server ctx.\n' + error,
      );
    }

    return <WrappedComponent {...props} />;
  };

  return WithTranslations;
};

export default withTranslation;
