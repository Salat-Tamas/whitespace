'use client'

import Flipcard from "@/components/ui/Flipcard";

import { cards } from "@/lib/constants";
import { Grid } from "lucide-react";
import ScrollToTopButton from "@/components/ui/scroll-to-top-button"
import React from 'react'

type Props = {}

const Lessons = (props: Props) => {
  return (
    <>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-1">
        {cards.map((card, i) => (
          <Flipcard key={i} {...card} />
        ))
        }
      </div>
      <div className="fixed bottom-12 right-12">
        <ScrollToTopButton />
      </div>
    </>
  )
}

export default Lessons