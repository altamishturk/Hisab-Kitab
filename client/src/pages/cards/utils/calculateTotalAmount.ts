type Item = { amount?: number };

export function calculateTotalAmount(items: Item[]): number {
  return items.reduce((sum, item) => sum + (item.amount ?? 0), 0);
}