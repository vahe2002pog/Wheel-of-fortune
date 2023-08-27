import '../../styles/settings.css';
import { useTranslation } from '../../hook/useTranslation';
import { useCallback, useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import { ROTATION_TIME } from '../../helpers/constants';
import { Text } from '../text';
interface IProps {

}

export default function Settings(props: IProps) {

    const {tr} = useTranslation();
    const {
        rotationTime, setRotationTime,
        playersIndexVisible, setPlayersIndexVisible,
        newEditor, setNewEditor
    } = useContext(SettingsContext);

    const reset = useCallback(() => {
        setRotationTime(ROTATION_TIME);
        setPlayersIndexVisible(true);
        setNewEditor(false);
    }, [setRotationTime, setPlayersIndexVisible, setNewEditor]);

    return (
        <div>
            <div className='settings-row'>
                <label className='settings-label' htmlFor='rotation-time'>{tr('settings.rotation-time')}</label>
                <div className='tw-flex' >
                    <input
                        className='tw-flex-1'
                        type='range'
                        id='rotation-time'
                        min='500'
                        max='10000'
                        value={rotationTime}
                        step='500'
                        onChange={(e) => setRotationTime(Number(e.target.value))}
                    />
                    <span className='settings_rotation-time__value'>
                        {rotationTime / 1000} {tr('settings.rotation-s')}
                    </span>
                </div>
            </div>
            <div className='settings-row tw-flex'>
                <label className='settings-label noselect' htmlFor='players-index-visible'>{tr('settings.players-index-visible')}</label>
                <input
                    type='checkbox'
                    id='players-index-visible'
                    checked={playersIndexVisible}
                    onChange={(e) => setPlayersIndexVisible(e.target.checked)}
                />
            </div>
            <div className='settings-row tw-flex'>
                <label className='settings-label noselect' htmlFor='players-index-visible'>Многострочный редактор</label>
                <input
                    type='checkbox'
                    id='players-index-visible'
                    checked={newEditor}
                    onChange={(e) => setNewEditor(e.target.checked)}
                />
            </div>
            <div className='settings-row tw-flex tw-justify-end'>
                <Text text={tr('settings.reset-all')} onClick={reset} />
            </div>
        </div>
    );
};
