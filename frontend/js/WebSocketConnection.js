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

            this.clientStatus.classList.replace("text-danger-emphasis", "text-success-emphasis");
            this.clientStatus.classList.replace("bg-danger-subtle", "bg-success-subtle");
            this.clientStatus.classList.replace("border-danger-subtle", "border-success-subtle");

            this.clientStatusBadge.classList.replace("bi-exclamation-triangle", "bi-check-lg")
            this.clientStatusBadge.innerHTML = "Connected";
        } else {
            this.selectClientForm.classList.remove("hidden");
            this.selectClientButton.classList.remove("disabled");

            this.clientStatus.classList.replace("text-success-emphasis", "text-danger-emphasis");
            this.clientStatus.classList.replace("bg-success-subtle", "bg-danger-subtle");
            this.clientStatus.classList.replace("border-success-subtle", "border-danger-subtle");

            this.clientStatusBadge.classList.replace("bi-check-lg", "bi-exclamation-triangle")
            this.clientStatusBadge.innerHTML = "Not Connected";
        }
        // this.clientStatus.addEventListener("click", (e) => {
        //     this.stompClient.deactivate();
        //     this.setConnected(false);
        //     console.log("Disconnected");
        // })
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