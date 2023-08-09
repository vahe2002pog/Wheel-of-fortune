import { useCallback, useState, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { keyCounter } from '../helpers/utils';
const popupContainer = {
    panel: lazy(() => import('../components/popup/panel')),
    dialog: lazy(() => import('../components/popup/dialog'))
};
const contents = {
    setting: lazy(() => import('../components/popup/settings')),
    info: lazy(() => import('../components/popup/info'))
};

const getId = keyCounter();

interface IPopupOpener {
    id: string;
    componentId: TAsyncComponents;
    popupId: TAsyncPopup;
}

export type TAsyncPopup = keyof typeof popupContainer;
export type TAsyncComponents = keyof typeof contents;
export type TSetOpen = (component: TAsyncComponents, popupId: TAsyncPopup) => void;

export function useOpener() {
    const { t } = useTranslation();
    const [popups, setPopups] = useState<IPopupOpener[]>([]);
    const onClose = useCallback((id: string) => {
        setPopups((items) => {
            return items.filter((item) => item.id !== id);
        });
    }, []);

    const content = (
        <div>
            {
                popups.map((item) => {
                    const close = () => onClose(item.id);
                    const Component = contents[item.componentId];
                    // const Panel = popupContainer[item.popupId];
                    const Panel = popupContainer['dialog'];
                    return (
                        <Suspense key={item.id} fallback={<div></div>}>
                            <Panel onClose={close} caption={t(`header.title.${item.componentId}`)}>
                                <Component />
                            </Panel>
                        </Suspense>
                    );
                })
            }
        </div>
    );

    const open: TSetOpen = useCallback((componentId: TAsyncComponents, popupId: TAsyncPopup) => {
        setPopups((items) => {
            return [...items, { componentId, id: getId(), popupId }];
        });
    }, []);

    return [content, open] as [JSX.Element, TSetOpen];
}
