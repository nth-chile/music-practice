import LEVELS from '../constants/levels.json'

export default function getPrevLevelKey(levelKey: string): string {
    const levelKeys = Object.keys(LEVELS)
    const currentLevelIndex = levelKeys.indexOf(levelKey)
    const prevLevelIndex = currentLevelIndex - 1
    return levelKeys[prevLevelIndex] || levelKey
}