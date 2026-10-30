import { TCard } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";




export class Card<T extends TCard> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set price(value: string) {
        this.priceElement.textContent = value !== null ? `${value} синапсов` : 'Бесценно'
    }
}