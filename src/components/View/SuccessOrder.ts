import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export type TSuccessOrder = {description: number};

export class SuccessOrder extends Component<TSuccessOrder> {
    protected descriptionElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.order-succes__close', this.container);

        this.closeButton.addEventListener('click', () => {
            this.events.emit("success : close");
        });
    }

    set description(value: number) {
        this.descriptionElement.textContent = `Списано ${value} синапсов`
    }
}