"use client";

import React from "react";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export type MemFlipCardProps = {
  title: string;
  isFlipped: boolean;
  setIsFlipped: (isFlipped: boolean) => void;
};

const MemFlipCard = ({ isFlipped, setIsFlipped, title }: MemFlipCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFLip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }

  return (
    <div className="flex items-center justify-center m-1 h-[150px] md:h-[300px] md:m-2 lg:h-[350px] cursor-pointer">
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
          <MemFlipCardFront />

          <MemFlipCardBack title={title} />
        </motion.div>
      </div>
    </div>
  );
};

export default MemFlipCard;

function MemFlipCardFront() {
  return (
    <div className="flip-card-front w-[100%] h-[100%] bg-cover border-[1px] text-white rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex flex-col justify-end"></div>
  );
}

type MemFlipCardBackProps = {
  title: string;
};

function MemFlipCardBack({ title }: MemFlipCardBackProps) {
  return (
    <div className="flip-card-back w-[100%] h-[100%] bg-cover border-[1px] text-white sm:text-sm rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex justify-center items-center">
      <h1 className="text-4xl uppercase">{title}</h1>
    </div>
  );
}
