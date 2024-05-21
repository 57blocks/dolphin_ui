import { NftWithAsset } from "@/app/hooks/useIPAssetNfts";
import formatAddress from "@/utils/formatAddress";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function AssetRelationCard({
    asset
}: {
    asset: NftWithAsset
}) {
    return (
        <div className="border bg-white rounded-lg">
            <div className="p-2 grid grid-cols-5">
                <img
                    className="col-span-1 object-cover aspect-square rounded-lg "
                    src={asset.image_url}
                    alt=""
                />
                <div className="ml-4 col-span-3">
                    <h4 className="text-lg font-medium hover:text-indigo-600">
                        <Link href={`/assets/${asset.ipAsset.id}`}>{asset.name || 'Untitled'}</Link>
                    </h4>
                    <p>IP ID: {formatAddress(asset.ipAsset.id)}</p>
                    <h4 className="text-lg font-bold text-green-600">$10-$20</h4>
                </div>
                <div className="flex justify-center items-center ml-4">
                    <ChevronRightIcon />
                </div>
            </div>
            <Link href={`/assets/${asset.ipAsset.id}`}>
                <div className="border-t flex justify-around">
                    <div
                        className="py-1 text-indigo-600 border-r cursor-pointer text-center flex-1"
                    >Buy</div>
                    <div
                        className="py-1 text-indigo-600 cursor-pointer text-center flex-1"
                    >Remix</div>
                </div>
            </Link>
        </div>
    )
}