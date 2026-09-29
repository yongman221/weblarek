import { IBuyer, IBuyerModel, TBuyError, TPayment } from "../../types";

export class BuyerModel implements IBuyerModel {
    private buyer: IBuyer = {
            payment: '',
            email: '',
            phone: '',
            address: '',
    };

    constructor() {
        
    }

    setData(partial: Partial<IBuyer>): void {
        this.buyer = {
            ...this.buyer,
            ...partial
        };
    }

    getData(): IBuyer {
        return {...this.buyer};
    }

    clear(): void {
        this.buyer = {
            payment: '',
            email: '',
            phone: '',
            address: '',
        };
    }

    validate(): TBuyError {
        let error: TBuyError = {};
        for (const key of Object.keys(this.buyer)) {
            const value: string | TPayment = this.buyer[key as keyof IBuyer];
            if (!value) {
                error[key as keyof IBuyer] = `Поле ${key} не заполнено`;
            }
        }

        return error;
    }
}