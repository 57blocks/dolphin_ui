'use client'

import Link from "next/link";
import useAssetWithNft from "./hooks/useAssetWithNft";
import { useMemo } from "react";
import clx from 'classnames';
import { Button } from "@radix-ui/themes";
import Lineage from "./components/Lineage";
import LoadingBlock from "./components/LoadingBlock";
import Detail from "./components/Detail";
import LicenseType from "./components/LicenseType";

export default function Page({ params: { ipId } }: { params: { ipId: string } }) {
    const { data, isLoading } = useAssetWithNft(ipId);
    const hasLineage = useMemo(
        () =>
            !!(
                data?.ipAsset.rootIpIds?.length ||
                data?.ipAsset.parentIpIds?.length ||
                data?.ipAsset.childIpIds?.length
            ),
        [data]
    )
    if (isLoading) return <LoadingBlock />;
    return (
        <main className="flex flex-col items-center justify-between">
            <section className="container grid max-w-7xl grid-cols-12 gap-8 py-8">
                <div className="page-header col-span-12 flex items-center justify-between">
                    {/* title */}
                    <div className="header-title text-3xl font-bold">
                        {data?.name || 'Untitled'}
                        <h4 className="text-2xl font-bold text-green-600">$10-$20</h4>
                    </div>
                    <div className=" space-x-2">
                        <Button variant="outline" className="w-[150px] py-5 cursor-pointer">Remix</Button>
                        <Button className="w-[150px] py-5 cursor-pointer">Buy</Button>
                    </div>
                </div>
                {/* image */}
                <div className="relative col-span-12 flex flex-col gap-6 md:col-span-6">
                    <div className="flex aspect-square w-full flex-shrink-0 overflow-hidden rounded-4xl bg-neutral-50 shadow-sm">
                        {data?.image_url && (
                            <img
                                src={data?.image_url}
                                alt={data?.name}
                                className="h-full w-full object-contain"
                            />
                        )}
                    </div>

                    {/* description */}
                    <div className="col-span-12 rounded-4xl bg-neutral-50 p-8 shadow-sm md:col-span-6 ">
                        <h2 className="text-2xl font-bold">Description</h2>
                        {data?.description ? (
                            <p className="mt-4">{data?.description}</p>
                        ) : (
                            <p className="mt-4">No description</p>
                        )}
                    </div>
                </div>
                <div className="col-span-12 flex flex-col gap-6 md:col-span-6">
                    {/* licenses */}
                    <div className="w-full rounded-4xl bg-neutral-50 p-8 shadow-sm">
                        <h2 className="mb-4 text-2xl font-bold">Licensing</h2>
                        <h3 className="mb-2 text-lg font-bold">License Types</h3>
                        <LicenseType ipId={data?.ipAsset.id} />
                    </div>
                    <div className="w-full rounded-4xl bg-neutral-50 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold">Details</h2>
                        <Detail data={data} />
                    </div>
                </div>
                <div
                    className={clx(
                        'grid grid-cols-12 gap-4 overflow-hidden rounded-4xl bg-neutral-50 shadow-sm',
                        hasLineage ? 'col-span-12' : 'col-span-12 md:col-span-6'
                    )}
                >
                    <div
                        className={clx('col-span-12 p-8', {
                            'md:col-span-6': hasLineage
                        })}
                    >
                        <h2 className="text-2xl font-bold">Lineage</h2>
                        <Lineage data={data} />
                    </div>
                    {/* {assetData.rootIpIds?.length ||
                        assetData.parentIpIds?.length ||
                        assetData.childIpIds?.length ? (
                        <div
                            ref={graphRef}
                            className="relative col-span-12 md:col-span-6"
                        >
                            <div className="absolute inset-0">
                                <IpGraph
                                    width={graphBounds.width}
                                    height={graphBounds.height}
                                />
                            </div>
                        </div>
                    ) : null} */}
                </div>
            </section>
        </main>
    )
}
