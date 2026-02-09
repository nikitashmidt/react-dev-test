import { useUIStore } from "../store/uiStore";
import { useUpdateCallStatus } from "../hooks/useCalls";

export function CallDetails() {
  const call = useUIStore((s) => s.selectedCall);
  const updateStatus = useUpdateCallStatus();

  console.log("🚀 ~ CallDetails ~ updateStatus:", updateStatus);

  console.log("render call details");

  const isError =
    updateStatus?.isError && call?.id === updateStatus?.variables?.id;

  if (!call)
    return (
      <div className="flex items-center justify-center">Select a call</div>
    );

  return (
    <div className="flex items-center justify-center flex-col">
      <div>
        <h2>{call.phone}</h2>
        <p>Status: {call.status}</p>

        <button
          disabled={updateStatus?.isPending}
          onClick={() => updateStatus.mutate({ id: call.id, status: "hold" })}
        >
          Hold
        </button>
      </div>

      {updateStatus?.isPending && <div>Updating status...</div>}

      {isError && (
        <div className="text-red-600 font-bold">
          {updateStatus?.error?.message}
        </div>
      )}
    </div>
  );
}
