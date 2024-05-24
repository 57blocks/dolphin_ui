'use client'

import DragonBallOrgImg from '@/../public/images/Dragon_Ball/Dragon Ball/Original.jpg';
import DragonBallR2Img from '@/../public/images/Dragon_Ball/Dragon Ball/Remix_2.jpg';
import DragonBallR31Img from '@/../public/images/Dragon_Ball/Dragon Ball/Remix_31.jpg';
import DragonBallR32Img from '@/../public/images/Dragon_Ball/Dragon Ball/Remix_32.jpg';
import DragonBallR33Img from '@/../public/images/Dragon_Ball/Dragon Ball/Remix_33.jpg';
import DragonBallR41Img from '@/../public/images/Dragon_Ball/Dragon Ball/Remix_41.jpg';
import DragonBallR42Img from '@/../public/images/Dragon_Ball/Dragon Ball/Remix_42.jpg';
import Link from 'next/link';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';
import { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import useIPSWithNft from '@/app/hooks/useIPSWithNft';
import DPSlider from './Slider';
import { SkeletonTable } from '@/components/Skeletons/SkeletonTable';

export default function AssetGtid() {
    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        draggable: true
    };
    const dragonBallImgs = [
        DragonBallOrgImg,
        DragonBallR2Img,
        DragonBallR31Img,
        DragonBallR32Img,
        DragonBallR33Img,
        DragonBallR41Img,
        DragonBallR42Img
    ]
    let sliderRef = useRef<any>(null);
    const { isLoading, rootIps, ipsWithNft } = useIPSWithNft()
    if (isLoading) return <SkeletonTable number={5} />
    return <>
        <div className="flex space-x-4">
            <h2 className="text-4xl font-bold text-indigo-500 relative py-4 flex flex-col items-center">
                Marketplace
                <p className="h-[2px] w-1/2 bg-indigo-500 mt-4"></p>
            </h2>
            <h2 className="text-4xl font-bold py-4">
                <Link href='/register'>My Assets</Link>
            </h2>
        </div>

        {
            rootIps.length && rootIps.map((ip, idx) => {
                const ipWithNft = ipsWithNft.find(nft => nft.ipId === ip.ipId)
                const remixes: any = [ipWithNft];

                const specialId = '0x942260ef72d1f0c45dc7472f79f0631bf246bfde'
                const special = {
                    childIpId: "0x7a0693a8da47463295959c2dd7547140f527ab76",
                    __typename: 'Remix',
                }

                if (ip.remixs.length) {
                    let r = ip.remixs;
                    if (ip.id === specialId) {
                        r = r.concat(special)
                    }
                    const remixsWithNft = r.map(p => {
                        const pWithNft = ipsWithNft.find(nf => nf.ipId === p.childIpId)
                        return pWithNft
                    })
                    remixes.push(...remixsWithNft);
                }
                return (
                    <div key={ip.id} className='mt-8'>
                        <div className='mb-2 mx-8 space-y-2'>
                            <h2 className='font-semibold text-4xl'>{idx + 1}. {ipWithNft?.name}</h2>
                            <div className='flex justify-between'>
                                <p className=' font-normal text-gray-500'>Status: <span className=' font-bold text-green-500'>Active</span> | Active Nodes: <span className=' font-bold text-red-500'>3</span></p>
                                <p className='font-normal text-lg text-gray-500'>24H Total Volume: <span className='font-bold'>3 ETH</span></p>
                            </div>
                        </div>
                        {remixes && <DPSlider remixes={remixes} />}
                    </div>
                )
            })
        }
    </>
}