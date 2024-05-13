'use client'

import Pagination from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";


export function NftLoadingPlaceholder({ number = 1 }) {
    return new Array(number).fill(1).map((_, index) => (
        <div
            className="shadow rounded-md p-4 max-w-sm w-full mx-auto"
            key={index}
        >
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-2 py-1">
                    <div className="h-[200px] bg-slate-200 rounded"></div>
                    <div className="space-y-2">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    ))
}

export default function NftsCard() {
    const { address } = useAccount()

    const { data, isLoading } = useQuery({
        queryKey: ['nfts'],
        queryFn: () =>
            fetch(
                `register/apis/fetchNftsByWallet?chains=${'ethereum-sepolia'}&address=${address}`
            ).then(res => res.json())
    })

    return <>
        <h2 className="text-2xl font-bold">IP Registration</h2>
        <p className="text-gray-500 mt-4">Follow the steps to register your intellectual property</p>
        <div className="border rounded-md mt-4">
            <div className="p-4 font-bold">NFTs in your wallet</div>
            <div className="p-4 border-t grid grid-cols-4 gap-2">
                {
                    true && <NftLoadingPlaceholder number={12} />
                }
            </div>
            <div className="flex justify-end p-4">
                <Pagination totalPages={2} />
            </div>
        </div>
    </>
}