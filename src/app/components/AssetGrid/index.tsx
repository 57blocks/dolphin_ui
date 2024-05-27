'use client'
import Link from 'next/link';
import useIPSWithNft from '@/app/hooks/useIPSWithNft';
import DPSlider from './Slider';
import { SkeletonTable } from '@/components/Skeletons/SkeletonTable';

export default function AssetGtid() {
    const { isLoading, rootIps, ipsWithNft } = useIPSWithNft()
    if (isLoading) return <SkeletonTable number={5} />
    return <>
        <div className="flex space-x-8 text-[32px] mt-10">
            <h2 className=" font-bold text-[#5538CE] relative py-4 flex flex-col items-center">
                Marketplace
                <p className="h-[2px] w-1/2 bg-[#5538CE] mt-4"></p>
            </h2>
            <h2 className="font-bold py-4">
                <Link href='/register'>My Assets</Link>
            </h2>
        </div>

        {
            rootIps.length && rootIps.map((ip, idx) => {
                const ipWithNft = ipsWithNft.find(nft => nft.ipId === ip.ipId)
                const remixes: any = [ipWithNft];

                if (ip.remixs.length) {
                    let r = ip.remixs;
                    const remixsWithNft = r.map(p => {
                        const pWithNft = ipsWithNft.find(nf => nf.ipId === p.childIpId)
                        return pWithNft
                    })
                    remixes.push(...remixsWithNft);
                    const rmixs = remixsWithNft.reduce((prev, curr: any) => prev.concat(...curr.remixs), [])
                    if (rmixs.length) {
                        rmixs.forEach((r: any) => {
                            const rWithNft = ipsWithNft.find(nf => nf.ipId === r.childIpId);
                            remixes.push(rWithNft);
                        })
                    }
                }
                return (
                    <div key={ip.id} className='mt-8'>
                        <div className='mb-2 space-y-3'>
                            <h2 className='font-semibold text-3xl'>{idx + 1}. {ipWithNft?.name}</h2>
                            <div className='flex justify-between'>
                                <p className='font-normal text-[20px] text-gray-500'>Status: <span className=' font-bold text-green-500'>Active</span> | Active Nodes: <span className=' font-bold text-red-500'>3</span></p>
                                <p className='font-normal text-[20px] text-gray-500'>24H Total Volume: <span className='font-bold'>3 ETH</span></p>
                            </div>
                        </div>
                        {remixes && <DPSlider remixes={remixes} />}
                    </div>
                )
            })
        }
    </>
}