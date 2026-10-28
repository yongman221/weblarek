import { ICart, IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart implements ICart {
    private items: IProduct[] = [];

    constructor(protected events: IEvents) {
        
    }

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(item: IProduct): void {
        this.items.push(item);

        this.events.emit("cart : changed");
    }

    deleteItem(productId: string): void {
        this.items = this.items.filter(i => i.id !== productId);

        this.events.emit("cart : changed");
    }

    clear(): void {
        this.items = [];

        this.events.emit("cart : changed");
    }

    getTotalPrice(): number {
        return this.items.reduce((acc, cur) => {
            acc += cur.price ?? 0;
            return acc;
        }, 0)
    }

    getCount(): number {
        return this.items.length;
    }

    hasItem(productId: string): boolean {
        return this.items.some(i => i.id === productId);
    }
}