
export type ItemType = "yourExpenses"|"partnerExpenses"|"sharedExpenses"|"yourTakenMoney"|"partnerTakenMoney"|"sales"|null

export interface EditItemType {
    itemId: string | null;
    itemType: ItemType
}