
 // hooks/useSSE.js
// ─────────────────────────────────────────────────────────────
// TASK 1: implement this hook so the React app can receive
//         server-sent events from /api/notifications/stream.
//
// The hook receives two arguments:
//   url       - the SSE endpoint, e.g. "/api/notifications/stream"
//   onMessage - a callback: onMessage(parsedData) — called for each frame
//
// What the implementation must do (in order):
//
//   1. Read `user` from AuthContext using useAuth().
//
//   2. Inside useEffect:
//        a. NULL GUARD — if there is no user, return early (stops the
//           401 reconnect flood when the user is logged out).
//        b. Create:  const source = new EventSource(url, { withCredentials: true });
//        c. Set source.onmessage to call onMessage(JSON.parse(event.data))
//           inside a try/catch — log any parse errors.
//        d. Set source.onerror to log the error.
//        e. CLEANUP — return () => source.close();
//
//   3. Dependency array: [url, user, onMessage]
//
// Do NOT change the function signature or the export.
// ─────────────────────────────────────────────────────────────
import { useEffect } from "react";
import { useAuth } from "../auth/AuthContext.jsx";

export function useSSE(url, onMessage) {
  const { user } = useAuth();

  useEffect(() => {
    // TODO: implement the hook body here.
    // Remove this comment and the line below when you are done.

    // a. NULL GUARD — don't connect if the user is logged out.
    if (!user) {
      return;
    }

    // b. Create the EventSource with credentials enabled.
    const source = new EventSource(url, { withCredentials: true });

    // c. Parse incoming messages and pass the data to the callback.
    source.onmessage = (event) => {
      try {
        onMessage(JSON.parse(event.data));
      } catch (error) {
        console.error("Error parsing SSE message:", error);
      }
    };

    // d. Log connection errors.
    source.onerror = (error) => {
      console.error("SSE connection error:", error);
    };

    // e. CLEANUP — close the connection when the effect is cleaned up.
    return () => source.close();

  }, [url, user, onMessage]);
}
