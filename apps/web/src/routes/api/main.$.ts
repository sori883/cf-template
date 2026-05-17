import { createFileRoute } from "@tanstack/react-router";

import { createApp } from "@acme/api";

import { auth } from "~/auth/server";
import { dbClient } from "~/lib/db-client";

const app = createApp({ auth, db: dbClient() });

export const Route = createFileRoute("/api/main/$")({
  server: {
    handlers: {
      GET: ({ request }) => app.fetch(request),
      POST: ({ request }) => app.fetch(request),
      PUT: ({ request }) => app.fetch(request),
      DELETE: ({ request }) => app.fetch(request),
      PATCH: ({ request }) => app.fetch(request),
    },
  },
});
