'use client'

import { useNftsInConnectedWallet } from "@/app/hooks/useNftsInConnectedWallet";
import SkeletonCard from "@/components/Skeletons/SkeletonCard";
import { Button, Checkbox } from "@radix-ui/themes";
import { useState } from "react";
import clx from 'classnames';
import Link from "next/link";
import { Address } from "viem";
import PublishButton from "../PublishButton";

export default function NftCards() {
    const { nfts, isLoading } = useNftsInConnectedWallet()
    const [selected, setSelected] = useState<Address>();
    if (isLoading) return <div className="p-4 grid grid-cols-3 gap-2">
        <SkeletonCard number={6} />
    </div>
    return <>
        <div className="flex space-x-4">
            <h2 className="text-2xl font-bold py-4">
                <Link href='/'>Market Place</Link>
            </h2>
            <h2 className="text-2xl font-bold text-indigo-500 relative py-4 flex flex-col items-center">
                My Assets
                <p className="h-[2px] w-1/2 bg-indigo-500 mt-4"></p>
            </h2>
        </div>
        <p className="text-gray-500 mt-4">Follow the steps to register your intellectual property</p>
        <div className="border rounded-md mt-4">
            <div className="p-4 font-bold relative">
                IP Assets in your wallet.
                {
                    selected && (
                        <>
                            <p>
                                Selected: {selected}
                            </p>
                            <PublishButton
                                ipId={selected}
                                className="absolute top-4 right-4" />
                        </>
                    )
                }
            </div>
            <div className="p-4 border-t grid grid-cols-3 gap-2">
                {
                    nfts?.length ? nfts.map((nft, index) => (
                        <div
                            key={index}
                            className={clx(
                                "rounded-md bg-gray-100 p-2 cursor-pointer shadow-none transition-shadow hover:shadow-2xl",
                                {
                                    'border-2 border-indigo-500': nft.ipId === selected
                                })
                            }
                            onClick={() => setSelected(nft.ipId)}
                        >
                            <img
                                className="w-full h-[400px] rounded-lg object-cover"
                                src={nft.image_url}
                                alt=""
                            />
                            <div className="flex justify-between items-center mt-2">
                                <div>
                                    <h4 className="text-lg font-bold">{nft.name}</h4>
                                    <p>IP ID: {nft.ipId}</p>
                                </div>
                                <Checkbox checked={nft.ipId === selected} />
                            </div>
                        </div>
                    )) : <div className="h-[200px] col-start-2 flex flex-col space-y-4 justify-center items-center">
                        <h3 className="font-bold text-lg text-center">You still have no asset, Please register one!</h3>
                        <Link target="_blank" href='https://play.storyprotocol.xyz/assets/register'><Button className=" cursor-pointer">Register</Button></Link>
                    </div>
                }
            </div>
        </div>
    </>
}