import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { createApp } from "@acme/api";
import { createApiClient } from "@acme/api/client";

import { auth } from "~/auth/server";
import { dbClient } from "~/lib/db-client";

const app = createApp({ auth, db: dbClient() });

export const apiFetch = createIsomorphicFn()
  .server(() => (input: RequestInfo | URL, init?: RequestInit) => {
    const req = getRequest();
    const cookie = req.headers.get("cookie") ?? "";
    const headers = new Headers(init?.headers);
    if (cookie) headers.set("cookie", cookie);
    return Promise.resolve(app.fetch(new Request(input, { ...init, headers })));
  })
  .client(() => {
    throw new Error("apiFetch is server-only");
  });

export const makeApiClient = () =>
  createApiClient("http://localhost", { fetch: apiFetch() });
