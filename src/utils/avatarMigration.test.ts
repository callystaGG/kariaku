import { describe, it, expect, vi, afterEach } from 'vitest';
import { migrateAvatarId, migrateParentAvatars } from './avatarMigration';

afterEach(() => vi.restoreAllMocks());

describe('migrateAvatarId', () => {
  it('maps every legacy id per the spec table', () => {
    const table: Record<string, string> = {
      singa: 'leo', harimau: 'leo', kancil: 'owi', gajah: 'owi', astronot: 'dino',
      dino: 'dino', kucing: 'mimi', panda: 'mimi', burung: 'ciko', rusa: 'ciko'
    };
    for (const [legacy, expected] of Object.entries(table)) {
      expect(migrateAvatarId(legacy)).toBe(expected);
    }
  });

  it('passes through the six new ids unchanged', () => {
    for (const id of ['leo', 'ciko', 'owi', 'mimi', 'dino', 'kids']) {
      expect(migrateAvatarId(id)).toBe(id);
    }
  });

  it('turns unknown, empty, undefined and non-string ids into leo and warns each time', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    for (const bad of ['unicorn', '', undefined, null, 42]) {
      expect(migrateAvatarId(bad)).toBe('leo');
    }
    expect(warn).toHaveBeenCalledTimes(5);
  });
});

describe('migrateParentAvatars', () => {
  it('does not mutate its input and migrates every child', () => {
    const input = { id: 'p1', children: [{ id: 'c1', avatarId: 'singa' }, { id: 'c2', avatarId: 'mimi' }] };
    const out = migrateParentAvatars(input);
    expect(out.children.map(c => c.avatarId)).toEqual(['leo', 'mimi']);
    expect(input.children[0].avatarId).toBe('singa');
    expect(out).not.toBe(input);
  });

  it('handles a missing children array', () => {
    const input = { id: 'p2' } as { id: string; children?: Array<{ avatarId: string }> };
    expect(migrateParentAvatars(input)).toEqual({ id: 'p2' });
  });
});
