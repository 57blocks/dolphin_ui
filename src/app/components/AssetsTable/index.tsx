'use client'

import useIPAssetNfts from "@/app/hooks/useIPAssetNfts";
import { SkeletonTable } from "@/components/Skeletons/SkeletonTable";
import AssetItem from "./AssetItem";
import { useState } from "react";
import InputPagination from "@/components/Pagination/InputPagination";
import Link from "next/link";
import useListedIPAssets from "@/app/hooks/useListedIPAssets";

const PAGE_SIZE = 10;

export default function AssetsTable() {
    const {
        ipAssets,
        isLoading,
        error,
        ips
    } = useListedIPAssets()

    if (isLoading) return <SkeletonTable number={12} />
    return <>
        <div className="flex space-x-4">
            <h2 className="text-2xl font-bold text-indigo-500 relative py-4 flex flex-col items-center">
                Marketplace
                <p className="h-[2px] w-1/2 bg-indigo-500 mt-4"></p>
            </h2>
            <h2 className="text-2xl font-bold py-4">
                <Link href='/register'>My Assets</Link>
            </h2>
        </div>

        <div className="border rounded-lg mt-4">
            <div className="p-4">
                <ul>
                    {
                        ipAssets?.map((ipAssets, index) => (
                            <AssetItem
                                key={index}
                                index={index}
                                asset={ipAssets}
                                ips={ips}
                            />
                        ))
                    }
                </ul>
            </div>
        </div>
    </>
}