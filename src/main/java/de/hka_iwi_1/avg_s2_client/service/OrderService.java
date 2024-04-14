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

package de.hka_iwi_1.avg_s2_client.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.hka_iwi_1.avg_s2_client.entity.AbstractOrder;
import de.hka_iwi_1.avg_s2_client.entity.ExchangeIdType;
import de.hka_iwi_1.avg_s2_client.entity.OrderWrapper;
import de.hka_iwi_1.avg_s2_client.repository.OrderRepository;
import de.hka_iwi_1.avg_s2_client.webSocket.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    @Value("${jms.stocks.newOrder.Stuttgart}")
    String sendOrderSt;

    @Value("${jms.stocks.newOrder.Frankfurt}")
    String sendOrderF;

    private final OrderRepository repository;

    private final JmsTemplate jmsTemplate;

    private final ObjectMapper mapper;

    public void sendOrder(OrderWrapper orderWrapper) throws JsonProcessingException {
        log.debug("sendOrder: orderWrapper={}", orderWrapper);
        var order = orderWrapper.getBuyOrder() == null ? orderWrapper.getSellOrder() : orderWrapper.getBuyOrder();
        var exchangeDestination = order.getExchange().getId().equals(ExchangeIdType.STUTTGART)
                ? sendOrderSt
                : sendOrderF;
        jmsTemplate.convertAndSend(exchangeDestination, mapper.writeValueAsString(orderWrapper));
        persistOrder(order);
    }

    private void persistOrder(AbstractOrder order) {
        log.debug("persistOrder: order={}", order);
        repository.persistOrder(order);
    }

    public void updateOrderStatus(OrderWrapper orderWrapper) {
        log.debug("updateOrderStatus: orderWrapper={}", orderWrapper);
        AbstractOrder orderFrontend = orderWrapper.getBuyOrder() != null ? orderWrapper.getBuyOrder() : orderWrapper.getSellOrder();
        var orders = repository.findOrder(orderFrontend.getId());
        if (orders.size() == 1) {
            orders.forEach(order -> order.setStatus(orderFrontend.getStatus()));
        }
    }

    public Collection<AbstractOrder> getAll() {
        log.debug("getAll");
        return repository.findAll();
    }
}
