import { ApiServer } from './components/ApiServer/ApiServer';
import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { BuyerModel } from './components/Model/Buyer';
import { CartModel } from './components/Model/Cart';
import { CatalogModel } from './components/Model/Catalog';
import { Basket } from './components/View/Basket';
import { Card } from './components/View/Card';
import { CardBasket } from './components/View/CardBasket';
import { CardCatalog } from './components/View/CardCatalog';
import { CardPreview } from './components/View/CardPreview';
import { Catalog } from './components/View/Catalog';
import { ContactsForm } from './components/View/ContactsForm';
import { Header } from './components/View/Header';
import { Modal } from './components/View/Modal';
import { OrderForm } from './components/View/OrderForm';
import { SuccessOrder } from './components/View/SuccessOrder';
import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

// События и апи
const events = new EventEmitter();
const api = new Api(API_URL);
const apiServer = new ApiServer(api);

// модели данных
const buyerModel = new BuyerModel(events);
const cartModel = new CartModel(events);
const catalogModel = new CatalogModel(events);

// представления
const header = new Header(events, ensureElement(".header"));
const catalog = new Catalog(ensureElement(".gallery"));
const contactsForm = new ContactsForm(events, cloneTemplate("#contacts"));
const orderForm = new OrderForm(events, cloneTemplate("#order"));
const basket = new Basket(events, cloneTemplate("#basket"));
const successOrder = new SuccessOrder(events, cloneTemplate("#success"));
const modal = new Modal(events, ensureElement("#modal-container"));

// Функции отрисовки
function renderCatalog() {
    catalog.render({
        items: catalogModel.getItems().map(item => {
            return new CardCatalog(cloneTemplate<HTMLElement>("#card-catalog"), {
                onclick: () => catalogModel.setSelectedItem(item.id)
            }).render({title: item.title, price: item.price, category: item.category, image: item.image});
        })
    });
}

function renderPreview() {
    const item = catalogModel.getSelectedItem();
    if (!item) return;

    const card = new CardPreview(cloneTemplate<HTMLElement>("#card-preview"), {
        onclick: () => {
            if (cartModel.hasItem(item.id)) {
                cartModel.deleteItem(item.id);
            }
            cartModel.addItem(item);
            modal.close();
        }
    });

    modal.render({
       content: card.render({
            title: item.title,
            price: item.price,
            image: item.image,
            category: item.category,
            description: item.description,
            buttonActive: item.price === null,
            buttonText: item.price === null ? "Недоступно" : cartModel.hasItem(item.id) ? "Удалить из корзины" : "Купить"
       })
    });

    modal.open();
}

function renderBasket() {
    header.render({counter: cartModel.getCount()});

    basket.render({
        items: cartModel.getItems().map((item, index) => {
            return new CardBasket(cloneTemplate<HTMLElement>("#card-basket"), {
                onclick: () => cartModel.deleteItem(item.id)
            }).render({
                title: item.title,
                price: item.price,
                index: index + 1
            })
        }),
        price: cartModel.getTotalPrice(),
        buttonActive: cartModel.getCount() === 0
    });
}

function renderForm() {
    const userData = buyerModel.getData();
    const errors = buyerModel.validate();
    const orderErrorText = [errors.payment, errors.address].filter(Boolean).join(". ");
    const contactsErrorText = [errors.email, errors.phone].filter(Boolean).join(". ");

    orderForm.render({
        buttonActive: orderErrorText.length > 0,
        formError: orderErrorText,
        payment: userData.payment,
        address: userData.address
    });

    contactsForm.render({
        buttonActive: contactsErrorText.length > 0,
        formError: contactsErrorText,
        email: userData.email,
        phone: userData.phone
    });
}

function postOrder () {
    apiServer.postOrder({
        ...buyerModel.getData(),
        total: cartModel.getTotalPrice(),
        items: cartModel.getItems().map(item => {return item.id})
    })
    .then((result) => {
        modal.render({
            content: successOrder.render({
                description: result.total,
            })
        });
        cartModel.clear();
        buyerModel.clear();
    })
    .catch((error) => {
        console.error(error);
        contactsForm.render({
            formError: "Не удалось оформить заказ",
        })
    });
}

// События моделей
events.on("catalog : changed", renderCatalog);
events.on("cart : changed", renderBasket);
events.on("buyer : changed", renderForm);
events.on("catalog : selected", renderPreview);

// События представлений
let formsStep: 'order' | 'contacts' = 'order';

events.on("basket : order", () => {
    modal.render({content: orderForm.render()})
});

events.on("basket : open", () => {
    modal.render({
        content: basket.render({
        })
    });
    modal.open();
});

events.on("form : submit", () => {
    if (formsStep === 'order') {
        formsStep = "contacts"
        modal.render({
            content: contactsForm.render()
        });
    }
    else {
        postOrder();
    }
})

events.on("order : change", (data) => {
    buyerModel.setData(data);
});

events.on("contacts : change", (data) => {
    buyerModel.setData(data);
})

events.on("success : close", () => {
    modal.close();
})

renderBasket();
renderForm();

apiServer.getProduct()
.then((result) => {
    catalogModel.setItems(result.items);
})
.catch((error) => {
    console.error(error);
})