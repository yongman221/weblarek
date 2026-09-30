import './scss/styles.scss';
import { BuyerModel } from './components/BuyerModel/BuyerModel';
import { Catalog } from './components/catalog/Catalog';
import { Cart } from './components/cart/Cart';
import { apiProducts } from './utils/data';

let buyer = new BuyerModel();
let cart = new Cart();
let catalog  = new Catalog();

catalog.setItems(apiProducts.items);
console.log("Массив товаров из каталога: ", catalog.getItems());

const product = catalog.getItem(catalog.getItems()[0].id);
console.log("Получили объект:", product);
if (product) {
    catalog.setSelectedItem(product.id);
}
console.log("Избранный товар: ", catalog.getSelectedItem())


buyer.setData({payment: 'card', email: 'aitema555@gmail.com'});
console.log(buyer.getData());
console.log(buyer.validate());
buyer.setData({phone: "89526160223", address: "1"});
console.log(buyer);