import LEVELS from '../constants/levels.json'

export default function getNextLevelKey(levelKey: string) {
    const levelKeys = Object.keys(LEVELS)
    const currentLevelIndex = levelKeys.indexOf(levelKey.toString())
    const nextLevelIndex = currentLevelIndex + 1
    return levelKeys[nextLevelIndex] || levelKey.toString()
}