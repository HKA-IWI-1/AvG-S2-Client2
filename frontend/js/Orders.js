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

class Orders {

    orderHull = document.getElementById('open-orders');
    orderDiv;

    constructor(orders) {
        this.buildOrderHull();
        this.updateOrderList(orders);
    }

    buildOrderHull() {
        const div = document.createElement('div');
        div.classList.add('open-orders__hull')
        this.orderHull.appendChild(div);
        this.orderDiv = div;
    }

    updateOrderList(orders) {
        orders.forEach(order => {
            let orderExists = false;
            this.orderDiv.childNodes.forEach(child => {
                if (child.dataset.id === `${order.id}`) {
                    orderExists = true;
                    if (order.status === "S") {
                        child.classList.remove("error");
                        child.classList.remove("pending");
                        child.classList.add("success");
                    } else if (order.status === "P") {
                        child.classList.remove("error");
                        child.classList.add("pending");
                        child.classList.remove("success");
                    } else {
                        child.classList.add("error");
                        child.classList.remove("pending");
                        child.classList.remove("success");
                    }
                }
            })
            if (!orderExists) {
                const div = document.createElement("div");
                div.dataset.id = order.id;
                div.innerHTML = `<p>OrderId: ${order.id}</p>
                                            <span>ClientId: ${order.clientId}</span>
                                            <span>ExchangeId: ${order.exchangeId}</span>
                                            <span>Amount: ${order.amount}</span>
                                            <span>WKN: ${order.wkn}</span>
                                            <span>Status: ${order.status}
                                        </span>`;

                if (order.status === "S") {
                    div.classList.add("success");
                } else if (order.status === "P") {
                    div.classList.add("pending");
                } else {
                    div.classList.add("error");
                }

                this.orderDiv.append(div);
            }
        })
    }

}