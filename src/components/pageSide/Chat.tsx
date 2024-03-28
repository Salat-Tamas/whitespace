"use client";

import { useEffect, useState } from "react";
import { useUIState, useActions } from "ai/rsc";
import { AI } from "@/app/(site)/actions";
import Image from "next/image";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <div
        className="flex justify-end mb-4 hover:scale-110 duration-200"
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        <div className="">
          <Image
            className={`cursor-pointer ${
              isVisible ? "opacity-0" : "opacity-100"
            } transition-opacity duration-500`}
            src="/assets/images/icon2.png"
            height={150}
            width={150}
            alt="Ai assistant icon"
          />
        </div>
        <div className="mt-auto">
          <Image
            className={`cursor-pointer ${
              isVisible ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500`}
            src="/assets/images/close.png"
            height={70}
            width={70}
            alt="Ai assistant close icon"
            style={{ height: "70px", width: "70px" }}
          />
        </div>
      </div>
      <div
        className={`${
          isVisible ? "block" : "hidden"
        } max-w-60 max-h-70 p-3 bg-blue-950 rounded-md bottom-0 right-0`}
      >
        {
          // View messages in UI state
          messages.map((message: any) => (
            <div
              key={message.id}
              className="border-b-[1px] border-gray-300 py-2"
            >
              {message.display}
            </div>
          ))
        }

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            // Add user message to UI state
            setMessages((currentMessages: any) => [
              ...currentMessages,
              {
                id: Date.now(),
                display: <div className="">{inputValue}</div>,
              },
            ]);

            // Submit and get response message
            const responseMessage = await submitUserMessage(inputValue);
            setMessages((currentMessages: any) => [
              ...currentMessages,
              responseMessage,
            ]);

            setInputValue("");
          }}
        >
          <input
            placeholder="Send a message..."
            value={inputValue}
            className="w-full p-2 bg-blue-900 rounded-md"
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
        </form>
      </div>
    </div>
  );
}
