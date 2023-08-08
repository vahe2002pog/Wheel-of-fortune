import { useCallback, useState, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
const Panel = lazy(() => import('../components/panel'));
const contents = {
    setting: lazy(() => import('../components/dialog/settings')),
    info: lazy(() => import('../components/dialog/info'))
};

export type IAsyncComponents = keyof typeof contents;
export type TSetOpen = (component: IAsyncComponents) => void;

export function useOpener() {
    const { t } = useTranslation();
    const [isOpen, setOpen] = useState(false);
    const [componentId, setComponentId] = useState('info' as IAsyncComponents);
    const onClose = useCallback(() => setOpen(false), []);
    const Component = contents[componentId];
    const fallback = <div></div>;

    const content = isOpen ? (
      <Suspense fallback={fallback}>
        <Panel onClose={onClose} caption={t(`header.title.${componentId}`)}>
          <Component />
        </Panel>
      </Suspense>
    ) : (
      fallback
    );

    const open: TSetOpen = useCallback((componentId: IAsyncComponents) => {
        setOpen(true);
        setComponentId(componentId);
    }, []);

    return [content, open] as [JSX.Element, TSetOpen];
}
