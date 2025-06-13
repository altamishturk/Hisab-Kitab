export function capitalizeName(name: string): string {
  return name
    .trim()
    .split(/\s+/) // split by one or more spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}