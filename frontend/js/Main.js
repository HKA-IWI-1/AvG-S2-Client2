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
"use strict";

class Main {
    wsC = new WebSocketConnection();
    clientId;
    stompClient;
    selectClientButton = document.getElementById("selectClient--button");
    stockGraphs;
    orders;

    constructor() {
        new HeaderNav();
        this.selectClientButton.addEventListener(
            "click",
            () => {
                this.clientId = document.getElementById("selectClient").value;
                this.registerStompClient();
            });
    }

    registerStompClient() {
        this.stompClient = this.wsC.connect(this.clientId);

        this.stompClient.onConnect = (frame) => {
            this.wsC.setConnected(true);
            console.log('Connected: ' + frame);

            // subscribe to exchange service
            this.stompClient.subscribe('/exchange/stockPrices', (exchangesBinary) => {
                const exchanges = JSON.parse(exchangesBinary.body)
                if (this.stockGraphs === undefined) {
                    this.stockGraphs = new StockGraphs(exchanges);
                } else {
                    this.stockGraphs.updateStockGraphs(exchanges);
                }
            });

            // subscribe to order updates
            this.stompClient.subscribe('/exchange/receiveOrders', (ordersBinary) => {
                const orders = JSON.parse(ordersBinary.body)
                console.log(orders);
                if (this.orders === undefined) {
                    this.orders = new Orders(orders);
                    // this.orders = new Orders([
                    //     {
                    //         "id": 1,
                    //         "clientId": 2,
                    //         "exchangeId": 3,
                    //         "wkn": 4,
                    //         "amount": 5,
                    //         "status": "P",
                    //         "minPrice": 6
                    //     },
                    //     {
                    //         "id": 2,
                    //         "clientId": 2,
                    //         "exchangeId": 3,
                    //         "wkn": 4,
                    //         "amount": 5,
                    //         "status": "P",
                    //         "minPrice": 6
                    //     },
                    //     {
                    //         "id": 3,
                    //         "clientId": 2,
                    //         "exchangeId": 3,
                    //         "wkn": 4,
                    //         "amount": 5,
                    //         "status": "P",
                    //         "minPrice": 6
                    //     }
                    // ])
                } else {
                    this.orders.updateOrderList(orders);
                }
                // setTimeout(() => {
                //     this.orders.updateOrderList(
                //         [
                //             {
                //                 "id": 1,
                //                 "clientId": 2,
                //                 "exchangeId": 3,
                //                 "wkn": 4,
                //                 "amount": 5,
                //                 "status": "P",
                //                 "minPrice": 6
                //             },
                //             {
                //                 "id": 2,
                //                 "clientId": 2,
                //                 "exchangeId": 3,
                //                 "wkn": 4,
                //                 "amount": 5,
                //                 "status": "S",
                //                 "minPrice": 6
                //             },
                //             {
                //                 "id": 3,
                //                 "clientId": 2,
                //                 "exchangeId": 3,
                //                 "wkn": 4,
                //                 "amount": 5,
                //                 "status": "E",
                //                 "minPrice": 6
                //             }
                //         ]
                //     )
                // }, 5000)
            });

            this.getAllOrders();
        };

        //handle errors
        this.stompClient.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };
        this.stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        this.stompClient.activate();
    }

    getAllOrders() {
        this.stompClient.publish({
            destination: "/order/all",
        });
    }

    sendBuyOrder() {
        this.stompClient.publish({
            destination: "/order/buy",
            body: JSON.stringify({test: "buyOrder"})
        });
    }

    sendSellOrder() {
        this.stompClient.publish({
            destination: "/order/sell",
            body: JSON.stringify({test: "sellOrder"})
        });
    }
}
