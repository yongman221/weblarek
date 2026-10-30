import { ICardActions, TCardBasket } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

export class CardBasket extends Card<TCardBasket> {
    protected deleteButton: HTMLButtonElement;
    protected indexElement: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);
        
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete');
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index');

        if (actions?.onclick) {
            this.deleteButton.addEventListener('click', actions.onclick);
        }
    }

    set index(value : number) {
        this.indexElement.textContent = String(value);
    }
}

