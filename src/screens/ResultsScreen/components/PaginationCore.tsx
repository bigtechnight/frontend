import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/8bit/pagination';

export const PaginationCore = ({
    totalPages,
    currentPage,
    maxPages = 5,
    onPageChange,
    className,
}: {
    totalPages: number;
    currentPage: number;
    maxPages?: number;
    onPageChange?: (page: number) => void;
    className?: string;
}) => {
    const generatePageNumbers = () => {
        const pages: (number | string)[] = [];
        const halfMax = Math.floor(maxPages / 2);

        if (totalPages <= maxPages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        pages.push(1);
        if (currentPage > halfMax + 2) pages.push('...');

        const start = Math.max(2, Math.min(currentPage - halfMax, totalPages - maxPages + 2));
        const end = Math.min(totalPages - 1, start + maxPages - 3);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);

        return pages;
    };

    return (
        <Pagination className={className}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        disabled={!(currentPage > 1)}
                        onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
                    />
                </PaginationItem>

                {generatePageNumbers().map((page, index) => (
                    <PaginationItem key={index}>
                        {typeof page === 'number' ? (
                            <PaginationLink
                                asChild
                                isActive={page === currentPage}
                                onClick={() => onPageChange?.(page)}
                            >
                                <button>{page}</button>
                            </PaginationLink>
                        ) : (
                            <PaginationEllipsis />
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        disabled={!(currentPage < totalPages)}
                        onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
