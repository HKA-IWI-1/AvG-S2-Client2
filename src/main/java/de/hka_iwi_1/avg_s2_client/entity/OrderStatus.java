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

package de.hka_iwi_1.avg_s2_client.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.stream.Stream;

public enum OrderStatus {

    SUCCESS("S"),
    ERROR("S"),
    PENDING("S");

    private final String value;

    OrderStatus(final String value) {
        this.value = value;
    }

    /**
     * Einen enum-Wert als String mit dem internen Wert ausgeben.
     *
     * @return Interner Wert.
     */
    @JsonValue
    @Override
    public String toString() {
        return value;
    }

    /**
     * Konvertierung eines Strings in einen Enum-Wert.
     */
    @JsonCreator
    public static OrderStatus of(final String value) {
        return Stream.of(values())
                .filter(orderStatus -> orderStatus.value.equalsIgnoreCase(value))
                .findFirst()
                .orElse(null);
    }
}
