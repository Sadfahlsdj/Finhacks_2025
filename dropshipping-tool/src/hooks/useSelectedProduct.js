import { useQuery } from '@tanstack/react-query';

const useSelectedProduct = (id) => {
    return useQuery({
        queryKey: ['statsData', id],
        queryFn: async () => {
            if (!id) {
                throw new Error('Product ID is required');
            }

            const response = await fetch(`http://127.0.0.1:5000/stats?id=${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product stats');
            }
            return response.json();
        },
        enabled: !!id, // Ensures query runs only if `id` is valid
        onError: (error) => {
            console.error('Error fetching product stats:', error);
        },
        retry: 1, // Retry once if the request fails
    });
};

export default useSelectedProduct;
