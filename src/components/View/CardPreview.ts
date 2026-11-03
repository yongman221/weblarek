import { TCardPreview } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Card } from "./Card";

export class CardPreview extends Card<TCardPreview> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected basketButton: HTMLButtonElement;

    constructor(protected events: IEvents ,container: HTMLElement) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.basketButton = ensureElement<HTMLButtonElement>('.card__button', this.container);
    
        this.basketButton.addEventListener("click", () => {
            events.emit("card : action");
        })
    }

    set image(value: string) {
        this.setImage(this.imageElement, CDN_URL + value);
    }

    set category(value: string) {
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

    set buttonActive(value: boolean) {
        this.basketButton.disabled = value;
    }

    set buttonText(value: string) {
        this.basketButton.textContent = value;
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }
}
