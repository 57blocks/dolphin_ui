'use client'

import { NftWithAsset } from "@/app/hooks/useIPAssetNfts";
import { Button, ChevronDownIcon } from "@radix-ui/themes";
import { useState } from "react";
import clx from "classnames";
import AssetRelation from "./AssetRelation";
import Link from "next/link";

export default function AssetItem({
    asset
}: {
    asset: NftWithAsset
}) {
    const [open, setOpen] = useState(false);
    return (
        <li className="odd:bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center p-4">
                <img
                    className="w-16 h-16 rounded-lg object-cover"
                    src={asset.image_url}
                    alt=""
                />
                <div className="flex flex-1 ml-4 items-center">
                    <div className="w-[200px]">
                        <h4 className="text-lg font-bold hover:text-indigo-600">
                            <Link href={`/assets/${asset.ipAsset.id}`}>{asset.name || 'Untitled'}</Link>
                        </h4>
                        <p>Token ID: {asset.token_id}</p>
                    </div>
                    <div className="h-[30px] w-[1px] bg-gray-300 ml-4"></div>
                    <div className="flex ml-4 basis-1/2 flex-1 justify-between items-center">
                        <div className="ml-4">
                            <h4 className="text-lg font-medium">Commercial Remix</h4>
                            <p>License</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-medium">Live</h4>
                            <p>Trading Status</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-medium">[0, 1, 1, 3]</h4>
                            <p>Price Lambda</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-green-600">$10-$20</h4>
                            <p>Current Price</p>
                        </div>
                    </div>
                </div>
                <div className="h-[30px] w-[1px] bg-gray-300 ml-4"></div>
                <Button
                    variant="ghost"
                    className="mx-4 px-2 cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    View All
                    <ChevronDownIcon
                        className={clx('transition-all', {
                            'rotate-180': open
                        })}
                    />
                </Button>
            </div>
            <AssetRelation
                asset={asset}
                isVisible={open}
            />
        </li>
    )
}