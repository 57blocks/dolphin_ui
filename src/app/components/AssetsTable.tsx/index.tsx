'use client'

import useIPAssetNfts from "@/app/hooks/useIPAssetNfts";
import Pagination from "@/components/Pagination";
import { SkeletonTable } from "@/components/Skeletons/SkeletonTable";
import AssetItem from "./AssetItem";
import { useState } from "react";
import InputPagination from "@/components/Pagination/InputPagination";

const PAGE_SIZE = 10;

export default function AssetsTable() {
    const [page, setPage] = useState(1)
    const { isLoading, nfts } = useIPAssetNfts(
        {
            pagination: {
                limit: PAGE_SIZE,
                offset: PAGE_SIZE * (page - 1),
            },
        }
    )
    if (isLoading) return <SkeletonTable number={12} />
    return <>
        <h2 className="text-2xl font-bold">Assets Viewer</h2>
        <div className="border rounded-lg mt-4">
            <div className="p-4">
                <ul>
                    {
                        nfts?.map((nft, index) => (
                            <AssetItem
                                key={index}
                                asset={nft}
                            />
                        ))
                    }
                </ul>
            </div>
            <div className="flex justify-end p-4">
                <InputPagination
                    page={page}
                    onPageChange={p => setPage(p)}
                />
            </div>
        </div>
    </>
}