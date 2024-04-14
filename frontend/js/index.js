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

// todo: clean up https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file

(function () {
    let clientId;
    let stompClient;

    const selectClientButton = document.getElementById("selectClient--button");
    selectClientButton.addEventListener(
        "click",
        () => {
            clientId = document.getElementById("selectClient").value;
            registerStompClient(clientId);
        });

    function registerStompClient(clientId) {
        const port = clientId === "1" ? "8080" : "8081";
        stompClient = new StompJs.Client({
            brokerURL: 'ws://127.0.0.1:' + port + '/stock-broker',
            reconnectDelay: 0,
        });

        stompClient.onConnect = (frame) => {
            setConnected(true);
            console.log('Connected: ' + frame);
            // subscribe to exchange service
            stompClient.subscribe('/exchange/stockPrices', (stocksObject) => {
                const stocks = JSON.parse(stocksObject.body);
                console.log(stocks)
            });
            // subscribe to order updates
            stompClient.subscribe('/order/receiveOrders', (ordersObject) => {
                const orders = JSON.parse(ordersObject.body);
                console.log(orders)
            });
        };

        stompClient.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };

        stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        stompClient.activate();
    }

    function setConnected(bool) {
        const selectClientForm = document.getElementById("selectClient--form");
        const clientStatus = document.getElementById("client-status");
        const clientStatusBadge = document.getElementById("client-status__badge");
        if (bool) {
            selectClientForm.classList.add("hidden");
            selectClientButton.classList.add("disabled");
            clientStatus.classList.replace("text-danger", "text-success");
            clientStatusBadge.classList.replace("text-bg-danger", "text-bg-success")
            clientStatusBadge.innerHTML = "Yes";
        } else {
            selectClientForm.classList.remove("hidden");
            selectClientButton.classList.remove("disabled");
            clientStatus.classList.replace("text-success", "text-danger");
            clientStatusBadge.classList.replace("text-bg-success", "text-bg-danger")
            clientStatusBadge.innerHTML = "No";
        }
        clientStatus.addEventListener("click", (e) => {
            stompClient.deactivate();
            setConnected(false);
            console.log("Disconnected");
        })
    }
})()
