import { IBuyer, IBuyerModel, TBuyError, TPayment } from "../../types";

export class BuyerModel implements IBuyerModel {
    private buyer: IBuyer = {
            payment: null,
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
            payment: null,
            email: '',
            phone: '',
            address: '',
        };
    }

    validate(): TBuyError {
        const errors: TBuyError = {};
        
        if (!this.buyer.payment) {
            errors.payment = "Выберите тип оплаты";
        }

        if (!this.buyer.address) {
            errors.address = "Введите адрес";
        }

        if (!this.buyer.email) {
            errors.email = "Введите почту";
        }

        if (!this.buyer.phone) {
            errors.phone = "Введите номер телефона";
        }

        return errors;
    }
}