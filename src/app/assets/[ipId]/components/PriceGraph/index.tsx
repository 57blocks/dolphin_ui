import * as echarts from 'echarts';
import { useEffect, useRef } from "react";
import { priceData } from './data';

export default function PriceGraph() {
    const ref = useRef(null);
    useEffect(() => {
        const myChart = echarts.init(ref.current);

        myChart.setOption({
            legend: {
                data: ['Standard Line']
            },
            xAxis: {
                type: 'category',
                data: priceData.x,
                name: 'Number of token in supply',
                nameLocation: "center",
                nameTextStyle: {
                    padding: [20, 0, 0, 0]
                }
            },
            yAxis: {
                type: 'value',
                name: 'Price(ETH)'
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '0%',
                bottom: '10%',
                containLabel: true
            },
            series: [
                {
                    name: 'Standard Line',
                    data: priceData.y,
                    type: 'line',
                    itemStyle: {
                        color: '#3e63dd'
                    },
                    showSymbol: false
                }
            ]
        });
    }, []);

    return <div className='col-span-12 h-[400px]' ref={ref}></div>
}