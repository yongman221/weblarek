import { IBuyer, TOrderForm, TPayment } from "../../types";
import { settings } from "../../utils/constants";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";


export class OrderForm extends Form<TOrderForm> {
    protected paymentButtons: HTMLButtonElement[];
    protected addresInput: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);
        this.paymentButtons = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);
        this.addresInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

        this.paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.events.emit("order : change", {payment : `${button.name}` as TPayment});
            });
        });

        this.addresInput.addEventListener('input', () => {
            this.events.emit("order : change", {address : this.addresInput.value});
        });
    }

    set payment (value: TPayment) {
        this.paymentButtons.forEach(button => {
            button.classList.toggle(settings.paymentActiveClass, value === button.name);
        });
    }

    set address(value: string) {
        this.addresInput.value = value;
    }
}