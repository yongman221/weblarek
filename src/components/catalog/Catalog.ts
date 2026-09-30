import { ICatalog, IProduct } from "../../types";

export class Catalog implements ICatalog {
    private items: IProduct[] = [];
    private selectedCard: IProduct | undefined;

    constructor() {

    }

    public setItems(items: IProduct[]): void {
        this.items = items;
    }

    public getItems(): IProduct[] {
        return this.items
    }

    public getItem(productId: string): IProduct | undefined {
        return this.items.find(i => i.id === productId);
    }

    public setSelectedItem(productId: string): void {
        this.selectedCard = this.items.find((product: IProduct) => product.id === productId);
    }

    public getSelectedItem(): IProduct | undefined {
        return this.selectedCard;
    }
}