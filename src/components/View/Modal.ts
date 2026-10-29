import { settings } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export type TModal = {
    content: HTMLElement;
}

export class Modal extends Component<TModal> {
    protected contentElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);

        this.closeButton.addEventListener('click', () => {
            this.close();
        });

        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                this.close();
            }
        });

        this.contentElement.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }

    close() {
        this.container.classList.remove(settings.modalActive);
        this.events.emit("modal : close");
    }

    open() {
        this.container.classList.add(settings.modalActive);
        this.events.emit("modal : open");
    }

    set content(value : HTMLElement) {
        this.contentElement.replaceChildren(value);
    }
}