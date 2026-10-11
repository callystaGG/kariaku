import { useApp } from '../context/AppContext';
import { getCharacterById, type Character } from '../data/characters';

/** The character chosen by the active child; unknown ids resolve to the default character. */
export function useGuide(): Character {
  const { activeChild } = useApp();
  return getCharacterById(activeChild.avatarId);
}
