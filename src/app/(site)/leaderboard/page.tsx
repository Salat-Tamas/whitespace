"use client";
import Leaderboard, { Player } from "@/components/LeaderBoard";
import { getProfile, getProfiles } from "@/utils/supabase/profileUtils";
import React, { useEffect, useState } from "react";

type Props = {};
const data: Player[] = [
  {
    number: 4,
    id: "m5gr84i9",
    Score: 316,
    nickname: "ken99@yahoo.com",
    totalNumberOfGamesPlayed: 5,
  },
  {
    number: 5,
    id: "3u1reuv4",
    Score: 242,
    nickname: "Abe45@gmail.com",
    totalNumberOfGamesPlayed: 71,
  },
  {
    number: 2,
    id: "derv1ws0",
    Score: 837,
    nickname: "Monserrat44@gmail.com",
    totalNumberOfGamesPlayed: 3,
  },
  {
    number: 1,
    id: "5kma53ae",
    Score: 874,
    nickname: "Silas22@gmail.com",
    totalNumberOfGamesPlayed: 0,
  },
  {
    number: 3,
    id: "bhqecj4p",
    Score: 721,
    nickname: "carmella@hotmail.com",
    totalNumberOfGamesPlayed: 23,
  },
];

const page = (props: Props) => {
  const [profiles, setProfiles] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const players = await getProfiles();
      setProfiles(players);
    };
    fetchData();
  }, []);
  console.log(profiles);

  return <Leaderboard data={profiles} />;
};

export default page;
