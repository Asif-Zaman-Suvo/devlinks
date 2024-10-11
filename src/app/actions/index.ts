"use server";

import { signIn, signOut } from "@/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function doSocialLogin(formData: any) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/add-links" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}
