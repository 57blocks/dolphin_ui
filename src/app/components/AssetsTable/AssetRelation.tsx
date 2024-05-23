'use client'

import AssetRelationCard from "./AssetRelationCard";
import { NftWithAsset, fetchNftByIpAssets } from "@/app/hooks/useIPAssetNfts";
import { useEffect, useState } from "react";
import { Asset, GraphDetial, RESOURCE_TYPE } from "@/story/types";
import AnimateHeightBlock from "@/components/AnimateHeightBlock";
import { getResource } from "@/story/storyApi";
import { SkeletonTable } from "@/components/Skeletons/SkeletonTable";

interface IProps {
    isVisible: boolean,
    asset: Asset
    ips?: GraphDetial[]
    getPrice?: (prices: number[]) => void
}

const getIpAssetsByList = async (assets: Asset[]) => {
    try {
        const promises = assets.map(async (ip: Asset) => {
            const data = await getResource(
                RESOURCE_TYPE.ASSET,
                ip.id
            )
            return data.data;
        })

        const ipAssets = await Promise.allSettled(promises).then((res) => {
            const result = res.map(({ value }: any) => {
                return value
            })
            return result
        })
        return ipAssets
    } catch (err) {
        console.log(err)
    }
}

export default function AssetRelation({
    isVisible,
    asset,
    ips,
    getPrice
}: IProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [grandChild, setGrandChild] = useState<Asset[]>([]);
    const [loadingGrandChild, setLoadingGrandChild] = useState(false);
    const rootAsset = asset;
    const child = rootAsset.childIpIds;
    let allIps = [asset];
    if (child && child.length) {
        allIps = [asset].concat(...child, []);
    }

    const getData = async () => {
        try {
            setLoadingGrandChild(true)
            if (rootAsset && rootAsset.childIpIds) {
                const childAssets: Asset[] | undefined = await getIpAssetsByList(rootAsset.childIpIds);
                if (childAssets && childAssets.length) {
                    const grandChildIpas: Asset[] = [];
                    childAssets.forEach(asset => {
                        const childIpaIds = asset?.childIpIds;
                        if (childIpaIds) {
                            grandChildIpas.push(...childIpaIds)
                            allIps = allIps.concat(...childIpaIds, [])
                        }
                    })

                    if (grandChildIpas.length) {
                        const grandChildAssets: Asset[] | undefined = await getIpAssetsByList(grandChildIpas);
                        if (grandChildAssets && grandChildAssets.length) {
                            setGrandChild(grandChildAssets)
                        }
                    }
                }
            }
        } catch (err: any) {
            throw new Error(err)
        } finally {
            setLoadingGrandChild(false)
            setIsLoaded(true);
        }
    }
    useEffect(() => {
        if (isLoaded) return;
        if (isVisible) { getData() }
    }, [isVisible])

    useEffect(() => {
        if (allIps.length && ips) {
            const prices = allIps.map((i) => Number(ips.find(ip => ip.ipId == i.id.toLowerCase())?.price) / 1e18)
            const newPrice = prices.sort((a, b) => a - b)
            getPrice && getPrice(newPrice);
        }
    }, [allIps.length, ips?.length])

    return <AnimateHeightBlock
        isVisible={isVisible}
        className="overflow-auto max-h-[500px]"
    >
        <div className="px-4 pb-4">
            <h3 className="font-semibold mt-4">Root</h3>
            <div className="grid grid-cols-4 mt-4 gap-8">
                <AssetRelationCard asset={asset} ips={ips} />
            </div>

            {
                child?.length ? (<>
                    <h3 className="font-semibold mt-4">Children</h3>
                    <div className="grid grid-cols-4 mt-4 gap-8">
                        {
                            child.map(c => <AssetRelationCard key={c.id} asset={c} ips={ips} />)
                        }
                    </div>
                </>
                ) : null
            }
            {
                loadingGrandChild ? <div className="grid grid-cols-4 mt-4 gap-8">
                    <SkeletonTable number={1} />
                </div> : grandChild.length ? (<>
                    <h3 className="font-semibold mt-4">Grand Children</h3>
                    <div className="grid grid-cols-4 mt-4 gap-8">
                        {
                            grandChild.map(c => <AssetRelationCard key={c.id} asset={c} ips={ips} />)
                        }
                    </div>
                </>) : null
            }
        </div>
    </AnimateHeightBlock>
}