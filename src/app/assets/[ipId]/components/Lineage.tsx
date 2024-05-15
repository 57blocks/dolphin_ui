import { NftWithAsset } from "@/app/hooks/useIPAssetNfts";
import { Asset } from "@/story/types";
import Link from "next/link";

const LineageAssets = ({ assets }: { assets?: Asset[] | null }) => (
    <ul className="mt-1 space-y-1">
        {assets?.length ? (
            assets.map((asset) => (
                <li
                    className="flex items-center font-robotoMono"
                    key={asset.id}
                >
                    <Link
                        href={`/assets/${asset.id}`}
                        className="mr-2 whitespace-nowrap font-robotoMono text-sm text-blue-500 underline"
                    >
                        {asset.nftMetadata.name}
                    </Link>
                </li>
            ))
        ) : (
            <li
                className="flex items-center font-robotoMono text-sm"
                key="no_root"
            >
                None
            </li>
        )}
    </ul>
)

export default function Lineage({ data }: { data?: NftWithAsset | null }) {
    return data?.ipAsset.rootIpIds?.length ||
        data?.ipAsset.parentIpIds?.length ||
        data?.ipAsset.childIpIds?.length ? (
        <div className="mt-4 flex flex-col gap-4">
            <div>
                <div className="font-semibold">
                    Root Assets
                </div>
                <LineageAssets
                    assets={
                        data?.ipAsset.rootIpIds as unknown as Asset[]
                    }
                />
            </div>

            <div>
                <div className="font-semibold">
                    Parent Assets
                </div>
                <LineageAssets
                    assets={
                        data?.ipAsset.parentIpIds as unknown as Asset[]
                    }
                />
            </div>

            <div>
                <div className="font-semibold">
                    Child Assets
                </div>
                <LineageAssets
                    assets={
                        data?.ipAsset.childIpIds as unknown as Asset[]
                    }
                />
            </div>
        </div>
    ) : (
        <p className="mt-4">
            This is a root asset without any derivatives
        </p>
    )
}