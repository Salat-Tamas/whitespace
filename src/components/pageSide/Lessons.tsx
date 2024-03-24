"use client";

import Flipcard from "@/components/ui/Flipcard";

import { cards } from "@/lib/constants";
import { Grid } from "lucide-react";
import React from "react";
import { getLessons } from "../../../sanity/lib/client";

import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";

type Props = {};

const Lessons = () => {
  const { data, isLoading, error } = useSWR("/lessons", getLessons.bind(null));
  if (isLoading) return <Loader/>;
  if (error || data === undefined) return <div>Error: {error}</div>;

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-1 min-h-[90vh]">
      {data.map((card, i) => (
        <Flipcard
          key={i}
          title={card.title}
          description={card.description}
          href={card.slug}
          image={card.image}
        />
      ))}
    </div>
  );
};

export default Lessons;

const Loader = () => {
  return <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-1">
      <div className="w-[150px] h-[150px] md:h-[300px] md:w-[450px] md:m-2 lg:h-[400px] lg:w-[500px] bg-cover border-[1px] text-white rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex flex-col justify-end">
          <Skeleton className='h-8 w-[120px]'/>
      </div>  
      <div className="w-[150px] h-[150px] md:h-[300px] md:w-[450px] md:m-2 lg:h-[400px] lg:w-[500px] bg-cover border-[1px] text-white rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex flex-col justify-end">
          <Skeleton className='h-8 w-[120px]'/>
      </div>  
      <div className="w-[150px] h-[150px] md:h-[300px] md:w-[450px] md:m-2 lg:h-[400px] lg:w-[500px] bg-cover border-[1px] text-white rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex flex-col justify-end">
          <Skeleton className='h-8 w-[120px]'/>
      </div>  
      <div className="w-[150px] h-[150px] md:h-[300px] md:w-[450px] md:m-2 lg:h-[400px] lg:w-[500px] bg-cover border-[1px] text-white rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex flex-col justify-end">
          <Skeleton className='h-8 w-[120px]'/>
      </div>  
      <div className="w-[150px] h-[150px] md:h-[300px] md:w-[450px] md:m-2 lg:h-[400px] lg:w-[500px] bg-cover border-[1px] text-white rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex flex-col justify-end">
          <Skeleton className='h-8 w-[120px]'/>
      </div>  
      <div className="w-[150px] h-[150px] md:h-[300px] md:w-[450px] md:m-2 lg:h-[400px] lg:w-[500px] bg-cover border-[1px] text-white rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex flex-col justify-end">
          <Skeleton className='h-8 w-[120px]'/>
      </div>
</div>;
}