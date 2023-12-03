"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
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
  console.log(formData.get("extraData"));

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
