import { Button } from '@radix-ui/themes';
import React, { useState } from 'react';
import clx from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface PaginationProps {
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 7;
        const maxPageToShow = Math.min(currentPage + Math.floor(maxVisiblePages / 2), totalPages);
        const minPageToShow = Math.max(maxPageToShow - maxVisiblePages + 1, 1);

        for (let i = minPageToShow; i <= maxPageToShow; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    return (
        <div className='space-x-2'>
            <Button
                className='hover:cursor-pointer'
                variant='outline'
                color='gray'
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
            >
                <ChevronLeftIcon />
            </Button>
            {getPageNumbers().map((page) => (
                <Button
                    className={
                        clx('bg-white border-black text-gray-500 cursor-pointer', {
                            ['border-2 border-solid border-indigo-500 cursor-not-allowed']: currentPage === page
                        })
                    }
                    key={page}
                    onClick={() => goToPage(page)}
                    disabled={currentPage === page}
                >
                    {page}
                </Button>
            ))}
            <Button
                className='hover:cursor-pointer'
                variant='outline'
                color='gray'
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
            >
                <ChevronRightIcon />
            </Button>
        </div>
    );
};

export default Pagination;