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

package de.hka_iwi_1.avg_s2_client.repository;

import de.hka_iwi_1.avg_s2_client.entity.AbstractOrder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.UUID;

import static de.hka_iwi_1.avg_s2_client.repository.DB.ORDERS;

/**
 * Repository for handling the database connection.
 */
@Repository
@Slf4j
public class OrderRepository {

    /**
     * Method for finding all orders inside the database.
     * @return A collection containing all orders.
     */
    public Collection<AbstractOrder> findAll() {
        log.debug("findAll");
        return ORDERS;
    }

    /**
     * Method for persisting an order.
     * @param order The order that needs to be saved.
     */
    public void persistOrder(AbstractOrder order) {
        log.debug("persistOrder: order={}", order);
        ORDERS.add(order);
    }

    /**
     * Method for finding an order for a given order id.
     * @param orderId The id of the requested order.
     * @return A list containing the found order. Or an empty list if no order was found.
     */
    public Collection<AbstractOrder> findOrder(UUID orderId) {
        log.debug("findOrder: orderId={}", orderId);
        return ORDERS.stream().filter(existingOrder -> existingOrder.getId().equals(orderId)).toList();
    }
}
