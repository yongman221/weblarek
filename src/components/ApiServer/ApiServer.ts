import { IApi } from "../../types";
import { Order, ResponseOrder, ResponseProduct } from "../../types";

export class ApiServer {
    private api: IApi;
    constructor(api: IApi) {
        this.api = api;
    }

    getProduct(): Promise<ResponseProduct> {
        return this.api.get<ResponseProduct>("/product/");
    }

    postOrder(order: Order): Promise<ResponseOrder> {
        return this.api.post<ResponseOrder>("/order/", order);
    }
}