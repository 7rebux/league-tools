/** Must match HISTORY_LIMIT in src/main/settings.ts */
export const HISTORY_LIMIT = 30;

/**
 * Returns a new history with `id` moved to the front, without duplicates and
 * capped at HISTORY_LIMIT. Mirrors `addToHistory` in the main process so the
 * page state matches what gets stored.
 */
export const pushHistory = (history: number[], id: number): number[] =>
  [id, ...history.filter((x) => x !== id)].slice(0, HISTORY_LIMIT);

/**
 * Resolves history ids to their items, keeping the history order (most recent
 * first) and dropping ids that no longer exist in the data.
 */
export const resolveHistory = <T extends { id: number }>(
  history: number[],
  items: T[],
): T[] => {
  const byId = new Map(items.map((item) => [item.id, item]));
  return history
    .map((id) => byId.get(id))
    .filter((item): item is T => item !== undefined);
};
