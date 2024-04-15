/*
 * Copyright (c) 2024 - present Florian Sauer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the “Software”), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions
 * of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

class HeaderNav {
    buttonStocks = document.getElementById('header__button--stocks');
    buttonOpenOrders = document.getElementById('header__button--open-orders');
    buttonBuySellStocks = document.getElementById('header__button--buy-sell-stocks');

    colStocks = document.getElementById('stocks');
    colOpenOrders = document.getElementById('open-orders');
    colBuySellStocks = document.getElementById('buy-sell-stocks');

    constructor() {
        this.addEventListeners();
    }

    addEventListeners() {
        this.buttonStocks.addEventListener('click', () => {
            this.toggleVisibleColumn(this.colStocks);
            this.colStocks.classList.remove('hidden')
            this.toggleVisibleButton(this.buttonStocks)
            this.buttonStocks.classList.add('active')
            this.buttonStocks.children[0].classList.add('active')
        });
        this.buttonOpenOrders.addEventListener('click', () => {
            this.toggleVisibleColumn(this.colOpenOrders);
            this.colOpenOrders.classList.remove('hidden')
            this.toggleVisibleButton(this.buttonOpenOrders)
            this.buttonOpenOrders.classList.add('active')
            this.buttonOpenOrders.children[0].classList.add('active')
        });
        this.buttonBuySellStocks.addEventListener('click', () => {
            this.toggleVisibleColumn(this.colBuySellStocks);
            this.colBuySellStocks.classList.remove('hidden')
            this.toggleVisibleButton(this.buttonBuySellStocks)
            this.buttonBuySellStocks.classList.add('active')
            this.buttonBuySellStocks.children[0].classList.add('active')
        });
    }

    toggleVisibleColumn(visibleCol) {
        if (visibleCol !== this.colStocks)
            this.colStocks.classList.add('hidden');
        if (visibleCol !== this.colOpenOrders)
            this.colOpenOrders.classList.add('hidden');
        if (visibleCol !== this.colBuySellStocks)
            this.colBuySellStocks.classList.add('hidden');
    }

    toggleVisibleButton(visibleButton) {
        if (visibleButton !== this.buttonStocks) {
            this.buttonStocks.classList.remove('active');
            this.buttonStocks.children[0].classList.remove('active');
        }
        if (visibleButton !== this.buttonOpenOrders) {
            this.buttonOpenOrders.classList.remove('active');
            this.buttonOpenOrders.children[0].classList.remove('active');
        }
        if (visibleButton !== this.buttonBuySellStocks) {
            this.buttonBuySellStocks.classList.remove('active');
            this.buttonBuySellStocks.children[0].classList.remove('active');
        }
    }
}