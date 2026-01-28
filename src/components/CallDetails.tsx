import { useUIStore } from "../store/uiStore";
import { useCalls } from "../hooks/useCalls";

export function CallDetails() {
  const call = useUIStore((s) => s.selectedCall);
  const { updateStatus } = useCalls();

  if (!call)
    return (
      <div className="flex items-center justify-center">Select a call</div>
    );

  return (
    <div className="flex items-center justify-center">
      <div>
        <h2>{call.phone}</h2>
        <p>Status: {call.status}</p>

        <button
          onClick={() => updateStatus.mutate({ id: call.id, status: "hold" })}
        >
          Hold
        </button>
      </div>
    </div>
  );
}
