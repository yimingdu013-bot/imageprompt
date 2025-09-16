import { db as mainDb } from "@saasfly/db";

// Re-export the main database instance for auth usage
export const db = mainDb;
