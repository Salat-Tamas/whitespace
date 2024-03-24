"use client";
import Lessoncard from "@/components/ui/Lessoncard";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useSWR from "swr";
import { getSlides } from "../../../../../sanity/lib/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Chat } from "openai/resources/index.mjs";

type lessonProps = {
  params: {
    slug: string;
  };
};

const page = ({ params }: lessonProps) => {
  const supabase = createClient();

  const { data, error, isLoading } = useSWR(
    "/api/lessons",
    getSlides.bind(null, params.slug)
  );
  if (isLoading) return <Loader />;
  if (error || data === undefined) return <div>Error: {error}</div>;

  return (
    <div className="flex justify-center h-[800px] pt-7 relative">
      <div className="absolute right-10 bottom-10">cheat</div>
      <Carousel className="w-full max-w-[100vw] sm:max-w-[80vw] lg:max-w-[60vw] h-full relative">
        <CarouselContent>
          {data.slides.map((slide, index) => (
            <CarouselItem key={index}>
              <Lessoncard
                title={slide.title}
                content={slide.content}
                image={slide.image}
              />
            </CarouselItem>
          ))}
          <CarouselItem className="p-7">
            <Card className="bg-gradient-to-tr from-gray-800 to-indigo-600 h-full w-full">
              <CardHeader>
                <CardTitle className="text-4xl">Choose game</CardTitle>
              </CardHeader>
              <CardContent className="h-full ">
                <Separator />
                <div className=" mt-8 flex gap-5 flex-col justify-between items-center md:flex-row h-full w-full">
                  {data.hangman?.word && (
                    <Card className="bg-gradient-to-tr from-indigo-600 to-gray-800 min-h-60 w-full">
                      <CardHeader>
                        <CardTitle className="text-3xl">Hangman</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-row justifiy-center">
                        <div className="flex flex-col justify-center">
                          <Image
                            className="border-2 border-gray-950 rounded-lg"
                            src="/assets/images/hangman.png"
                            alt="Hangman"
                            width={200}
                            height={200}
                          />
                          <Link
                            href={`/games/hangman/${params.slug}`}
                            className={buttonVariants({
                              variant: "secondary",
                            })}
                          >
                            Play Game
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {data.memory?.title && (
                    <Card className="bg-gradient-to-tr from-indigo-600 to-gray-800 min-h-60 w-full">
                      <CardHeader>
                        <CardTitle className="text-3xl">Memory Cards</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col justify-center">
                          <Image
                            className="border-2 border-gray-950 rounded-lg"
                            src="/assets/images/hangman.png"
                            alt="Hangman"
                            width={200}
                            height={200}
                          />
                          <Link
                            href={{
                              pathname: "/games/memory-cards",
                              query: data.memory.title,
                            }}
                            className={buttonVariants({
                              variant: "secondary",
                            })}
                          >
                            Play Game
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden sm:block bottom-0 translate-y-[30vh] left-10" />
        <CarouselNext className="absolute hidden sm:block bottom-0 translate-y-[30vh] right-10" />
      </Carousel>
    </div>
  );
};

export default page;

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-5">
      <div className="border-2 border-gray-950 bg-gradient-to-tr from-gray-800 to bg-indigo-600 w-full h-[700px] p-6 rounded-3xl">
        <div className="text-3xl font-bold text-white overflow-hidden pb-4 border-b-2 border-gray-800">
          <Skeleton className="h-8 w-[250px]" />
        </div>
        <div className="pt-4 text-white relative grid grid-cols-1 gap-2">
          <Skeleton className="h-4 w-[75%]" />
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[78%]" />
        </div>
      </div>
    </div>
  );
};
