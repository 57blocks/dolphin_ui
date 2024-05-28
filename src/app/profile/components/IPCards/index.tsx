import useIPAssetsByWallet from "@/app/hooks/useIPAssetsByWallet";
import IPCard from "@/components/IPCard";
import SkeletonCard from "@/components/Skeletons/SkeletonCard";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Address } from "viem";

export default function IPCards({ address }: { address?: Address }) {
    const { data, loading } = useIPAssetsByWallet(address);
    if (loading) return <SkeletonCard number={8} />;
    if (!data || data.length === 0) {
        return <div className="mt-8 px-4 col-span-2 col-start-2 flex flex-col items-center">
            <div className="my-8">No items found</div>
            <Button asChild><Link href="/register">Go for Listing</Link></Button>
        </div>
    }
    return data.map(d => <IPCard ipf={d} />)
}