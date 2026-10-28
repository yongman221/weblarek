import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export type TBasket = {
    items: HTMLElement[],
    price: number,
    buttonActive: boolean,
};

export class Basket extends Component<TBasket> {
    protected itemElement: HTMLElement[];
    protected basketButton: HTMLButtonElement;
    protected priceElement: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.itemsElement = ensureAllElements<HTMLElement[]>
    }
}