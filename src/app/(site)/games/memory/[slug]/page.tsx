"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MemoryList } from "@/components/ui/MemoryList";
import useSWR from "swr";
import { getMemmo } from "../../../../../../sanity/lib/client";

const page = ({ params }: { params: { slug: string } }) => {
  const { data, isLoading, error } = useSWR(
    "/memory",
    getMemmo.bind(null, params.slug)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || data === undefined) return <div>Error</div>;

  function shuffle(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  var array = [...data.relevantCards, ...data.irrelevantCards];
  var array2 = [...data.relevantCards, ...data.irrelevantCards];
  const shuffledData = shuffle(array);
  const shuffledData2 = shuffle(array2);
  return (
    <div className="w-full min-h-[85vh] mt-2 max-w-screen flex flex-col md:flex-row overflow-hidden justify-start md:justify-center items-center">
      <div className="h-full overflow-hidden text-gray-300 w-full md:w-1/3">
        <h2 className="p-2 font-bold text-gray-300">
          Select the <span className="text-indigo-600">lesson-relevant</span>{" "}
          expressions from the flashcards in the checkboxes below:
        </h2>
        <div className="">
          <MemoryList items={shuffledData2} relevantData={data.relevantCards} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-2">
        {shuffledData.map((content, index) => (
          <Card
            key={index}
            content={content}
            relevantCards={data.relevantCards}
          />
        ))}
      </div>
    </div>
  );
};

const Card = ({
  content,
  relevantCards,
}: {
  content: string;
  relevantCards: string[];
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }

  return (
    <div className="flex flex-wrap aspect-square items-center justify-center h-[80px] md:h-[100px] lg:h-[150px] cursor-pointer hover:scale-105 ease-in-out duration-300">
      <motion.div
        key={"flip-card"}
        exit={{ opacity: 0 }}
        initial={{ opacity: 1 }}
        animate={
          isFlipped && { opacity: 0, display: "none", cursor: "default" }
        }
        transition={{ duration: 0.8 }}
        className={`flip-card aspect-square h-[80px] md:h-[100px] lg:h-[150px] rounded-md ${
          isFlipped ? "transform duration-1000 opacity-100" : ""
        }`}
        onClick={handleFlip}
      >
        <motion.div
          className="flip-card-inner w-[100%] h-[100%] rounded-md"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.1, animationDirection: "normal" }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <FlipcardFront />
          <FlipcardBack content={content} relevantCards={relevantCards} />
        </motion.div>
      </motion.div>
    </div>
  );
};

function FlipcardFront() {
  return (
    <div className="flip-card-front w-[100%] h-[100%] bg-cover border-[1px] text-gray-300 rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex flex-col justify-between overflow-hidden" />
  );
}

function FlipcardBack({
  content,
  relevantCards,
}: {
  content: string;
  relevantCards: string[];
}) {
  return (
    <div
      className={`flip-card-back w-[100%] h-[100%] bg-cover border-[1px] text-gray-300 sm:text-sm rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700 flex flex-col justify-center items-center ${
        relevantCards.includes(content)
          ? "bg-gradient-to-tr from-black to-blue-800"
          : ""
      }`}
    >
      <p>{content}</p>
    </div>
  );
}

export default page;
