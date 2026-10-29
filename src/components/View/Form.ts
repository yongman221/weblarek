import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export type TForm = {
    buttonActive: boolean,
    formError: string
};

export class Form<T extends TForm> extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorElement: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.submitButton = ensureElement<HTMLButtonElement>('.order__button', this.container);
        this.errorElement = ensureElement<HTMLElement>('form__errors', this.container);

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.events.emit("form : submit");
        })
    }

    set buttonActive(value : boolean) {
        this.submitButton.disabled = value;
    }

    set formError(value: string) {
        this.errorElement.textContent = value;
    }
}