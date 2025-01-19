import { useQuery } from '@tanstack/react-query';

const useKeywordSearch = (keyword, amount) => {
    return useQuery({
        queryKey: ['keywordData', keyword, amount],
        queryFn: async () => {
            const response = await fetch(`http://127.0.0.1:5000/keyword?keyword=${keyword}&amount=${amount}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        enabled: !!keyword && !!amount, //query doesn't run if keyword or amount if missing
    });
};

export default useKeywordSearch;

