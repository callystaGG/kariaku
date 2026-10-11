/**
 * Picks a browser voice for a gender from what the device offers.
 * Male falls back to female, then to the default voice. Female never falls back to male,
 * so a girl character is never voiced by the male voice.
 */
export function chooseVoice<T>(
  pool: { male: T | null; female: T | null; fallback: T | null },
  gender?: 'male' | 'female'
): T | null {
  if (gender === 'male') return pool.male ?? pool.female ?? pool.fallback;
  return pool.female ?? pool.fallback;
}
