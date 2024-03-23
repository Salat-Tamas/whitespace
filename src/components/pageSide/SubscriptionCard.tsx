'use client'

import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link} from "@nextui-org/react";
import Image from "next/image";

const SubscriptionCard = () => {
  return (
    <Card className="max-w-[400px] text-white border-2 border-gray-950 bg-gradient-to-tr from-gray-800 to bg-indigo-600 w-full p-6 rounded-3xl">
      <CardHeader className="flex justify-center gap-3">
        <Image
        className=""
          alt="Subscription image"
          height={70}
          width={70}
          src="/assets/images/premium.png"
        />
        <div className="flex flex-col mx-8">
          <p className="text-2xl">Premium</p>
          <p className="text-small text-default-500">Become a creator!</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
}

export default SubscriptionCard;