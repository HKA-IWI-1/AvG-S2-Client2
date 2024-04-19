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

package de.hka_iwi_1.avg_s2_client.webSocket;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 * Class for handling incoming stock prices.
 */
@Controller
@Slf4j
@RequiredArgsConstructor
public class StockPriceController {

    /**
     * Prefix for web socket API.
     */
    public static final String exchange = "/exchange";

    /**
     * Path for publishing stock prices to WebSocket clients.
     */
    public static final String wsStockPrices = "/stockPrices";

    private final SimpMessagingTemplate simpMessagingTemplate;

    /**
     * Handle the updated stock prices that we receive from the producer.
     *
     * @param jsonData Serialized JSON-String containing stock data.
     */
    @JmsListener(destination = "${jms.stocks.updates}", containerFactory = "topicJmsListenerContainerFactory")
    public void receiveStockData(String jsonData) {
        log.debug("receiveStockPrices: jsonData={}", jsonData);
        simpMessagingTemplate.convertAndSend(
                exchange + wsStockPrices,
                jsonData
        );
    }
}
