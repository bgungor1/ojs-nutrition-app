import { ReviewDistribution } from '@/components/product/ReviewOverview';
import { ApiComment } from '@/types/api';

export const aboutPageDistribution: ReviewDistribution[] = [
    { rating: 5, count: 8000, percentage: 80 },
    { rating: 4, count: 1000, percentage: 10 },
    { rating: 3, count: 500, percentage: 5 },
    { rating: 2, count: 200, percentage: 2 },
    { rating: 1, count: 353, percentage: 3 },
];

export const aboutPageReviews: ApiComment[] = [
    {
        first_name: 'Eren',
        last_name: 'U.',
        stars: '5',
        title: 'Her zamanki kalite. Teşekkürler',
        comment: 'Her zamanki kalite. Teşekkürler',
        created_at: '2024-05-05T00:00:00.000Z',
        aroma: 'Çikolata'
    },
    {
        first_name: 'Eren',
        last_name: 'U.',
        stars: '5',
        title: 'Her zamanki kalite. Teşekkürler',
        comment: 'Her zamanki kalite. Teşekkürler',
        created_at: '2024-06-05T00:00:00.000Z',
        aroma: 'Muz'
    },
    {
        first_name: 'Eren',
        last_name: 'U.',
        stars: '5',
        title: 'Her zamanki kalite. Teşekkürler',
        comment: 'Her zamanki kalite. Teşekkürler',
        created_at: '2024-08-05T00:00:00.000Z',
        aroma: 'Çilek'
    },
    {
        first_name: 'Eren',
        last_name: 'U.',
        stars: '5',
        title: 'Her zamanki kalite. Teşekkürler',
        comment: 'Her zamanki kalite. Teşekkürler',
        created_at: '2024-02-05T00:00:00.000Z',
        aroma: 'Kurabiye'
    },
    {
        first_name: 'Eren',
        last_name: 'U.',
        stars: '5',
        title: 'Her zamanki kalite. Teşekkürler',
        comment: 'Her zamanki kalite. Teşekkürler',
        created_at: '2024-05-24T00:00:00.000Z',
        aroma: 'Çikolata'
    },
    {
        first_name: 'Eren',
        last_name: 'U.',
        stars: '5',
        title: 'Her zamanki kalite. Teşekkürler',
        comment: 'Her zamanki kalite. Teşekkürler',
        created_at: '2024-05-05T00:00:00.000Z',
        aroma: 'Vanilya'
    }
];
