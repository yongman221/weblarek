import { IApi } from "../../types";
import { Order, ResponseOrder, ResponseProduct } from "../../types";

class ApiServer {
    private api: IApi;
    constructor(api: IApi) {
        this.api = api;
    }

    getProduct(): Promise<ResponseProduct> {
        return 
    }

    postOrder(order: Order): Promise<ResponseOrder> {

    }
}