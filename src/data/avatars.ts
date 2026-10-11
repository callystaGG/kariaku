import { CHARACTERS, getCharacterById } from './characters';

// Avatars and characters are one roster. Kept as aliases so existing imports keep working.
export const AVATARS = CHARACTERS;
export const getAvatarById = getCharacterById;
