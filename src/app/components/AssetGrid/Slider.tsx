'use client'

import Link from 'next/link';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';
import { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import useIPSWithNft from '@/app/hooks/useIPSWithNft';
import { GraphDetial } from '@/story/types';
import { DLExtendedNFTMetadata } from '@/simplehash/types';
import { getAddress } from 'viem';

export default function DPSlider({
    remixes
}: {
    remixes: DLExtendedNFTMetadata[]
}) {
    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        draggable: false
    };
    let sliderRef = useRef<any>(null);
    return <>
        <div className='relative px-8'>
            <div
                className='absolute p-1 left-[-10px] flex items-center top-0 bottom-0 cursor-pointer rounded-lg hover:bg-indigo-500/50'
                onClick={() => sliderRef.current.slickPrev()}
            >
                <ChevronLeftIcon className='w-[24px] h-[24px]' />
            </div>
            <div>
                <Slider {...settings} ref={sliderRef}>
                    {
                        remixes.map((ipf) =>
                            <div key={ipf.ipId}>
                                <Link href={`/assets/${getAddress(ipf.ipId)}`}>
                                    <div className='mx-1 rounded-md overflow-hidden z-10 cursor-pointer shadow-md transition-all hover:translate-y-[-5px] hover:shadow-lg'>
                                        <div className='overflow-hidden h-[350px]'>
                                            <Image alt="" height={200} width={200} src={ipf.image_url} className='w-full h-full object-cover' />
                                        </div>
                                        <div className='bg-white p-4'>
                                            <div className='mb-4'>
                                                <h4 className='font-semibold text-xl'>{ipf.name}</h4>
                                                <h4 className='text-green-600 font-semibold text-xl'>{(Number(ipf.price) / 1e18).toFixed(6)} ETH</h4>
                                            </div>
                                            <div className='grid grid-cols-2'>
                                                <div>
                                                    <h4 className='text-normal'>FIN Supply</h4>
                                                    <p className='font-bold text-lg'>{ipf.supply}</p>
                                                </div>
                                                <div>
                                                    <h4 className='text-normal'>Ancestor</h4>
                                                    <p className='font-bold text-lg'>0x1v3...sadg</p>
                                                </div>
                                                <div>
                                                    <h4 className='text-normal'>Remix Passport</h4>
                                                    <p className='font-bold text-lg'>3x</p>
                                                </div>
                                                <div>
                                                    <h4 className='text-normal'>Remix Floor</h4>
                                                    <p className='font-bold text-lg'>{Number(ipf.floorPrice) ? (Number(ipf.floorPrice) / 1e18).toFixed(6) : 0} ETH</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                </Slider>
            </div>
            <div
                className='absolute p-1 right-[-10px] flex items-center top-0 bottom-0 cursor-pointer rounded-lg hover:bg-indigo-500/50'
                onClick={() => sliderRef.current.slickNext()}>
                <ChevronRightIcon className='w-[24px] h-[24px]' />
            </div>
        </div>
    </>
}