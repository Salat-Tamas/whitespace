import { OpenAI } from "openai";
import { createAI, getMutableAIState, render } from "ai/rsc";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// An example of a spinner component. You can also import your own components,
// or 3rd party component libraries.
function Spinner() {
  return <div>Loading...</div>;
}

// An example of a flight card component.

async function getData(Education: string) {
  return {
    Education,
    learning: "Learning",
  };
}
// @ts-ignore
async function submitUserMessage(userInput: string) {
  "use server";
  // @ts-ignore
  const aiState = getMutableAIState<typeof AI>();

  // Update the AI state with the new user message.
  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content: userInput,
    },
  ]);

  // The `render()` creates a generated, streamable UI.
  // @ts-ignore
  const ui = render({
    model: "gpt-3.5-turbo",
    provider: openai,
    messages: [
      {
        role: "system",
        content:
          "You are a helper for a tudent, something like a teacher.You will explain everything respectfully and really well, but shortly.",
      },
      ...aiState.get(),
    ],
    // `text` is called when an AI returns a text response (as opposed to a tool call).
    // Its content is streamed from the LLM, so this function will be called
    // multiple times with `content` being incremental.
    text: ({ content, done }) => {
      // When it's the final content, mark the state as done and ready for the client to access.
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: "assistant",
            content,
          },
        ]);
      }

      return <p>{content}</p>;
    },
    tools: {
      get_flight_info: {
        description: "Get information for student questions",
        parameters: z
          .object({
            Education: z.string().describe("The student's question."),
          })
          .required(),
        render: async function* ({ Education }) {
          // Show a spinner on the client while we wait for the response.
          yield <Spinner />;

          // Fetch the flight information from an external API.
          // @ts-ignore
          const flightInfo = await get(Education);

          // Update the final AI state.
          aiState.done([
            ...aiState.get(),
            {
              role: "function",
              name: "get_flight_info",
              // Content can be any string to provide context to the LLM in the rest of the conversation.
              content: JSON.stringify(flightInfo),
            },
          ]);

          // Return the flight card to the client.
          return <Education key={1} />;
        },
      },
    },
  });

  return {
    id: Date.now(),
    display: ui,
  };
}

// Define the initial state of the AI. It can be any JSON object.
const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

// AI is a provider you wrap your application with so you can access AI and UI state in your components.
// @ts-ignore
export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  // Each state can be any shape of object, but for chat applications
  // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
  initialUIState,
  initialAIState,
});
