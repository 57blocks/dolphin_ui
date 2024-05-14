'use client'

import { Button, TextField } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface PaginationProps {
    page: number;
    onPageChange: (page: number) => void;
}

const InputPagination: React.FC<PaginationProps> = ({ page, onPageChange }) => {
    const [value, setValue] = useState(1);

    useEffect(() => {
        setValue(page)
    }, [page])

    const goToPreviousPage = () => {
        if (page > 1) {
            onPageChange(page - 1);
        } else {
            onPageChange(1)
        }
    };

    const goToNextPage = () => {
        if (page) {
            onPageChange(page + 1);
        }
    };

    const handleInputChange = (event: any) => {
        const value = event.target.value;
        setValue(value);
    }

    const handleKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            if (value > 1) {
                onPageChange(value);
            } else {
                onPageChange(1)
            }
        }
    }

    return (
        <div className='flex space-x-2'>
            <Button
                className='hover:cursor-pointer'
                variant='outline'
                color='gray'
                onClick={goToPreviousPage}
                disabled={page === 1}
            >
                <ChevronLeftIcon />
            </Button>
            <TextField.Root
                className='w-9 text-center'
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            ></TextField.Root>
            <Button
                className='hover:cursor-pointer'
                variant='outline'
                color='gray'
                onClick={goToNextPage}
            >
                <ChevronRightIcon />
            </Button>
        </div>
    );
};

export default InputPagination;