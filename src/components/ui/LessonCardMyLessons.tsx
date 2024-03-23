import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";

type slide = {
  title: string;
  content?: string;
  image?: string;
};

const LessonCardMyLessons = ({ title, content, image }: slide) => {
  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-5">
      <div className="border-2 border-gray-950 bg-gradient-to-tr from-gray-800 to bg-indigo-600 w-[300px] h-[225px] lg:w-[400px] lg:h-[300px] p-6 rounded-3xl">
        <div className="text-3xl font-bold text-white overflow-hidden pb-4 border-b-2 border-gray-800">
          <h2>{title}</h2>
        </div>
        <div className="pt-4 text-white relative">
          <p>{content}</p>
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonCardMyLessons;
