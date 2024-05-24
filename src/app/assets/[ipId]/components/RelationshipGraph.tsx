import { DLExtendedNFTMetadata } from '@/simplehash/types';
import { Asset } from '@/story/types';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

interface IProps {
    child?: DLExtendedNFTMetadata[]
    self: DLExtendedNFTMetadata
}
function handleChildren(children: DLExtendedNFTMetadata[], self: DLExtendedNFTMetadata) {
    const data = children.map((c, idx) => {
        return {
            name: c.name || `${c.tokenId}:${c.id}`,
            x: 10 + idx * 5,
            y: 30,
        }
    });
    const links = children.map(c => {
        return {
            source: self.name || `${self.tokenId}:${self.id}`,
            target: c.name || `${c.tokenId}:${c.id}`,
        }
    })
    return {
        childrenData: data,
        childrenLink: links
    }
}

export default function RelationshipGraph({
    child,
    self
}: IProps) {
    const ref = useRef(null);
    useEffect(() => {
        const myChart = echarts.init(ref.current);
        const dataArr = [{
            name: self.name || `${self.tokenId}:${self.id}`,
            x: 10,
            y: 20,
        }];
        const linkArr = [];

        if (child && child.length) {
            const { childrenData, childrenLink } = handleChildren(child, self);
            dataArr.push(...childrenData)
            linkArr.push(...childrenLink)
        }
        myChart.setOption({
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 20,
                    roam: true,
                    label: {
                        show: true
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        fontSize: 20
                    },
                    data: dataArr,
                    links: linkArr,
                    lineStyle: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            ]
        });
    }, []);

    return <div className='col-span-12 h-[400px]' ref={ref}></div>
}