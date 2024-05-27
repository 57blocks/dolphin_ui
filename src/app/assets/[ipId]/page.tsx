'use client'

import useAssetWithNft from "./hooks/useAssetWithNft";
import { Button } from "@radix-ui/themes";
import Lineage from "./components/Lineage";
import LoadingBlock from "./components/LoadingBlock";
import Detail from "./components/Detail";
import LicenseType from "./components/LicenseType";
import RelationshipGraph from "./components/RelationshipGraph";
import TradeModal from "@/components/TradeModal";
import { useState } from "react";
import RemixModal from "@/components/RemixModal";
import PriceGraph from "./components/PriceGraph";
import Image from 'next/image';
import ImgPlaceholder from '@/../public/images/imagePlaceholder.png'
import useIPSWithNft from "@/app/hooks/useIPSWithNft";
import useQueryIPParent from "@/app/hooks/useQueryIPParent";
import { Address } from "viem";


export default function Page({ params: { ipId } }: { params: { ipId: string } }) {
    const { isLoading, ipsWithNft } = useIPSWithNft()
    const [open, setOpen] = useState(false);
    const [openRemixModal, setOpenRemixModal] = useState(false);
    const [openSellModal, setOpenSellModal] = useState(false);
    const [licenses, setLicenses] = useState<any>([])
    const { data: parents, loading: queryIPDetailLoading } = useQueryIPParent(ipId as Address)
    const data = ipsWithNft.find(nft => nft.ipId === ipId);
    const parentsWithNft = parents?.map(p => {
        const parent = ipsWithNft.find(nft => nft.ipId === p.ipId);
        let remix: any = [];
        if (parent?.remixs.length) {
            remix = parent.remixs.map(r => ipsWithNft.find(nft => nft.ipId === r.childIpId))
        }
        return {
            ...parent,
            children: remix
        }
    })
    const childd = data?.remixs.map(r => ipsWithNft.find(nft => nft.ipId === r.childIpId));
    if (isLoading && queryIPDetailLoading && !data) return <LoadingBlock />;

    return (
        <main className="flex flex-col items-center justify-between">
            <section className="container grid max-w-7xl grid-cols-12 gap-8 py-8">
                <div className="col-span-12 flex items-center justify-between">
                    <div className="header-title text-3xl font-bold">
                        {data?.name || 'Untitled'}
                        <h4 className="text-2xl font-bold text-green-600 mt-4">{data?.price ? (Number(data?.price) / 1e18).toFixed(6) : 0} ETH</h4>
                    </div>
                    <div className="space-x-4">
                        <Button
                            variant="outline"
                            className="w-[150px] rounded-lg py-5 cursor-pointer text-[#5538CE] border-[#5538CE] shadow-[#5538CE]"
                            onClick={() => setOpenRemixModal(true)}
                        >Remix</Button>
                        <Button
                            onClick={() => {
                                setOpen(true)
                            }}
                            className="w-[150px] rounded-lg bg-[#5538CE] py-5 cursor-pointer"
                        >Buy</Button>
                        <Button
                            onClick={() => {
                                setOpenSellModal(true)
                            }}
                            className="w-[150px] rounded-lg bg-[#5538CE] py-5 cursor-pointer"
                        >Sell</Button>
                    </div>
                </div>
                <div className="col-span-12 grid grid-cols-3 rounded-3xl bg-neutral-50 shadow-sm p-6">
                    <div className="col-span-1 text-center">
                        <h5 className="font-bold text-xl">{data ? data.holder : 0}</h5>
                        <div className="text-[#6B7280] mt-2">Number of Holders</div>
                    </div>
                    <div className="col-span-1 text-center">
                        <h5 className="font-bold text-xl">{data ? data.remixs.length : 0}</h5>
                        <div className="text-[#6B7280] mt-2">Number of Nodes</div>
                    </div>
                    <div className="col-span-1 text-center">
                        <h5 className="font-bold text-xl">6</h5>
                        <div className="text-[#6B7280] mt-2">The Longest chain</div>
                    </div>
                </div>
                <div className="relative col-span-12 flex flex-col gap-6 md:col-span-6">
                    <div className="flex aspect-square w-full flex-shrink-0 overflow-hidden rounded-3xl bg-neutral-50 shadow-sm p-4">
                        <Image
                            src={data?.image_url || ImgPlaceholder}
                            alt={data?.name || ''}
                            className="h-full w-full object-contain"
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
                <div className="col-span-12 flex flex-col gap-6 md:col-span-6">
                    <div className="w-full rounded-3xl bg-neutral-50 p-8 shadow-sm">
                        <h2 className="mb-4 text-2xl font-bold">Licensing</h2>
                        <h3 className="mb-2 text-lg font-bold">License Types</h3>
                        <LicenseType
                            ipId={data?.ipId}
                            afterLoading={(data) => setLicenses(data)}
                        />
                    </div>
                    <div className="w-full rounded-3xl bg-neutral-50 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold">Details</h2>
                        <Detail data={data} />
                    </div>
                </div>
                {
                    childd && childd.length ? (
                        <div
                            className='grid grid-cols-12 col-span-12 gap-4 overflow-hidden rounded-3xl bg-neutral-50 shadow-sm'
                        >
                            <div className='col-span-12 p-8'>
                                <h2 className="text-2xl font-bold">Lineage</h2>
                                <RelationshipGraph
                                    parents={parentsWithNft as any}
                                    child={childd as any}
                                    self={data as any}
                                />
                            </div>
                        </div>
                    ) : null
                }
                <div
                    className='grid grid-cols-12 col-span-12 gap-4 overflow-hidden rounded-3xl bg-neutral-50 shadow-sm p-8'
                >
                    <h2 className="col-span-12 text-2xl font-bold">Current Position in Price Curve</h2>
                    <PriceGraph />
                </div>
            </section>
            <TradeModal
                open={open}
                method='buy'
                asset={data}
                onClose={() => setOpen(false)}
            />
            <TradeModal
                open={openSellModal}
                method='sell'
                asset={data}
                onClose={() => setOpenSellModal(false)}
            />
            <RemixModal
                open={openRemixModal}
                asset={data as any}
                licenses={licenses}
                onClose={() => setOpenRemixModal(false)}
            />
        </main>
    )
}
