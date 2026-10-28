import { IBuyer, IBuyerModel, TBuyError, TPayment } from "../../types";
import { IEvents } from "../base/Events";

export class BuyerModel implements IBuyerModel {
    private buyer: IBuyer = {
            payment: null,
            email: '',
            phone: '',
            address: '',
    };

    constructor(protected events: IEvents) {
        
    }

    setData(partial: Partial<IBuyer>): void {
        this.buyer = {
            ...this.buyer,
            ...partial
        };

        this.events.emit("buyer : changed");
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

        this.events.emit("buyer : changed");
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