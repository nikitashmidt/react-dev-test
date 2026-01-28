import { useCalls } from "../hooks/useCalls";
import { CallItem } from "./Calltem";

export function CallsList() {
  const { callsQuery } = useCalls();

  if (callsQuery.isLoading) return <div>Loading...</div>;

  return (
    <div className="h-screen overflow-auto">
      {callsQuery.data!.map((call) => (
        <CallItem key={call.id} call={call} />
      ))}
    </div>
  );
}
