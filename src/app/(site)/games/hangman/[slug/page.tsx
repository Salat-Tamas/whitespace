"use client";
import useSWR from "swr";
import { getHangman } from "../../../../../../sanity/lib/client";
import HangManComp from "./HangManComp";

const page = ({ params }: { params: { slug: string } }) => {
  const {
    data: hangman,
    isLoading,
    error,
  } = useSWR("hangman", getHangman.bind(null, params?.slug));

  if (isLoading || hangman === undefined) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return <HangManComp hangman={hangman} slug={params.slug} />;
};

export default page;
