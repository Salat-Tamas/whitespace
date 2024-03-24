"use client";

import React from "react";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
// @ts-ignore
import dislike_red from "../../../public/assets/svgs/dislike_red.svg";
// @ts-ignore
import like_green from "../../../public/assets/svgs/like_green.svg";
import { cn } from "@/lib/utils";

export type FlipcardProps = {
  title: string;
  description: string;
  href: string;
  image: string;
};

const Flipcard = (props: FlipcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFLip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }

  return (
    <div className="flex items-center justify-center m-1 h-[150px] md:h-[300px] md:m-2 lg:h-[350px] cursor-pointer hover:scale-105 ease-in-out duration-300">
      <div
        className="flip-card w-[150px] h-[150px] md:w-[300px] md:h-[300px] lg:w-[550px] lg:h-[350px] rounded-md"
        onClick={handleFLip}
      >
        <motion.div
          className="flip-card-inner w-[100%] h-[100%] rounded-md"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.3, animationDirection: "normal" }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <FlipcardFront title={props.title} image={props.image}/>

          <FlipcardBack description={props.description} href={props.href} />
        </motion.div>
      </div>
    </div>
  );
};

export default Flipcard;

function FlipcardFront({ title, image }: { title: string, image: string }) {
  return (
    <div className={`flip-card-front w-[100%] h-[100%] bg-cover bg-[${image}] border-[1px] text-white rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex flex-col justify-between overflow-hidden`}>
      <h3 className="text-md sm:text-lg md:text-2xl font-bold flex flex-auto">{title}</h3>
      <div className="flex flex-row justify-end gap-2">
        <div className="border-[2px] border-[#ff0000] rounded-full justify-center w-[30px] h-[30px]">
          <Image src={dislike_red} alt='dislike'/>
        </div>
        <div className='border-[2px] border-[#00ff00] rounded-full justify-center w-[30px] h-[30px]'>
          <Image src={like_green} alt='like'/>
        </div>
      </div>
    </div>
  );
}

type FlipcardBackProps = {
  description: string;
  href: string;
};

function FlipcardBack({ description, href }: FlipcardBackProps) {
  return (
    <div className="flip-card-back w-[100%] h-[100%] bg-cover border-[1px] text-white sm:text-sm rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex flex-col justify-end">
      <ul>
        <li className="md:p-3">
          <p className="overflow-hidden sm:text-md md:text-lg lg:text-2xl">{description}</p>
        </li>
        <li className="flex justify-center">
          <Link
            href={`/lessons/${href}`}
            className={cn(buttonVariants( {variant: "outline"} ), "sm:w-[70px] sm:h-[35px] md:w-[90px] md:h-[40px lg:w-[100px] lg:h-[50px] flex justify-center items-center")}
          >
            Learn
          </Link>
        </li>
      </ul>
    </div>
  );
}
