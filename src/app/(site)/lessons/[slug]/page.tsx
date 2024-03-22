import Lessoncard from '@/components/ui/Lessoncard'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type lessonProps = { 
  params: { 
    slug: string
  }
 }

const page = ({ params }: lessonProps) => {
  return (
    <div className='flex justify-center h-[800px] pt-7'>
      <Carousel className="w-full max-w-[100vw] h-full relative">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
                  <Lessoncard title={"Slide Title"} content='Here goes some lorem ipsum text about the current slide that you are reading at the moment. Please consider helping us out. Thank you in advance!'/>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden sm:block bottom-0 translate-y-[30vh] left-10'/>
      <CarouselNext className='absolute hidden sm:block bottom-0 translate-y-[30vh] right-10'/>
    </Carousel>
    </div>
  )
}

export default page