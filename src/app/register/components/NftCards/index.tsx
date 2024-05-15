'use client'

import { useNftsInConnectedWallet } from "@/app/hooks/useNftsInConnectedWallet";
import SkeletonCard from "@/components/Skeletons/SkeletonCard";
import { Button, Checkbox } from "@radix-ui/themes";
import { useState } from "react";
import clx from 'classnames';
import Link from "next/link";

export default function NftCards() {
    const { nfts, isLoading } = useNftsInConnectedWallet()
    const [selected, setSelected] = useState('');
    return <>
        <h2 className="text-2xl font-bold">Remix</h2>
        <p className="text-gray-500 mt-4">Follow the steps to register your intellectual property</p>
        <div className="border rounded-md mt-4">
            <div className="p-4 font-bold">IP Assets in your wallet</div>
            <div className="p-4 border-t grid grid-cols-3 gap-2">
                {
                    isLoading && <SkeletonCard number={6} />
                }
                {
                    nfts?.length ? nfts.map((nft, index) => (
                        <div
                            key={index}
                            className={clx(
                                "rounded-md bg-gray-100 p-2 cursor-pointer shadow-none transition-shadow hover:shadow-2xl",
                                {
                                    'border-2 border-indigo-500': nft.token_id === selected
                                })
                            }
                            onClick={() => setSelected(nft.token_id)}
                        >
                            <img
                                className="w-full h-[400px] rounded-lg object-cover"
                                src={nft.image_url}
                                alt=""
                            />
                            <div className="flex justify-between items-center mt-2">
                                <div>
                                    <h4 className="text-lg font-bold">{nft.name}</h4>
                                    <p>Token ID: {nft.token_id}</p>
                                </div>
                                <Checkbox checked={nft.token_id === selected} />
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