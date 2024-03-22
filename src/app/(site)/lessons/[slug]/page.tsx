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
  if (!data || isLoading) return <div>Loading...</div>;
  if (!data || error) return <div>Error: {error}</div>;
  return (
    <div className="flex justify-center h-[800px] pt-7">
      <Carousel className="w-full max-w-[100vw] h-full relative">
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
        </CarouselContent>
        <CarouselPrevious className="hidden sm:block bottom-0 translate-y-[30vh] left-10" />
        <CarouselNext className="absolute hidden sm:block bottom-0 translate-y-[30vh] right-10" />
      </Carousel>
    </div>
  );
};

export default page;
