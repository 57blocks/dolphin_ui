'use client'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DLExtendedNFTMetadata } from '@/simplehash/types';
import IPCard from '@/components/IPCard';

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
                className='absolute p-1 z-20 left-[-24px] flex items-center top-0 bottom-0 cursor-pointer rounded-lg hover:bg-indigo-500/50'
                onClick={() => sliderRef.current.slickPrev()}
            >
                <ChevronLeftIcon className='w-[24px] h-[24px]' />
            </div>

            <div
                className='absolute p-1 z-20 right-[-24px] flex items-center top-0 bottom-0 cursor-pointer rounded-lg hover:bg-indigo-500/50'
                onClick={() => sliderRef.current.slickNext()}>
                <ChevronRightIcon className='w-[24px] h-[24px]' />
            </div>
            <div>
                <Slider {...settings} ref={sliderRef}>
                    {
                        remixes.map((ipf) =>
                            <div key={ipf.ipId} className='pb-10 pt-4'>
                                <IPCard ipf={ipf} />
                            </div>
                        )
                    }
                </Slider>
            </div>
        </div>
    </>
}