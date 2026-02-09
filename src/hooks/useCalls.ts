import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCalls, updateCallStatus } from "../api/calls";
import type { Call, ICallMutate } from "../types";

export function useUpdateCallStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: ICallMutate) => updateCallStatus(id, status),

    onMutate: async ({ id, status }: ICallMutate) => {
      const prev = queryClient.getQueryData<Call[]>(["calls"]);

      queryClient.setQueryData(["calls"], (calls: Call[]) =>
        calls.map((call) => (call.id === id ? { ...call, status } : call)),
      );

      return { prev };
    },

    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(["calls"], ctx?.prev);
    },
  });
}
export function useCallsQuery() {
  return useQuery({
    queryKey: ["calls"],
    queryFn: fetchCalls,
    refetchOnWindowFocus: true,
  });
}
