import { useQuery } from '@tanstack/react-query';

const useSelectedProduct = (id) => {
    return useQuery({
        queryKey: ['statsData', id],
        queryFn: async () => {
            const response = await fetch(`http://127.0.0.1:5000/stats?id=${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        enabled: !!id //query doesn't run if id is missing
    });
};

export default useSelectedProduct;

