"use client";

import React from "react";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export type FlipcardProps = {
  title: string;
  description: string;
  href: string;
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
          <FlipcardFront title={props.title} />

          <FlipcardBack description={props.description} href={props.href} />
        </motion.div>
      </div>
    </div>
  );
};

export default Flipcard;

function FlipcardFront({ title }: { title: string }) {
  return (
    <div className="flip-card-front w-[100%] h-[100%] bg-cover border-[1px] text-white rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex flex-col justify-end">
      <h3 className="text-2xl font-bold">{title}</h3>
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
          <p className="overflow-hidden">{description}</p>
        </li>
        <li className="flex justify-center">
          <Link
            href={`/lessons/${href}`}
            className={buttonVariants({ variant: "outline" })}
          >
            Learn
          </Link>
        </li>
      </ul>
    </div>
  );
}
