import { getCurrentUser as getNextAuthUser } from "./nextauth";

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

declare global {
  interface CustomJwtSessionClaims {
    user?: User & {
      id: string;
      isAdmin: boolean;
    }
  }
}

export const authOptions = {
  pages: {
    signIn: "/login",
  },
}

export async function getCurrentUser() {
  return await getNextAuthUser();
}
