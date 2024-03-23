"use server";

import { UserIdentity } from "@supabase/supabase-js";
import { createClient } from "./server";

export async function getProfileData(userId: UserIdentity) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export interface ProfileDataUpdate {
  score: number;
  lessons: JSON;
}
export async function updateProfileData(
  userId: UserIdentity,
  updates: ProfileDataUpdate
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);
  if (error) throw error;
  return data;
}
