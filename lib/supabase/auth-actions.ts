"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

export const signUp = async (formData: FormData) => {
  const origin = headers().get("origin");

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const extraData = JSON.parse(formData.get("extraData") as string);

  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        ...extraData,
      },
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  });

  return { data, error };
};

export const signOut = async () => {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  return { error };
};

export const authUser = async () => {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const prisma = new PrismaClient();
  const profile = await prisma.profile.findUnique({
    where: {
      id: user?.id,
    },
  });

  const authUser = error
    ? null
    : {
        email: user?.email,
        ...profile,
      };

  return { authUser, error };
};
