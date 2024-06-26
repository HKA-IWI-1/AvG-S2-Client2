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

/* Data coming from the producer.
[
   {
      "id":"00000000-0000-0000-0000-000000000001",
      "name":"Stuttgart",
      "shares":[
         {
            "wkn":"123456",
            "availableShares":100,
            "priceHistory":[
               124.03,
               206,
               35,
               74,
               56,
               37,
               84
            ]
         }
      ]
   },
   {
      "id":"00000000-0000-0000-0000-000000000002",
      "name":"Frankfurt",
      "shares":[
         {
            "wkn":"234567",
            "availableShares":200,
            "priceHistory":[
                90.89,
                84,
                28,
                278,
                25,
                27,
                76
            ]
         }
      ]
   }
]
 */

package de.hka_iwi_1.avg_s2_client.entity;

import lombok.*;

import java.util.Collection;
import java.util.UUID;

/**
 * The exchange at which orders can be bought/sold.
 */
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Exchange {

    /**
     * The id of the order.
     */
    private UUID id;

    /**
     * The list of available shares.
     */
    private Collection<Share> shares;
}
