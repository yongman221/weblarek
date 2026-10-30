import { TContactsForm } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";



export class ContactsForm extends Form<TContactsForm> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);

        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"', this.container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

        this.emailInput.addEventListener('input', () => {
            this.events.emit("form : changed", {email: this.emailInput.value});
        })

        this.phoneInput.addEventListener('input', () => {
            this.events.emit("form : changed", {phone: this.phoneInput.value});
        })
    }

    set email(value: string) {
        this.emailInput.value = value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }
}