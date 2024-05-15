import { NftWithAsset } from "@/app/hooks/useIPAssetNfts";

export default function Detail({ data }: { data?: NftWithAsset | null }) {
    return <div className="flex flex-col-reverse md:flex-row md:gap-8">
        <ul className="md:w-1\2 mt-4 w-full space-y-2 md:space-y-4">
            <li className="w-full space-y-2 md:space-y-4">
                <div className="font-bold leading-none">Created by</div>
                <div className="block truncate font-robotoMono text-sm">
                    {data?.owners[0].owner_address}
                </div>
            </li>
            <li className="w-full space-y-2 md:space-y-4">
                <div className="font-bold leading-none">Date Published</div>
                <div className="block truncate font-robotoMono text-sm">
                    {data?.created_date}
                </div>
            </li>
            <li className="w-full space-y-2 md:space-y-4">
                <div className="font-bold leading-none">Contract Address</div>
                <div className="block truncate font-robotoMono text-sm">
                    {data?.contract_address}
                </div>
            </li>
            <li className="w-full space-y-2 md:space-y-4">
                <div className="font-bold leading-none">IP ID</div>
                <div className="block truncate font-robotoMono text-sm">
                    {data?.ipAsset.id}
                </div>
            </li>
            <li className="w-full space-y-2 md:space-y-4">
                <div className="font-bold leading-none">Token ID</div>
                <div className="block truncate font-robotoMono text-sm">
                    {data?.token_id}
                </div>
            </li>
        </ul>
    </div>
}