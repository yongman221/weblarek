import { ICatalog, IProduct } from "../../types";

export class Catalog implements ICatalog {
    private items: IProduct[] = [];
    private selectedCard: IProduct | null = null;

    public setItems(items: IProduct[]): void {
        this.items = items;
    }

    public getItems(): IProduct[] {
        return this.items
    }

    public getItem(id: string): IProduct | undefined {
        return this.items.find(i => i.id === id);
    }

    public setSelectedItem(item: IProduct): void {
        this.selectedCard = item;
    }

    public getSelectedItem(): IProduct | null {
        return this.selectedCard;
    }
}