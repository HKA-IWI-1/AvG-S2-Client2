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

class WebSocketConnection {

    selectClientButton = document.getElementById("selectClient--button");
    selectClientForm = document.getElementById("selectClient--form");
    clientStatus = document.getElementById("client-status");
    clientStatusBadge = document.getElementById("client-status__badge");
    stompClient;

    setConnected(bool) {
        if (bool) {
            this.selectClientForm.classList.add("hidden");
            this.selectClientButton.classList.add("disabled");
            this.clientStatus.classList.replace("text-danger", "text-success");
            this.clientStatusBadge.classList.replace("text-bg-danger", "text-bg-success")
            this.clientStatusBadge.innerHTML = "Yes";
        } else {
            this.selectClientForm.classList.remove("hidden");
            this.selectClientButton.classList.remove("disabled");
            this.clientStatus.classList.replace("text-success", "text-danger");
            this.clientStatusBadge.classList.replace("text-bg-success", "text-bg-danger")
            this.clientStatusBadge.innerHTML = "No";
        }
        this.clientStatus.addEventListener("click", (e) => {
            this.stompClient.deactivate();
            this.setConnected(false);
            console.log("Disconnected");
        })
    }

    connect(clientId) {
        const port = clientId === "1" ? "8080" : "8081";
        this.stompClient = new StompJs.Client({
            brokerURL: 'ws://127.0.0.1:' + port + '/stock-broker',
            reconnectDelay: 0,
        });
        return this.stompClient;
    }
}