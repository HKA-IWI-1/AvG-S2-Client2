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

import de.hka_iwi_1.avg_s2_client.entity.AbstractOrder;
import de.hka_iwi_1.avg_s2_client.entity.BuyOrder;
import de.hka_iwi_1.avg_s2_client.entity.SellOrder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
@RequiredArgsConstructor
public class OrderController {

    public static final String orderPrefix = "/order";

    private final JmsTemplate jmsTemplate;

    @MessageMapping("/buy")
    public void sendBuyOrder(final BuyOrder order) {
        // tbd
    }

    @MessageMapping("/sell")
    public void sendSellOrder(final SellOrder order) {
        // tbd
    }


    @Value("${jms.sendOrder}")
    String sendOrder;

    @Value("${jms.receiveOrderStatus}")
    String receiveOrderStatus;

    /**
     * Send an order to the exchange.
     *
     * @param order The order that is to be sent.
     */
    private void sendOrder(AbstractOrder order) {
        log.info("sendOrder: {}", order);
        jmsTemplate.convertAndSend(sendOrder, order);
    }

    /**
     * received an order status from the exchange.
     *
     * @param order The updated order.
     */
    private void receiveOrderStatus(String order) {
        log.info("receiveOrderStatus: {}", order);
        jmsTemplate.convertAndSend(receiveOrderStatus, order);
    }
}
