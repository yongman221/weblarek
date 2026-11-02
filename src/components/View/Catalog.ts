import { TCatalog } from "../../types";
import { Component } from "../base/Component";

export class Catalog extends Component<TCatalog> {
    protected catalogElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.catalogElement = container;
    }

    set items(value: HTMLElement[]) {
        this.catalogElement.replaceChildren(...value);
    }
}
