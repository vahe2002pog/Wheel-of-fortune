import { useCallback, useState, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { keyCounter } from '../helpers/utils';
const popupContainer = {
    panel: lazy(() => import('../components/popup/panel')),
    dialog: lazy(() => import('../components/popup/dialog')),
    message: lazy(() => import('../components/popup/message'))
};
const contents = {
    setting: lazy(() => import('../components/popup/settings')),
    info: lazy(() => import('../components/popup/info')),
    none: () => <span></span>
};

const getId = keyCounter();

interface IPopupOpener<TTemplateOptions = {}> {
    id: string;
    componentId: TAsyncComponents;
    popupId: TAsyncPopup;
    templateOptions?: TTemplateOptions
}

export type TAsyncPopup = keyof typeof popupContainer;
export type TAsyncComponents = keyof typeof contents;
export type TOpenProps = { componentId: TAsyncComponents; popupId: TAsyncPopup; templateOptions?: object };
export type TSetOpen = (props: TOpenProps) => void;

export function useOpener() {
    const { t } = useTranslation();
    let messagesCount = -1;
    const [popups, setPopups] = useState<IPopupOpener[]>([]);
    const onClose = useCallback((id: string) => {
        setPopups((items) => {
            return items.filter((item) => item.id !== id);
        });
    }, []);

    const content = (
        <div>
            {
                popups.map((item, index: number) => {
                    const close = () => onClose(item.id);
                    const Component = contents[item.componentId];
                    const Panel = popupContainer[item.popupId];
                    messagesCount += item.popupId === 'message' ? 1 : 0;
                    return (
                        <Suspense key={item.id} fallback={<div></div>}>
                            <Panel
                                style={{ zIndex: (index + 1) * 10, '--message-index': messagesCount }}
                                onClose={close}
                                caption={t(`header.title.${item.componentId}`)}
                                { ...(item.templateOptions || {}) }>
                                <Component />
                            </Panel>
                        </Suspense>
                    );
                })
            }
        </div>
    );

    const open: TSetOpen = useCallback(({ componentId, popupId, templateOptions }: TOpenProps) => {
        setPopups((items) => {
            return [...items, { componentId, id: getId(), popupId, templateOptions }];
        });
    }, []);

    return [content, open] as [JSX.Element, TSetOpen];
}
