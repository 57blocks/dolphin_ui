import { NftWithAsset } from "@/app/hooks/useIPAssetNfts";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export default function AssetRelationCard({
    asset
}: {
    asset: NftWithAsset
}) {
    return (
        <div className="border bg-white rounded-lg">
            <div className="p-2 flex justify-around items-center">
                <img
                    className="w-8 h-8 rounded-lg flex-shrink-0"
                    src={asset.image_url}
                    alt=""
                />
                <div className="ml-4">
                    <h4 className="text-lg font-medium">{asset.name}</h4>
                    <p>Token ID: {asset.token_id}</p>
                </div>
                <div className="flex items-center ml-4">
                    <h4 className="text-lg font-bold text-green-600">$10-$20</h4>
                    <ChevronRightIcon />
                </div>
            </div>
            <div className="border-t flex justify-around">
                <div className="py-1 text-indigo-600 cursor-pointer text-center flex-1">Buy</div>
                <div className="py-1 border-l border-r text-indigo-600 cursor-pointer text-center flex-1">Sell</div>
                <div className="py-1 text-indigo-600 cursor-pointer text-center flex-1">Remix</div>
            </div>
        </div>
    )
}