import { useCallback, useState, lazy, Suspense, useMemo } from 'react';
import { keyCounter } from '../helpers/utils';
import { useTranslation } from './useTranslation';
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
const initPopups: IPopupOpener[] = [];

export function useOpener() {
    const { tr } = useTranslation();
    const [popups, setPopups] = useState<IPopupOpener[]>(initPopups);

    const content = useMemo(() => {
        let messagesCount = -1;
        return (
            <div>
                {
                    popups.map((item, index: number) => {
                        const close = () => setPopups((popups) => {
                            return popups.filter((p) => item.id !== p.id);
                        });
                        const Component = contents[item.componentId];
                        const Panel = popupContainer[item.popupId];
                        if (item.popupId === 'message') {
                            messagesCount++;
                        }
                        return (
                            <Suspense key={item.id} fallback={<div></div>}>
                                <Panel
                                    style={{ zIndex: (index + 1) * 10, '--message-index': messagesCount }}
                                    onClose={close}
                                    caption={tr(`header.title.${item.componentId}`)}
                                    { ...(item.templateOptions || {}) }>
                                    <Component />
                                </Panel>
                            </Suspense>
                        );
                    })
                }
            </div>
        )
    }, [popups, tr]);

    const open: TSetOpen = useCallback(({ componentId, popupId, templateOptions }: TOpenProps) => {
        setPopups((items) => {
            return [...items, { componentId, id: getId(), popupId, templateOptions }];
        });
    }, []);

    return [content, open] as [JSX.Element, TSetOpen];
}
