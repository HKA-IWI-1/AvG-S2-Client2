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
(function () {
    let clientId;
    let stompClient;

    const selectClientButton = document.getElementById("selectClient--button");
    selectClientButton.addEventListener(
        "click",
        () => {
            clientId = document.getElementById("selectClient").value;
            document.getElementById("selectClient--form").classList.add("hidden")
            setConnected(true);
            registerStompClient();
        });

    function registerStompClient() {
        stompClient = new StompJs.Client({
            brokerURL: 'ws://localhost:8080/stock-broker'
        });

        stompClient.onConnect = (frame) => {
            setConnected(true);
            console.log('Connected: ' + frame);
            // subscribe to exchange service
            stompClient.subscribe('/exchangeService/receiveStockPrices', (stocksString) => {
                const stocks = JSON.parse(stocksString.body).content;
                console.log(stocks)
            });

            // subscribe to order updates
            stompClient.subscribe('/order/receiveOrders', (ordersString) => {
                const orders = JSON.parse(ordersString.body).content;
                console.log(orders)
            });
        };
    }

    function setConnected(bool) {
        const clientStatus = document.getElementById("client-status");
        const clientStatusBadge = document.getElementById("client-status__badge");
        if (bool) {
            clientStatus.classList.replace("text-danger", "text-success");
            clientStatusBadge.classList.replace("text-bg-danger", "text-bg-success")
            clientStatusBadge.innerHTML = "Yes";
        } else {
            clientStatus.classList.replace("text-success", "text-danger");
            clientStatusBadge.classList.replace("text-bg-success", "text-bg-danger")
            clientStatusBadge.innerHTML = "No";
        }
    }
})()
