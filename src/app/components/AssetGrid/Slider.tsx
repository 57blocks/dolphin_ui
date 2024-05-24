'use client'

import Link from 'next/link';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DLExtendedNFTMetadata } from '@/simplehash/types';
import formatAddress from '@/utils/formatAddress';

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
        <div className='relative'>
            <div
                className='absolute p-1 left-[-24px] flex items-center top-0 bottom-0 cursor-pointer rounded-lg hover:bg-indigo-500/50'
                onClick={() => sliderRef.current.slickPrev()}
            >
                <ChevronLeftIcon className='w-[24px] h-[24px]' />
            </div>

            <div
                className='absolute p-1 right-[-24px] flex items-center top-0 bottom-0 cursor-pointer rounded-lg hover:bg-indigo-500/50'
                onClick={() => sliderRef.current.slickNext()}>
                <ChevronRightIcon className='w-[24px] h-[24px]' />
            </div>
            <div>
                <Slider {...settings} ref={sliderRef}>
                    {
                        remixes.map((ipf) =>
                            <div key={ipf.ipId} className='pb-10 pt-4'>
                                <Link href={`/assets/${ipf.ipId}`}>
                                    <div className='mx-[12px] rounded-[12px] overflow-hidden z-10 cursor-pointer shadow-xl transition-all hover:translate-y-[-5px] hover:shadow-lg'>
                                        <div className='overflow-hidden'>
                                            <Image alt="" height={200} width={200} src={ipf.image_url} className='w-full h-full object-cover aspect-[3/2]' />
                                        </div>
                                        <div className='bg-white mt-5 px-5 pb-6'>
                                            <div className='mb-4'>
                                                <h4 className='font-[700] text-2xl truncate'>{ipf.name || 'Untitled'}</h4>
                                                <h4 className='text-green-600 font-semibold text-xl mt-1'>{(Number(ipf.price) / 1e18).toFixed(6)} ETH</h4>
                                            </div>
                                            <div className='grid grid-cols-2'>
                                                <div>
                                                    <h4 className='text-normal text-[#6B7280]'>FIN Supply</h4>
                                                    <p className='font-bold text-lg mt-1'>{ipf.supply}</p>
                                                </div>
                                                <div>
                                                    <h4 className='text-normal text-[#6B7280]'>IP ID</h4>
                                                    <p className='font-bold text-lg mt-1'>{formatAddress(ipf.ipId)}</p>
                                                </div>
                                                <div className='mt-2'>
                                                    <h4 className='text-normal text-[#6B7280]'>Remix Passport</h4>
                                                    <p className='font-bold text-lg mt-1'>{ipf.remixs.length ? `${ipf.remixs.length}x` : '-'}</p>
                                                </div>
                                                <div className='mt-2'>
                                                    <h4 className='text-normal text-[#6B7280]'>Remix Floor</h4>
                                                    <p className='font-bold text-lg mt-1'>{Number(ipf.floorPrice) ? `${(Number(ipf.floorPrice) / 1e18).toFixed(6)} ETH` : '-'}</p>
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
        </div>
    </>
}