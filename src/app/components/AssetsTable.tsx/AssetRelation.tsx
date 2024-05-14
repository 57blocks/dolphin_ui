'use client'

import { AnimatePresence, motion } from "framer-motion";
import AssetRelationCard from "./AssetRelationCard";
import { NftWithAsset, fetchNftByIpAssets } from "@/app/hooks/useIPAssetNfts";
import { useEffect, useState } from "react";
import { Asset } from "@/story/types";

interface IProps {
    isVisible: boolean,
    asset: NftWithAsset
}

export default function AssetRelation({ isVisible, asset }: IProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [grandChild, setGrandChild] = useState<NftWithAsset[]>([]);
    const [child, setChild] = useState<NftWithAsset[]>([])
    const rootAsset = asset.ipAsset;
    const getData = async () => {
        try {
            if (rootAsset && rootAsset.childIpIds) {
                const result = await fetchNftByIpAssets(rootAsset.childIpIds);
                if (result?.nfts) {
                    setChild(result?.nfts);
                    const grandChildIpas: Asset[] = [];
                    result?.nfts.forEach(nft => {
                        const childIpaIds = nft.ipAsset?.childIpIds;
                        if (childIpaIds) {
                            grandChildIpas.push(...childIpaIds)
                        }
                    })
                    if (grandChildIpas.length) {
                        const grandChildRes = await fetchNftByIpAssets(grandChildIpas);
                        if (grandChildRes?.nfts) {
                            setGrandChild(grandChildRes?.nfts);
                        }
                    }
                }
            }
        } catch (err: any) {
            throw new Error(err)
        } finally {
            setIsLoaded(true);
        }
    }
    useEffect(() => {
        if (isLoaded) return;
        if (isVisible) { getData() }
    }, [isVisible])

    return <AnimatePresence>
        {isVisible && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-auto max-h-[500px]"
            >
                <div className="px-4 pb-4">
                    <h3 className="font-semibold mt-4">Root</h3>
                    <div className="grid grid-cols-4 mt-4 gap-8">
                        <AssetRelationCard asset={asset} />
                    </div>

                    {
                        child.length ? (<>
                            <h3 className="font-semibold mt-4">Children</h3>
                            <div className="grid grid-cols-4 mt-4 gap-8">
                                {
                                    child.map(c => <AssetRelationCard key={c.ipAsset.id} asset={c} />)
                                }
                            </div>
                        </>
                        ) : null
                    }
                    {
                        grandChild.length ? (<>
                            <h3 className="font-semibold mt-4">Grand Children</h3>
                            <div className="grid grid-cols-4 mt-4 gap-8">
                                {
                                    grandChild.map(c => <AssetRelationCard key={c.ipAsset.id} asset={c} />)
                                }
                            </div>
                        </>) : null
                    }
                </div>
            </motion.div>
        )}
    </AnimatePresence>
}