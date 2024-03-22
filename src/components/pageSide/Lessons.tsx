'use client'

import Flipcard from "@/components/ui/Flipcard";

import { cards } from "@/lib/constants";
import { Grid } from "lucide-react";
import React from 'react'

type Props = {}

const Lessons = (props: Props) => {
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-1">
    {cards.map((card, i) => (
        <Flipcard key={i} {...card} />
      ))
    }
  </div>
  )
}

export default Lessons