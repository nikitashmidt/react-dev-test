import { memo } from "react";
import { useUIStore } from "../store/uiStore";
import type { Call } from "../types";

interface IProps {
  call: Call;
}

function CallItem({ call }: IProps) {
  const setSelectedCall = useUIStore((s) => s.setSelectedCall);

  console.log("render call item");

  return (
    <div
      onClick={() => setSelectedCall(call)}
      className="p-2 border-b cursor-pointer"
    >
      <div>{call.phone}</div>
      <div>{call.status}</div>
    </div>
  );
}

export default memo(CallItem);
