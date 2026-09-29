export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash'| '';

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
};

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
};

export type TBuyError = Partial<Record<keyof IBuyer, string>>; // Record возвращает объектный тип

export interface ICatalog {
    setItems(items: IProduct[]): void;
    getItems(): IProduct[];
    getItem(id: string): IProduct | undefined;
    setSelectedItem(item: IProduct): void;
    getSelectedItem(): IProduct | null;
}

export interface ICart {
    getItems(): IProduct[];
    addItem(item: IProduct): void;
    deleteItem(item: IProduct): void;
    clear(): void;
    getTotalPrice(): number;
    getCount(): number;
    hasItem(id: string): boolean;
}

export interface IBuyerModel {
    setData(partial: Partial<IBuyer>): void; // встроенный утилити тип, делает все св-ва необзательными
    getData(): IBuyer;
    clear(): void;
    validate(): TBuyError;
}
