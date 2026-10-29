import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export type TBasket = {
    items: HTMLElement[],
    price: number,
    buttonActive: boolean,
};

export class Basket extends Component<TBasket> {
    protected listElement: HTMLElement;
    protected basketButton: HTMLButtonElement;
    protected priceElement: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.priceElement = ensureElement<HTMLElement>('basket__price', this.container);

        this.basketButton.addEventListener('click', () => {
            this.events.emit('basket : order');
        })
    }

    set items (items: HTMLElement[]) {
        this.listElement.replaceChildren(...items);
    }

    set buttonActive(value: boolean) {
        this.basketButton.disabled = value;
    }

    set price(value: number) {
        this.priceElement.textContent = `${value} синапсов`;
    }
}