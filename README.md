# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```

## Сборка

```
npm run build
```

или

```
yarn build
```

# Интернет-магазин «Web-Larёk»

«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component

Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`

#### Класс Api

Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter

Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` - хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

### Данные

#### Типы

`ApiPostMethods = 'POST' | 'PUT' | 'PATCH'` - допустимые методы для запросов на сервер
`TPayment = 'card' | 'cash' | ''` - способы оплаты. Пустая строка означает, что метод оплаты не выбран
`TBuyError = Partial<Record<keyof IBuyer, string>>` - объектный тип ошибки. Нужен для валидации полей формы при оформлении заказа.

#### Интерфейс IApi

`interface IApi` - описывает контракт класса для работы с сервером

Методы:
`get<T extends object>(uri: string): Promise<T>` - выполняет GET-запрос на заданный эндпойт
`post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>` - выполняет POST-запрос на заданный эндпойт. Отправляет data в теле запроса.

#### Интерфейс IProduct

`interface IProduct` - описывает продукт

Поля:
`id: string` - уникальный идентификатор товара
`description: string` - описание товара
`image: string` - путь к изображению товара
`title: string` - название товара
`category: string` - категория товара
`price: number | null` - цена товара.

#### Интерфейс IBuyer

`interface IBuyer` - описывает информацию о покупателе, необходимую для оформления заказа

Поля:
`payment: TPayment` - тип оплаты
`email: string` - почта пользователя
`phone: string` - номер телефона
`address: string` - адрес

#### Интерфейс ICatalog

`interface ICatalog` - контракт модели каталога товаров

Методы:
`setItems(items: IProduct[]): void`
`getItems(): IProduct[]`
`getItem(productId: string): IProduct | undefined`
`setSelectedItem(productId: string): void`
`getSelectedItem(): IProduct | undefined`

#### Интерфейс ICart

`interface ICart` - контракт модели корзины товаров

Методы:
`getItems(): IProduct[]`
`addItem(item: IProduct): void`
`deleteItem(productId: string): void`
`clear(): void`
`getTotalPrice(): number`
`getCount(): number`
`hasItem(productId: string): boolean`

#### Интерфейс IBuyerModel

`interface IBuyerModel` - контракт модели данных покупателя

Методы:
`setData(partial: Partial<IBuyer>): void`
`getData(): IBuyer`
`clear(): void`
`validate(): TBuyError`

#### Интерфейс ResponseProduct

`interface ResponseProduct` - описывает структуру ответа сервера на запрос о товарах

Поля:
`total: number` - общее количество товаров
`items: IProduct[]` - массив товаров

#### Интерфейс ResponseOrder

`interface ResponseOrder` - ответ сервера на оформление заказа

Поля:
`id: string` - идентификатор созданного заказа
`total: number` - сумма списания

#### Интерфейс Order

`interface Order` - данные, отправляемые на сервер при заказе

Поля:
`total: number` - общая сумма всех товаров
`items: string[]` - товары в корзине

### Модели данных

#### Класс BuyerModel

Хранит и валидирует информацию о покупателе.

Конструктор класса не принимает параметров

Поля класса:
`buyer: IBuyer` - внутреннее хранилище данных покупателя. Инициализируется пустыми строками

Методы класса:
`setData(partial: Partial<IBuyer>):void` - устанавливает значения данных покупателя
`getData(): IBuye` - возвращает данные покупателя
`clear(): void` - очистка данных покупателя
`validate(): TBuyError` - проверка полей на заполненность. Если поле пустое - записываем ошибку в объект

#### Класс Cart

Хранит массив товаров, добавленных в корзину.

Конструктор класса не принимает параметров

Поля класса:
`items: IProduct[]` - массив товаров в корзине

Методы класса:
`getItems(): IProduct[]` - возвращает массив товаров в корзине
`addItem(item: IProduct): void` - добавляет товар в корзину
`deleteItem(item: IProduct): void` - удаляет товар из корзины
`clear(): void` - очищает массив товаров
`getTotalPrice(): number` - возвращает общую сумму всех товаров в корзине
`getCount(): number` - возвращает количество товаров
`hasItem(id: string): boolean` - проверяет наличие товара в корзине по id

#### Класс Catalog

Реализация модели товаров для каталога

Конструктор класса не принимает товаров

Поля класса:
`items: IProduct[]` - массив всех товаров в каталоге
`selectedCard: IProduct | null` - выбранный товар в каталоге для отображения в модальном окне

Методы класса:
`setItems(items: IProduct[]): void` - заполняет массив товаров в каталоге
`getItems(): IProduct[]` - возвращает товары
`getItem(id: string): IProduct | undefined` - получить товар по его id
`setSelectedItem(item: IProduct): void` - устанавливает выбранный товар
`getSelectedItem(): IProduct | null` - возвращает выбранный товар

### Слой коммуникации

#### Класс ApiServer

Отвечает за обмен данными с сервером магазина. Используя композицию, получает экземпляр класса, реализующего `IApi`, и через него выполняет запросы.

Конструктор класса:
`constructor(api: IApi)` - принимает объект, реализующий интерфейс `IApi`, и сохраняет его в поле `api`

Поля класса:
`private api: IApi` - объект для выполнения HTTP-запросов (на практике экземпляр класса `Api`). `ApiServer` не знает, как именно выполняются запросы, он лишь вызывает у этого объекта `get` и `post`

Методы класса:
`getProduct(): Promise<ResponseProduct>` - делает GET-запрос на эндпойнт '/product/'. Получает ResponseProduct.
`postOrder(order: Order): Promise<ResponseOrder>` - делает POST-запрос на эндпойнт '/order/'.

## Слой Представления (View)

Слой представления отвечает за отображение данных в DOM и фиксацию действий пользователя. Классы View инкапсулируют работу с конкретными шаблонами, не содержат бизнес-логики и взаимодействуют с остальным приложением через события. Карточки каталога и корзины не знают ни о моделях, ни о товаре целиком: презентер передаёт им колбэк, который лишь эмитит событие с `id` товара.

Все классы представления наследуются от `Component<T>` и получают от него:

- поле `protected readonly container: HTMLElement` — корневой DOM-элемент компонента (внутри него класс ищет свои элементы через `ensureElement`);
- метод `render(data?: Partial<T>): HTMLElement` — записывает переданные данные через сеттеры и возвращает корневой элемент;
- метод `setImage(element: HTMLImageElement, src: string, alt?: string): void` — установка изображения.

Во всех компонентах с кнопкой сеттер `buttonActive: boolean` записывает значение прямо в `disabled`: `true` означает, что кнопка **заблокирована**.

### Типы данных представлений

Типы лежат в `src/types/index.ts` и описывают объекты, которые передаются в `render()`:

`TCard = Pick<IProduct, 'title' | 'price'>` - данные базовой карточки
`TCardCatalog = TCard & Pick<IProduct, 'category' | 'image'>` - данные карточки каталога
`TCardBasket = TCard & { index: number }` - данные карточки в корзине (index - порядковый номер)
`TCardPreview = TCard & Pick<IProduct, 'image' | 'category' | 'description'> & { buttonActive: boolean, buttonText: string }` - данные карточки в окне предпросмотра
`ICardActions { onclick?: (event: MouseEvent) => void }` - действия, которые презентер передаёт карточкам каталога и корзины
`TCatalog = { items: HTMLElement[] }` - данные галереи (готовые карточки)
`TBasket = { items: HTMLElement[], price: number, buttonActive: boolean }` - данные корзины
`TForm = { buttonActive: boolean, formError: string }` - общие данные форм
`TOrderForm = TForm & Pick<IBuyer, 'payment' | 'address'>` - данные формы заказа
`TContactsForm = TForm & Pick<IBuyer, 'email' | 'phone'>` - данные формы контактов
`TModal = { content: HTMLElement }` - данные модального окна
`IHeader { counter: number }` - данные шапки
`TSuccessOrder = { description: number }` - данные экрана успешного заказа

### Иерархия карточек (Cards)

Три класса для работы с разными шаблонами карточек имеют **одного общего родителя** (`Card`), в который вынесен общий функционал (установка заголовка и цены).

#### Класс `Card<T extends TCard>` (Родительский)

Базовый класс для всех типов карточек. Наследуется от `Component<T>`.

Конструктор:
`constructor(container: HTMLElement)` - принимает корневой элемент карточки (клон шаблона)

Поля класса:
`protected titleElement: HTMLElement` - элемент заголовка `.card__title`
`protected priceElement: HTMLElement` - элемент цены `.card__price`

Сеттеры:
`set title(value: string)` - записывает название товара в `titleElement`
`set price(value: number | null)` - записывает цену в формате «N синапсов» или текст «Бесценно», если цена `null`

#### Класс `CardCatalog`

Карточка товара в общем каталоге. Наследуется от `Card<TCardCatalog>`.

Конструктор:
`constructor(container: HTMLElement, actions?: ICardActions)` - принимает корневой элемент и опциональные действия. Колбэк `actions.onclick` вешается на клик по всей карточке. Презентер передаёт колбэк, который эмитит `"card : select"` с `id` товара.

Поля класса:
`protected categoryElement: HTMLElement` - элемент категории `.card__category`
`protected imageElement: HTMLImageElement` - изображение товара `.card__image`

Сеттеры:
`set category(value: string)` - записывает категорию и переключает CSS-класс цвета по таблице `categoryMap`
`set image(value: string)` - устанавливает изображение, добавляя к пути `CDN_URL`

#### Класс `CardBasket`

Карточка товара внутри корзины. Наследуется от `Card<TCardBasket>`.

Конструктор:
`constructor(container: HTMLElement, actions?: ICardActions)` - принимает корневой элемент и опциональные действия. Колбэк `actions.onclick` вешается на кнопку удаления. Презентер передаёт колбэк, который эмитит `"card : remove"` с `id` товара.

Поля класса:
`protected deleteButton: HTMLButtonElement` - кнопка удаления из корзины `.basket__item-delete`
`protected indexElement: HTMLElement` - элемент порядкового номера `.basket__item-index`

Сеттеры:
`set index(value: number)` - записывает порядковый номер товара в списке

#### Класс `CardPreview`

Карточка товара для модального окна предпросмотра. Наследуется от `Card<TCardPreview>`. Создаётся один раз и переиспользуется: данные выбранного товара передаются в `render()`.

Конструктор:
`constructor(events: IEvents, container: HTMLElement)` - принимает брокер событий и корневой элемент. Вешает на кнопку обработчик клика, который эмитит `"card : buy"` без данных: какой товар выбран, определяет презентер.

Поля класса:
`protected events: IEvents` - брокер событий
`protected imageElement: HTMLImageElement` - изображение товара `.card__image`
`protected categoryElement: HTMLElement` - элемент категории `.card__category`
`protected descriptionElement: HTMLElement` - элемент описания `.card__text`
`protected basketButton: HTMLButtonElement` - кнопка покупки / удаления из корзины `.card__button`

Сеттеры:
`set image(value: string)` - устанавливает изображение, добавляя к пути `CDN_URL`
`set category(value: string)` - записывает категорию и переключает CSS-класс цвета
`set description(value: string)` - записывает описание товара
`set buttonActive(value: boolean)` - блокирует кнопку (`true` - заблокирована)
`set buttonText(value: string)` - записывает текст кнопки

### Иерархия форм (Forms)

Две формы заказа имеют **одного общего родителя** (`Form`), в который вынесен общий функционал: блокировка кнопки отправки, вывод ошибки и обработка отправки.

#### Класс `Form<T extends TForm>` (Родительский)

Базовый класс для форм. Наследуется от `Component<T>`.

Конструктор:
`constructor(events: IEvents, container: HTMLElement)` - принимает брокер событий и корневой элемент формы. Перехватывает событие `submit`, отменяет перезагрузку страницы и эмитит событие, имя которого формируется из атрибута `name` формы в момент отправки: `"order : submit"` или `"contacts : submit"`.

Поля класса:
`protected events: IEvents` - брокер событий
`protected submitButton: HTMLButtonElement` - кнопка отправки формы `button[type="submit"]`
`protected errorElement: HTMLElement` - элемент вывода ошибок валидации `.form__errors`

Сеттеры:
`set buttonActive(value: boolean)` - блокирует кнопку отправки (`true` - заблокирована)
`set formError(value: string)` - выводит текст ошибки в `errorElement`

#### Класс `OrderForm`

Форма первого шага оформления заказа (способ оплаты и адрес). Наследуется от `Form<TOrderForm>`.

Конструктор:
`constructor(events: IEvents, container: HTMLElement)` - вызывает конструктор родителя и вешает обработчики: клик по кнопке оплаты эмитит `"order : change"` с `{payment}`, ввод в поле адреса эмитит `"order : change"` с `{address}`.

Поля класса:
`protected paymentButtons: HTMLButtonElement[]` - кнопки выбора способа оплаты `.button_alt`
`protected addresInput: HTMLInputElement` - поле ввода адреса `input[name="address"]`

Сеттеры:
`set payment(value: TPayment | null)` - подсвечивает кнопку выбранного способа оплаты (класс из `settings.paymentActiveClass`)
`set address(value: string)` - записывает значение в поле адреса

#### Класс `ContactsForm`

Форма второго шага оформления заказа (email и телефон). Наследуется от `Form<TContactsForm>`.

Конструктор:
`constructor(events: IEvents, container: HTMLElement)` - вызывает конструктор родителя и вешает обработчики ввода: изменение email или телефона эмитит `"contacts : change"` с `{email}` или `{phone}`.

Поля класса:
`protected emailInput: HTMLInputElement` - поле ввода почты `input[name="email"]`
`protected phoneInput: HTMLInputElement` - поле ввода телефона `input[name="phone"]`

Сеттеры:
`set email(value: string)` - записывает значение в поле почты
`set phone(value: string)` - записывает значение в поле телефона

### Прочие компоненты представления

Эти компоненты самостоятельные и не имеют дочерних классов. Модальное окно не наследуется ни от чего, кроме `Component`, и от него ничего не наследуется: всё, что показывается в окне (корзина, формы, карточка, экран успеха), это отдельные компоненты, которые презентер передаёт в `Modal` через `content`.

#### Класс `Modal`

Модальное окно, в котором отображается переданный компонент.

Конструктор:
`constructor(events: IEvents, container: HTMLElement)` - принимает брокер событий и корневой элемент окна. Вешает обработчики: клик по крестику и по затемнению закрывают окно, клик внутри содержимого не всплывает.

Поля класса:
`protected events: IEvents` - брокер событий
`protected contentElement: HTMLElement` - контейнер для содержимого `.modal__content`
`protected closeButton: HTMLButtonElement` - кнопка закрытия `.modal__close`

Методы:
`open(): void` - показывает окно (добавляет класс `settings.modalActive`) и эмитит `"modal : open"`
`close(): void` - скрывает окно и эмитит `"modal : close"`

Сеттеры:
`set content(value: HTMLElement)` - заменяет содержимое окна переданным элементом

#### Класс `Header`

Шапка страницы: счётчик товаров и кнопка корзины.

Конструктор:
`constructor(events: IEvents, container: HTMLElement)` - принимает брокер событий и корневой элемент шапки. Клик по кнопке корзины эмитит `"basket : open"`.

Поля класса:
`protected events: IEvents` - брокер событий
`protected counterElement: HTMLElement` - элемент счётчика `.header__basket-counter`
`protected basketButton: HTMLButtonElement` - кнопка открытия корзины `.header__basket`

Сеттеры:
`set counter(value: number)` - записывает количество товаров в корзине

#### Класс `Catalog`

Галерея карточек товаров на главной странице.

Конструктор:
`constructor(container: HTMLElement)` - принимает корневой элемент галереи `.gallery`

Поля класса:
`protected catalogElement: HTMLElement` - элемент, в который выводятся карточки (совпадает с `container`)

Сеттеры:
`set items(value: HTMLElement[])` - заменяет содержимое галереи переданными карточками

#### Класс `Basket`

Корзина: список товаров, итоговая сумма и кнопка оформления.

Конструктор:
`constructor(events: IEvents, container: HTMLElement)` - принимает брокер событий и корневой элемент корзины. Клик по кнопке «Оформить» эмитит `"basket : order"`.

Поля класса:
`protected events: IEvents` - брокер событий
`protected listElement: HTMLElement` - список товаров `.basket__list`
`protected basketButton: HTMLButtonElement` - кнопка оформления заказа `.basket__button`
`protected priceElement: HTMLElement` - элемент итоговой суммы `.basket__price`

Сеттеры:
`set items(items: HTMLElement[])` - заменяет список готовыми карточками `CardBasket`
`set buttonActive(value: boolean)` - блокирует кнопку оформления (`true` - заблокирована)
`set price(value: number)` - записывает итоговую сумму в формате «N синапсов»

#### Класс `SuccessOrder`

Экран успешного оформления заказа.

Конструктор:
`constructor(events: IEvents, container: HTMLElement)` - принимает брокер событий и корневой элемент. Клик по кнопке закрытия эмитит `"success : close"`.

Поля класса:
`protected events: IEvents` - брокер событий
`protected descriptionElement: HTMLElement` - элемент с текстом о списании `.order-success__description`
`protected closeButton: HTMLButtonElement` - кнопка закрытия `.order-success__close`

Сеттеры:
`set description(value: number)` - записывает текст «Списано N синапсов»

---

## События (Events)

В приложении используется событийно-ориентированный подход. Ниже приведен точный список событий, которые генерируются слоем представления (View) или инициируются в `main.ts` в ответ на действия пользователя.

Действия пользователя на карточках (карточки каталога и корзины создаются для каждого товара, поэтому их колбэк передаёт в событие только `id`):

- **`"card : select"`** `{id: string}` — клик по карточке в каталоге (`CardCatalog`). Презентер сохраняет товар как выбранный в `CatalogModel`.
- **`"card : buy"`** — клик по кнопке в окне предпросмотра (`CardPreview`), данные не передаются. Презентер получает выбранный товар через `catalogModel.getSelectedItem()`, добавляет его в корзину или удаляет, если он там уже есть, и закрывает окно.
- **`"card : remove"`** `{id: string}` — клик по кнопке удаления в корзине (`CardBasket`). Презентер удаляет товар из `CartModel`.

Действия пользователя в остальных представлениях:

- **`"basket : open"`** — генерируется классом `Header` при клике на иконку корзины в шапке сайта.
- **`"basket : order"`** — генерируется классом `Basket` при клике на кнопку "Оформить" в корзине.
- **`"order : submit"`** — генерируется базовым классом `Form` при отправке формы с `name="order"` (способ оплаты и адрес). Презентер в ответ показывает форму контактов.
- **`"contacts : submit"`** — генерируется базовым классом `Form` при отправке формы с `name="contacts"` (email и телефон). Презентер в ответ отправляет заказ на сервер.
- **`"order : change"`** — генерируется классом `OrderForm` при клике на кнопку выбора способа оплаты или при изменении текста в поле адреса.
- **`"contacts : change"`** — генерируется классом `ContactsForm` при вводе данных в поля email или телефона (используется для реактивной валидации).
- **`"modal : open"`** — генерируется классом `Modal` при программном вызове метода `open()`.
- **`"modal : close"`** — генерируется классом `Modal` при закрытии окна (клик по крестику, клик по оверлею или программный вызов `close()`).
- **`"success : close"`** — генерируется классом `SuccessOrder` при клике на кнопку закрытия экрана успешного заказа, что сигнализирует о готовности начать новый заказ.

События моделей данных (генерируются в слое Model при изменении данных, презентер в ответ перерисовывает представления):

- **`"catalog : changed"`** — `CatalogModel.setItems()` обновил список товаров. Презентер перерисовывает каталог.
- **`"catalog : selected"`** — `CatalogModel.setSelectedItem()` сохранил выбранный товар. Презентер показывает окно предпросмотра.
- **`"cart : changed"`** — `CartModel` добавил, удалил товар или очистил корзину. Презентер обновляет счётчик в шапке и корзину.
- **`"buyer : changed"`** — `BuyerModel` изменил или очистил данные покупателя. Презентер обновляет обе формы (значения, ошибки, кнопки).

---

## Дополнение к разделу: Слой Презентер (Presenter)

### Подход к реализации

В данном проекте роль Презентера выполняет файл `main.ts`, который выступает центральным узлом координации, используя единый экземпляр `EventEmitter`.

1. **Однонаправленный поток данных**: View-компоненты максимально «глупые». Они не знают о существовании Моделей. На любое действие пользователя представление только генерирует событие через `events.emit()`: напрямую, как `Header`, `Basket` и формы, либо через колбэк, который презентер передаёт карточке при создании и в котором захватывает `id` товара. Вызовы методов моделей находятся только в обработчиках событий презентера.
2. **Централизованная подписка**: При инициализации приложения Презентер подписывается на события View (например, `"basket : open"`, `"order : submit"`, `"contacts : submit"`, `"order : change"`).
