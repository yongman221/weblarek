export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash';

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
};

export interface IBuyer {
    payment: TPayment | null;
    email: string;
    phone: string;
    address: string;
};

export type TBuyError = Partial<Record<keyof IBuyer, string>>; // Record возвращает объектный тип

export interface ICatalog {
    setItems(items: IProduct[]): void;
    getItems(): IProduct[];
    getItem(productId: string): IProduct | undefined;
    setSelectedItem(productId: string): void;
    getSelectedItem(): IProduct | undefined;
}

export interface ICart {
    getItems(): IProduct[];
    addItem(item: IProduct): void;
    deleteItem(productId: string): void;
    clear(): void;
    getTotalPrice(): number;
    getCount(): number;
    hasItem(productId: string): boolean;
}

export interface IBuyerModel {
    setData(partial: Partial<IBuyer>): void; // встроенный утилити тип, делает все св-ва необзательными
    getData(): IBuyer;
    clear(): void;
    validate(): TBuyError;
}

export interface ResponseProduct {
    total: number;
    items: IProduct[];
}

export interface ResponseOrder {
    id: string;
    total: number;
}

export interface Order extends IBuyer {
    total: number;
    items: string[];
}
