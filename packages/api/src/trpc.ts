import type { NextRequest } from "next/server";
import {initTRPC, TRPCError} from "@trpc/server";
import { ZodError } from "zod";
import type { Session } from "next-auth";

import { transformer } from "./transformer";

interface CreateContextOptions {
  req?: NextRequest;
  auth?: Session | null;
}

export const createTRPCContext = async (opts: {
  headers: Headers;
  auth: Session | null;
}) => {
  return {
    userId: opts.auth?.user?.id,
    session: opts.auth,
    ...opts,
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

export const t = initTRPC.context<TRPCContext>().create({
  transformer,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const procedure = t.procedure;
export const mergeRouters = t.mergeRouters;

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.userId || !ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  // Make ctx.userId and ctx.session non-nullable in protected procedures
  return next({ 
    ctx: { 
      userId: ctx.userId,
      session: ctx.session
    } 
  });
});

export const protectedProcedure = procedure.use(isAuthed);