import { DLExtendedNFTMetadata } from '@/simplehash/types';
import { Asset } from '@/story/types';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

interface IProps {
    parents?: DLExtendedNFTMetadata[]
    child?: DLExtendedNFTMetadata[]
    self: DLExtendedNFTMetadata
}

function handleParents(parents: DLExtendedNFTMetadata[]) {
    let data: any = [];
    parents.forEach((c, idx) => {
        data.push({
            name: `${c.name}-${c.tokenId}`,
            x: 10 + idx * 5,
            y: 10,
        })
        if (c.children.length) {
            c.children.forEach((r, index) => {
                data.push({
                    name: `${r.name}-${r.token_id}`,
                    x: 10 + index * 5,
                    y: 20,
                })
            })
        }
    });
    let links: {
        source: string,
        target: string
    }[] = [];
    parents.forEach(c => {
        if (c.children.length) {
            c.children.forEach(r => {
                links.push({
                    source: `${c.name}-${c.tokenId}`,
                    target: `${r.name}-${r.token_id}`,
                })
            })
        }
    })
    return {
        parentsData: data,
        parentsLink: links
    }
}


function handleChildren(children: DLExtendedNFTMetadata[], self: DLExtendedNFTMetadata) {
    const data = children.map((c, idx) => {
        return {
            name: `${c.name}-${c.tokenId}`,
            x: 10 + idx * 5,
            y: 30,
        }
    });
    const links = children.map(c => {
        return {
            source: `${self.name}-${self.tokenId}`,
            target: `${c.name}-${c.tokenId}`,
        }
    })
    return {
        childrenData: data,
        childrenLink: links
    }
}

export default function RelationshipGraph({
    parents,
    child,
    self
}: IProps) {
    const ref = useRef(null);
    useEffect(() => {
        const myChart = echarts.init(ref.current);
        const dataArr = [];
        const linkArr = [];

        if (child && child.length) {
            const { childrenData, childrenLink } = handleChildren(child, self);
            dataArr.push(...childrenData)
            linkArr.push(...childrenLink)
        }

        if (parents && parents.length) {
            const { parentsData, parentsLink } = handleParents(parents);
            dataArr.push(...parentsData)
            linkArr.push(...parentsLink)
        } else {
            dataArr.push({
                name: `${self.name}-${self.tokenId}`,
                x: 10,
                y: 20,
            })
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
    }, [parents?.length]);

    return <div className='col-span-12 h-[400px]' ref={ref}></div>
}