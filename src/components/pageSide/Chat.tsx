"use client";

import { useState } from "react";
import { useUIState, useActions } from "ai/rsc";
import type { AI } from "@/app/(site)/actions";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();

  return (
    <div className="max-w-30 max-h-70 p-3 bg-blue-950 rounded-md bottom-0 right-0">
      {
        // View messages in UI state
        messages.map((message: any) => (
          <div key={message.id} className="">
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
  );
}
