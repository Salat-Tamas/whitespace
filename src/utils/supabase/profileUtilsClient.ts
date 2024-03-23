"use client";

import { UserIdentity } from "@supabase/supabase-js";
import { createClient } from "./client";

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

export async function createProfileData(userId: UserIdentity) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .insert([{ id: userId, score: 0, lessons: [] }]);
  if (error) throw error;
  return data;
}

export async function getUsersByScore() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("score", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getUserTop3() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("score", { ascending: false })
    .range(0, 2);
  if (error) throw error;
  return data;
}
