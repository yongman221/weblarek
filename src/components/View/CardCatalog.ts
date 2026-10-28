import { IProduct } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card, TCard } from "./Card";
import { ICardActions } from "./CardBasket";

export type TCardCatalog = TCard & Pick<IProduct, 'category' | 'image'>;

export class CardCatalog extends Card<TCardCatalog> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);

        if (actions?.onclick) {
            this.container.addEventListener('click', actions.onclick);
        }
    }

    set category (value: string) {
        this.categoryElement.textContent = value;

        for (const [name, className] of Object.entries(categoryMap)) {
            if (name === value) {
                this.categoryElement.classList.add(className);
            }
            else {
                this.categoryElement.classList.remove(className);
            }
        }
    }

    set image(value: string) {
        this.setImage(this.imageElement, CDN_URL + value)
    }
}