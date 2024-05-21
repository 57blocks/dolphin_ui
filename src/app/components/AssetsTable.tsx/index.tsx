'use client'

import useIPAssetNfts from "@/app/hooks/useIPAssetNfts";
import Pagination from "@/components/Pagination";
import { SkeletonTable } from "@/components/Skeletons/SkeletonTable";
import AssetItem from "./AssetItem";
import { useState } from "react";
import InputPagination from "@/components/Pagination/InputPagination";
import Link from "next/link";

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
        <div className="flex space-x-4">
            <h2 className="text-2xl font-bold text-indigo-500 relative py-4 flex flex-col items-center">
                Market Place
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