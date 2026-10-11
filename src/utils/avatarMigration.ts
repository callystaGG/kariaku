import type { CharacterId } from '../data/characters';

const NEW_IDS: readonly CharacterId[] = ['leo', 'ciko', 'owi', 'mimi', 'dino', 'kids'];

const LEGACY_TO_CHARACTER: Record<string, CharacterId> = {
  singa: 'leo',
  harimau: 'leo',
  kancil: 'owi',
  gajah: 'owi',
  astronot: 'dino',
  dino: 'dino',
  kucing: 'mimi',
  panda: 'mimi',
  burung: 'ciko',
  rusa: 'ciko'
};

/** Maps any stored avatar id to a current character id. Unknown values become 'leo' with a warning. */
export function migrateAvatarId(id: unknown): CharacterId {
  if (typeof id === 'string') {
    if ((NEW_IDS as readonly string[]).includes(id)) return id as CharacterId;
    const mapped = LEGACY_TO_CHARACTER[id];
    if (mapped) return mapped;
  }
  console.warn(`Unknown avatar id ${JSON.stringify(id)}; using 'leo'.`);
  return 'leo';
}

/** Returns a copy of the user with every child's avatarId migrated. The input is not mutated. */
export function migrateParentAvatars<T extends { children?: Array<{ avatarId: string }> }>(user: T): T {
  if (!Array.isArray(user.children)) return { ...user };
  return {
    ...user,
    children: user.children.map(child => ({ ...child, avatarId: migrateAvatarId(child.avatarId) }))
  };
}
