import type { Call } from "../types";

type Listener = (update: Partial<Call>) => void;

let listeners: Listener[] = [];

let interval: number = 0;

export function connectSocket() {
  console.log("render socket");

  interval = setInterval(() => {
    const callId = String(Math.floor(Math.random() * 1000));
    const update: Partial<Call> = {
      id: callId,
      status: Math.random() > 0.5 ? "active" : "hold",
      updatedAt: Date.now(),
      phone: `+2-555-${1000 + Math.floor(Math.random() * 1000)}`,
    };
    listeners.forEach((l) => l(update));
  }, 1000);
}

export function cancelConnectSocket() {
  clearInterval(interval);
  interval = 0;
}

export function subscribe(listener: Listener) {
  listeners.push(listener);
}

export function unsubscribe() {
  listeners = [];
}
