import * as echarts from 'echarts';
import { useEffect, useRef } from "react";
import { priceData } from './data';

export default function PriceGraph() {
    const ref = useRef(null);
    useEffect(() => {
        const myChart = echarts.init(ref.current);

        myChart.setOption({
            xAxis: {
                type: 'category',
                data: priceData.x
            },
            yAxis: {
                type: 'value'
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                containLabel: true
            },
            series: [
                {
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