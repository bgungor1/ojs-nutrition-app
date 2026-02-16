export interface Review {
    id: number;
    reviewerName: string;
    reviewerInitial: string;
    rating: number;
    isVerified: boolean;
    reviewDate: string;
    reviewTitle: string;
    reviewText: string;
    productName: string;
    productCategory?: string;
}

export interface ReviewProps {
    reviews: Review[];
    title?: string;
    subtitle?: string;
    showProductFilter?: boolean;
    maxReviews?: number;
}

export interface ReviewStats {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: {
        [key: number]: number;
    };
    verifiedReviews: number;
}

export interface ReviewFilters {
    rating?: number;
    productName?: string;
    verifiedOnly?: boolean;
    dateRange?: {
        start: string;
        end: string;
    };
}


export type StarRating = 1 | 2 | 3 | 4 | 5;


export type ReviewSortOption =
    | 'newest'
    | 'oldest'
    | 'highest_rating'
    | 'lowest_rating'
    | 'most_helpful'; 
