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

class StockGraphs {

    stocksColumn = document.getElementById('stocks');
    stockGraphs;
    options = {
        hAxis: {
            title: 'Time'
        },
        vAxis: {
            title: 'Price'
        },
        colors: ['#a52714', '#097138']
    }

    constructor(exchanges) {
        this.buildStockGraphs(exchanges);
    }

    buildStockGraphs(exchanges) {
        this.stockGraphs = {};
        exchanges.forEach(exchange => {
            const exchangeHull = this.buildExchangeHull(exchange);
            exchange.shares.forEach(
                stock => {
                    const graph = {};
                    graph[stock.wkn] = this.buildGraph(exchangeHull, stock);
                    this.stockGraphs[exchange.id] = graph;
                }
            )
            ;
        })
    }

    updateStockGraphs(exchanges) {
        exchanges.forEach(exchange => {
            exchange.shares.forEach(
                stock => {
                    this.stockGraphs[exchange.id][stock.wkn]?.draw(this.buildData(stock), this.options);
                }
            );
        })
    }

    buildExchangeHull(exchange) {
        const div = document.createElement('div');
        div.dataset.exchangeId = exchange.id;
        this.stocksColumn.appendChild(div);

        const p = document.createElement('p');
        p.innerText = exchange.name ?? "Missing name of exchange.";
        div.appendChild(p);
        return div;
    }

    buildGraph(exchangeHull, stock) {
        const div = document.createElement('div');
        div.id = stock.wkn;
        exchangeHull.appendChild(div);


        const chart = new google.visualization.LineChart(document.getElementById(stock.wkn));
        chart.draw(this.buildData(stock), this.options);
        return chart;
    }

    buildData(stock) {
        const data = new google.visualization.DataTable();
        data.addColumn('number', 'Time');
        data.addColumn('number', 'Price');

        let dataArray = [];
        for (let i = 0; i < stock.priceHistory.length; i++) {
            dataArray[i] = [i, stock.priceHistory[i]];
        }

        data.addRows(dataArray);
        return data;
    }

}
