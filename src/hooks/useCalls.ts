import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCalls, updateCallStatus } from "../api/calls";

export function useCalls() {
  const queryClient = useQueryClient();

  const callsQuery = useQuery({
    queryKey: ["calls"],
    queryFn: fetchCalls,
    refetchOnWindowFocus: true,
  });

  const updateStatus = useMutation({
    mutationFn: updateCallStatus,

    onMutate: async ({ id, status }: any) => {
      const prev = queryClient.getQueryData<any[]>(["calls"]);

      queryClient.setQueryData(["calls"], (calls: any[]) =>
        calls.map((c) => (c.id === id ? { ...c, status } : c)),
      );

      return { prev };
    },

    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(["calls"], ctx?.prev);
    },
  });

  return { callsQuery, updateStatus };
}
