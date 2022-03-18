export function adjustColor(color: string, anmount: number) {
  return color.replace(/\w\w/g, (m) =>
    Math.min(255, Math.max(0, parseInt(m, 16) + anmount)).toString(16)
  );
}
