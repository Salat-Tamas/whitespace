"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const AIBenefits = ["Be able to use our AI assistant"];

const standardBenefits = [
  "Create lessons (maximum 10)",
  "Only text based lessons (maximum 10 slides)",
];

const premiumBenefits = [
  "Create lessons (maximum 30)",
  "Text and image based lessons (maximum 30 slides)",
  "Be able to use our AI assistant",
];

const SubscriptionCard = () => {
  return (
    <div className="md:h-[55vh]">
      <div className="mx-4 flex flex-col gap-16 md:flex-row md:gap-20">
        <Card className="max-w-[400px] text-white border-2 border-gray-950 bg-gradient-to-tr from-gray-800 to bg-indigo-600 w-full p-6 rounded-3xl duration-500 cursor-pointer hover:scale-110">
          <Link href="/payment/ai-assistant">
            <CardHeader className="flex justify-center gap-3">
              <Image
                className=""
                alt="Subscription image"
                height={70}
                width={70}
                src="/assets/images/illustrator.png"
              />
              <div className="flex flex-col mx-8">
                <p className="text-2xl">AI Assistant</p>
                <p className="text-small text-default-500">
                  Use the help of our assistant!
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="mt-2">
              {AIBenefits.map((text) => (
                <div className="flex flex-row gap-4">
                  <div className="min-w-fit">
                    <Image
                      src="/assets/images/check.png"
                      alt="Benefits image"
                      height={30}
                      width={30}
                    />
                  </div>
                  <div>{text}</div>
                </div>
              ))}
            </CardBody>
            <Divider />
            <CardFooter className="mt-2">Price: 50 RON / Month</CardFooter>
          </Link>
        </Card>
        <Card className="max-w-[400px] text-white border-2 border-gray-950 bg-gradient-to-tr from-gray-800 to bg-indigo-600 w-full p-6 rounded-3xl duration-500 cursor-pointer hover:scale-110">
          <Link href="/payment/standard-creator">
            <CardHeader className="flex justify-center gap-3">
              <Image
                className=""
                alt="Subscription image"
                height={70}
                width={70}
                src="/assets/images/coin.png"
              />
              <div className="flex flex-col mx-8">
                <p className="text-2xl">Standard</p>
                <p className="text-small text-default-500">Become a creator!</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="mt-2">
              {standardBenefits.map((text) => (
                <div className="flex flex-row gap-4">
                  <div className="min-w-fit">
                    <Image
                      src="/assets/images/check.png"
                      alt="Benefits image"
                      height={30}
                      width={30}
                    />
                  </div>
                  <div>{text}</div>
                </div>
              ))}
            </CardBody>
            <Divider />
            <CardFooter className="mt-2">Price: 25 RON / Month</CardFooter>
          </Link>
        </Card>
        <Card className="max-w-[400px] text-white border-2 border-gray-950 bg-gradient-to-tr from-gray-800 to bg-indigo-600 w-full p-6 rounded-3xl duration-500 cursor-pointer hover:scale-110">
          <Link href="/payment/premium-ai-assistant">
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
                <p className="text-small text-default-500">
                  Become a premium creator!
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="mt-2">
              {premiumBenefits.map((text) => (
                <div className="flex flex-row gap-4">
                  <div className="min-w-fit">
                    <Image
                      src="/assets/images/check.png"
                      alt="Benefits image"
                      height={30}
                      width={30}
                    />
                  </div>
                  <div>{text}</div>
                </div>
              ))}
            </CardBody>
            <Divider />
            <CardFooter className="mt-2">Price: 100 RON / Month</CardFooter>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionCard;
