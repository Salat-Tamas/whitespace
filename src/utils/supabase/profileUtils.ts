"use server";

import { UserIdentity } from "@supabase/supabase-js";
import { createClient } from "./server";

export const getProfile = async (userId: string) => {
  const { data, error } = await createClient()
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data;
};

export const createProfile = async (userId: UserIdentity) => {
  const { data, error } = await createClient()
    .from("profiles")
    .insert([
      {
        id: userId,
      },
    ]);

  return data;
};

export const addScore = async (userId: string, score: number) => {
  const { data, error } = await createClient()
    .from("profiles")
    .update({ score: score })
    .eq("id", userId);

  return data;
};
