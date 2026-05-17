import { createFileRoute } from "@tanstack/react-router";

import { makeApiClient } from "~/lib/api-client";

export const Route = createFileRoute("/me")({
  loader: async () => {
    const api = makeApiClient();
    const res = await api.api.main.me.$get();
    if (!res.ok) {
      return {
        error: `HTTP ${res.status}`,
        me: null,
      };
    }
    return { error: null, me: await res.json() };
  },
  component: MePage,
});

function MePage() {
  const { error, me } = Route.useLoaderData();
  if (error)
    return (
      <pre style={{ whiteSpace: "pre-wrap", padding: 16 }}>
        エラー:{"\n"}
        {error}
      </pre>
    );
  if (!me) return <div>未取得</div>;
  return <div>{me.name}</div>;
}
