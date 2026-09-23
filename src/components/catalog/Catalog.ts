import { ICatalog, IProduct } from "../../types";

class Catalog implements ICatalog {
    private items: IProduct[] = [];
    private selectedCard: IProduct | null = null;

    setItems(items: IProduct[]): void {
        this.items = items;
    }

    getItems(): IProduct[] {
        return this.items
    }

    getItem(id: string): IProduct | undefined {
        return this.items.find(i => i.id === id);
    }

    setSelectedItem(item: IProduct): void {
        this.selectedCard = item;
    }

    getSelectedItem(): IProduct | null {
        return this.selectedCard;
    }
}