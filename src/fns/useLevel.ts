import { useCookies } from 'react-cookie';
import CONSTANTS from '@/constants/constants.json';
import LEVELS from '@/constants/levels.json';
import { useMemo } from 'react';

const { COOKIE_DEFAULTS: { level: DEFAULT_LEVEL } } = CONSTANTS

export default function useLevel() {
    const [{ level: levelAsNumber = DEFAULT_LEVEL }, setCookie] = useCookies(['level']);
    const level = useMemo(() => levelAsNumber.toString(), [levelAsNumber]);
    const numNotes = useMemo(() => LEVELS[level as keyof typeof LEVELS].numNotes, [level]);
    const scale = useMemo(() => LEVELS[level as keyof typeof LEVELS].scale, [level]);
    return { level, numNotes, scale, setLevel(level: string) { setCookie('level', level) } };
}