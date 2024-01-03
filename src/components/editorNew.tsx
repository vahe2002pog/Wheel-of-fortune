import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { debounce } from '../helpers/debounce';
import { useTranslation } from '../hook/useTranslation';
import { getRandomColor, resetRandomize } from '../helpers/randomColor';

interface IProps {
    items: IPlayer[];
    disabled: boolean;
    onChange: (items: IPlayer[]) => void;
    actions: IAction[];
    indexVisible?: boolean;
}

function getLinesCount(str: string): number {
    let count = 0;
    for (let char of str) {
    if (char === '\n') {
            count++
        }
    }
    return count;
}

export default function EditorNew(props: IProps) {

    const { items, onChange: onChangeProps } = props;
    const { tr } = useTranslation();

    const onChange = useCallback((value: string) => {
        resetRandomize();
        const res = value.split('\n').map((text, index): IPlayer => {
            return {
                id: String(index),
                text,
                color: getRandomColor()
            };
        });

        onChangeProps?.(res);

    }, [onChangeProps]);

    const onChangeDebounce = useCallback(debounce(onChange, 500), [onChange]);

    const [value, setValue] = useState('');

    useEffect(() => {
        onChangeDebounce(value);
    }, [onChangeDebounce, value]);

    useEffect(() => {
        setValue(items.map(({text}) => text).join('\n'));
    }, [items]);

    const lineCount = getLinesCount(value) + 1;

    const lines = useMemo(() => {
        return Array(lineCount + 1).fill(0).map((_, i) => i + 1);
    }, [lineCount])

    return (
        <div className="player-item tw-w-full tw-contents" >
            <span></span>
            <div className='tw-relative'>
                <textarea
                    style={{ '--actions-count': props.actions.length, '--index-length': props.indexVisible ? Math.max(2, String(items.length).length) : 0 } as React.CSSProperties}
                    className="editor-area tw-w-full"
                    disabled={props.disabled}
                    value={value}
                    placeholder={tr('editor.placeholder')}
                    rows={lineCount}
                    onChange={(event) => setValue(event.target.value)}
                />
                {
                    props.indexVisible && <div className='editor-area-indexes tw-absolute tw-flex tw-flex-col tw-items-end noselect'>{lines.map((v: number) => (<span key={v}>{v}</span>))}</div>
                }
            </div>
        </div>
    );
}
