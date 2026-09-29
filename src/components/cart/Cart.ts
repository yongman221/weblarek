import { ICart, IProduct } from "../../types";

export class Cart implements ICart {
    private items: IProduct[] = [];

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(item: IProduct): void {
        this.items.push(item);
    }

    deleteItem(item: IProduct): void {
        this.items = this.items.filter(i => i.id !== item.id);
    }

    clear(): void {
        this.items = [];
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

    hasItem(id: string): boolean {
        return this.items.some(i => i.id === id);
    }
}