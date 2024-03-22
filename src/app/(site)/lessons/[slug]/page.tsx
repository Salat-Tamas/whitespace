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

type lessonProps = {
  params: {
    slug: string;
  };
};

const page = ({ params }: lessonProps) => {
  const { data, error, isLoading } = useSWR(
    "/api/lessons",
    getSlides.bind(null, params.slug)
  );
  if (!data || isLoading || !data.slides) return <Loader />;
  if (!data || error) return <div>Error: {error}</div>;
  return (
    <div className="flex justify-center h-[800px] pt-7">
      <Carousel className="w-full max-w-[100vw] h-full relative">
        <CarouselContent>
          {data && data.slides.map((slide, index) => (
            <CarouselItem key={index}>
              <Lessoncard
                title={slide.title}
                content={slide.content}
                image={slide.image}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:block bottom-0 translate-y-[30vh] left-10" />
        <CarouselNext className="absolute hidden sm:block bottom-0 translate-y-[30vh] right-10" />
      </Carousel>
    </div>
  );
};

export default page;



const Loader = () => {
  return <div className="flex flex-col items-center justify-start border-2 border-red-600 w-full h-full p-5">
  <div className="border-2 border-gray-950 bg-gradient-to-tr from-gray-800 to bg-indigo-600 w-full h-[700px] p-6 rounded-3xl">
    <div className="text-3xl font-bold text-white overflow-hidden pb-4 border-b-2 border-gray-800">
    <Skeleton className="h-8 w-[250px]" />
    </div>
    <div className="pt-4 text-white relative grid grid-cols-1 gap-2">
      <Skeleton className="h-4 w-[75%]"/>
      <Skeleton className="h-4 w-[60%]"/>
      <Skeleton className="h-4 w-[78%]"/>
    </div>
  </div>
</div>;
}