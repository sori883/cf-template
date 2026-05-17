import type { Session } from "@acme/auth";
import type { DbType } from "@acme/db/client";

export interface AppEnv {
  Variables: {
    db: DbType;
    user: Session["user"] | null;
    session: Session["session"] | null;
  };
}
