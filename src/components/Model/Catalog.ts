import { ICatalog, IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalog implements ICatalog {
    private items: IProduct[] = [];
    private selectedCard: IProduct | undefined;

    constructor(protected events: IEvents) {

    }

    public setItems(items: IProduct[]): void {
        this.items = items;

        this.events.emit('catalog : changed');
    }

    public getItems(): IProduct[] {
        return this.items
    }

    public getItem(productId: string): IProduct | undefined {
        return this.items.find(i => i.id === productId);
    }

    public setSelectedItem(productId: string): void {
        this.selectedCard = this.items.find((product: IProduct) => product.id === productId);

        this.events.emit('catalog : changed');
    }

    public getSelectedItem(): IProduct | undefined {
        return this.selectedCard;
    }
}