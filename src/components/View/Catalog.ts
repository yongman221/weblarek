import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export type TCatalog = {
    items: HTMLElement[]
};

export class Catalog extends Component<TCatalog> {
    protected catalogElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.catalogElement = ensureElement<HTMLElement>('.gallery', this.container);
    }

    set items(value: HTMLElement[]) {
        this.catalogElement.replaceChildren(...value);
    }
}
