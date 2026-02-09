import { useRef } from "react";
import { useCallsQuery } from "../hooks/useCalls";
import CallItem from "./Calltem";
import { useVirtualizer } from "@tanstack/react-virtual";

export function CallsList() {
  const callsQuery = useCallsQuery();

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: callsQuery.data?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 65,
    overscan: 5,
  });

  if (callsQuery.isLoading) return <div>Loading...</div>;

  const totalSize = rowVirtualizer.getTotalSize();
  const callsData = callsQuery.data || [];

  return (
    <div className="h-screen overflow-auto relative" ref={parentRef}>
      <div
        style={{
          height: `${totalSize}px`,
        }}
        className="w-full relative"
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const call = callsData[virtualItem.index];
          if (!call) return null;

          return (
            <div
              key={virtualItem.key}
              ref={rowVirtualizer.measureElement}
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <CallItem call={call} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
