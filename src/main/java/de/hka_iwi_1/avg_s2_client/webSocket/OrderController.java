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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.hka_iwi_1.avg_s2_client.entity.*;
import de.hka_iwi_1.avg_s2_client.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import static de.hka_iwi_1.avg_s2_client.webSocket.StockPriceController.exchange;

@Controller
@Slf4j
@RequiredArgsConstructor
public class OrderController {

    public static final String orderPrefix = "/order";

    public static final String receiveOrders = "/receiveOrders";

    private final OrderService orderService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final ObjectMapper mapper;

    @MessageMapping("/buy")
    public void sendBuyOrder(final String orderString) throws JsonProcessingException {
        var order = mapper.readValue(orderString, BuyOrder.class);
        log.debug("sendBuyOrder: order={}", order);
        sendOrder(OrderWrapper.builder().buyOrder(order).build());
        publishOrders();
    }

    @MessageMapping("/sell")
    public void sendSellOrder(final String orderString) throws JsonProcessingException {
        var order = mapper.readValue(orderString, SellOrder.class);
        log.debug("sendSellOrder: order={}", order);
        sendOrder(OrderWrapper.builder().sellOrder(order).build());
        publishOrders();
    }

    /**
     * Send an order to the exchange.
     *
     * @param orderWrapper The Sell and Buy Orders wrapped in one object.
     */
    private void sendOrder(OrderWrapper orderWrapper) throws JsonProcessingException {
        log.debug("sendOrder: orderWrapper={}", orderWrapper);
        orderService.sendOrder(orderWrapper);
        publishOrders();
    }

    /**
     * Receive an order from the exchange.
     *
     * @param orderWrapperString The wrapped updated order.
     */
    @JmsListener(destination = "${jms.stocks.orderStatus.Stuttgart}")
    @JmsListener(destination = "${jms.stocks.orderStatus.Frankfurt}")
    //todo: convert orderWrapperString automatically
    private void receiveOrderStatus(String orderWrapperString) throws JsonProcessingException {
        log.debug("receiveOrderStatus: orderWrapperString={}", orderWrapperString);
        var orderWrapper = mapper.readValue(orderWrapperString, OrderWrapper.class);
        orderService.updateOrderStatus(orderWrapper);
        publishOrders();
    }

    @MessageMapping("/all")
    public void publishOrders() {
        log.debug("publishOrders");
        simpMessagingTemplate.convertAndSend(
                exchange + receiveOrders,
                orderService.getAll()
        );
    }
}
