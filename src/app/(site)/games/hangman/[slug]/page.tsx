"use client";
import useSWR from "swr";
import { getHangman } from "../../../../../../sanity/lib/client";
import HangManComp from "./HangManComp";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { addScore, getProfile } from "@/utils/supabase/profileUtilsClient";
import { User } from "@supabase/supabase-js";

const page = ({ params }: { params: { slug: string } }) => {
  const {
    data: hangman,
    isLoading,
    error,
  } = useSWR("hangman", getHangman.bind(null, params?.slug));

  const supabase = createClient();

  const [user, setUser] = useState<User>();
  const [gameScore, setGameScore] = useState<number>(-1);
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    }
    getUser();
  }, []);

  if (isLoading || hangman === undefined) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (user && gameScore !== -1) {
    addScore(user.id, gameScore, params.slug);
  }

  return (
    <HangManComp
      hangman={hangman}
      slug={params.slug}
      setGameScore={setGameScore}
    />
  );
};

export default page;
