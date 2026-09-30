import './scss/styles.scss';
import { BuyerModel } from './components/BuyerModel/BuyerModel';
import { Catalog } from './components/catalog/Catalog';
import { Cart } from './components/cart/Cart';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { ApiServer } from './components/ApiServer/ApiServer';
import { ResponseProduct } from './types';

let buyer = new BuyerModel();
let cart = new Cart();
let catalog  = new Catalog();

// проверка catalog
console.log("/--------------Проверка класса каталога---------------/");
catalog.setItems(apiProducts.items);
console.log("Массив товаров из каталога: ", catalog.getItems());
const product = catalog.getItem(catalog.getItems()[0].id);
console.log("Получили объект:", product);
if (product) {
    catalog.setSelectedItem(product.id);
}
console.log("Избранный товар: ", catalog.getSelectedItem())


// проверка buyer
console.log("/--------------Проверка класса покупателя---------------/");
buyer.setData({payment: 'card', email: 'aitema555@gmail.com'});
console.log(buyer.getData());
console.log(buyer.validate());
buyer.setData({phone: "89526160223", address: "1"});
console.log(buyer);
buyer.clear();
console.log(buyer);

// проверка cart
console.log("/--------------Проверка класса корзины---------------/");
const productToCart1 = catalog.getItem(catalog.getItems()[0].id)
const productToCart2 = catalog.getItem(catalog.getItems()[1].id)
if (productToCart1 && productToCart2) {
    cart.addItem(productToCart1);
    cart.addItem(productToCart2);
}
console.log("Товары в корзине: ", cart.getItems(), "\n Количество товаров: ", cart.getCount(),
"\n Общая сумма: ", cart.getTotalPrice());

if (productToCart1 && cart.hasItem(productToCart1.id)) {
    cart.deleteItem(productToCart1.id)
}

if (productToCart1) {
    console.log(cart.hasItem(productToCart1.id));
}

console.log("/--------------Проверка запроса на сервер---------------/");
const api = new Api(API_URL);
const apiShop = new ApiServer(api);

apiShop.getProduct()
    .then((data: ResponseProduct) => {
        catalog.setItems(data.items);
    });

console.log(catalog.getItems());