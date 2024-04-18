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

class OrderForm {
    exchangeSelector = document.getElementById('buy-sell-stock--exchange');
    shareSelector = document.getElementById('buy-sell-stock--share');
    amountSelector = document.getElementById('buy-sell-stock--amount');
    orderTypeSelector = document.getElementById('buy-sell-stock--order-type');
    button = document.getElementById('buy-sell-stock--button');
    stompClient;

    constructor(exchanges, stompClient) {
        this.addExchangesAndShares(exchanges);
        this.button.addEventListener('click', () => {
            this.handleFormSending();
        });
        this.stompClient = stompClient;
    }

    addExchangesAndShares(exchanges) {
        exchanges.forEach(exchange => {
            const option = document.createElement('option');
            option.innerHTML = exchange.id;
            this.exchangeSelector.appendChild(option)
        });
        document.getElementById('submitExchange').addEventListener('click', () => {
            this.shareSelector.innerHTML = "";
            exchanges.forEach(exchange => {
                if (exchange.id === this.exchangeSelector.value) {
                    exchange.shares.forEach(share => {
                        const option = document.createElement('option');
                        option.innerHTML = share.wkn;
                        this.shareSelector.appendChild(option);
                    })
                }
            })
            this.exchangeSelector.setAttribute('disabled', "true");
            this.shareSelector.removeAttribute('disabled');
        });
        this.shareSelector.addEventListener('click', () => this.amountSelector.removeAttribute('disabled'));
        this.amountSelector.addEventListener('click', () => this.orderTypeSelector.removeAttribute('disabled'));
    }

    handleFormSending() {
        if (!(this.exchangeSelector.value === '' || this.shareSelector.value === '' || this.amountSelector.value === '' || this.orderTypeSelector.value === '')) {
            const orderWrapper = {
                "buyOrder": null,
                "sellOrder": null,
            }
            const order = {
                "id": crypto.randomUUID(),
                "clientId": _clientId,
                "exchangeId": this.exchangeSelector.value,
                "wkn": this.shareSelector.value,
                "amount": this.amountSelector.value,
                "status": "P",
                "minPrice": null
            }
            let method;
            if (this.orderTypeSelector.value === 'Buy') {
                method = '/order/buy';
                orderWrapper.buyOrder = order;
            } else {
                method = '/order/sell';
                orderWrapper.sellOrder = order;
            }
            this.stompClient.publish({
                destination: method,
                body: JSON.stringify(orderWrapper)
            });
            this.shareSelector.setAttribute('disabled', 'true');
            this.amountSelector.setAttribute('disabled', 'true');
            this.orderTypeSelector.setAttribute('disabled', 'true');
            this.exchangeSelector.removeAttribute('disabled');
            this.shareSelector.value = undefined;
            this.amountSelector.value = 0;
            this.orderTypeSelector.value = undefined;
            this.exchangeSelector.value = undefined;
        }
    }

}