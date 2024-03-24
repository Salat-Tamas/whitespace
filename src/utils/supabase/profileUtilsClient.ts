"use server";

import { UserIdentity } from "@supabase/supabase-js";
import { createClient } from "./client";

export const getProfile = async (userId: string) => {
  const { data, error } = await createClient()
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (data == null) return createProfile(userId);

  return data;
};

export const createProfile = async (userId: string) => {
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
