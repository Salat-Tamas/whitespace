"use server";

import { UserIdentity } from "@supabase/supabase-js";
import { createClient } from "./server";
import { Player } from "@/components/LeaderBoard";

export const getProfile = async (userId: string, userName: string) => {
  const { data, error } = await createClient()
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (data == null) return createProfile(userId, userName);
  return data;
};

export const createProfile = async (userId: string, userName: string) => {
  const { data, error } = await createClient().from("profiles").insert({
    id: userId,
    nickName: userName,
  });

  return data;
};

export const addScore = async (userId: string, score: number) => {
  const { data, error } = await createClient()
    .from("profiles")
    .update({ score: score })
    .eq("id", userId);

  return data;
};

// {
//   id: 'dea53cd8-83fe-48ae-893a-7416442f1b0c',
//   created_at: '2024-03-23T23:31:11.587858+00:00',
//   score: 0,
//   lessons: null
// },

//  type Player = {
//     number: number;
//     id: string;
//     Score: number;
//     nickname: string;
//     totalNumberOfGamesPlayed: number;
// }

export const getProfiles = async (): Promise<Player[]> => {
  const { data: fetchData, error } = await createClient()
    .from("profiles")
    .select("*")
    .order("score", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return fetchData.map(
    (
      profile: {
        id: string;
        created_at: string;
        score: number;
        nickName: string;
        lessons: string[];
      },
      index: number
    ) => {
      return {
        number: index + 1,
        id: profile.id,
        Score: profile.score,
        nickname: profile.nickName || "Anonymous",
        totalNumberOfGamesPlayed: profile.lessons?.length || 0,
      };
    }
  );
};
