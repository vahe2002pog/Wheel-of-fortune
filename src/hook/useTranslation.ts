import { useContext } from 'react';
import { LangContext } from '../context/LangContext';

export function useTranslation() {
    return useContext(LangContext);
}
