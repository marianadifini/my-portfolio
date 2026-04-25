"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const PASSWORD = process.env.SITE_PASSWORD || "mradfn1190";
const COOKIE_NAME = "site_auth";
const COOKIE_VALUE = "ok";

export async function login(prevState, formData) {
  const password = String(formData.get("password") || "");
  const from = String(formData.get("from") || "/");

  if (password !== PASSWORD) {
    return { error: "Wrong password. Try again." };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  const safeFrom = from.startsWith("/") && !from.startsWith("//") ? from : "/";
  redirect(safeFrom);
}
