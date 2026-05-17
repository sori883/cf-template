import { Hono } from "hono";

import type { Auth } from "@acme/auth";
import type { DbType } from "@acme/db/client";

import type { AppEnv } from "./env";
import { injectDb } from "./middleware/inject-db";
import { loadSession } from "./middleware/load-session";
import { requireAuth } from "./middleware/require-auth";

export const createApp = (deps: { auth: Auth; db: DbType }) =>
  new Hono<AppEnv>()
    .basePath("/api/main")
    .use("*", injectDb(deps.db))
    .use("*", loadSession(deps.auth))
    .get("/me", requireAuth, (c) => c.json(c.get("user")));

export type AppType = ReturnType<typeof createApp>;
