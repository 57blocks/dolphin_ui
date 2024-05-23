import { Asset } from '@/story/types';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

interface IProps {
    parents?: Asset[] | null
    childrenAssets?: Asset[] | null
    self: Asset
}

function handleParents(parents: Asset[], self: Asset) {
    const data = parents.map((p, idx) => {
        return {
            name: p.nftMetadata.name || `${p.tokenId}:${p.id}`,
            x: 10 + idx * 5,
            y: 10,
        }
    });
    const links = parents.map(p => {
        return {
            source: p.nftMetadata.name || `${p.tokenId}:${p.id}`,
            target: self.nftMetadata.name || `${self.tokenId}:${self.id}`,
        }
    })
    return {
        parentsData: data,
        parentsLink: links
    }
}

function handleChildren(children: Asset[], self: Asset) {
    const data = children.map((c, idx) => {
        return {
            name: c.nftMetadata.name || `${c.tokenId}:${c.id}`,
            x: 10 + idx * 5,
            y: 30,
        }
    });
    const links = children.map(c => {
        return {
            source: self.nftMetadata.name || `${self.tokenId}:${self.id}`,
            target: c.nftMetadata.name || `${c.tokenId}:${c.id}`,
        }
    })
    return {
        childrenData: data,
        childrenLink: links
    }
}

export default function RelationshipGraph({
    parents,
    childrenAssets,
    self
}: IProps) {
    const ref = useRef(null);
    useEffect(() => {
        const myChart = echarts.init(ref.current);
        const dataArr = [{
            name: self.nftMetadata.name || `${self.tokenId}:${self.id}`,
            x: 10,
            y: 20,
        }];
        const linkArr = [];
        if (parents && parents.length) {
            const { parentsData, parentsLink } = handleParents(parents, self);
            dataArr.push(...parentsData)
            linkArr.push(...parentsLink)
        }
        if (childrenAssets && childrenAssets.length) {
            const { childrenData, childrenLink } = handleChildren(childrenAssets, self);
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

    return <div className='col-span-6' ref={ref}></div>
}