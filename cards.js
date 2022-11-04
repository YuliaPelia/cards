import {getResource} from '../services/services';

function cards() {
 // Використовуєм класи для карточок

    // 1. Для створення класу карточки товару нам знадобиться:
    // 1) src картинки
    // 2) альтернативний текст (alt) який буде підгружатись якщо картинка не загрузиться
    // 3) title (заголовок картинки)
    // 4) опис
    // 5) ціна (price)
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            // 2. Властивості які знадобляться на даному етапі
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); // DOM - елемент
            this.transfer = 36;
            this.changeToUAH();
        }

        // 3. Створюєм метод по конвертації валют
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        // 4. Формування верстки
        // 1) створити елемент
        // 2) в нього помістити певну верстку
        // 3) доповнити верстку даними які приходять як аргументи 
        // 4) помістити цей елемент на сторінку
        render() {
            const element = document.createElement('div');


            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            // - допомагає динамічно сформувати цю структуру
            element.innerHTML = ` 
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
            this.parent.append(element);
        }
    }


    // 1 варіант
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // викор синтаксис деструктуризації обєкта
                // деструктуризація обєкта - це коли з обєкта витягаєм окремі властивості в якості окремої змінної
            });
        });
    // 2 варіант
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

}

export default cards;