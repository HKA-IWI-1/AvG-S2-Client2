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

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ConsumerService {

    private final JmsTemplate jmsTemplate;

    /**
     * Handle the messages that we receive from the producer (@Ronny @Luca: z.B. der Kaufauftrag vom Client).
     *
     * @param message Message received from the producer
     */
    @JmsListener(destination = "${jms.testQueueReceive}")
    private void testQueue(String message) {
        // do some fancy business logic
        log.info("testQueue: {}", message);
        sendToTestQueue("received the following message: " + message); // send answer to producer
    }

    @Value("${jms.testQueueSend}")
    String jmsQueue;

    /**
     * Send an answer to the producer (@Ronny @Luca: Eure Antwort auf den Kaufauftrag. Also die Statusänderung.).
     * @param message The answer to the producer.
     */
    private void sendToTestQueue(String message) {
        log.info("sendToTestQueue: {}", message);
        jmsTemplate.convertAndSend(jmsQueue, message);
    }


    /**
     * Check if send message (this.sendToTestQueue) was successful (@Ronny @Luca: nur ein Dummy. Die Message, die wir
     * mit dieser Methode erhalten, muss eigentlich bei mir und Adrian liegen. Ist nur hier drinnen, weil ich keine
     * Lust hatte, einen zweiten Client zu schreiben).
     *
     * @param message The received message.
     */
    @JmsListener(destination = "${jms.testQueueSend}")
    private void foo(String message) {
        log.info("foo: {}", message);
    }
}
