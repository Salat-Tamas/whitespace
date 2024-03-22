import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

type Props = {

}


const Flipcard = (props: Props) => {
    return (
        <div>Flipcard</div>
        )
    }
    
    export default Flipcard
    
    
const CardFace = () => {

    return (<Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Create project</CardTitle>
      <CardDescription>Deploy your new project in one-click.</CardDescription>
    </CardHeader>
    <CardContent>
      <Image src="/" alt=""/>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline">Cancel</Button>
      <Button>Deploy</Button>
    </CardFooter>
  </Card>)

}