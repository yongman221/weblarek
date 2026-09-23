import { IBuyer, IBuyerModel, TBuyError } from "../../types";

export class BuyerModel implements IBuyerModel {
    private buyer: IBuyer;

    constructor() {
        this.buyer = {
            payment: '',
            email: '',
            phone: '',
            address: '',
        };
    }

    setData(partial: Partial<IBuyer>): void {
        this.buyer = {
            ...this.buyer,
            ...partial
        };
    }

    getData(): IBuyer {
        return this.buyer;
    }

    clear(): void {
        this.user = {
            payment: '',
            email: '',
            phone: '',
            address: '',
        };
    }

    validate(): TBuyError {
        let error: TBuyError = {};
        for (const key of Object.keys(this.buyer)) {
            const value = this.buyer[key];
            if (!value) {
                error[key] = `Поле ${value} не заполнено`;
            }
        }

        return error;
    }
}