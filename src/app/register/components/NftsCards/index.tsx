'use client'

import Pagination from "@/components/Pagination";
import { Checkbox } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";


export function NftLoadingPlaceholder({ number = 1 }) {
    return new Array(number).fill(1).map((_, index) => (
        <div
            className="shadow rounded-md p-4 w-full mx-auto"
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
            <div className="p-4 border-t grid grid-cols-3 gap-2">
                {
                    isLoading && <NftLoadingPlaceholder number={6} />
                }
                {
                    data && data?.data.nfts.length && new Array(6).fill(1).map((_, index) => (
                        <div key={index} className=" rounded-md bg-gray-100 p-2 cursor-pointer shadow-none transition-shadow hover:shadow-2xl">
                            <img
                                className="w-full rounded-lg object-cover"
                                src="http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960"
                                alt=""
                            />
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="text-lg font-bold">name</h4>
                                    <p>Token ID: 123123</p>
                                </div>
                                <div className="flex justify-center items-center w-4 h-4 rounded-full border border-[#3358D4] overflow-auto">
                                    <Checkbox checked={false} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-end p-4">
                <Pagination totalPages={2} />
            </div>
        </div>
    </>
}