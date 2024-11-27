import { useQuery } from "@tanstack/react-query";

export const useFetchQuery = ({
  params,
  fetchFn,
  queryKey,
  enabled = true,
}) => {
  if (!queryKey) {
    throw new Error("queryKey is required");
  }
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await fetchFn(params);
      const parsedData = JSON.parse(response?.data);
      return {
        newData: parsedData || [],
        totalCount: response?.totalCount || 0,
      };
    },
    enabled,
    keepPrevoiusData: true,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useFetchSelectQuery = ({ queryKey, fetchFn }) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await fetchFn();
      const parsedData = JSON.parse(response?.data);
      return parsedData || [];
    },
    keepPrevoiusData: true,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
